"use client"
import { useScrollTop } from '@/hooks/useScrollTop'
import { cn } from '@/lib/utils';
import React from 'react'
import Logo from './Logo';
import { ModeToggle } from '@/components/ModeToggle';

const Navbar = () => {
    const scrolled = useScrollTop();
  return (
    <div className={cn(
        "z-50 dark:bg-[#0f0f0f] fixed top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
    )}>
        <Logo/>
        <div className='md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2'>
            <ModeToggle/>
        </div>
    </div>
  )
}

export default Navbar