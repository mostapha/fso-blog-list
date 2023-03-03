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

  if(blogInfo.title === undefined){
    return response.status(400).json({
      error: 'The blog title is required'
    })
  }

  if(blogInfo.url === undefined){
    return response.status(400).json({
      error: 'The blog url is required'
    })
  }

  const blog = new Blog(blogInfo)
  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, likes = 0, url } = request.body

  if(title === undefined){
    return response.status(400).json({
      error: 'The blog title is required'
    })
  }

  if(url === undefined){
    return response.status(400).json({
      error: 'The blog url is required'
    })
  }

  const updatedPerson = await Blog.findByIdAndUpdate(request.params.id,
    { title, author, likes, url },
    { new: true, runValidators: true, context: 'query' })

  response.json(updatedPerson)
})
module.exports = blogsRouter