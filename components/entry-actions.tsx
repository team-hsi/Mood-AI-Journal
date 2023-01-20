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
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteEntry = async (id: string) => {
    const promise = async () => {
      setIsDeleting(true)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let data: { success: any }
      try {
        data = await deleteEntry(id)
      } catch (error) {
        throw new Error('Failed to delete entry', error)
      }
      if (data.success) {
        return true
      }
      throw new Error('Failed to delete entry')
    }

    toast.promise(promise(), {
      loading: 'Deleting entry...',
      success: () => `Journal Entry deleted 🎉`,
      error: (error) => `${error.toString()}`,
      finally: () => setIsDeleting(false),
    })
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
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
            onClick={() => handleDeleteEntry(entryId)}
            className="flex items-center"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            <span className="flex items-center gap-2">
              {isDeleting ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                'Delete Entry'
              )}
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
