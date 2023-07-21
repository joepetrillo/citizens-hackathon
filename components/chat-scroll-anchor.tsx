'use client'

import * as React from 'react'
import { useInView } from 'react-intersection-observer'
import { useAtBottom } from '@/lib/hooks/use-at-bottom'

export function ChatScrollAnchor() {
  const isAtBottom = useAtBottom()
  const { ref, entry, inView } = useInView({
    delay: 100,
    rootMargin: '0px 0px -150px 0px'
  })

  React.useEffect(() => {
    if (isAtBottom && !inView) {
      entry?.target.scrollIntoView({
        block: 'start'
      })
    }
  }, [inView, entry, isAtBottom])

  return <div ref={ref} className="h-px w-full" />
}
