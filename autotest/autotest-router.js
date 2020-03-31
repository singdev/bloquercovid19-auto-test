const router = require('express').Router();
const controller = require('./autotest-controller');

router.get('/autotest', controller.get_all_autotest);

router.post('/autotest', controller.create_autotest);

module.exports = router;