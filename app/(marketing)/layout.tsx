import React from 'react'
import Navbar from './_components/Navbar'

interface MarketingLayoutProps {
    children: React.ReactNode
}

const MarketingLayout = ({children}: MarketingLayoutProps) => {
  return (
    <div className='h-full dark:bg-[#1f1f1f]'>
        <Navbar/>
        <main className='h-full pt-40'>
            {children}
        </main>
    </div>
  )
}

export default MarketingLayout