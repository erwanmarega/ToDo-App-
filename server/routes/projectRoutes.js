const express = require('express');
const router = express.Router();
const { getAllProjects, addProject, deleteProject } = require('../controllers/projectController');

router.get('/', getAllProjects);
router.post('/', addProject);
router.delete('/:id', deleteProject);

module.exports = router;