"use client";
import { useStoreUser } from '@/hooks/use-store-user';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import BarLoader from "react-spinners/BarLoader";
import { Button } from './ui/button';
import { Authenticated, Unauthenticated } from "convex/react";
import { LayoutDashboard } from 'lucide-react';

const header = () => {
    const { isLoading } = useStoreUser();
    const path = usePathname();
    return (
        <header className='fixed top-0 w-full border-b bg-white/95 backdrop-blur z-50 supports-[backdrop-filter]:bg-white/60'>
            <nav className='w-full h-16 px-6 flex items-center justify-between'>
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src={"/logos/logo.png"}
                            alt="Vehiql Logo"
                            width={200}
                            height={60}
                            className="h-14 w-auto object-contain"
                        />
                    </Link>
                </div>
                {path === "/" && (
                    <div className="flex-1 flex justify-center">
                        <div className="hidden md:flex items-center gap-8 ml-11">
                            <Link
                                href="#features"
                                className="text-sm font-bold hover:text-green-600 transition"
                            >
                                Features
                            </Link>
                            <Link
                                href="#how-it-works"
                                className="text-sm font-bold hover:text-green-600 transition"
                            >
                                How It Works
                            </Link>
                        </div>
                    </div>
                )}
                <div className="flex items-center gap-4">
                    <Authenticated>
                        <Link href="/dashboard">
                            <Button
                                variant="outline"
                                className="hidden md:inline-flex items-center gap-2 hover:text-green-600 hover:border-green-600 transition"
                            >
                                <LayoutDashboard className="h-4 w-4" />
                                Dashboard
                            </Button>
                            <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                                <LayoutDashboard className="h-4 w-4" />
                            </Button>
                        </Link>

                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: "w-10 h-10",
                                    userButtonPopoverCard: "shadow-xl",
                                    userPreviewMainIdentifier: "font-semibold",
                                },
                            }}
                            afterSignOutUrl="/"
                        />
                    </Authenticated>
                    <Unauthenticated>
                        <SignInButton>
                            <Button variant={"ghost"}>Sign In</Button>
                        </SignInButton>
                        <SignInButton>
                            <Button className="bg-green-600 hover:bg-green-700 border-none">Get Started</Button>
                        </SignInButton>
                    </Unauthenticated>
                </div>
            </nav>
            {isLoading && <BarLoader width={"100%"} color='#36d7b7' />}
        </header>
    )
}

export default header
