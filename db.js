const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri =
//   "mongodb+srv://edutoyshub:2mQYysP4yTNfVE0M@cluster0.jlo1y.mongodb.net/?retryWrites=true&w=majority";
// const u = process.env.DB_URI;
// console.log(u);

const client = new MongoClient(process.env.DB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error) {
    console.log(error);
  }
}
run().catch(console.dir);

//all collections
module.exports.toysCollection = client.db("edu-toys-hub").collection("toys");
