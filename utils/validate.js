const { check } = require('express-validator');

module.exports = {
  validationRule: () => [
      check('rule').not().isEmpty().withMessage('rule is required.').custom((rule) => typeof rule === "object").withMessage('rule should be an object.'),
      check('data').not().isEmpty().withMessage('data is required.'),
      check('rule.field').not().isEmpty().withMessage('rule.field is required.'),
      check('rule.condition').not().isEmpty().withMessage('rule.condition is required.'),
      check('rule.condition_value').not().isEmpty().withMessage('rule.condition_value is required.'),
  ]
};