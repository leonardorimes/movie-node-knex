const { Router } = require("express");
const MoviesController = require("../controllers/MoviesController")

const moviesroutes = Router();

const moviescontroller = new MoviesController();

moviesroutes.post("/:user_id", moviescontroller.create)
moviesroutes.get("/:id",  moviescontroller.show)
moviesroutes.delete("/:id",  moviescontroller.delete)
moviesroutes.get("/",  moviescontroller.index)

module.exports = moviesroutes;