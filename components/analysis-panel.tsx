import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { Analysis, AnalysisItem } from '@/services/types'
import { formatTime } from '@/services/format-date'
import { hexToRGB } from '@/services/color'
import { JournalOptions } from './journal-options'

interface AnalysisPanelProps {
  analysis: Analysis
  analysisData: AnalysisItem[]
  analysisLoading: boolean
  onAnalyze: () => void
}

export function AnalysisPanel({
  analysis,
  analysisData,
  analysisLoading,
  onAnalyze,
}: AnalysisPanelProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="items-top flex h-fit justify-between px-5">
        <div>
          <h3 className="text-lg font-semibold">AI Analysis</h3>
          <p className="text-xs text-muted-foreground">
            last analyzed {formatTime(analysis.updatedAt)}
          </p>
        </div>
        <JournalOptions />
      </div>
      <div
        className="moodBackground h-16 w-full rounded-xl"
        style={{ backgroundColor: `rgba(${hexToRGB(analysis.color)}, 0.7)` }}
      />
      <div className="divide-y">
        {analysisData.map((item) => (
          <div key={item.name} className="flex h-fit w-full gap-2 py-4">
            <div className="w-20 min-w-20">
              <p className="text-sm font-semibold">{item.name}</p>
            </div>
            <p className="line-clamp-3 text-pretty text-xs text-muted-foreground hover:line-clamp-none">
              {item.value === 'mood' && analysis.emoji} {analysis[item.value]}
            </p>
          </div>
        ))}
      </div>
      <Button onClick={onAnalyze} className="w-full" disabled={analysisLoading}>
        {analysisLoading ? (
          <>
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            Analyzing
          </>
        ) : (
          'Analyze'
        )}
      </Button>
    </div>
  )
}
