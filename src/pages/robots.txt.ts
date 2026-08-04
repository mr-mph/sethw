import type { APIRoute } from 'astro'

const robotsTxt = `User-agent: *
Disallow: /
`

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
