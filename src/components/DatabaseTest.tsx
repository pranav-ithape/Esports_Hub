import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase/supabaseclient'

export function DatabaseTest() {
  const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading')
  const [message, setMessage] = useState<string>('')
  const [sessionInfo, setSessionInfo] = useState<any>(null)

  useEffect(() => {
    checkDatabaseConnection()
  }, [])

  const checkDatabaseConnection = async () => {
    try {
      console.log('Testing Supabase connection...')

      // Test 1: Check auth session (safe access)
      try {
        const sessionRes = await supabase.auth.getSession()
        const session = sessionRes?.data?.session ?? null
        setSessionInfo(session)
        console.log('Current session:', session)
      } catch (e) {
        // Non-fatal — continue to DB test
        console.warn('Could not read session:', e)
        setSessionInfo(null)
      }

      // Test 2: Try a simple read query on public tables
      const res = await supabase.from('teams').select('id, name').limit(1)
      const data = (res as any).data
      const error = (res as any).error

      if (error) {
        const msg = (error?.message || '').toString()
        // If the error indicates the table does not exist, the DB is reachable
        if (/relation ".*" does not exist|no such table|does not exist/i.test(msg)) {
          setStatus('connected')
          setMessage('Database connected! (Tables not created yet - run data initialization)')
        } else {
          throw error
        }
      } else {
        setStatus('connected')
        setMessage(`Database connected! ${data?.length ? `Found sample data` : 'Ready for data'}`)
        console.log('Sample data:', data)
      }
    } catch (err: any) {
      console.error('Connection error:', err)
      setStatus('error')
      setMessage(`Error: ${err?.message || String(err) || 'Failed to connect to database'}`)
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className={`p-4 rounded-lg border-2 ${
        status === 'connected' ? 'border-green-500 bg-green-50' :
        status === 'error' ? 'border-red-500 bg-red-50' :
        'border-blue-500 bg-blue-50'
      }`}>
        <h2 className="text-xl font-bold mb-2">Supabase Connection Status</h2>
        
        <p className={`text-lg font-semibold ${
          status === 'connected' ? 'text-green-700' :
          status === 'error' ? 'text-red-700' :
          'text-blue-700'
        }`}>
          {status === 'loading' && '🔄 Testing...'}
          {status === 'connected' && '✅ Connected'}
          {status === 'error' && '❌ Error'}
        </p>
        
        <p className="mt-2">{message}</p>

        {sessionInfo && (
          <div className="mt-4 p-2 bg-white rounded border">
            <h3 className="font-semibold text-sm mb-1">Session Info:</h3>
            <p className="text-xs">
              {sessionInfo.user ? `Logged in as: ${sessionInfo.user.email}` : 'Anonymous (no auth)'}
            </p>
          </div>
        )}

        <button
          onClick={checkDatabaseConnection}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Test Again
        </button>
      </div>

      <div className="mt-6 p-4 bg-gray-100 rounded">
        <h3 className="font-bold mb-2">Configuration:</h3>
        <pre className="text-xs overflow-auto max-h-40">
{`Supabase URL: https://tnloyqxxmgooxmrwytuo.supabase.co
Project ID: tnloyqxxmgooxmrwytuo
Connection: Direct via supabase-js client
Status: ${status}
Message: ${message}`}
        </pre>
      </div>
    </div>
  )
}
