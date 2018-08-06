module.exports = function (app) {

  app.get("/", (req, res) => res.sendFile("home.html", { root: __dirname + "/../public" }));

  app.get("/survey", (req, res) => res.sendFile("survey.html", { root: __dirname + "/../public" }));

}