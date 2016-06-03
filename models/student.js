'use strict';

const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  student_id: { type: String, required: true },
});

exports.Student = mongoose.model('Student', StudentSchema);
