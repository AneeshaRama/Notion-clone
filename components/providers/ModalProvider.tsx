"use client"

import React, { useEffect, useState } from 'react'
import SettingsModal from '../modals/SettingsModal'
import CoverImageModal from '../modals/CoverImageModal';

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true)
    },[])

    if(!isMounted) return null;
  return (
    <>
        <SettingsModal/>
        <CoverImageModal/>
    </>
  )
}

export default ModalProvider