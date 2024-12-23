import { Textarea } from '@/components/ui/textarea'

interface ContentEditorProps {
  content: string
  onChange: (value: string) => void
  isMobile?: boolean
  isSaving?: boolean
}

export function ContentEditor({
  content,
  onChange,
  isMobile = false,
  isSaving,
}: ContentEditorProps) {
  return (
    <Textarea
      className={`w-full resize-none ${isMobile ? 'h-4/5' : 'h-full max-sm:hidden'} ${isSaving ? 'animate-pulse shadow-lg shadow-primary' : ''}`}
      value={content}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}
