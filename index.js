const express = require("express");
const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.static("public"));

app.use(express.json());
 
app.use(express.urlencoded({ extended: true }));

require("./routes/routes")(app);

app.listen(PORT, () => console.log(`Listening at port ${PORT}`));