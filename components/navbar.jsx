"use client"
import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarBrand,
    NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import NextLink from "next/link";

import { ThemeSwitch } from "@/components/theme-switch";
import { GithubIcon, Logo } from "@/components/icons";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";

export const Navbar = () => {
    const { data: session } = useSession();
    return (
        <NextUINavbar maxWidth="xl" position="sticky" shouldHideOnScroll>
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand as="li" className="gap-3 max-w-fit">
                    <NextLink href="/" className="flex justify-start items-center gap-1">
                        <Logo />
                        <p className="font-bold text-inherit">VisionGPT</p>
                    </NextLink>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent
                className="flex basis-1/5 sm:basis-full"
                justify="end"
            >
                {(session && session.user) && (
                    <NavbarItem>
                        <div className="text-foreground-600">
                            <span className="me-1">{session.user.creditBalance ?? 0}</span>
                            credits
                        </div>
                    </NavbarItem>
                )}

                <NavbarItem className="flex gap-2">
                    <Link isExternal aria-label="Github" href="https://github.com/abdelmjid-saber">
                        <GithubIcon className="text-default-500" />
                    </Link>
                    <ThemeSwitch />
                </NavbarItem>
                <NavbarItem className="flex">
                    {(session && session.user) ? (
                        <Dropdown placement="bottom-end">
                            <DropdownTrigger>
                                <Avatar
                                    isBordered
                                    as="button"
                                    className="transition-transform"
                                    color="secondary"
                                    name={session.user.name ?? ""}
                                    size="sm"
                                    src={session.user.image ?? ""}
                                />
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Profile Actions" variant="flat">
                                <DropdownItem key="profile" className="h-14 gap-2">
                                    <p className="font-semibold">Signed in as</p>
                                    <p className="font-semibold">{session.user.email ?? ""}</p>
                                </DropdownItem>
                                <DropdownItem key="vision" as={NextLink} href="/vision">Vision</DropdownItem>
                                <DropdownItem key="credits" as={NextLink} href="/credits">Buy Credits</DropdownItem>
                                <DropdownItem key="logout" onClick={() => signOut()} color="danger">
                                    Log Out
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    ) : (
                        <Button onClick={() => signIn('google')} color="secondary" variant="flat">
                            Login
                        </Button>
                    )}
                </NavbarItem>
            </NavbarContent>
        </NextUINavbar >
    );
};