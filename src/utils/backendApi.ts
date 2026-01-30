// Updated API client for Node.js backend

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'

const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`
    console.log(`API Call: ${options.method || 'GET'} ${url}`)
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`HTTP ${response.status}: ${errorText}`)
    }

    const data = await response.json()
    console.log(`API Success for ${endpoint}:`, data)
    return data
  } catch (error) {
    console.error(`API Error for ${endpoint}:`, error)
    throw error
  }
}

// Teams API
export const teamsApi = {
  getAll: () => apiCall('/teams'),
  getByGame: (game: string) => apiCall(`/teams/game/${encodeURIComponent(game)}`),
  getById: (id: string) => apiCall(`/teams/${id}`),
  create: (data: any) => apiCall('/teams', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => apiCall(`/teams/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => apiCall(`/teams/${id}`, { method: 'DELETE' }),
}

// Players API
export const playersApi = {
  getAll: () => apiCall('/players'),
  getByGame: (game: string) => apiCall(`/players/game/${encodeURIComponent(game)}`),
  getByTeam: (teamId: string) => apiCall(`/players/team/${teamId}`),
  getById: (id: string) => apiCall(`/players/${id}`),
  create: (data: any) => apiCall('/players', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => apiCall(`/players/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
}

// Tournaments API
export const tournamentsApi = {
  getAll: () => apiCall('/tournaments'),
  getByType: (type: string) => apiCall(`/tournaments/type/${encodeURIComponent(type)}`),
  getByGame: (game: string) => apiCall(`/tournaments/game/${encodeURIComponent(game)}`),
  getById: (id: string) => apiCall(`/tournaments/${id}`),
  create: (data: any) => apiCall('/tournaments', { method: 'POST', body: JSON.stringify(data) }),
}

// Products API
export const productsApi = {
  getAll: () => apiCall('/products'),
  getByCategory: (category: string) => apiCall(`/products/category/${encodeURIComponent(category)}`),
  getByTeam: (teamId: string) => apiCall(`/products/team/${teamId}`),
  getById: (id: string) => apiCall(`/products/${id}`),
  create: (data: any) => apiCall('/products', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: any) => apiCall(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
}

// Cart API
export const cartApi = {
  getUserCart: (userId: string) => apiCall(`/cart/user/${userId}`),
  addItem: (cartId: string, productId: string, quantity: number = 1) =>
    apiCall(`/cart/${cartId}/items`, {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    }),
  updateItemQuantity: (itemId: string, quantity: number) =>
    apiCall(`/cart/items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    }),
  removeItem: (itemId: string) => apiCall(`/cart/items/${itemId}`, { method: 'DELETE' }),
  clearCart: (cartId: string) => apiCall(`/cart/${cartId}`, { method: 'DELETE' }),
}

// Health Check
export const healthCheck = () => apiCall('/health').catch(() => ({ status: 'offline' }))
