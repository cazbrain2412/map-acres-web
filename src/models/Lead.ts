import { Schema, models, model } from "mongoose";

const LeadSchema = new Schema(
  {
    type: { type: String, enum: ["contact", "enquiry"], required: true },
    name: { type: String, required: true, trim: true },
    phone: { type: String, default: "", trim: true },
    email: { type: String, default: "", trim: true },
    message: { type: String, default: "" },
    propertyId: { type: Schema.Types.ObjectId, ref: "Property", default: null },
  },
  { timestamps: true }
);

export default models.Lead || model("Lead", LeadSchema);

