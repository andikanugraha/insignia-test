interface Users {

}

interface Transactions {

}

const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL

export const getUsers = async (search: string, offset: number) => {
  const res = await fetch(apiUrl + 'users')
  if (!res.ok) {
    throw new Error(`${res.status}`)
  }
  const result = await res.json()
  return result
}

export const getProfile = async (token: string) => {
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
  const res = await fetch(apiUrl + 'auth/profile', { headers })
  if (!res.ok) {
    throw new Error(`${res.status}`)
  }
  const result = await res.json()
  return result
}

export const getBalance = async (token: string) => {
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
  const res = await fetch(apiUrl + 'balance', { 
    headers
  })
  if (!res.ok) {
    throw new Error(`${res.status}`)
  }
  const result = await res.json()
  return result
}

export const getMyTransactions = async (
  token: string,
  type?: string,
  from?: string,
  to?: string,
  offset?: number,
  limit?: number) => {
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
  const searchParams = new URLSearchParams({
    type: type ?? '',
    from: from ?? '',
    to: to ?? '',
    skip: offset?.toString() ?? '',
    take: limit?.toString() ?? ''
  })
  const res = await fetch(apiUrl + 'my_transactions?' + searchParams, { headers })
  if (!res.ok) {
    throw new Error(`${res.status}`)
  }
  const result = await res.json()
  return result
}

export const getTransactions = async (from: string, to: string) => {
  const searchParams = new URLSearchParams({
    from,
    to
  })
  const res = await fetch(apiUrl + 'transactions?' + searchParams, {})
  if (!res.ok) {
    throw new Error(`${res.status}`)
  }
  const result = await res.json()
  return result
}

export const postTopup = async (token: string, amount: number) => {
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
  const res = await fetch(apiUrl + 'topup', {
    method: 'POST',
    body: JSON.stringify({
      amount
    }),
    headers
  })
  if (!res.ok) {
    throw new Error(`${res.status}`)
  }
  if (res.status === 204) {
    return true
  } else {
    return false
  }
}

export const postTransfer = async (token: string, toUsername: string, amount: number) => {
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
  const res = await fetch(apiUrl + 'transfer', {
    method: 'POST',
    body: JSON.stringify({
      to_username: toUsername,
      amount
    }),
    headers
  })
  if (!res.ok) {
    throw new Error(`${res.status}`)
  }
  if (res.status === 204) {
    return true
  } else {
    return false
  }
}

export const getTopTransactionsPerUser = async (token: string) => {
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
  const res = await fetch(apiUrl + 'top_transactions_per_user', {
    headers
  })
  if (!res.ok) {
    throw new Error(`${res.status}`)
  }
  const result = await res.json()
  return result
}

export const getTopUsers = async (token: string) => {
  const headers = { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
  const res = await fetch(apiUrl + 'top_users', {
    headers
  })
  if (!res.ok) {
    throw new Error(`${res.status}`)
  }
  const result = await res.json()
  return result
}

export const postRegister = async (username: string, password: string, balance: number = 0) => {
  const headers = { 'Content-Type': 'application/json'}
  const res = await fetch(apiUrl + 'users', {
    method: 'POST',
    body: JSON.stringify({
      username,
      password,
      balance
    }),
    headers
  })
  if (!res.ok) {
    throw new Error(`${res.status}`)
  }
  const result = await res.json()
  return result
}