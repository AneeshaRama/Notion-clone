"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { api } from '@/convex/_generated/api'
import { Doc } from '@/convex/_generated/dataModel'
import { useMutation } from 'convex/react'
import React, { useRef, useState } from 'react'

interface TitleProps{
    initialData: Doc<"documents">
}

const Title = ({initialData}: TitleProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const update = useMutation(api.documents.update);

  const [title, setTitle] = useState(initialData.title || 'Untitled')
  const [isEditing, setIsEditing] = useState(false)

  const enableInput = () =>{
    setTitle(initialData.title);
    setIsEditing(true);
    setTimeout(()=>{
      inputRef.current?.focus()
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length)
    },0)
  }

  const disableInput = ()=>{
    setIsEditing(false)
  }

  const onChange = (e: any) => {
    e.preventDefault()
    setTitle(e.target.value)
    update({
      id: initialData._id,
      title: e.target.value || 'Untitled'
    })
  }

  const onKeyDown = (e: any)=>{
    if(e.key === "Enter"){
      disableInput()
    }
  }
  return (
    <div className='flex items-center gap-x-1'>
      {!!initialData.icon && <p>{initialData.icon}</p>}
      {
        isEditing ? (
          <Input
            ref={inputRef}
            onClick={enableInput}
            onBlur={disableInput}
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={title}
            className='h-7 px-2 focus-visible:ring-transparent'
          />
        ) : (
          <Button variant={"ghost"} onClick={enableInput} className='font-normal h-auto p-1'>
            <span className='truncate'>
              {initialData.title}
            </span>
          </Button>
        )
      }
    </div>
  )
}

export default Title

Title.Skeleton = function TitleSkeleton(){
  return (
    <Skeleton className='h-6 w-20  rounded-md'/>
  )
}