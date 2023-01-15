import { Textarea } from '@/components/ui/textarea'

interface ContentEditorProps {
  content: string
  onChange: (value: string) => void
  isMobile?: boolean
}

export function ContentEditor({ content, onChange, isMobile = false }: ContentEditorProps) {
  return (
    <Textarea
      className={`w-full resize-none ${isMobile ? 'h-4/5' : 'h-full'}`}
      value={content}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}

