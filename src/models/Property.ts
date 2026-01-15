import { Schema, models, model } from "mongoose";

const NearbyPlaceSchema = new Schema(
  {
    placeType: { type: String, default: "" }, // hospital/school/metro/mall/airport
    name: { type: String, default: "" },
    distanceKm: { type: Number, default: 0 },
  },
  { _id: true }
);

const PropertySchema = new Schema(
  {
    // workflow
    status: { type: String, enum: ["draft", "pending", "approved", "rejected"], default: "pending" },

    // where to show on homepage rows (admin controls)
    homeSections: { type: [String], default: [] }, 
    // examples: ["featured","showcase","latest","newLaunches","projects","plots","commercial"]

    featured: { type: Boolean, default: false }, // keep premium badge

    // listing type
    transaction: { type: String, enum: ["buy", "rent"], required: true },
    category: { type: String, enum: ["residential", "commercial", "plot"], required: true },
    type: { type: String, required: true, trim: true }, // Apartment / Villa / Office / Plot etc.

    // content
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, default: "" },

    // pricing + size
    price: { type: Number, required: true },
    area: { type: Number, required: true },
    beds: { type: Number, default: null },
    baths: { type: Number, default: null },

    // location
    city: { type: String, required: true, trim: true },
    locality: { type: String, default: "", trim: true },
    address: { type: String, default: "", trim: true },
    lat: { type: Number, default: null },
    lng: { type: Number, default: null },

    // media (URL OR uploaded file URLs)
    coverImage: { type: String, default: "" },
    gallery: { type: [String], default: [] },
    videos: { type: [String], default: [] },
    floorPlans: { type: [String], default: [] },
    tour360: { type: [String], default: [] },

    // extra advanced
    floorPlan3dUrl: { type: String, default: "" },
    cadMapUrl: { type: String, default: "" },

    // amenities
    amenities: { type: [String], default: [] },
    highlights: { type: [String], default: [] },
    tags: { type: [String], default: [] },

    nearbyPlaces: { type: [NearbyPlaceSchema], default: [] },

    // owner/agent/developer info
    listedByType: { type: String, enum: ["owner", "agent", "builder"], default: "owner" },
    listedByName: { type: String, default: "" },
    listedByPhone: { type: String, default: "" },
    developerName: { type: String, default: "" },
    brokerCompany: { type: String, default: "" },

    // ✅ CTA (this is what you asked)
    ctaPhone: { type: String, default: "" },
    ctaWhatsapp: { type: String, default: "" },
    ctaEmail: { type: String, default: "" },

    // price range
    marketPriceMin: { type: Number, default: 0 },
    marketPriceMax: { type: Number, default: 0 },

    // EMI placeholders
    emiInterestRate: { type: Number, default: 0 },
    emiTenureYears: { type: Number, default: 0 },

    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default models.Property || model("Property", PropertySchema);

