'use client'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Settings } from 'lucide-react'
import SelectLanguage from './lang-select'
import SelectModel from './model-select'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export function JournalOptions({ mobile = false }) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Settings size={20} strokeWidth={1.25} />
      </SheetTrigger>
      <SheetContent
        side={mobile ? 'bottom' : 'right'}
        className={cn(mobile ? 'h-3/4' : 'h-full')}
      >
        <SheetHeader>
          <SheetTitle>Journal Settings</SheetTitle>
          <SheetDescription>
            Choose your preferred language for responses.
          </SheetDescription>
        </SheetHeader>
        <div className={cn('flex gap-3 py-4')}>
          <SelectLanguage />
          <SelectModel />
        </div>
      </SheetContent>
    </Sheet>
  )
}
