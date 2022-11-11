// @collapse
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// All
router.get('/', (req, res) => {
  Category.findAll({
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name'],
      },
    ],
  })
    .then((categoryRows) => res.json(categoryRows))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// 'cRud'
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'category_name'],
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      },
    ],
  })
    .then((categoryRows) => {
      if (!categoryRows) {
        res
          .status(404)
          .json({
            message: 'No Categories found with that ID',
          });
        return;
      }
      res.json(categoryRows);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// 'Crud'
router.post('/', (req, res) => {
  // expects {category_name: 'Some Category'}
  Category.create({
    category_name: req.body.category_name,
  })
    .then((categoryRows) => res.json(categoryRows))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// 'crUd'
router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((categoryRows) => {
      if (!categoryRows) {
        res
          .status(404)
          .json({
            message: 'No Categories found with that ID, no updates occured',
          });
        return;
      }
      res.json(categoryRows);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});


// 'cruD'
router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((categoryRows) => {
      if (!categoryRows) {
        res
          .status(404)
          .json({
            message: 'No Categories found with that ID, No deletions occured',
          });
        return;
      }
      res.json(categoryRows);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
