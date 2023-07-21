'use client'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { useState } from 'react'
import type { LexMessage } from '@/lib/types'
import axios from 'axios'

export function Chat({ sessionId }: { sessionId: string }) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<LexMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)

  async function appendMessage(message: LexMessage) {
    setIsLoading(true)
    setMessages(messages => [...messages, message])
    const res = await axios.post('/api/chat', message)
    setMessages(messages => [...messages, res.data])
    setIsLoading(false)
  }

  return (
    <>
      <div className={cn('pb-[200px] pt-4 md:pt-10')}>
        {messages.length ? (
          <>
            <ChatList messages={messages} />
            <ChatScrollAnchor />
          </>
        ) : (
          <EmptyScreen setInput={setInput} />
        )}
      </div>
      <ChatPanel
        sessionId={sessionId}
        isLoading={isLoading}
        stop={() => {
          stop()
          setIsLoading(false)
        }}
        appendMessage={appendMessage}
        input={input}
        setInput={setInput}
        setMessages={setMessages}
      />
    </>
  )
}
