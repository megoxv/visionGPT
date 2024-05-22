import Image from 'next/image'
import React from 'react'

export const BgGradient = () => {
    return (
        <div aria-hidden="true" className="pointer-events-none absolute -top-[30rem] right-1/2 h-full w-full translate-x-1/2 touch-none overflow-visible">
            <Image src={'/assets/images/default-gradient.png'} alt="bg gradient" className="h-full w-full overflow-visible opacity-50" width="113" height="80" loading="lazy" />
        </div>
    )
}
