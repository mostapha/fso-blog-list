// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((pv, v) => pv + v.likes, 0)
}

module.exports = {
  dummy, totalLikes
}