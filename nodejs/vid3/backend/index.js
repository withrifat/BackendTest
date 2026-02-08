const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello from Express" });
});

const jocks = [
  { id: 1, title: "Joke One", content: "Why don't programmers like nature? Too many bugs." },
  { id: 2, title: "Joke Two", content: "Why did the developer go broke? Because he used up all his cache." },
  { id: 3, title: "Joke Three", content: "Why do JavaScript developers wear glasses? Because they don't C#." },
  { id: 4, title: "Joke Four", content: "Debugging is like being a detective in a crime movie." },
  { id: 5, title: "Joke Five", content: "A programmer's wife says: go to the store and buy milk." }
];

app.get('/jocks', (req, res) => {
  res.json(jocks);
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});