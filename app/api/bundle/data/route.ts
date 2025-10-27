import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

/**
 * Proxy endpoint to fetch bundle data
 * This avoids ad-blocker issues by proxying through Next.js API
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');
    
    if (!token) {
      return NextResponse.json(
        { error: 'Token mancante' },
        { status: 400 }
      );
    }
    
    // Fetch bundle data from backend
    const response = await fetch(`${API_URL}/bundles/token/${token}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store' // Don't cache bundle data
    });
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Bundle non trovato' }));
      return NextResponse.json(error, { status: response.status });
    }
    
    const data = await response.json();
    
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      }
    });
    
  } catch (error) {
    console.error('Error fetching bundle data:', error);
    return NextResponse.json(
      { error: 'Errore nel recupero dei dati' },
      { status: 500 }
    );
  }
}

