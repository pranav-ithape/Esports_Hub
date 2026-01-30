import { supabase } from './supabase/supabaseclient'

export const testBackendConnection = async () => {
  try {
    console.log('Testing Supabase database connection...')
    
    // Test 1: Get session
    const { data: { session } } = await supabase.auth.getSession()
    console.log('Session status:', session ? 'Authenticated' : 'Anonymous')

    // Test 2: Simple database query
    const { data, error } = await supabase
      .from('teams')
      .select('count')
      .limit(1)
    
    if (error && error.code !== 'PGRST116') {
      throw error
    }

    console.log('Database connection test successful!')
    return { 
      success: true, 
      message: 'Connected to Supabase database',
      session: session ? 'Authenticated' : 'Anonymous'
    }
  } catch (error) {
    console.error('Backend connection test failed:', error)
    throw error
  }
}