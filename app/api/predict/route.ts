import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // Get the backend URL from environment variable
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
    
    // Forward the request to the FastAPI backend
    const formData = await request.formData()
    
    const response = await fetch(`${backendUrl}/api/predict/`, {
      method: 'POST',
      body: formData,
    })

    // Check if backend is reachable
    if (!response.ok) {
      const contentType = response.headers.get('content-type')
      
      if (contentType && contentType.includes('application/json')) {
        const error = await response.json()
        return NextResponse.json(
          { detail: error.detail || 'Backend processing failed' },
          { status: response.status }
        )
      } else {
        // Backend returned non-JSON error
        const text = await response.text()
        return NextResponse.json(
          { 
            detail: `Backend error: ${text.substring(0, 100)}`,
            hint: 'Make sure the backend server is running on port 8000'
          },
          { status: response.status }
        )
      }
    }

    // Return successful response
    const data = await response.json()
    return NextResponse.json(data)

  } catch (error) {
    console.error('API route error:', error)
    
    // Check if it's a connection error
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return NextResponse.json(
        { 
          detail: 'Cannot connect to backend server',
          hint: 'Make sure the backend is running: cd api && python main.py',
          error: error.message
        },
        { status: 503 }
      )
    }

    return NextResponse.json(
      { 
        detail: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Handle OPTIONS for CORS preflight
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
