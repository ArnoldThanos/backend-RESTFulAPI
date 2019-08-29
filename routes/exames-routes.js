const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Exame = require('../models/exames');

// ----- Exames:
// obter lista de exames ativos
router.get('/exames', (req, res) => {
  Exame.find()
    .then((response) => {
      const filteredExams = response.filter(e => e.status);
      res.json(filteredExams);
    })
    .catch((err) => {
      res.json(err);
    });
});
// cadastrar um novo exame
router.post('/exame/new', (req, res) => {
  const { nome, tipo } = req.body;
  Exame.create({ nome, tipo })
    .then((response) => {
      res.json(response);
    })
    .catch((err) => {
      res.json(err);
    });
});
// atualizar um exame existente
router.put('/exame/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  Exame.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
    .then(() => {
      res.json({ message: `Exame with ${req.params.id} is updated successfully.` });
    })
    .catch((err) => {
      res.json(err);
    });
});
// remover logicamente um exame ativo
router.delete('/exame/:id', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  Exame.findById(req.params.id)
    .then((response) => {
      if (response.status) {
        Exame.findByIdAndRemove(req.params.id)
          .then(() => {
            res.json({ message: `Exame with ${req.params.id} was deleted.` });
          })
          .catch((err) => {
            res.json(err);
          });
      } else {
        res.json({ message: `Exame with ${req.params.id} can't be deleted.` });
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
