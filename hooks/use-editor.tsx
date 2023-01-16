import { useState } from 'react'
import { useAutosave } from 'react-autosave'
import { toast } from 'sonner'
import { updateAnalysis, updateEntry } from '@/utils/api'
import { Analysis } from '@/types/analysis'

export function useEditor(initialEntry: { id: string; content: string; analysis: Analysis }) {
  const [content, setContent] = useState(initialEntry.content)
  const [analysis, setAnalysis] = useState(initialEntry.analysis)
  const [analysisLoading, setAnalysisLoading] = useState(false)

  useAutosave({
    data: content,
    onSave: async (data) => {
      await updateEntry(initialEntry.id, data)
    },
  })

  const handleNewAnalysis = async () => {
    const promise = async () => {
      setAnalysisLoading(true)
      const data = await updateAnalysis(initialEntry.id, content)

      if (!data) {
        throw new Error('GoogleGenerativeAIError: Too Many Requests, Resource has been exhausted. Check quota')
      }
      setAnalysis(data)
      return data
    }

    toast.promise(promise(), {
      loading: 'Updating analysis...',
      success: (data) => `You look ${data.mood} ${data.emoji}`,
      error: (error) => `${error.toString()}`,
      finally: () => setAnalysisLoading(false),
    })
  }

  return {
    content,
    setContent,
    analysis,
    analysisLoading,
    handleNewAnalysis,
  }
}

