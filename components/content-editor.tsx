import { Textarea } from '@/components/ui/textarea'
import { motion } from 'framer-motion'

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
    <motion.div
      className="h-full"
      animate={isSaving ? 'saving' : 'idle'}
      variants={{
        saving: {
          boxShadow: [
            '0 0 0 rgba(var(--primary-rgb), 0)',
            '0 0 15px rgba(var(--primary-rgb), 0.7)',
            '0 0 0 rgba(var(--primary-rgb), 0)',
          ],
          transition: {
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        },
        idle: {
          boxShadow: '0 0 0 rgba(var(--primary-rgb), 0)',
        },
      }}
    >
      <Textarea
        className={`w-full resize-none transition-all duration-300 ease-in-out ${
          isMobile ? 'h-4/5' : 'h-full max-sm:hidden'
        }`}
        value={content}
        onChange={(e) => onChange(e.target.value)}
      />
    </motion.div>
  )
}
