"use client"
import AuthModal from '@/components/AuthModal';
import UploadModal from '@/components/UploadModal';
import React, { useEffect, useState } from 'react'

const ModalProvider = () => {
    const[isMounted, setIsMounted] = useState(false);

    useEffect(() => {

        setIsMounted(true);

    },[]);

    if(!isMounted){
        return null;
    }

  return (
    <>
   <AuthModal/>
   <UploadModal/>
    </>
  );
}

export default ModalProvider