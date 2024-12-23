'use client'

import * as React from 'react'
import { Input } from './ui/input'
import { BarChart2, Calendar, Search } from 'lucide-react'
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
    if (!value) return entries

    const searchTerms = value.toLowerCase().split(' ')

    return entries.filter((entry) => {
      const fieldsToSearch = [
        entry.analysis?.subject,
        entry.analysis?.mood,
        entry.analysis?.emotion,
        entry.analysis?.sentimentScore?.toString(),
        entry.content,
      ]

      return searchTerms.every((term) =>
        fieldsToSearch.some((field) => field?.toLowerCase().includes(term)),
      )
    })
  }, [entries, value])

  const handleSelect = (entryId: string) => {
    setOpen(false)
    router.push(`/journal/${entryId}`)
  }
  const getSentimentColor = (score: number) => {
    if (score > 0.5) return 'text-green-500'
    if (score < -0.5) return 'text-red-500'
    return 'text-yellow-500'
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
                className="flex flex-col items-start py-3"
              >
                <div className="flex w-full items-center justify-between">
                  <p className="font-medium">
                    {entry.analysis?.subject || 'No subject'}
                  </p>
                  <span className="text-xs text-muted-foreground">
                    <Calendar className="mr-1 inline-block h-3 w-3" />
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {entry.content}
                </p>
                <div className="mt-2 flex w-full items-center justify-between text-xs">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center">
                      {entry.analysis.emoji} {entry.analysis?.mood || 'N/A'}
                    </span>
                    <span>{entry.analysis?.emotion || 'N/A'}</span>
                  </div>
                  <span
                    className={`flex items-center ${getSentimentColor(entry.analysis?.sentimentScore || 0)}`}
                  >
                    <BarChart2 className="mr-1 h-3 w-3" />
                    {entry.analysis?.sentimentScore?.toFixed(2) || 'N/A'}
                  </span>
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
