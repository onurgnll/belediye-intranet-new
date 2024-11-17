require("dotenv").config();
const express = require("express");
const app = express();
const apiRouter = require("./routers/index");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");

const fs = require('fs');
const path = require('path');
const userAuth = require("./middlewares/userAuth");

app.use(cors());
app.use(express.json());
app.use("/api", apiRouter); 

const qrDir = path.join(__dirname, './public/duyuru/');
const kullaniciDir = path.join(__dirname, './public/kullanici/');
const annDir = path.join(__dirname, './public/destek/');
const annDir2 = path.join(__dirname, './public/destekcevap/');

app.use('/duyuru', express.static(qrDir));
app.use('/kullanici', express.static(kullaniciDir));
app.use('/destek', express.static(annDir));
app.use('/destekcevap', express.static(annDir2));
app.use(errorHandler); 

const PORT = process.env.PORT || 5000; 

app.get('/get-ip', (req, res) => {
  const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  console.log(req.socket);
  console.log(ipAddress);
  res.json({ ip: ipAddress });
});
app.listen(PORT,"::",() => {
  console.log(`Server started on port ${PORT}`);
});

