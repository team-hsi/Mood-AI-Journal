'use client'

import * as React from 'react'
import { Input } from './ui/input'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'

export function SearchInput({ entries }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')
  const router = useRouter()

  const filteredEntries = React.useMemo(() => {
    return entries.filter((entry) => {
      const searchValue = value.toLowerCase()
      const subjectMatch = entry.analysis?.subject
        ?.toLowerCase()
        .includes(searchValue)
      const tagMatch = entry.tags.some((tag) =>
        tag.toLowerCase().includes(searchValue),
      )
      const contentMatch = entry.content.toLowerCase().includes(searchValue)
      const moodMatch = entry.analysis?.mood
        ?.toLowerCase()
        .includes(searchValue)
      const summaryMatch = entry.analysis?.summary
        ?.toLowerCase()
        .includes(searchValue)
      const emotionMatch = entry.analysis?.emotion
        ?.toLowerCase()
        .includes(searchValue)
      const sentimentScoreMatch = entry.analysis?.sentimentScore
        ?.toString()
        .includes(searchValue)

      return (
        subjectMatch ||
        tagMatch ||
        contentMatch ||
        moodMatch ||
        summaryMatch ||
        emotionMatch ||
        sentimentScoreMatch
      )
    })
  }, [entries, value])
  const handleSelect = (entryId: string) => {
    setOpen(false)
    router.push(`/journal/${entryId}`)
  }

  return (
    <>
      <div
        className="relative flex items-center"
        onClick={() => setOpen((open) => !open)}
      >
        <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search journals..."
          className="w-72 appearance-none bg-background px-8 shadow-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search journals"
          value={value}
          onValueChange={setValue}
        />
        <CommandList>
          <CommandEmpty>No entries found</CommandEmpty>
          <CommandGroup heading="Entries">
            {filteredEntries.map((entry) => (
              <CommandItem
                key={entry.id}
                onSelect={() => handleSelect(entry.id)}
              >
                <div>
                  <p className="font-medium">
                    {entry.analysis?.subject || 'No subject'}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {entry.content.substring(0, 50)}...
                  </p>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </CommandDialog>
    </>
  )
}
