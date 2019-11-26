
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Laboratorio = require('../models/laboratorio');

// ------Laboratório:
// obter lista de laboratórios ativos
router.get('/laboratorios', (req, res) => {
  Laboratorio.find({ status: true })
    .populate('exames')
    .then((labs) => {
      res.json(labs);
    })
    .catch((err) => {
      res.json(err);
    });
});
// cadastrar um novo laborário
router.post('/laboratorio/new', (req, res) => {
  const {
    nome, endereco, exames,
  } = req.body;
  Laboratorio.create({
    nome, endereco, exames,
  })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});
// atualizar um laboratório existente
router.put('/laboratorio/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  Laboratorio.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
    .then(() => {
      res.json({ message: `Laboratorio with ${req.params.id} is updated successfully.` });
    })
    .catch((err) => {
      res.json(err);
    });
});
// remover logicamente um laboratório ativo

router.delete('/laboratorio/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  const { id } = req.params;
  Laboratorio.findByIdAndRemove(id, { status: true })
    .then(() => {
      res.json({ message: `Laboratorio with ${req.params.id} was deleted.` });
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
