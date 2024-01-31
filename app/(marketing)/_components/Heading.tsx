"use client"

import Spinner from '@/components/Spinner'
import { Button } from '@/components/ui/button'
import { SignInButton } from '@clerk/clerk-react'
import { useConvexAuth } from 'convex/react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Heading = () => {
  const {isAuthenticated, isLoading} = useConvexAuth()
  return (
    <div className='max-w-3xl space-y-4'>
        <h1 className='text-3xl sm:text-5xl md:text-6xl font-bold'>Write, Plan, Share your ideas. Welcome to <span className='underline'>Notion</span></h1>
        <h3 className='text-base sm:text-xl md:text-2xl font-medium'>Notion is the connected workspace where <br /> better, faster work happens</h3> 
        {
          isLoading && (
            <div className='w-full flex items-center justify-center'>
              <Spinner/>
            </div>
          )
        }
        {
          isAuthenticated && !isLoading && (
            <div className='mt-10'>
              <Link href={"/documents"}>
              <Button>
              Enter Notion 
              <ArrowRight className='h-4 w-4 ml-2'/>    
          </Button>  
            </Link>
            </div>
          )
        }  
        {
          !isAuthenticated && !isLoading && (
            <SignInButton mode='modal'>
              <Button>
              Get Notion for free
              <ArrowRight className='h-4 w-4 ml-2'/>    
          </Button> 
            </SignInButton> 
          )
        }  
    </div>
  )
}

export default Heading