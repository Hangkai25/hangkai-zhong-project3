const WORDS = [
  "Red", "Blue", "Green", "Yellow", "Purple", "Orange", "White", "Black",
  "Fast", "Quiet", "Brave", "Happy", "Clever", "Calm", "Bright", "Swift",
  "House", "River", "Mountain", "Forest", "Coconut", "Sky", "Ocean", "Field",
  "Stone", "Cloud", "Bridge", "Garden", "Valley", "Island", "Castle", "Road"
];

function pick() {
  return WORDS[Math.floor(Math.random() * WORDS.length)];
}

export function generateRandomName() {
  return `${pick()} ${pick()} ${pick()}`;
}
