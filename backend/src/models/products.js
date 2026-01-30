// Products/Shop model - database operations
import { supabase } from '../utils/supabaseClient.js'

export const productsModel = {
  // Get all products
  async getAll() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get product by ID
  async getById(id) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  },

  // Get products by category
  async getByCategory(category) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Get products by team
  async getByTeam(teamId) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('team_id', teamId)
    
    if (error) throw error
    return data
  },

  // Create new product
  async create(productData) {
    const { data, error } = await supabase
      .from('products')
      .insert([productData])
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Update product
  async update(id, productData) {
    const { data, error } = await supabase
      .from('products')
      .update(productData)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  }
}
