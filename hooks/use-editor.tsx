import { useState } from 'react'
import { useAutosave } from 'react-autosave'
import { toast } from 'sonner'
import { updateAnalysis, updateEntry } from '@/services/api'
import { Analysis } from '@/services/types'

export function useEditor(
  initialEntry: {
    id: string
    content: string
    analysis: Analysis
  },
  user,
) {
  const [content, setContent] = useState(initialEntry.content)
  const [analysis, setAnalysis] = useState(initialEntry.analysis)
  const [analysisLoading, setAnalysisLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useAutosave({
    data: content,
    onSave: async (data) => {
      setIsSaving(true)
      await updateEntry(initialEntry.id, data)
      setIsSaving(false)
    },
  })

  const handleNewAnalysis = async () => {
    const promise = async () => {
      setAnalysisLoading(true)
      const data = await updateAnalysis(initialEntry.id, content)

      if (!data) {
        throw new Error(
          'GoogleGenerativeAIError: Too Many Requests, Resource has been exhausted. Check quota',
        )
      }
      setAnalysis(data)
      return data
    }

    toast.promise(promise(), {
      loading: 'Updating analysis...',
      success: (data) => `👋 Hi ${user}, You look ${data.mood} ${data.emoji}
                        ${data.recommendation}`,
      error: (error) => `${error.toString()}`,
      duration: 10000,
      finally: () => setAnalysisLoading(false),
    })
  }

  return {
    content,
    setContent,
    analysis,
    analysisLoading,
    handleNewAnalysis,
    isSaving,
  }
}
