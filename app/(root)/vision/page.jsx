'use client'

import { useState, useTransition } from 'react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { Button, Card, CardBody, CardHeader, Divider, Image } from '@nextui-org/react'
import Markdown from 'react-markdown'
import { updateCredits } from '@/lib/actions/user.actions'
import { creditFee } from '@/constants'
import { signIn, useSession } from 'next-auth/react'
import { InsufficientCreditsModal } from '@/components/insufficient-credits-modal'

const Vision = () => {
    const [file, setFile] = useState(null)
    const [prompt, setPrompt] = useState('')
    const [response, setResponse] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, startTransition] = useTransition()
    const [showInsufficientCreditsModal, setShowInsufficientCreditsModal] = useState(false);

    const { data: session } = useSession();

    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_AI_API_KEY)

    async function fileToGenerativePart(file) {
        const base64EncodedDataPromise = new Promise((resolve) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result.split(',')[1])
            reader.readAsDataURL(file)
        })
        return {
            inlineData: { data: await base64EncodedDataPromise, mimeType: file.type }
        }
    }

    const fetchDataVision = async () => {

        if (session && session.user) {
            if (session.user.creditBalance < Math.abs(creditFee)) {
                setShowInsufficientCreditsModal(true);
                return;
            }
        }

        setShowInsufficientCreditsModal(false);
        setError('')

        if (!file) {
            setError('Please select an image')
            return
        }

        setPrompt('What’s in this image?')
        setResponse(null)
        setLoading(true)

        const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' })

        try {
            const fileInputEl = document.querySelector('input[type=file]')
            const imageParts = await Promise.all(
                [...fileInputEl.files].map(fileToGenerativePart)
            )

            const result = await model.generateContent([prompt, ...imageParts])
            const response = await result.response
            const text = response.text()

            startTransition(async () => {
                await updateCredits(session.user.id, creditFee)
            })

            setLoading(false)
            setResponse(text)
        } catch (error) {
            setError('Oops an error occurred')
            setLoading(false)
            console.log(error)
        }
    }

    const handleFileChange = (event) => {
        setFile(null)
        setPrompt('')

        const file = event.target.files[0]
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
        const reader = new FileReader()
        reader.onloadend = () => {
            setFile(reader.result)
        }

        if (file && allowedTypes.includes(file.type)) {
            reader.readAsDataURL(file)
        } else {
            setError(`Please select a valid image file`)
            event.target.value = null;
        }
    }

    const getImage = () => {
        if (file) {
            return (
                <Image
                    src={file}
                    alt="Selected"
                    width={576}
                    height={384}
                    shadow="sm"
                    loading="lazy"
                    isBlurred
                    className="sm:max-w-xl max-h-96"
                ></Image>
            )
        }

        return (
            <Image
                src={'/assets/images/placeholder.jpg'}
                alt='Selected'
                width={576}
                height={384}
                priority
                shadow="sm"
                loading="lazy"
                isBlurred
                className="sm:max-w-xl max-h-96"
            ></Image>
        )
    }

    const getInputFile = () => {
        return (
            <input
                type='file'
                aria-label='Select an image'
                onChange={handleFileChange}
                className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
                file:bg-gray-50 file:border-0
                file:me-4
                file:py-3 file:px-4
                dark:file:bg-neutral-700 dark:file:text-neutral-400"
            />
        )
    }

    const getButton = () => {
        if (loading) {
            return (
                <Button color="secondary" isLoading className="min-[445px]:h-auto">
                    Loading
                </Button>
            )
        }

        if (!session) {
            return (
                <Button onClick={() => signIn()} color="secondary" className="min-[445px]:h-auto">
                    Generate
                </Button>
            )
        }

        return (
            <Button color="secondary" onClick={fetchDataVision} className="min-[445px]:h-auto">
                Generate
            </Button>
        )
    }

    const getResponse = () => {
        if (response === null) return null
        if (response === '') return <p>No response found, try another prompt.</p>
        return (
            <Card className="max-w-2xl mx-auto mt-8">
                <CardHeader>
                    Response
                </CardHeader>

                <Divider />
                <CardBody>
                    <div className="prose dark:prose-invert text-content1-foreground max-w-full">
                        <Markdown>{response}</Markdown>
                    </div>
                </CardBody>
            </Card>
        )
    }

    const getError = () => {
        if (error) return <p className="text-tiny text-danger">{error}</p>
    }

    return (
        <>
            {showInsufficientCreditsModal && <InsufficientCreditsModal />}
            <main>
                <h1 className="mx-auto max-w-5xl font-display text-2xl sm:text-4xl font-bold tracking-normal md:text-6xl mb-2 sm:mb-5 text-center">Analyze your <span className="text-secondary">image</span> in seconds</h1>
                <p class="text-content2-foreground text-base sm:text-lg text-center">Upload an image, and it will be analyzed instantly.</p>

                <div className="flex flex-col items-center space-y-4 mt-16">
                    {getImage()}
                    <div className="flex flex-col min-[445px]:flex-row gap-3 !mt-10">
                        {getInputFile()}
                        {getButton()}
                    </div>
                    {getError()}
                </div>
                {getResponse()}
            </main>
        </>
    )
}

export default Vision