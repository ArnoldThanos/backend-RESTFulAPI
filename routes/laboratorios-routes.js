
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Laboratorio = require('../models/laboratorio');

// ------Laboratório:
// obter lista de laboratórios ativos
router.get('/laboratorios', async (req, res) => {
  try {
    const labs = await Laboratorio.find({ status: true }).populate('exames');
    res.json(labs);
  } catch (error) {
    res.json(error);
  }
});
// cadastrar um novo laborário
router.post('/laboratorio/new', async (req, res) => {
  const { nome, endereco, exames } = req.body;
  try {
    const response = await Laboratorio.create({ nome, endereco, exames });
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});
// atualizar um laboratório existente
router.put('/laboratorio/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  try {
    await Laboratorio.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
    res.json({ message: `Laboratorio with ${req.params.id} is updated successfully.` });
  } catch (error) {
    res.json(error);
  }
});
// remover logicamente um laboratório ativo

router.delete('/laboratorio/:id', async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  const { id } = req.params;
  try {
    await Laboratorio.findByIdAndRemove(id, { status: true });
    res.json({ message: `Laboratorio with ${req.params.id} was deleted.` });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
