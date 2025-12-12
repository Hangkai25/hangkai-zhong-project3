import mongoose from "mongoose";
import Highscore from "./Highscore.js";

const GameSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    difficulty: {
      type: String,
      enum: ["EASY", "NORMAL"],
      required: true
    },
    createdBy: {
      type: String,
      default: "anonymous"
    },
    board: {
      type: [[Number]],
      required: true
    },
    solution: {
      type: [[Number]],
      required: true
    },
    fixed: {
      type: [[Boolean]],
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

GameSchema.post("findOneAndUpdate", async function (doc) {
  if (!doc) return;

  if (doc.completed !== true) return;

  const exists = await Highscore.findOne({ game: doc._id });
  if (exists) return;

  await Highscore.create({
    game: doc._id,
    score: 1
  });
});

export default mongoose.model("Game", GameSchema);
