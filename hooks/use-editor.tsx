import { useState } from 'react'
import { useAutosave } from 'react-autosave'
import { toast } from 'sonner'
import { updateAnalysis, updateEntry } from '@/services/api'
import { Analysis } from '@/services/types'
import { Info } from 'lucide-react'

export function useEditor(initialEntry: {
  id: string
  content: string
  analysis: Analysis
}) {
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
        <div className="rounded-lg border border-blue-500/50 px-4 py-3 text-blue-600">
          <p className="text-sm">
            <Info
              className="-mt-0.5 me-3 inline-flex opacity-60"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            <span>
              You look {data.mood} {data.emoji} <br />
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
  }
}
// Dependencies: pnpm install lucide-react
