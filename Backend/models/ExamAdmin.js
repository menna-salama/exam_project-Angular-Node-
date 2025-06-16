const mongoose = require("mongoose");

 
  const examSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    duration: {
      type: Number,  
      default: 60
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
      required: true
    },
    active: {
      type: Boolean,
      default: true
    }
}, {
  timestamps: true
});

module.exports = mongoose.model("Exam", examSchema);