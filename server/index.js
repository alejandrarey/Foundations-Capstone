const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

app.get("/api/compliment", (req, res) => {
  const compliments = ["Gee, you're a smart cookie!",
					 "Cool shirt!",
					 "Your Javascript skills are stellar.",
           "You have cool shoes!",
  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
  
});

app.get("/api/fortune", (req, res) => {
  const fortunes = ["A fresh start will put you on your way!",
					 "All your hard work will soon pay off!",
					 "Any day above ground is a good day.",
           "Better ask twice than lose yourself once",
           "Do not be intimidated by the eloquence of others.",
           "One day you'll find your true love!",
           "You will become rich in one, two, three...and you are RICH!",

  ];

  // choose random fortune
  let randomIndex2 = Math.floor(Math.random() * fortunes.length);
  let randomFortune = fortunes[randomIndex2];

  res.status(200).send(randomFortune);
  
});

app.get("/api/joke", (req, res) => {
  const jokes = ["Q. How did the programmer die in the shower?  A. He read the shampoo bottle instructions: Lather. Rinse. Repeat",
					 "Knock, knock.  who is there?    very long pause….     Java.",
					 "How many programmers does it take to change a light bulb? None, It is a hardware problem",
           "Debugging: Removing the needles from the haystack.",
           "I just saw my life flash before my eyes and all I could see was a close tag…",
           "Two bytes meet.  The first byte asks, Are you ill? The second byte replies, No, just feeling a bit off.",
           "There are only 10 kinds of people in this world: those who know binary and those who do not",

  ];

  // choose random fortune
  let randomIndex3 = Math.floor(Math.random() * jokes.length);
  let randomJoke = jokes[randomIndex3];

  res.status(200).send(randomJoke);
  
});

const {
  getJokes,
  createJoke,
  updateJoke,
  deleteJoke
} = require('./controller')

app.get(`/api/jokes`, getJokes)
app.post(`/api/jokes`, createJoke)
app.put(`/api/jokes/:id`, updateJoke)
app.delete(`/api/jokes/:id`, deleteJoke)


app.listen(4000, () => console.log("Server running on 4000"));