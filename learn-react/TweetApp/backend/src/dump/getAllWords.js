const mongoose = require("mongoose");

const mongoURI = "mongodb://127.0.0.1:27017/mongodb_test";

const WordSchema = new mongoose.Schema({
  word: String,
});

const Word = mongoose.model("Word", WordSchema);

async function getAllWords() {
  await mongoose.connect(mongoURI);
  const words = await Word.find({}, { word: 1, _id: 0 }).lean();
  const result = words.map((w) => w.word);
  //   console.log(result);

  const res = await fetch("http://localhost:3030/api/words/multiple", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ words: result }),
  });
  const responseWords = await res.json();
  console.log("Response from server:", responseWords.length);

  return result;
}

getAllWords();
