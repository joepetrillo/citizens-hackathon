export type LexMessage = {
  sessionId: string
  role: 'user' | 'bot'
  content: string
}
