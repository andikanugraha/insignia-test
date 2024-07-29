export interface TransactionInterface {
  id: number
  fromId: number
  toId: number
  fromUsername: string
  toUsername: string
  amount: number
  type: string
  createdAt: Date

  type: string
}