const express = require("express");
const shopController = require("../controller/shopController");
const { isSeller } = require("../middleware/auth");

const router = express.Router();

router.post(
  "/create-shop",
  shopController.uploadShopPhoto,
  shopController.resizeShopPhoto,
  shopController.createShop
);
router.post("/login-shop", shopController.login);
router.get("/get-seller", isSeller, shopController.getSeller);
router.get("/get-shop-info/:id", shopController.shopInfo);
router.get("/logout", shopController.logout);

//update route
router.patch(
  "/update-shop-avatar",
  isSeller,
  shopController.uploadShopPhoto,
  shopController.resizeShopPhoto,
  shopController.UploadShopProfile
);
router.patch("/update-seller-info", isSeller, shopController.updateSellerInfo);

module.exports = router;
