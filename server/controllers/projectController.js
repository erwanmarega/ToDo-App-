const Project = require('../models/projects');

const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find({ isActive: true }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: projects
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des projets:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la récupération des projets'
    });
  }
};

const addProject = async (req, res) => {
  try {
    const { name, description, color, icon } = req.body;

    if (!name || !color) {
      return res.status(400).json({
        success: false,
        message: 'Le nom et la couleur du projet sont requis'
      });
    }

    const newProject = new Project({
      name,
      description,
      color,
      icon,
      isActive: true
    });

    const savedProject = await newProject.save();

    res.status(201).json({
      success: true,
      message: 'Projet créé avec succès',
      data: savedProject
    });

  } catch (error) {
    console.error('Erreur lors de la création du projet:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur serveur lors de la création du projet'
    });
  }
};

module.exports = {
  getAllProjects,
  addProject
};