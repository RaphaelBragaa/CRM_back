const express = require('express')
const router = express.Router()
const apiController = require("../controllers/controller")

router.get("/list",apiController.details)
router.delete("/delete/:id",apiController.delete)
router.put("/update/:id",apiController.update)
router.post("/register",apiController.register)
router.post("/login",apiController.login)
router.get("/user/:id",apiController.private)

module.exports = router