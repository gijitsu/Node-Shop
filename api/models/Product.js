const mangoose = require('mongoose');


const reviewSchema = mangoose.Schema(
    {
        name: {type: String, require: true},
        rating: {type: Number, require: true, default: 0},
        comment: {type: String, require: true},
        user: {type: mangoose.Schema.Types.ObjectId, require: true, ref: "User"},
    }
);

const productSchema = mangoose.Schema(
    {
        name: {type: String, require: true},
        image: {type: String, require: true},
        description: {type: String, require: true},
        rating: {type: Number, require: true, default: 0},
        numReview: {type: Number, require: true, default: 0},
        price: {type: Number, require: true, default: 0},
        countInStock: {type: Number, require: true, default: 0},

        reviews: [reviewSchema],
    },

);

module.exports = mangoose.model("Product", productSchema)