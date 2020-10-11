var mongoose = require("mongoose");
var mongoosastic = require('mongoosastic');
var Schema = mongoose.Schema;

var ProductCommentSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  text: {
    type: String,
    required: true
  },
});

ProductCommentSchema.plugin(mongoosastic, {
  hosts: [
    'localhost:9200'
  ]
});


module.exports = mongoose.model('ProductComment', ProductCommentSchema);