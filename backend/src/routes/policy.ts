export {};
const router = require('express').Router();
const { fetchPolicies } = require('../controllers/policy-controllers');

router.get('/policies', fetchPolicies);

// router.get('/policies/families', fetchFamily);


module.exports = router