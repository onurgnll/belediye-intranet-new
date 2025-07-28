const express = require("express");
const router = express.Router();
const userAuth = require("../middlewares/userAuth");
const { login, kartbasim, getkartexcel, kartbasimExcel, kartbasimHaftalikExcel } = require("../controllers/mudur");

const { mudurAuth } = require("../middlewares/adminAuth");
router.post("/login", login);
router.post("/kartbasim", mudurAuth, kartbasim);
router.post("/kartbasimexcel", kartbasimExcel);
router.post("/kartbasimexcelhaftalik", kartbasimHaftalikExcel);

module.exports = router;
