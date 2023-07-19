import React from 'react'

import { cn } from '@/lib/utils'

export function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'px-2 text-center text-xs leading-normal text-muted-foreground',
        className
      )}
      {...props}
    >
      This website was developed exclusively for a hackathon project as a proof
      of concept and is in{' '}
      <span className="font-bold">
        no way associated with any established banking corporation
      </span>
      . Starter code was provided by a Vercel template.
    </p>
  )
}
