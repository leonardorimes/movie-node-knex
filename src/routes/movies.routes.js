const { Router } = require("express");
const MoviesController = require("../controllers/MoviesController")
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const moviesRoutes = Router();

const moviescontroller = new MoviesController();

moviesRoutes.use(ensureAuthenticated)

moviesRoutes.post("/", moviescontroller.create)
moviesRoutes.get("/:id",  moviescontroller.show)
moviesRoutes.delete("/:id",  moviescontroller.delete)
moviesRoutes.get("/",  moviescontroller.index)

module.exports = moviesRoutes;