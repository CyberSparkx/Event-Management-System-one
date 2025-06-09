import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  profilePhoto: String,
  enrolledEvents: {
    type: [String],  
    default: []
  },
  role: { type: String, default: 'user' }
});

export default mongoose.models.User || mongoose.model('User', userSchema);
