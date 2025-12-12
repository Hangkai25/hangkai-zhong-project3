import mongoose from "mongoose";

const HighscoreSchema = new mongoose.Schema(
  {
    game: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Game",
      required: true,
      unique: true
    },
    score: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Highscore", HighscoreSchema);
