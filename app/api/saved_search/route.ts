import type { SavedSearch } from '@prisma/client'
import { NextResponse } from 'next/server'
import prisma from '../../../lib/prismadb'

export type SavedSearchCreateRequest = Pick<SavedSearch, 'userId' | 'name' | 'searchParams' | 'messageCadence'>

export async function POST(request: Request) {
  const { id } = await prisma.savedSearch.create({
    data: await request.json() as SavedSearchCreateRequest
  })
  return NextResponse.json(
    { id },
    { status: 200 }
  )
}