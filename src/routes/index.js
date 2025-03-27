const router = require('express').Router();
const apiRoutes = require('./api'); // Ensure this imports the router instance

router.use('/api', apiRoutes); // This will now work correctly

router.use('/', (req, res) => {
  return res.send('Wrong route! Try again!');
});

module.exports = router;