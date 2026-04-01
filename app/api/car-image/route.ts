import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const make = searchParams.get('make') || 'Make';
  const model = searchParams.get('model') || 'Model';

  const svg = `
<svg width="800" height="450" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f0f0f;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1a1a1a;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#C5A059;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#E8D08D;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <rect width="800" height="450" fill="url(#grad1)"/>
  
  <!-- Subtle background patterns / lines -->
  <line x1="0" y1="225" x2="800" y2="225" stroke="#ffffff" stroke-opacity="0.03" stroke-width="1"/>
  <line x1="400" y1="0" x2="400" y2="450" stroke="#ffffff" stroke-opacity="0.03" stroke-width="1"/>
  <circle cx="400" cy="225" r="150" fill="none" stroke="#C5A059" stroke-opacity="0.05" stroke-width="1"/>

  <!-- Logo/Icon representation -->
  <path d="M 370 170 h 60 v 30 h -60 z" fill="none" stroke="url(#gold)" stroke-width="2" stroke-opacity="0.5"/>
  <circle cx="385" cy="200" r="8" fill="none" stroke="url(#gold)" stroke-width="2" stroke-opacity="0.5"/>
  <circle cx="415" cy="200" r="8" fill="none" stroke="url(#gold)" stroke-width="2" stroke-opacity="0.5"/>

  <!-- Text -->
  <text x="400" y="270" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="20" font-weight="600" fill="#C5A059" text-anchor="middle" letter-spacing="4" text-transform="uppercase">
    ${make}
  </text>
  
  <text x="400" y="315" font-family="'Playfair Display', serif" font-size="42" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="-1">
    ${model}
  </text>
</svg>
  `;

  return new NextResponse(svg.trim(), {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
