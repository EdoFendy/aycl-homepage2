import { NextResponse } from 'next/server';
import { z } from 'zod';

const CRM_API_BASE = process.env.CRM_API_BASE || 'http://localhost:3001';
const CRM_API_TOKEN = process.env.CRM_API_TOKEN;

const checkoutRequestSchema = z.object({
  referral_code: z.string().min(1),
  customer_name: z.string().min(1),
  customer_email: z.string().email(),
  customer_phone: z.string().optional(),
  company_name: z.string().optional(),
  request_type: z.enum(['drive_test', 'custom', 'bundle']),
  product_data: z.record(z.any()),
  pricing_data: z.record(z.any()),
  notes: z.string().optional()
});

export async function POST(request: Request) {
  if (!CRM_API_BASE || !CRM_API_TOKEN) {
    return NextResponse.json(
      { error: 'CRM API configuration missing' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const validatedData = checkoutRequestSchema.parse(body);

    // Send request to CRM backend
    const response = await fetch(`${CRM_API_BASE}/checkout-requests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${CRM_API_TOKEN}`
      },
      body: JSON.stringify(validatedData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || 'Failed to create checkout request' },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Checkout request error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
