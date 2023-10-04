import express from "express";
import dotenv from "dotenv";
import hbs from "express-handlebars";
import bodyParser from "body-parser";
import cors from "cors";
import flashMessages from "connect-flash";
import flash from "express-flash";
import session from "express-session";
import cookieParser from "cookie-parser";
import _ from "lodash";
import mongoose from "mongoose";

import routes from "./routes/routes.js";

const app = express();

dotenv.config();
app.use(cors());
app.use(
  session({
    secret: "ebobiz",
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  res.locals.student_data = req.session.student_data;
  res.locals.token = req.session.token;
  next();
});

app.use(cookieParser());
app.use(flashMessages());
app.use(flash());

// Enable body parser
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/public", express.static("public"));

app.engine("hbs", hbs.engine({ extname: ".hbs" }));
app.set("view engine", "hbs");

const PORT = process.env.PORT || 5000;
const connectionURL = process.env.MONGODB_URL;

app.use("/", routes);
app.get("*", (req, res) => {
  res.redirect("/error"); // Redirect to the error page
});

// app.listen(PORT, () => {
//   console.log(` server started on port http://localhost:${PORT} `);
// });

mongoose
  .connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server is up on port http://localhost:${PORT}`))
  )
  .catch((error) => console.log(error.message));
