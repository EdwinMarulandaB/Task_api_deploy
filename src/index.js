import app from "./app";
import "./databse.js";

app.listen(app.get("port"));
console.log("Server on port", app.get("port"));
