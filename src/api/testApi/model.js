import mongoose, { Schema } from 'mongoose'

const testApiSchema = new Schema({
  name: {
    type: String
  },
  status: {
    type: String
  },
  temp: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

testApiSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      status: this.status,
      temp: this.temp,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('TestApi', testApiSchema)

export const schema = model.schema
export default model
