import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import authOptions from '../../../lib/auth_options'
import prisma from '../../../lib/prismadb'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return null
  }
  const currentUser = await prisma.user.findUnique({
    where: {
      id: session.user.id
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      favoriteIds: true
    }
  })
  return NextResponse.json(currentUser)
}
