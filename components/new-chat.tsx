'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { IconPlus } from './ui/icons'
import { useRouter } from 'next/navigation'

export default function NewChat() {
  const router = useRouter()

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href="/"
          onClick={() => router.refresh()}
          className={cn(
            buttonVariants({ size: 'sm', variant: 'outline' }),
            'absolute left-0 top-4 h-8 w-8 rounded-full bg-background p-0 sm:left-4'
          )}
        >
          <IconPlus />
          <span className="sr-only">New Chat</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent>New Chat</TooltipContent>
    </Tooltip>
  )
}
