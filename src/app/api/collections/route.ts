import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, projectId } = body;

    const collection = await prisma.collection.create({
      data: {
        name,
        description,
        projectId,
      },
      include: {
        tasks: true,
      },
    });

    return NextResponse.json(collection);
  } catch (error) {
    console.error('Failed to create collection:', error);
    return NextResponse.json(
      { error: 'Failed to create collection' },
      { status: 500 }
    );
  }
} 