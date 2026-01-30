// Players model - database operations
import { supabase } from '../utils/supabaseClient.js'

export const playersModel = {
  // Get all players
  async getAll() {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .order('rank', { ascending: true })
    
    if (error) throw error
    return data
  },

  // Get player by ID
  async getById(id) {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Get players by game
  async getByGame(game) {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('game', game)
      .order('rank', { ascending: true })
    
    if (error) throw error
    return data
  },

  // Get players by team
  async getByTeam(teamId) {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .eq('team_id', teamId)
    
    if (error) throw error
    return data
  },

  // Create new player
  async create(playerData) {
    const { data, error } = await supabase
      .from('players')
      .insert([playerData])
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Update player
  async update(id, playerData) {
    const { data, error } = await supabase
      .from('players')
      .update(playerData)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  }
}
