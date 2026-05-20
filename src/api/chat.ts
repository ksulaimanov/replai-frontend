import { http } from './http'

export interface ChatMessageRequest {
  message: string
}

export interface ChatMessageResponse {
  id: string
  response: string
}

export async function sendMessage(message: string): Promise<ChatMessageResponse> {
  const response = await http.post<ChatMessageResponse>('/api/bot/chat', {
    message
  })
  return response.data
}

export async function clearChat(): Promise<void> {
  await http.delete('/api/bot/chat')
}

