import { Schema, models, model } from "mongoose";

const EnquirySchema = new Schema(
  {
    propertyId: { type: Schema.Types.ObjectId, ref: "Property", required: true },
    name: { type: String, default: "" },
    phone: { type: String, default: "" },
    date: { type: String, default: "" },
    time: { type: String, default: "" },
    note: { type: String, default: "" },
    mode: { type: String, enum: ["site", "virtual"], default: "site" },
  },
  { timestamps: true }
);

export default models.Enquiry || model("Enquiry", EnquirySchema);

