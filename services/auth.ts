import { auth } from '@clerk/nextjs/server'
import prisma from '@/services/db'

export const getUserByClerkId = async () => {
  const { userId } = auth()
  if (!userId) {
    return null
  }
  const user = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  })
  if (!user) {
    return null
  }
  return user
}
