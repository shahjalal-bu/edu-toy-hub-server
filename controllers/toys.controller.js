const { toysCollection } = require("../db");

module.exports.findAll = async (req, res) => {
  const toys = await toysCollection.find().toArray();
  res.send(toys);
};
