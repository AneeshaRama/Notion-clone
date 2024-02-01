"use client"

import { api } from '@/convex/_generated/api';
import { Doc, Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import Item from './Item';
import { cn } from '@/lib/utils';
import { FileIcon } from 'lucide-react';

interface DocumentListPros{
    parentDocumentId?: Id<"documents">;
    level?: number;
    data?: Doc<"documents">[];
}

const DocumentList = ({parentDocumentId, level=0}: DocumentListPros) => {
  const params = useParams();
  const router = useRouter()
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (documentId: string) =>{
    setExpanded(prevExpanded => ({
        ...prevExpanded,
        [documentId]: !prevExpanded[documentId]
    }));
  }

  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId
  });

  const onRedirect = (documentId: string)=>{
    router.push(`/documents/${documentId}`);
  }

  if(documents === undefined){
    return (
        <>
            <Item.Skeleton level={level}/>
            {level === 0 && (
                <>
                    <Item.Skeleton level={level}/>
                    <Item.Skeleton level={level}/>
                </>
            )}
        </>
    )
  }

  return (
    <>
        <p
            style={{paddingLeft: level ? `${(level * 12) + 25}px` : undefined}}
            className={cn(
                "hidden text-sm font-medium text-muted-foreground",
                expanded && "last:block",
                level === 0 && "hidden"
            )}
        >No pages inside</p>
        {
            documents.map((d)=>(
                <div key={d._id}>
                    <Item 
                        id={d._id}
                        onClick={()=> onRedirect(d._id)}
                        label={d.title}
                        icon={FileIcon}
                        documentIcon={d.icon}
                        active={params.documentId === d._id}
                        level={level}
                        onExpand={()=>onExpand(d._id)}
                        expanded={expanded[d._id]}
                    />
                    {expanded[d._id] && (
                        <DocumentList
                            parentDocumentId={d._id}
                            level={level+1}
                        />
                    )}
                </div>
            ))
        }
    </>
  )
}

export default DocumentList