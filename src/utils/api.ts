import { projectId, publicAnonKey } from './supabase/info'

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-30bcd8f7`

const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`
    console.log(`Making API call to: ${url}`)
    console.log('Project ID:', projectId)
    console.log('Public Anon Key present:', !!publicAnonKey)

    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
        ...options.headers,
      },
    })

    console.log(`API response status for ${endpoint}:`, response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`API error for ${endpoint}:`, errorText)
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`)
    }

    const data = await response.json()
    console.log(`API success for ${endpoint}:`, data)
    return data
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error)
    throw error
  }
}

// Teams API
export const teamsApi = {
  getAll: () => apiCall('/teams'),
  getByGame: (game: string) => apiCall(`/teams/${encodeURIComponent(game)}`),
}

// Players API
export const playersApi = {
  getAll: () => apiCall('/players'),
  getByGame: (game: string) => apiCall(`/players/${encodeURIComponent(game)}`),
}

// Tournaments API
export const tournamentsApi = {
  getAll: () => apiCall('/tournaments'),
  getByType: (type: string) => apiCall(`/tournaments/${encodeURIComponent(type)}`),
}

// Shop API
export const shopApi = {
  getAll: () => apiCall('/shop'),
}

// Auth API
export const authApi = {
  signup: (email: string, password: string, name: string) => 
    apiCall('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    }),
}

// Cart API
export const cartApi = {
  get: (userId: string) => apiCall(`/cart/${userId}`),
  update: (userId: string, cartData: any) => 
    apiCall(`/cart/${userId}`, {
      method: 'POST',
      body: JSON.stringify(cartData),
    }),
}

// Health check
export const healthCheck = () => apiCall('/health')