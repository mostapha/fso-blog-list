
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

test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('successfully creates a new blog post', async () => {
  await api.post('/api/blogs')
    .send(helper.blogToBeAdded)
    .expect(201)

  const response = await api.get('/api/blogs')

  expect(response.body.length).toEqual(6)
  expect(response.body.at(-1)).toMatchObject(helper.blogToBeAdded)
})

test('if the likes property is missing from the request the value zero is used instead', async () => {
  const response = await api.post('/api/blogs').send(helper.blogWithoutLikesProp)

  expect(response.body).toMatchObject({
    likes: 0
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})