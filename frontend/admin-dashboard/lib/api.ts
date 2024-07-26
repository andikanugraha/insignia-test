interface Users {

}

interface Transactions {

}

export const getUsers = async (search: string, offset: number) => {
  const res = await fetch(process.env.API_URL + 'users')
  const result = await res.json()
  return result
}

export const getTransactions = async (from: string, to: string) => {
  const res = await fetch(process.env.API_URL + 'transactions')
  const result = await res.json()
  return result
}