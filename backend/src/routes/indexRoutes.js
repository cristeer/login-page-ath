import express from "express";
import loginRoutes from "./loginRoutes.js";

const routes = (app) => {
    app.route("/forget").get((req, res) => res.status(200).send("Testando"));

    app.use(express.json(), loginRoutes);
};

export default routes;