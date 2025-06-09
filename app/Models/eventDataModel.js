import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: String,
  date: String,
  location: String,
  description: String,
  agenda: [String],
});

const eventDataModel = mongoose.models.Event || mongoose.model('Event', eventSchema);

export default eventDataModel;
