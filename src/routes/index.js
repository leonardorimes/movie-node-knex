const { Router } = require("express");


const usersRouter = require("./users.routes");
const notesRouter = require("./notes.routes");
const tagsroutes = require("./tags.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/notes", notesRouter);
routes.use("/tags", tagsroutes)

module.exports = routes;