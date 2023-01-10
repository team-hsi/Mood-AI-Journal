export type AnalysisItem = {
  name: string
  value: keyof Analysis
}

export type Analysis = {
  id: string
  content: string
  mood: string
  subject: string
  summary: string
  emotion: string
  sentimentScore: number
  color: string
  emoji: string
  updatedAt: string
}

export const analysisData: AnalysisItem[] = [
  { name: 'Mood', value: 'mood' },
  { name: 'Subject', value: 'subject' },
  { name: 'Summary', value: 'summary' },
  { name: 'Emotion', value: 'emotion' },
  { name: 'Sentiment Score', value: 'sentimentScore' },
]
