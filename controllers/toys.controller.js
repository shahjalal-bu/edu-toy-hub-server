const { query } = require("express");
const { toysCollection } = require("../db");
const { ObjectId } = require("mongodb");

//find all by category name
module.exports.findAllByCategory = async (req, res) => {
  const limit = parseInt(req.query.limit);
  let query =
    req.params.categoryName.toLowerCase() === "all"
      ? {}
      : { Category: req.params.categoryName };
  let toys = await toysCollection.find(query).limit(limit).toArray();
  res.send(toys);
};
//find all product
module.exports.findAll = async (req, res) => {
  const limit = parseInt(req.query.limit);
  let query = {};
  if (req.query.q) {
    query = { Name: { $regex: req.query.q, $options: "i" } };
  }
  let toys = await toysCollection.find(query).limit(limit).toArray();
  res.send(toys);
};
//find all product by email
module.exports.findAllByEmail = async (req, res) => {
  const sort = req.query.sort;
  const pipeline = [
    {
      $match: {
        SellerEmail: req.params.sellerEmail,
      },
    },
    {
      $addFields: {
        numericPrice: { $toDouble: { $substr: ["$Price", 1, -1] } },
      },
    },
    {
      $sort: { numericPrice: sort === "asc" ? 1 : -1 },
    },
  ];
  let toys = await toysCollection.aggregate(pipeline).toArray();
  res.send(toys);
};

//find single product with it
module.exports.findById = async (req, res) => {
  let product = await toysCollection.findOne({
    _id: new ObjectId(req.params.id),
  });
  res.send(product);
};

module.exports.findCategory = async (req, res) => {
  const toys = await toysCollection.find().project({ Category: 1 }).toArray();
  const categoryArray = ["All"];
  toys.forEach((cat) => categoryArray.push(cat.Category));
  const uniqueArray = Array.from(new Set(categoryArray));
  res.send(uniqueArray);
};

//create product
module.exports.insertOne = async (req, res) => {
  try {
    const data = req.body;
    const result = await toysCollection.insertOne(data);
    res.send(result);
  } catch (error) {
    console.error("Failed to insert document:", error);
    res.status(500).send("Failed to insert document");
  }
};

//find single product with it
module.exports.findAndUpdate = async (req, res) => {
  try {
    const documentId = req.params.id;
    const updatedDocument = req.body;
    const updatedRes = await toysCollection.updateOne(
      { _id: new ObjectId(documentId) },
      { $set: updatedDocument }
    );
    res.send(updatedRes);
  } catch (error) {
    console.error("Failed to update document:", error);
    res.status(500).send("Failed to update document");
  }
};

module.exports.dealsOfDayUpdate = async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const updatedData = req.body;
  const updateDoc = {
    $set: {
      dealsOfTheDay: updatedData.dealsOfTheDay,
    },
  };
  const result = await toysCollection.updateOne(filter, updateDoc);
  res.send(result);
};

//delete operation

module.exports.findByIdAndDelete = async (req, res) => {
  try {
    const result = await toysCollection.deleteOne({
      _id: new ObjectId(req.params.id),
    });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Toy not found" });
    }
    res.json({ message: "Toy deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
