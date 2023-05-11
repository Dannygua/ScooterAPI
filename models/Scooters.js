import mongoose from "mongoose";

const ScooterSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    maxprice: {
      type: Number,
      trim: true,
    },
    minprice: {
      type: Number,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },

    Test: {
      name: {
        type: String,
        trim: true,
      },
      resultPhoto: [
        {
          type: String,
        },
      ],
    },
    active: {
      type: Boolean,
      trim: true,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Scooter = mongoose.model("Scooters", ScooterSchema);

export default Scooter;
