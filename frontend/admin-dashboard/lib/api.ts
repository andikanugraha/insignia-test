interface Users {

}

interface Transactions {

}

export const getUsers = async (search: string, offset: number) => {
  const res = await fetch(process.env.API_URL + 'users')
  const result = await res.json()
  return result
}

export const getBalance = async (token: string) => {
  const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
  const res = await fetch(process.env.API_URL + 'balance', { 
    headers
  })
  const result = await res.json()
  return result
}

export const getTransactions = async (from: string, to: string) => {
  const res = await fetch(process.env.API_URL + 'transactions')
  const result = await res.json()
  return result
}

export const postTopup = async (token: string, amount: number) => {
  const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
  const res = await fetch(process.env.API_URL + 'topup', {
    method: 'POST',
    body: JSON.stringify({
      amount
    }),
    headers
  })
  const result = await res.json()
  return result
}

export const postTransfer = async (token: string, toUsername: string, amount: number) => {
  const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
  const res = await fetch(process.env.API_URL + 'transfer', {
    method: 'POST',
    body: JSON.stringify({
      to_username: toUsername,
      amount
    }),
    headers
  })
  const result = await res.json()
  return result
}

export const getTopTransactionsPerUser = async (token: string) => {
  const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
  const res = await fetch(process.env.API_URL + 'top_transactions_per_user', {
    headers
  })
  const result = await res.json()
  return result
}

export const getTopUsers = async (token: string) => {
  const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`})
  const res = await fetch(process.env.API_URL + 'top_users', {
    headers
  })
  const result = await res.json()
  return result
}