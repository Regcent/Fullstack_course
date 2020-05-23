const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    const toReturn = returnedObject
    toReturn.id = toReturn._id.toString()
    delete toReturn._id
    delete toReturn.__v
    return toReturn
  },
})

module.exports = mongoose.model('Blog', blogSchema)