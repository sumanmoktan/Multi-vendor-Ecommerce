const catchAsync = require("../middleware/catchAsync");
const ErrorHandler = require("../utils/ErrorHandler");
const eventModel = require("../model/eventModel");
const shopModel = require("../model/shopModel");

exports.createEvent = catchAsync(async (req, res, next) => {
  try {
    const shopId = req.body.shopId;
    const shop = await shopModel.findById(shopId);

    if (!shop) {
      return next(new ErrorHandler("Shop Id is invalid", 400));
    } else {
      //   let images = [];

      //   if (typeof req.body.images === "string") {
      //     images.push(req.body.images);
      //   } else {
      //     images = req.body.images;
      //   }

      //   const imagesLinks = [];

      //   for (let i = 0; i < images.length; i++) {
      //     const result = await cloudinary.v2.uploader.upload(images[i], {
      //       folder: "products",
      //     });

      //     imagesLinks.push({
      //       public_id: result.public_id,
      //       url: result.secure_url,
      //     });
      //   }

      const productData = req.body;
      // productData.images = imagesLinks;
      productData.shop = shop;

      const event = await eventModel.create(productData);

      res.status(201).json({
        success: true,
        event,
      });
    }
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

exports.GetEvent = catchAsync(async (req, res, next) => {
  try {
    const events = await eventModel.find();

    res.status(200).json({
      status: "success",
      result: events.lengths,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

exports.GetEventShopId = catchAsync(async (req, res, next) => {
  try {
    const events = await eventModel.find({ shopId: req.params.id });

    res.status(201).json({
      success: true,
      events,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

exports.DeleteEvent = catchAsync(async (req, res, next) => {
  try {
    const event = await eventModel.findByIdAndDelete(req.params.id);

    if (!event) {
      return next(new ErrorHandler("evnet is not found with this id", 404));
    }

    // for (let i = 0; 1 < product.images.length; i++) {
    //   const result = await cloudinary.v2.uploader.destroy(
    //     event.images[i].public_id
    //   );
    // }

    res.status(201).json({
      success: true,
      message: "Event Deleted successfully!",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});
