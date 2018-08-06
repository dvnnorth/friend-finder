const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static(__dirname + "/app/public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require(__dirname + "/app/routing/htmlRoutes.js")(app);
require(__dirname + "/app/routing/apiRoutes.js")(app);

app.listen(PORT, () => { console.log("Running on http://localhost:" + PORT) });