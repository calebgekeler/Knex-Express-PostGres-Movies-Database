const router = require("express").Router({ mergeParams: true });
const cors = require("cors");

const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
router.use(cors());


router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router

