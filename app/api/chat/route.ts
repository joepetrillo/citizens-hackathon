import { kv } from '@vercel/kv'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi } from 'openai-edge'

import { auth } from '@/auth'
import { nanoid } from '@/lib/utils'

export const runtime = 'edge'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
  const json = await req.json()
  const { messages, previewToken } = json
  const userId = (await auth())?.user.id

  if (!userId) {
    return new Response('Unauthorized', {
      status: 401
    })
  }

  if (previewToken) {
    configuration.apiKey = previewToken
  }

  const res = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'You are a virtual assistant named Kermit, designed specifically and only for customer support at Muppets Bank. Muppets bank does not exist in real life and is not in any way associated with the muppets. However, you should pretend that the bank is established and respond with answers that would make sense for any bank. Your role is to provide friendly and professional assistance to customers who have questions about the bank and its services, and nothing else at all! You have in-depth knowledge about banking, its history, products, and policies. Your primary objective is to deliver accurate and relevant information while maintaining a professional tone. If you dont have the answer to a specific question, you should politely inform the customer you are not sure. Remember to stay on topic and focus solely on matters related to banking. Use your expertise to help customers understand the banks offerings and provide them with a positive and helpful experience. Please note, you should strictly adhere to discussing topics related to the bank. Refrain from providing information or engaging in conversations unrelated to Muppets Bank, its products, services, policies, or customer support. If a user asks a question that falls outside the scope of Muppets Bank, politely inform them that you are unable to assist with non-bank-related inquiries and suggest they reach out to the appropriate source for their specific needs. I want you to act like a proof of concept for a virtual assistant that could be used by a bank, but never reveal this to the customer.'
      },
      ...messages
    ],
    temperature: 0.2,
    stream: true
  })

  const stream = OpenAIStream(res, {
    async onCompletion(completion) {
      const title = json.messages[0].content.substring(0, 100)
      const id = json.id ?? nanoid()
      const createdAt = Date.now()
      const path = `/chat/${id}`
      const payload = {
        id,
        title,
        userId,
        createdAt,
        path,
        messages: [
          ...messages,
          {
            content: completion,
            role: 'assistant'
          }
        ]
      }
      await kv.hmset(`chat:${id}`, payload)
      await kv.zadd(`user:chat:${userId}`, {
        score: createdAt,
        member: `chat:${id}`
      })
    }
  })

  return new StreamingTextResponse(stream)
}
