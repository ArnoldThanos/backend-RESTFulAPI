const mongoose = require('mongoose');

const { Schema } = mongoose;

const laboratorioSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  endereco: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  exames: [{ type: Schema.Types.ObjectId, ref: 'exame' }],
  create_date: {
    type: Date,
    default: Date.now,
  },
});

const Laboratorio = mongoose.model('laboratorio', laboratorioSchema);
module.exports = Laboratorio;
