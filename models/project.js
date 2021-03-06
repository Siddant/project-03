const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.ObjectId, ref: 'User' },
  text: { type: String, required: true, maxlength: 250 }
}, {
  timestamps: true
})

const projectSchema = new mongoose.Schema({
  name: { type: String, required: 'Project name is required' },
  description: { type: String },
  user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  packages: [{ type: mongoose.Schema.ObjectId, ref: 'Package'}],
  visible: { type: Boolean, required: true, default: true},
  comments: [ commentSchema ]
}, {
  timestamps: true
})

//Remove __v tag when returning JSON
projectSchema.set('toJSON', {
  transform(doc, json) {
    delete json.__v
    return json
  }
})

module.exports = mongoose.model('Project', projectSchema)
