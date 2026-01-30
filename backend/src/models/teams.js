// Teams model - database operations
import { supabase } from '../utils/supabaseClient.js'

export const teamsModel = {
  // Get all teams
  async getAll() {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .order('rank', { ascending: true })
    
    if (error) throw error
    return data
  },

  // Get team by ID
  async getById(id) {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Get teams by game
  async getByGame(game) {
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .eq('game', game)
      .order('rank', { ascending: true })
    
    if (error) throw error
    return data
  },

  // Create new team
  async create(teamData) {
    const { data, error } = await supabase
      .from('teams')
      .insert([teamData])
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Update team
  async update(id, teamData) {
    const { data, error } = await supabase
      .from('teams')
      .update(teamData)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Delete team
  async delete(id) {
    const { error } = await supabase
      .from('teams')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return { success: true }
  }
}
