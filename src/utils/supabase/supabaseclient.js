import { createClient } from '@supabase/supabase-js'
import { projectId, publicAnonKey } from './info'

// Construct Supabase URL from projectId exported in info.tsx
const supabaseUrl = `https://${projectId}.supabase.co`
const supabaseKey = publicAnonKey

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  }
})
