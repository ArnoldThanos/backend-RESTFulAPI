
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const Exame = require('../models/exames');
const Laboratorio = require('../models/laboratorio');

// ------Laboratório:
// obter lista de laboratórios ativos
router.get('/laboratorios', (req, res) => {
  Laboratorio.find()
    .populate('exames')
    .then((response) => {
      const filteredLabs = response.filter(e => e.status);
      res.json(filteredLabs);
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
  Laboratorio.findById(req.params.id)
    .then((response) => {
      if (response.status) {
        Laboratorio.findByIdAndRemove(req.params.id)
          .then(() => {
            res.json({ message: `Laboratorio with ${req.params.id} was deleted.` });
          })
          .catch((err) => {
            res.json(err);
          });
      } else {
        res.json({ message: `Laboratorio with ${req.params.id} can't be deleted.` });
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

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


module.exports = router;
