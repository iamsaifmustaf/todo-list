const express = require('express');
const router = express.Router();
const checkAuth = require('../auth/check-auth')
const controller = require('../controllers/event');

router.get('/', controller.get_all_events)
router.delete('/:eventId', controller.delete_event)
router.patch('/:eventId', controller.edit_event)
router.post('/', checkAuth, controller.add_event);

module.exports = router;
