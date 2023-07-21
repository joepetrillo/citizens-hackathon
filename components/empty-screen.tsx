import { Button } from '@/components/ui/button'
import { IconArrowRight } from '@/components/ui/icons'
import { Dispatch, SetStateAction } from 'react'

const exampleMessages = [
  {
    heading: 'What is Muppets Bank?',
    message: `What is Muppets Bank? `
  },
  {
    heading: 'Does Muppets Bank offer mortgages?',
    message: 'Does Muppets Bank offer mortgages? '
  },
  {
    heading: 'What credit cards do you offer?',
    message: 'What credit cards do you offer? '
  }
]

export function EmptyScreen({
  setInput
}: {
  setInput: Dispatch<SetStateAction<string>>
}) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-background p-8">
        <h1 className="mb-2 text-lg font-semibold">Hi, I&apos;m Kermit! 👋</h1>
        <p className="mb-2 leading-normal text-muted-foreground">
          I can answer any questions you may have about Muppets Bank. Ask away!
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
