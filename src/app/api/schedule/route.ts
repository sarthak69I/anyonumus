import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic' // defaults to auto

export async function GET(request: Request) {
  try {
    const response = await fetch('https://livedatanexttopper.vercel.app/api/live/eleak', {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from external API: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
