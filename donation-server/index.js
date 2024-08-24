const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = "mongodb+srv://donation1122:bWyf762s0whBai8S@cluster0.ivo4yuq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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
    const fundInfo = client.db("donation").collection("fundInfo");
    await client.connect();

    // Get the latest fund info
    app.get('/fund-info/latest', async (req, res) => {
      try {
        const latestData = await fundInfo.findOne({}, { sort: { _id: -1 } });
        res.json(latestData || { totalAmount: 0, dailyAmount: 0, date: new Date().toISOString().split('T')[0], updatedAt: new Date().toISOString() });
      } catch (error) {
        console.error('Error fetching latest data:', error);
        res.status(500).json({ message: 'Error fetching latest data' });
      }
    });

    app.get('/fund-info-user', async(req, res)=>{
        const result = await fundInfo.find().toArray();
        res.send(result)
    })

    // Update fund info
    app.post('/fund-info', async (req, res) => {
      try {
        const { dailyAmount } = req.body;
        const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
        const updatedAt = new Date().toISOString(); // Current time for update

        // Find the document for today
        const existingData = await fundInfo.findOne({ date: today });

        let totalAmount = 0;
        let dailyAmountToday = dailyAmount;

        if (existingData) {
          // Update total amount if today's data exists
          totalAmount = existingData.totalAmount + dailyAmountToday;
          dailyAmountToday = existingData.dailyAmount + dailyAmountToday;
        } else {
          // No existing data, start fresh
          totalAmount = dailyAmountToday;
        }

        // Update or insert document
        const result = await fundInfo.updateOne(
          { date: today },
          { 
            $set: { 
              totalAmount, 
              dailyAmount: dailyAmountToday, 
              date: today,
              updatedAt: updatedAt // Set the updatedAt field
            } 
          },
          { upsert: true }
        );

        res.json({ totalAmount, dailyAmount: dailyAmountToday, updatedAt });
      } catch (error) {
        console.error('Error saving data:', error);
        res.status(500).json({ message: 'Error saving data' });
      }
    });

    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    // Optionally, you can close the connection here, but it's usually managed by the app's lifecycle.
    // await client.close();
  }
}

run().catch(console.dir);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
