import { LexMessage } from '@/lib/types'
import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import axios from 'axios'

export async function POST(req: Request) {
  const json = (await req.json()) as LexMessage
  const { sessionId, role, content } = json
  const userId = (await auth())?.user.id

  // check that requestor is logged in
  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  // lex bot logic here
  const res = await axios.post('http://3.89.35.206:8080/bot/chat', json)

  return NextResponse.json(res.data)
}

// return NextResponse.json({
//   sessionId,
//   role: 'bot',
//   content: `You said: ${content} -- Your role is: ${role} -- Your user id is: ${userId} -- Your session id is: ${sessionId}`
// })

// // Simulate a delay of 3 seconds
// const delay = 3000

// // Wait for the specified delay using a Promise and setTimeout
// await new Promise(resolve => setTimeout(resolve, delay))
