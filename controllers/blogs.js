const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {

  const blogInfo = {
    ...request.body,
    ...(request.body.likes === undefined && { likes: 0 })
  }
  const blog = new Blog(blogInfo)
  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = blogsRouter