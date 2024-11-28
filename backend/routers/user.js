const express = require("express");
const { login, getDuyuru, getHasBirthdayPersons, createDestek, getDestekler, getMainAnket, getMainDuyuru, whoAmI } = require("../controllers/user");
const { getPhoneNumbers, getMudurlukler } = require("../controllers/admin");
const router = express.Router();
const userAuth = require("../middlewares/userAuth");
const multer = require("multer");
const path = require('path');
const { replyAnket, getAnketler, getAnket, getAnketlerUser } = require("../controllers/anket");

router.post("/login" , login)

router.post("/get-phone-numbers"  , getPhoneNumbers)
router.get("/get-duyuru"  , getDuyuru)
router.get("/whoami"  , whoAmI)
router.get("/get-birthday-persons"  , getHasBirthdayPersons)


router.get("/get-main-anket"  , getMainAnket)
router.get("/get-main-duyuru"  , getMainDuyuru)

router.get("/get-mudurlukler"  , getMudurlukler)

router.get("/get-anketler"  , getAnketlerUser)
router.get("/get-anket/:id"  , getAnket)
router.post("/reply-anket"  , replyAnket)

module.exports = router;
