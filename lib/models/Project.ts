import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  client: { type: String },
  year: { type: Number, required: true },
  role: { type: String, required: true },
  scope: [{ type: String }],
  stack: [{ type: String }],
  summary: { type: String },
  problem: {
    context: { type: String },
    constraints: [{ type: String }]
  },
  approach: {
    strategy: { type: String },
    key_decisions: [{ type: String }]
  },
  outcome: {
    results: [{ type: String }],
    metrics: [{
      label: { type: String },
      value: { type: String }
    }]
  },
  media: [{
    type: { type: String, enum: ['image', 'video'] },
    src: { type: String },
    alt: { type: String },
    caption: { type: String }
  }],
  cta: {
    label: { type: String },
    href: { type: String }
  },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
}, { timestamps: true })

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema)
