const { Router } = require("express");
const TagsController = require("../controllers/TagsController");

const tagsroutes = Router();


const tagsController = new TagsController();

tagsroutes.get("/:user_id", tagsController.index);

module.exports = tagsroutes;
