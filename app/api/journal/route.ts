import { getUserByClerkId } from '@/services/auth'
import prisma from '@/services/db'
import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'

export const POST = async () => {
  const user = await getUserByClerkId()
  if (!user) {
    console.log('user not found')
    return NextResponse.json({ error: 'user not found' })
  }

  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: 'Write about your day...!',
      analysis: {
        create: {
          userId: user.id,
          mood: 'entry not analyzed',
          subject: 'entry not analyzed',
          summary: 'entry not analyzed',
          color: '#808080',
          sentimentScore: 0,
          emoji: '😐',
          recommendation: 'entry not analyzed',
        },
      },
    },
    include: { analysis: true },
  })
  revalidateTag('journal-entries')
  return NextResponse.json({ data: entry })
}

export const GET = async () => {
  const user = await getUserByClerkId()
  if (!user) {
    console.log('user not found')
    return NextResponse.json({ error: 'user not found' })
  }

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      updatedAt: 'desc',
    },
    include: { analysis: true },
  })

  return NextResponse.json({ data: entries })
}
