const router = require('express').Router();
const { getUser, validationRule , validationRuleController} = require('./controller');

router.get('/', getUser);
router.post('/validate-rule', validationRule(), validationRuleController);

module.exports = router;