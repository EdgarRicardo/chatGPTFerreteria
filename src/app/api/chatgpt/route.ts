export async function GET(request: Request) {
  return new Response('Hello, Next.js!'+process.env.API_KEY_CHATGPT)
}
