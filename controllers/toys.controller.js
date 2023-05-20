const { query } = require("express");
const { toysCollection } = require("../db");
const { ObjectId } = require("mongodb");

module.exports.findAll = async (req, res) => {
  let query =
    req.params.categoryName.toLowerCase() === "all"
      ? {}
      : { Category: req.params.categoryName };
  let toys = await toysCollection.find(query).toArray();
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
