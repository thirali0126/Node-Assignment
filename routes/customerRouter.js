const express = require("express");
var mongoose = require("mongoose");

const customerModel = require("../models/customerModel");
let router = express.Router();

router.post("/", async (req, res) => {
  const customer = req.body;
  const isExists = await customerModel.findOne({ email: customer.email });
  if (isExists)
    return res.status(200).send({ message: "Customer Already Exists.." });
  const customerData = new customerModel({
    name: customer.name,
    email: customer.email,
    mobile: customer.mobile,
    address: customer.address,
    pincode: customer.pincode
  });
  customerData
    .save()
    .then((data) => {
      return res.status(200).send({ message: "Customer saved successfully.." });
    })
    .catch((err) => {
      return res.status(201).send({ message: "Error : ", err });
    });
});

router.get("/", (req, res) => {
  customerModel
    .find()
    .then((data) => {
      if (data.length > 0) return res.send(data);
      else return res.send({ message: "Data Not Found" });
    })
    .catch((err) => {
      return res.send({ message: err });
    });
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const search = await customerModel.findById(id);
  if (search) {
    return res.send({ message: `Rows Found :- ${id}` });
  } else {
    return res.send({ message: `Rows Not Found :- ${id}` });
  }
});

router.post("/update/:id", async (req, res) => {
  const id = req.params.id;

  var isValid = mongoose.Types.ObjectId.isValid(id);

  if (isValid) {
    const customer = await customerModel.findById(id);
    if (customer) {
      const updatedData = req.body; 

      const updateCustomer = await customerModel.findOneAndUpdate(
        { _id: id },
        updatedData,
        { new: true }
      );

      if (updateCustomer) {
        return res.status(200).send({ message: `Data Updated...` });
      } else {
        return res.status(400).send({ message: `Data Not Updated...` });
      }
    } else {
      return res.status(400).send({ message: `Data Not Found...` });
    }
  } else {
    return res.status(400).send({ message: `Invalid id for update: ${id}` });
  }
});

module.exports = router;
