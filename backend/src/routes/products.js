import express from 'express'
import { productsModel } from '../models/products.js'

const router = express.Router()

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await productsModel.getAll()
    res.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({ error: error.message })
  }
})

// GET products by category
router.get('/category/:category', async (req, res) => {
  try {
    const products = await productsModel.getByCategory(req.params.category)
    res.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({ error: error.message })
  }
})

// GET products by team
router.get('/team/:teamId', async (req, res) => {
  try {
    const products = await productsModel.getByTeam(req.params.teamId)
    res.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    res.status(500).json({ error: error.message })
  }
})

// GET product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await productsModel.getById(req.params.id)
    res.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    res.status(500).json({ error: error.message })
  }
})

// POST create new product
router.post('/', async (req, res) => {
  try {
    const product = await productsModel.create(req.body)
    res.status(201).json(product)
  } catch (error) {
    console.error('Error creating product:', error)
    res.status(500).json({ error: error.message })
  }
})

// PUT update product
router.put('/:id', async (req, res) => {
  try {
    const product = await productsModel.update(req.params.id, req.body)
    res.json(product)
  } catch (error) {
    console.error('Error updating product:', error)
    res.status(500).json({ error: error.message })
  }
})

export default router
