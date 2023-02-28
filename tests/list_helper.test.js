const listHelper = require('../utils/list_helper')

const blogList = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 15,
    __v: 0
  },
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('empty list equals zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('one blog list returns likes of the blog', () => {
    const result = listHelper.totalLikes(blogList.slice(0, 1))
    expect(result).toBe(blogList[0].likes)
  })

  test('accuratly calculates filled blog list', () => {
    const result = listHelper.totalLikes(blogList)
    expect(result).toBe(30)
  })

})

describe('favorite blog', () => {

  test('finds blog with the most likes', () => {
    const result = listHelper.favoriteBlog(blogList)
    console.log('result', result)
    expect(result).toEqual({
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      likes: 15
    })
  })

})
