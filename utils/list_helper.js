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

// The function returns the author who has the largest amount of blogs.
// The return value also contains the number of blogs the top author has:

const mostBlogs = blogs => {
  const authorsStats = blogs.reduce((cb, b) => {
    if(cb[b.author]){
      cb[b.author]++
    } else {
      cb[b.author] = 1
    }
    return cb
  }, {})

  const [author, numberOfBlogs] = Object.entries(authorsStats).sort((a,b) => b[1]-a[1])[0]

  return { author, numberOfBlogs }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}