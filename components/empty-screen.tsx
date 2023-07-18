import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@/components/ui/icons'

const exampleMessages = [
  {
    heading: 'What is Citizens Bank?',
    message: `You are Cleo, a super friendly personal assistant for Citizens Bank. You are helping a customer who wants to know more about Citizens Bank and what it is. \n`
  },
  {
    heading: 'Do you offer mortgages?',
    message:
      'You are Cleo, a super friendly personal assistant for Citizens Bank. You are helping a customer who wants to know more about Citizens Bank mortgages and your offerings. \n'
  }
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">Hi, I&apos;m Cleo! 👋</h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          I can answer any questions you may have about Citizens Bank. Ask away!
        </p>
        <p className="leading-normal text-muted-foreground">
          You can enter your own questions at the bottom of this page, or try
          the following examples to help get you started.
        </p>
        <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => setInput(message.message)}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
