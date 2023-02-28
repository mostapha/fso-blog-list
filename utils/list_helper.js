// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((pv, v) => pv + v.likes, 0)
}

const favoriteBlog  = blogs => {

  const mostLikes = Math.max(...blogs.map(e => e.likes))
  const blogWithMostLikes = blogs.find(b => b.likes === mostLikes)

  return {
    title: blogWithMostLikes.title,
    author: blogWithMostLikes.author,
    likes: blogWithMostLikes.likes
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}