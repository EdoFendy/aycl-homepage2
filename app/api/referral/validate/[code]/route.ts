import { NextResponse } from 'next/server';

const CRM_API_BASE = process.env.CRM_API_BASE || 'http://localhost:3001';

export async function GET(
  request: Request,
  { params }: { params: { code: string } }
) {
  if (!CRM_API_BASE) {
    return NextResponse.json(
      { error: 'CRM API configuration missing' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(`${CRM_API_BASE}/referral/validate/${params.code}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Invalid referral code' },
          { status: 404 }
        );
      }
      
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || 'Failed to validate referral' },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);

  } catch (error) {
    console.error('Referral validation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
