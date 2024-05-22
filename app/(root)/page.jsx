import { Button, Chip } from '@nextui-org/react';
import Link from 'next/link';
import React from 'react';

const Home = () => {
    return (
        <div>
            <div className="relative justify-center items-center">
                <section>
                    <div className="max-w-screen-xl mx-auto px-4 py-28 gap-12 md:px-8 flex flex-col justify-center items-center">
                        <div className="flex flex-col justify-center items-center space-y-5 max-w-4xl mx-auto text-center">
                            <Chip
                                startContent={
                                    <svg
                                        className="mx-1"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M4 5h2" />
                                        <path d="M5 4v2" />
                                        <path d="M11.5 4l-.5 2" />
                                        <path d="M18 5h2" />
                                        <path d="M19 4v2" />
                                        <path d="M15 9l-1 1" />
                                        <path d="M18 13l2 -.5" />
                                        <path d="M18 19h2" />
                                        <path d="M19 18v2" />
                                        <path d="M14 16.518l-6.518 -6.518l-4.39 9.58a1 1 0 0 0 1.329 1.329l9.579 -4.39z" />
                                    </svg>
                                }
                                variant="dot"
                                color="default"
                            >
                                Vision GPT is here!
                            </Chip>
                            <h1 className="text-4xl font-extrabold mx-auto md:text-5xl bg-gradient-to-b from-foreground to-foreground/70 text-transparent bg-clip-text">
                                Discover Vision GPT
                            </h1>
                            <p className="max-w-2xl mx-auto text-foreground/80">
                                Vision GPT analyzes and understands everything in an image, bringing AI-driven insights to your fingertips.
                            </p>
                            <div className="items-center justify-center gap-x-3 space-y-3 sm:flex sm:space-y-0">
                                <Button as={Link} href="/vision" color="secondary" variant="solid">
                                    Get Started
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="w-full h-full absolute -top-32 flex justify-end items-center -z-10">
                    <div className="w-3/4 flex justify-center items-center">
                        <div className="w-12 h-[600px] bg-light blur-[100px] rounded-3xl max-sm:rotate-[15deg] sm:rotate-[35deg]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
