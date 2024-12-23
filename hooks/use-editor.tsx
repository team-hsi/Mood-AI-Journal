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
      success: (data) => (
        <div className="w-full rounded-lg border border-green-700 px-4 py-3 text-center text-green-700">
          <p className="text-pretty text-sm">
            <span>
              👋 hi {user}, You look {data.mood} {data.emoji} <br />
              {data.recommendation}
            </span>
          </p>
        </div>
      ),
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
