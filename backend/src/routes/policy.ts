const router = require('express').Router();
const { fetchPolicies, fetchFamily } = require('../controllers/policy-controllers');

router.route('/policies').get(fetchPolicies);

router.route('/policies/families/:id/:name').get(fetchFamily);


module.exports = router