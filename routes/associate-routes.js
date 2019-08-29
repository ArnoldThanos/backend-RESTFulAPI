const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Exame = require('../models/exames');
const Laboratorio = require('../models/laboratorio');

// ----- Associação
// Associar
router.put('/exame/:id/associate', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  const { idLaboratorio } = req.body;
  Exame.findById(req.params.id)
    .then((exame) => {
      if (exame.status) {
        Laboratorio.findById(idLaboratorio)
          .then((laboratorio) => {
            if (laboratorio.status) {
              Laboratorio.findByIdAndUpdate(idLaboratorio, { $push: { exames: req.params.id } })
                .then(() => {
                  res.json({ message: `Exame with ${req.params.id} is associated to Laboratorio with ${idLaboratorio} successfully.` });
                })
                .catch((err) => {
                  res.json(err);
                });
            } else {
              res.json({ message: `Laboratorio with ${req.params.id} can't be associated` });
            }
          })
          .catch((err) => {
            res.json(err);
          });
      } else {
        res.json({ message: `Exame with ${req.params.id} can't be associated.` });
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

// Desassociar

router.put('/exame/:id/unassociate', (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
  const { idLaboratorio } = req.body;
  Exame.findById(req.params.id)
    .then((exame) => {
      if (exame.status) {
        Laboratorio.findById(idLaboratorio)
          .then((laboratorio) => {
            if (laboratorio.status) {
              Laboratorio.update({ _id: idLaboratorio }, { $pull: { exames: req.params.id } })
                .then(() => {
                  res.json({ message: `Exame with ${req.params.id} is unassociated to Laboratorio with ${idLaboratorio} successfully.` });
                })
                .catch((err) => {
                  res.json(err);
                });
            } else {
              res.json({ message: `Laboratorio with ${req.params.id} can't be unassociated` });
            }
          })
          .catch((err) => {
            res.json(err);
          });
      } else {
        res.json({ message: `Exame with ${req.params.id} can't be unassociated.` });
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

// Endpoint que faz a busca por nome do exame e retorna todos os laboratorios associados.

router.get('/search', (req, res) => {
  const { exameName } = req.query;
  Laboratorio.find()
    .populate('exames')
    .then((response) => {
      const filteredLabs = response.filter((e) => {
        for (let i = 0; i < e.exames.length; i += 1) {
          if (e.exames[i].nome.toLowerCase() === exameName.toLowerCase()) {
            return e;
          }
        }
        return null;
      });
      res.json(filteredLabs);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
