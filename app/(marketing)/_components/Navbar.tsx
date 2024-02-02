"use client"
import { useScrollTop } from '@/hooks/useScrollTop'
import { cn } from '@/lib/utils';
import React from 'react'
import Logo from './Logo';
import { ModeToggle } from '@/components/ModeToggle';

import { useConvexAuth } from 'convex/react';
import { SignInButton, UserButton } from '@clerk/clerk-react';
import { Button } from '@/components/ui/button';
import Spinner from '@/components/Spinner';
import Link from 'next/link';

const Navbar = () => {
    const {isAuthenticated, isLoading} = useConvexAuth()
    const scrolled = useScrollTop();
  return (
    <div className={cn(
        "z-50 dark:bg-[#1f1f1f] fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
    )}>
        <Logo/>
        <div className='md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2'>
            {
              isLoading && (
                <Spinner/>
              )
            }
            {!isAuthenticated && !isLoading && (
              <>
                <SignInButton mode={"modal"}>
                  <Button variant={"ghost"} size={"sm"}>
                    Login
                  </Button>
                </SignInButton>
              </>
            )}
            {
              isAuthenticated && !isLoading && (
                <>
                  <Button variant={"ghost"} size={"sm"} asChild>
                    <Link href={"/documents"}>
                      Enter Notion
                    </Link>
                  </Button>
                  <UserButton afterSignOutUrl='/'/>
                </>
              )
            }
            <ModeToggle/>
        </div>
    </div>
  )
}

export default Navbar