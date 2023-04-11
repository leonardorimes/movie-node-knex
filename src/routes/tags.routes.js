const { Router } = require("express");
const TagsController = require("../controllers/TagsController");
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const tagsroutes = Router();


const tagsController = new TagsController();

tagsroutes.get("/", ensureAuthenticated, tagsController.index);

module.exports = tagsroutes;
