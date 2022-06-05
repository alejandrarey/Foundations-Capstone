const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.


const {
  getMerch,
  createItem,
  updateItem,
  deleteItem
} = require('./controller')

app.get(`/api/merch`, getMerch)
app.post(`/api/merch`, createItem)
app.put(`/api/merch/:id`, updateItem)
app.delete(`/api/merch/:id`, deleteItem)


app.listen(4000, () => console.log("Server running on 4000"));