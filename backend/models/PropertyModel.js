import mongoose from "mongoose"

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    area: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['available', 'sold', 'rented'],
      default: 'available',
    },
    images: [
      {
        type: String,
      },
    ],
    coordinates: {
      type: {
        type: String,
        default: 'Point',
      },
      coordinates: [Number], 
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Agent',
    },
  },
  {
    timestamps: true,
  }
)

const Property = mongoose.model('Property', propertySchema)

export default Property
