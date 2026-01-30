// Tournaments model - database operations
import { supabase } from '../utils/supabaseClient.js'

export const tournamentsModel = {
  // Get all tournaments
  async getAll() {
    const { data, error } = await supabase
      .from('tournaments')
      .select('*')
      .order('start_date', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get tournament by ID
  async getById(id) {
    const { data, error } = await supabase
      .from('tournaments')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Get tournaments by type
  async getByType(type) {
    const { data, error } = await supabase
      .from('tournaments')
      .select('*')
      .eq('type', type)
      .order('start_date', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get tournaments by game
  async getByGame(game) {
    const { data, error } = await supabase
      .from('tournaments')
      .select('*')
      .eq('game', game)
      .order('start_date', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Create new tournament
  async create(tournamentData) {
    const { data, error } = await supabase
      .from('tournaments')
      .insert([tournamentData])
      .select()
    
    if (error) throw error
    return data[0]
  }
}
