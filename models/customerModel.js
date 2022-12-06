const mongoose = require("mongoose");

let mySchema = mongoose.Schema;

let customerSchema = new mySchema({
    name: { type: String, required: [true, "Name is required.."] },
    email: { type: String },
    mobile: { type: String, max: 10 },
    address: { type: String },
    pincode: { type: String },
});

const tableName = "customer";

let data = mongoose.model(tableName, customerSchema);

module.exports = data;
