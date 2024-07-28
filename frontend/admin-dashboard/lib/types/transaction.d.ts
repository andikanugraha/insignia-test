export interface TransactionInterface {
  id: number
  fromId: number
  toId: number
  fromUsername: string
  toUsername: string
  amount: number
  createdAt: Date

  type: string
}