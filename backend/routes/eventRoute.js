const express = require("express");
const eventController = require("../controller/eventController");

const router = express.Router();

router.post(
  "/create-event",
  eventController.uploadEventImages,
  eventController.resizeEventImages,
  eventController.createEvent
);
router.get("/get-all-events", eventController.GetEvent);
router.get("/get-all-events/:id", eventController.GetEventShopId);
router.delete("/delete-shop-event/:id", eventController.DeleteEvent);

module.exports = router;
