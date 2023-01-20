'use server'
import prisma from '@/services/db'
import { getUserByClerkId } from '@/services/auth'
import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
export const getEntries = async () => {
  const user = await getUserByClerkId()
  if (!user) {
    throw new Error('User not found')
  }
  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
    include: { analysis: true },
  })

  return entries
}

export const getAnalytics = async () => {
  const user = await getUserByClerkId()
  if (!user) {
    throw new Error('User not found')
  }
  const analytics = await prisma.entryAnalysis.findMany({
    where: {
      userId: user.id,
    },
    select: {
      sentimentScore: true,
      color: true,
      mood: true,
    },
  })

  return analytics
}

export const getEntryById = async (id: string) => {
  const user = await getUserByClerkId()
  if (!user) {
    throw new Error('User not found')
  }
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id,
      },
    },
    include: { analysis: true },
  })

  return entry
}

export const createNewUser = async () => {
  const user = await currentUser()
  const match = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
  })
  if (!match) {
    await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user?.emailAddresses[0].emailAddress,
        name: user.firstName + ' ' + user.lastName,
      },
    })
  }
  redirect('/journal')
}

export const deleteEntry = async (id: string) => {
  const { userId } = await auth()

  try {
    await prisma.journalEntry.delete({
      where: {
        userId_id: {
          userId,
          id,
        },
      },
    })
  } catch (e) {
    console.log(e)
    throw new Error('Failed to delete entry.')
  }

  revalidatePath('/journal')
  return { success: true }
}
