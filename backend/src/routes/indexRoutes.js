import express from "express";
import loginRoutes from "./loginRoutes.js";
import homeRoutes from "./homeRoutes.js"
import materiaRoutes from "./materiaRoutes.js";

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send("Testando"));

    app.use(express.json(), loginRoutes, homeRoutes, materiaRoutes);
};

export default routes;