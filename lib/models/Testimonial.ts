import mongoose from 'mongoose'

const TestimonialSchema = new mongoose.Schema({
  logo: { type: String },
  quote: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String },
  company: { type: String },
  projectSlug: { type: String },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
}, { timestamps: true })

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema)
