
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')


const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObject = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObject.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('returns the correct amount of blog posts in the JSON format', async () => {
  const response = await api.get('/api/blogs')
  expect(response.type).toMatch(/application\/json/)
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})


afterAll(async () => {
  await mongoose.connection.close()
})