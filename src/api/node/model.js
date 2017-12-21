import mongoose, { Schema } from 'mongoose'

const nodeSchema = new Schema({
  name: {
    type: String
  },
  temp: {
    type: String
  },
  temp1: {
    type: String
  },
  temp2: {
    type: String
  },
  temp3: {
    type: String
  },
  temp4: {
    type: String
  },
  status: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

nodeSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      temp: this.temp,
      temp1: this.temp1,
      temp2: this.temp2,
      temp3: this.temp3,
      temp4: this.temp4,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Node', nodeSchema)

export const schema = model.schema
export default model
