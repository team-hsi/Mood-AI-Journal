'use client'

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Button } from '@/components/ui/button'
import MobileAnalysisView from '@/components/mobile-analysis-view'
import { AnalysisPanel } from '@/components/analysis-panel'
import { ContentEditor } from '@/components/content-editor'
import { analysisData } from '@/services/types'
import { useEditor } from '@/hooks/use-editor'
import { hexToRGB } from '@/services/color'

export default function Editor({ entry, user }) {
  const {
    content,
    setContent,
    analysis,
    analysisLoading,
    handleNewAnalysis,
    isSaving,
  } = useEditor(entry, user)

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full w-full">
      <ResizablePanel
        defaultSize={75}
        className="px-3 py-1 max-sm:flex max-sm:flex-col max-sm:gap-4 max-sm:pl-2 max-sm:pr-8"
      >
        <ContentEditor
          content={content}
          onChange={setContent}
          isMobile={false}
          isSaving={isSaving}
        />
        <div className="flex h-full flex-col gap-5 sm:hidden">
          <ContentEditor
            content={content}
            onChange={setContent}
            isMobile={true}
            isSaving={isSaving}
          />
          <MobileAnalysisView
            analysis={analysis}
            analysisData={analysisData}
            analysisLoading={analysisLoading}
            handleNewAnalysis={handleNewAnalysis}
            hexToRGB={hexToRGB}
          >
            <Button className="w-full">Open Analyzer</Button>
          </MobileAnalysisView>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={25} className="pl-5 max-md:hidden">
        <AnalysisPanel
          analysis={analysis}
          analysisData={analysisData}
          analysisLoading={analysisLoading}
          onAnalyze={handleNewAnalysis}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}
