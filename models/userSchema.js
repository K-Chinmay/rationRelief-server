import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true, Unique: true },
  email: { type: String, required: true, Unique: true },
  password: { type: String, required: true },
  aadharNo: { type: String, required: true, Unique: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  age: { type: Number, default: 0 },
  phone: { type: Number, default: 0 },
  isAdmin: { type: Boolean, default: false },
  isSlotBooked: { type: Boolean, default: false },
  slotId: { type: String, default: "" },
  eventId: { type: String, default: "" },
});

export default mongoose.model("User", userSchema);
