const express = require("express");
const router = express.Router();

const adminRouter = require("./admin");
const userRouter = require("./user");
const mudurRouter = require("./mudur");

router.get("/", (req, res) => {
    res.send("api");
});

router.use("/admin", adminRouter);
router.use("/user", userRouter);
router.use("/mudur", mudurRouter);

module.exports = router;
