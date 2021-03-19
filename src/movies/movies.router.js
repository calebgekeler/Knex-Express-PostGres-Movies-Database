const router = require("express").Router({ mergeParams: true });
const cors = require("cors");


const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");
router.use(cors());

router.route("/").get(controller.list).get(controller.isShowing).all(methodNotAllowed);
router.route("/:movieId").get(controller.read).all(methodNotAllowed);
router.route("/:movieId/theaters").get(controller.theaters).all(methodNotAllowed);
router.route("/:movieId/reviews").get(controller.reviews).all(methodNotAllowed);

module.exports = router;