'use client'

import { useState } from 'react'
import { LoaderCircle, MoreVertical, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { deleteEntry } from '@/services/actions'
import { toast } from 'sonner'

export function EntryActions({ entryId }: { entryId: string }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteEntry = async (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()

    setIsDeleting(true)
    toast.promise(deleteEntry(entryId), {
      loading: 'Deleting entry...',
      success: 'Journal Entry deleted 🎉',
      error: 'Failed to delete entry',
      finally: () => setIsDeleting(false),
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 data-[state=open]:bg-accent"
        >
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem
          onSelect={handleDeleteEntry}
          disabled={isDeleting}
          className="flex items-center text-destructive focus:text-destructive"
        >
          {isDeleting ? (
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="mr-2 h-4 w-4" />
          )}
          Delete Entry
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
