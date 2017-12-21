import mongoose, { Schema } from 'mongoose'
const thermoNodeSchema = new Schema({
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
thermoNodeSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      name: this.name,
      status: this.status,
      temp: this.temp0,
      temp: this.temp1,
      temp: this.temp2,
      temp: this.temp3,
      temp: this.temp4,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
    return full ? { ...view
      // add properties for a full view
    } : view
  }
}
const model = mongoose.model('ThermoNode', thermoNodeSchema)
export const schema = model.schema
//console.log('model is a: ', typeof(model));
export default model
