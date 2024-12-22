'use client'
import { Label } from '@/components/ui/label'
import { Check, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { languages } from '@/services/data'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
export default function ResponseLanguage() {
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useLocalStorage('mood-lang', 'English')

  console.log('value:', value)
  return (
    <div className="grid space-y-2">
      <Label htmlFor="select-41" className="">
        Select with search
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="select-41"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-fit justify-between border-transparent bg-muted px-3 font-normal shadow-none outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20"
          >
            <span className={cn('truncate', !value && 'text-muted-foreground')}>
              {value || 'Select language'}
            </span>
            <ChevronDown
              size={16}
              strokeWidth={2}
              className="shrink-0 text-muted-foreground/80"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-full min-w-[var(--radix-popper-anchor-width)] border-input p-0"
          align="start"
        >
          <Command>
            <CommandInput placeholder="Search language..." />
            <CommandList>
              <CommandEmpty>No language found.</CommandEmpty>
              <CommandGroup>
                {languages.map((lang) => (
                  <CommandItem
                    key={lang.value}
                    value={lang.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue)
                      console.log('set value:', currentValue)
                      setOpen(false)
                    }}
                  >
                    {lang.label}
                    {value === lang.value && (
                      <Check size={16} strokeWidth={2} className="ml-auto" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
