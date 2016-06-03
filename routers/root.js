'use strict';

const router = new require('express').Router();

router.get('/', (req, res) => {
  res.render('index');
});

exports = module.exports = router;
