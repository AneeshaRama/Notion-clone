"use client"

import ConfirmModal from '@/components/modals/ConfirmModal'
import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner'

interface BannerProps{
    documentId: Id<"documents">
}

const Banner = ({documentId}: BannerProps) => {
    const router = useRouter()
    const remove = useMutation(api.documents.remove);
    const restore = useMutation(api.documents.restore);

    const onRemove = () => {
        const promise = remove({id: documentId})
        toast.promise(promise, {
            loading: "Deleting note...",
            success: "Note deleted!",
            error: "Failed to delete a note."
        })

        router.push("/documents")
    }
    const onRestore = () => {
        const promise = restore({id: documentId})
        toast.promise(promise, {
            loading: "Restoring note...",
            success: "Note restored!",
            error: "Failed to restore a note."
        })
    }

  return (
    <div className="bg-rose-500 text-center text-sm p-2 text-white flex items-center gap-x-2 justify-center">
        <p>This page is in the Trash.</p>
        <Button size={"sm"} variant={"outline"} 
        onClick={onRestore} className='border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal'>
            Restore page
        </Button>
        <ConfirmModal onConfirm={onRemove}>
            <Button size={"sm"} variant={"outline"}  className='border-white bg-transparent hover:bg-primary/5 text-white hover:text-white p-1 px-2 h-auto font-normal'>
                Delete forever
            </Button>
        </ConfirmModal>
    </div>
  )
}

export default Banner