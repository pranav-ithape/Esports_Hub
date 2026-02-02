import { createBrowserClient } from '@supabase/ssr'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey)

export function createClient() {
  if (!isSupabaseConfigured) {
    // Return a mock client that won't crash but won't work
    // This allows the UI to render while Supabase is not configured
    return null as any
  }
  return createBrowserClient(supabaseUrl!, supabaseAnonKey!)
}
