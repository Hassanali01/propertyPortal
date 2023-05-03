const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const userSchema = new mongoose.Schema(
  {
    srno: Number,
    fullname: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    phone: {
      type: String,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: [String],
    },
    properties: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Properties",
    },
  },
  { timestamps: true }
);

userSchema.plugin(AutoIncrement, { inc_field: "srno" });
const users = mongoose.model("Users", userSchema);
module.exports = users;
