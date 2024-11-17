const express = require("express");
const router = express.Router();

const adminRouter = require("./admin");
const userRouter = require("./user");

router.get("/", (req, res) => {
    res.send("api");
});

router.use("/admin", adminRouter);
router.use("/user", userRouter);

module.exports = router;
