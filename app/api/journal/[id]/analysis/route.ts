import { getUserByClerkId } from '@/services/auth'
import prisma from '@/services/db'
import { NextResponse } from 'next/server'
import { analyzeEntry } from '@/services/ai'

export const PATCH = async (req: Request, { params }) => {
  const { content, responseLanguage } = await req.json()
  const analysis = await analyzeEntry(content, responseLanguage)

  const user = await getUserByClerkId()
  if (!user) {
    console.log('user not found')
  }

  const update = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: {
      content,
      analysis: {
        update: {
          mood: analysis.mood,
          subject: analysis.subject,
          summary: analysis.summary,
          color: analysis.color,
          emotion: analysis.emotion,
          sentimentScore: analysis.sentimentScore,
          emoji: analysis.emoji,
          recommendation: analysis.recommendation,
        },
      },
    },
  })
  return NextResponse.json({
    data: { ...update },
  })
}
