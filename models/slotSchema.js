import mongoose from "mongoose";

const slotSchema = mongoose.Schema({
  title: { type: String, required: true },
  userId: { type: String, required: true },
  userPosted: { type: String, required: true },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  bookingDate: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Slot", slotSchema);
