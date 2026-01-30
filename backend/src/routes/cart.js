import express from 'express'
import { cartModel, cartItemsModel } from '../models/cart.js'

const router = express.Router()

// GET cart for user
router.get('/user/:userId', async (req, res) => {
  try {
    let cart = await cartModel.getByUserId(req.params.userId)
    
    if (!cart) {
      cart = await cartModel.create(req.params.userId)
    }
    
    res.json(cart)
  } catch (error) {
    console.error('Error fetching cart:', error)
    res.status(500).json({ error: error.message })
  }
})

// POST add item to cart
router.post('/:cartId/items', async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body
    const item = await cartItemsModel.addItem(req.params.cartId, productId, quantity)
    res.status(201).json(item)
  } catch (error) {
    console.error('Error adding to cart:', error)
    res.status(500).json({ error: error.message })
  }
})

// PUT update cart item quantity
router.put('/items/:itemId', async (req, res) => {
  try {
    const { quantity } = req.body
    const item = await cartItemsModel.updateQuantity(req.params.itemId, quantity)
    res.json(item)
  } catch (error) {
    console.error('Error updating cart item:', error)
    res.status(500).json({ error: error.message })
  }
})

// DELETE remove item from cart
router.delete('/items/:itemId', async (req, res) => {
  try {
    await cartItemsModel.removeItem(req.params.itemId)
    res.json({ success: true })
  } catch (error) {
    console.error('Error removing from cart:', error)
    res.status(500).json({ error: error.message })
  }
})

// DELETE clear cart
router.delete('/:cartId', async (req, res) => {
  try {
    await cartModel.clear(req.params.cartId)
    res.json({ success: true })
  } catch (error) {
    console.error('Error clearing cart:', error)
    res.status(500).json({ error: error.message })
  }
})

export default router
