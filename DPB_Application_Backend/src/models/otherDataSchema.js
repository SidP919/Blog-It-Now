const { Schema, model } = require("mongoose");

const otherDataSchema = Schema(
  {
    key: {
      type: String,
      unique: [true, "Another key with same name already exists!"],
    },
    value: {
      type: String,
      maxLength: [1500, "Max Length Exceeded!"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const OtherData = model("otherData", otherDataSchema);

module.exports = OtherData;
