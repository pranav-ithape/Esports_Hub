import { projectId, publicAnonKey } from './supabase/info'

export const testBackendConnection = async () => {
  try {
    const API_BASE_URL = `https://${'gszojnzfjgywuonzvhiz'}.supabase.co/functions/v1/make-server-30bcd8f7`
    
    console.log('Testing backend connection...')
    console.log('API Base URL:', API_BASE_URL)
    console.log('Project ID:', projectId)
    console.log('Public Anon Key:', publicAnonKey ? 'Present' : 'Missing')
    
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
      },
    })

    console.log('Response status:', response.status)
    console.log('Response headers:', Object.fromEntries(response.headers.entries()))
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Error response:', errorText)
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`)
    }

    const data = await response.json()
    console.log('Health check successful:', data)
    return data
  } catch (error) {
    console.error('Backend connection test failed:', error)
    throw error
  }
}