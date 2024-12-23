'use client'

import { cn } from '@/lib/utils'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { useChat } from 'ai/react'
import { useRef, useState } from 'react'
import { ScrollArea } from './ui/scroll-area'
import { useEventListener } from 'usehooks-ts'
import { toast } from 'sonner'
// import { WiStars } from 'react-icons/wi'
const Chat = () => {
  const [error, setError] = useState<string | null>(null)
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      initialMessages: [
        {
          id: 'welcome',
          role: 'assistant',
          content: 'Hello!',
        },
      ],
      api: '/api/chat',
      maxSteps: 5,
      onError: () => {
        toast.error('Reached daily free request limit. Please try again later.')
        setError(
          'An error occurred while processing your request. Please try again.',
        )
      },
    })
  const formRef = useRef<HTMLFormElement>(null)

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      formRef.current?.requestSubmit() // Modern and validation-safe
    }
  }

  useEventListener('keydown', handleKeyDown)
  return (
    <div className="flex h-full flex-col gap-2">
      <ScrollArea className="max-h-[75vh] flex-1">
        <div className="h-full overflow-auto p-3">
          {messages.map((m) => (
            <div key={m.id} className="my-2 whitespace-pre-wrap">
              <div
                className={cn(
                  'flex w-full',
                  m.role === 'user' ? 'justify-end' : 'justify-start',
                )}
              >
                <div
                  className={cn(
                    'w-fit px-5 py-2 text-sm',
                    m.role === 'user'
                      ? 'justify-end rounded-3xl bg-muted'
                      : 'flex items-center justify-start gap-4',
                  )}
                >
                  {m.role !== 'user' && (
                    <div className="size-fit rounded-full border p-1 text-sm">
                      🤖
                    </div>
                  )}
                  <p>{m.content}</p>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex w-full justify-start">
              <div className="flex w-fit gap-4 px-5 py-2 text-sm">
                <div className="size-fit rounded-full border p-1 text-sm">
                  🤖
                </div>
                <p className="animate-pulse">Thinking...</p>
              </div>
            </div>
          )}
          {error && (
            <div className="flex w-full justify-start">
              <div className="flex w-fit gap-4 px-5 py-2 text-sm">
                <div className="size-fit rounded-full border p-1 text-sm">
                  🤖
                </div>
                <p className="text-destructive">Error: {error}</p>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault()
          handleSubmit()
        }}
        className="rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
      >
        <Label htmlFor="message" className="sr-only">
          Message
        </Label>
        <Textarea
          id="message"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message here..."
          rows={2}
          className="resize-none border-0 shadow-none focus-visible:ring-0"
        />
      </form>
    </div>
  )
}

export default Chat
