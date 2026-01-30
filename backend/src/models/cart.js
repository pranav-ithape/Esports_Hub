// Cart model - database operations
import { supabase } from '../utils/supabaseClient.js'

export const cartModel = {
  // Get cart for user
  async getByUserId(userId) {
    const { data, error } = await supabase
      .from('carts')
      .select(`
        *,
        cart_items (
          id,
          product_id,
          quantity,
          products (*)
        )
      `)
      .eq('user_id', userId)
      .single()
    
    if (error && error.code !== 'PGRST116') throw error
    return data || null
  },

  // Create cart for user
  async create(userId) {
    const { data, error } = await supabase
      .from('carts')
      .insert([{ user_id: userId }])
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Update cart
  async update(id, cartData) {
    const { data, error } = await supabase
      .from('carts')
      .update(cartData)
      .eq('id', id)
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Clear cart
  async clear(cartId) {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('cart_id', cartId)
    
    if (error) throw error
    return { success: true }
  }
}

// Cart Items model
export const cartItemsModel = {
  // Add item to cart
  async addItem(cartId, productId, quantity = 1) {
    const { data, error } = await supabase
      .from('cart_items')
      .insert([{ cart_id: cartId, product_id: productId, quantity }])
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Update item quantity
  async updateQuantity(cartItemId, quantity) {
    if (quantity <= 0) {
      return this.removeItem(cartItemId)
    }

    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('id', cartItemId)
      .select()
    
    if (error) throw error
    return data[0]
  },

  // Remove item from cart
  async removeItem(cartItemId) {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('id', cartItemId)
    
    if (error) throw error
    return { success: true }
  }
}
