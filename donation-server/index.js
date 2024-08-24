const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://<db_username>:<db_password>@cluster0.ivo4yuq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Middleware
app.use(cors());
app.use(express.json());

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    app.get("/", (req, res) => {
      res.send("Hello World!");
    });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
