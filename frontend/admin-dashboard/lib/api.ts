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
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + 'balance', { 
    headers
  })
  const result = await res.json()
  return result
}

export const getTransactions = async (from: string, to: string) => {
  const searchParams = new URLSearchParams({
    from,
    to
  })
  const res = await fetch(process.env.API_URL + 'transactions?' + searchParams, {})
  const result = await res.json()
  return result
}

export const postTopup = async (token: string, amount: number) => {
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
  const res = await fetch(process.env.API_URL + 'topup', {
    method: 'POST',
    body: JSON.stringify({
      amount
    }),
    headers
  })
  if (res.status === 204) {
    return true
  } else {
    return false
  }
}

export const postTransfer = async (token: string, toUsername: string, amount: number) => {
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
  const res = await fetch(process.env.API_URL + 'transfer', {
    method: 'POST',
    body: JSON.stringify({
      to_username: toUsername,
      amount
    }),
    headers
  })
  if (res.status === 204) {
    return true
  } else {
    return false
  }
}

export const getTopTransactionsPerUser = async (token: string) => {
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
  const res = await fetch(process.env.API_URL + 'top_transactions_per_user', {
    headers
  })
  const result = await res.json()
  return result
}

export const getTopUsers = async (token: string) => {
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
  const res = await fetch(process.env.API_URL + 'top_users', {
    headers
  })
  const result = await res.json()
  return result
}