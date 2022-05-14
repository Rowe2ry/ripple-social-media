const router = require('express').Router()
const apiRoutes = require('./api');

router.use('/api', apiRoutes);
router.use('/*', (req,res) => 'Error: not a valid route');

module.exports = router;