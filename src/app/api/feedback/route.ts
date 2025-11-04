import { createFeedback } from '@/lib/db-actions';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { employeeId, category, sentiment, feedback, authorId } = body;

    if (!employeeId || !category || !sentiment || !feedback || !authorId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await createFeedback({
      employeeId,
      category,
      sentiment,
      feedback,
      authorId,
    });

    if (result.success) {
      return NextResponse.json({ success: true, feedback: result.feedback });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
