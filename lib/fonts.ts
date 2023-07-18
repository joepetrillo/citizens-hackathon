import { Fira_Sans as FontSans, Fira_Mono as FontMono } from 'next/font/google'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

export const fontMono = FontMono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '700']
})
