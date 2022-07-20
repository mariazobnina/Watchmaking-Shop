const express = require('express');
const upload = require('../midlewares/admin.multer.middlewares');

const router = express.Router();

const { Watches } = require('../db/models');
const { Orders } = require('../db/models');

// отрисовываем страницу
router.get('/', async (req, res) => {
  console.log('234567890');
  try {
    const watches = await Watches.findAll({ order: [['id', 'DESC']] });
    const customers = await Orders.findAll({ order: [['id', 'DESC']] });
    res.render('admin', {
      customers,
      watches,
      title: 'Добро пожаловать на админскую страничку',
      text: 'Здесь вы сможете добавлять новые модели часов, редактировать и удалять те, которые уже есть на сайте!',
      important: 'Внимание! При добавлении модели загрузка фото обязательна!',
    });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

// добавляем новую модель
router.post('/', upload.single('photo'), async (req, res) => {
  try {
    const inputName = req.body.name;
    const allData = req.body;
    console.log(allData);
    if (inputName.length > 0) {
      const newWatches = await Watches.create({ ...allData, photo: req.file.filename });
      // const watches = await Watches.findAll({ order: [['id', 'DESC']] });
      // res.render('admin', { watches, title: 'Добро пожаловать на админскую страничку', text: 'Новая модель успешно добавлена!' });
      res.json({ newWatches });
    }
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

// удаляем какюу то модель
router.delete('/:id', async (req, res) => {
  try {
    const result = await Watches.destroy({
      where: { id: req.params.id },
    });
    res.json({ result });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
});

module.exports = router;
