import { NextResponse } from 'next/server'
import prisma from '../../../../lib/prismadb'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

export interface SavedSearchParams {
  id: string
}

export async function DELETE(
  _request: Request,
  { params }: { params: SavedSearchParams }
) {
  try {
    await prisma.savedSearch.delete({
      where: {
        id: params.id
      }
    })
    return new NextResponse(null, { status: 200 })
  } catch (error) {
    console.log("Error deleting saved search:", error)
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Saved search not found' },
        { status: 404 }
      )
    }
  }
}
