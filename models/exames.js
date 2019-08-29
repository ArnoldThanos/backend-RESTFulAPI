const mongoose = require('mongoose');

const { Schema } = mongoose;

const exameSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    required: true,
    enum: ['analise clinica', 'imagem'],
  },
  status: {
    type: Boolean,
    default: true,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
});

const Exame = mongoose.model('exame', exameSchema);
module.exports = Exame;
