const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Exame = require('../models/exames');

// ----- Exames:
// obter lista de exames ativos
router.get('/exames', async (req, res) => {
  try {
    const exams = await Exame.find();
    res.json(exams);
  } catch (error) {
    res.json(error);
  }
});
// cadastrar um novo exame
router.post('/exame/new', async (req, res) => {
  const { nome, tipo } = req.body;
  try {
    const response = await Exame.create({ nome, tipo });
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});
// atualizar um exame existente
router.put('/exame/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  try {
    await Exame.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
    res.json({ message: `Exame with ${req.params.id} is updated successfully.` });
  } catch (error) {
    res.json(error);
  }
});
// remover logicamente um exame ativo
router.delete('/exame/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  const { id } = req.params;
  try {
    await Exame.findByIdAndRemove(id, { status: true });
    res.json({ message: `Exame with ${req.params.id} was deleted.` });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
