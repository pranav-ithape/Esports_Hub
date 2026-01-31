import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabase/supabaseclient'

type Status = 'loading' | 'connected' | 'error'

interface SessionData {
  user?: {
    email?: string
  } | null
}

export function DatabaseTest() {
  const [status, setStatus] = useState<Status>('loading')
  const [message, setMessage] = useState<string>('')
  const [sessionInfo, setSessionInfo] = useState<SessionData | null>(null)

  useEffect(() => {
    checkDatabaseConnection()
  }, [])

  const checkDatabaseConnection = async () => {
    try {
      console.log('Testing Supabase connection...')

      // Test 1: Check auth session (safe access)
      try {
        const { data } = await supabase.auth.getSession()
        const session = data?.session || null
        setSessionInfo(session)
        console.log('Current session:', session)
      } catch (e) {
        // Non-fatal — continue to DB test
        console.warn('Could not read session:', e)
        setSessionInfo(null)
      }

      // Test 2: Try a simple read query on public tables
      const { data, error } = await supabase
        .from('teams')
        .select('id, name')
        .limit(1)

      if (error) {
        const msg = error.message || ''
        // If the error indicates the table does not exist, the DB is reachable
        const tableNotFound = /relation|does not exist|no such table/i.test(msg)
        if (tableNotFound) {
          setStatus('connected')
          setMessage('Database connected! (Tables not created yet - run data initialization)')
        } else {
          throw error
        }
      } else {
        setStatus('connected')
        const dataCount = Array.isArray(data) ? data.length : 0
        setMessage(`Database connected! ${dataCount > 0 ? 'Found sample data' : 'Ready for data'}`)
        console.log('Sample data:', data)
      }
    } catch (err: unknown) {
      console.error('Connection error:', err)
      setStatus('error')
      const errorMsg = err instanceof Error 
        ? err.message 
        : typeof err === 'string' 
        ? err 
        : 'Failed to connect to database'
      setMessage(`Error: ${errorMsg}`)
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div
        className={`p-4 rounded-lg border-2 ${
          status === 'connected'
            ? 'border-green-500 bg-green-50'
            : status === 'error'
            ? 'border-red-500 bg-red-50'
            : 'border-blue-500 bg-blue-50'
        }`}
      >
        <h2 className="text-xl font-bold mb-2">Supabase Connection Status</h2>

        <p
          className={`text-lg font-semibold ${
            status === 'connected'
              ? 'text-green-700'
              : status === 'error'
              ? 'text-red-700'
              : 'text-blue-700'
          }`}
        >
          {status === 'loading' && '🔄 Testing...'}
          {status === 'connected' && '✅ Connected'}
          {status === 'error' && '❌ Error'}
        </p>

        <p className="mt-2">{message}</p>

        {sessionInfo?.user && (
          <div className="mt-4 p-2 bg-white rounded border">
            <h3 className="font-semibold text-sm mb-1">Session Info:</h3>
            <p className="text-xs">
              {sessionInfo.user.email
                ? `Logged in as: ${sessionInfo.user.email}`
                : 'Anonymous (no auth)'}
            </p>
          </div>
        )}

        <button
          onClick={checkDatabaseConnection}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          type="button"
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
