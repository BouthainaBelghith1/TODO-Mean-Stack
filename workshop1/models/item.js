import mongoose from "mongoose";

const itemSchema  = new mongoose.Schema( {
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: String
});

const item = mongoose.model("Item", itemSchema);
export default item;