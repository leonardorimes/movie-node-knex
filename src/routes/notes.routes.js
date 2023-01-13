const { Router } = require("express");
const NotesController = require("../controllers/NotesController")

const notesroutes = Router();

const notescontroller = new NotesController();

notesroutes.post("/:user_id", notescontroller.create)
notesroutes.get("/:id",  notescontroller.show)
notesroutes.delete("/:id",  notescontroller.delete)
notesroutes.get("/",  notescontroller.index)

module.exports = notesroutes;