const multer = require("multer");
const sharp = require("sharp");
const productModel = require("../model/productModel");
const shopModel = require("../model/shopModel");
const orderModel = require("../model/orderModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsync = require("../middleware/catchAsync");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new appError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadProductImages = upload.fields([{ name: "images", maxCount: 3 }]);

exports.resizeProductImages = catchAsync(async (req, res, next) => {
  if (!req.files || !req.files.images) return next();

  // 2) Images
  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `product-${Date.now()}-${i + 1}.jpeg.jpeg`;

      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/product/${filename}`);

      req.body.images.push(filename);
    })
  );
  next();
});

exports.createProduct = catchAsync(async (req, res, next) => {
  const shopId = req.body.shopId;

  // Find the shop based on the provided shopId
  const shop = await shopModel.findById(shopId);

  if (!shop) {
    return next(new ErrorHandler("Shop with the provided ID is invalid", 400));
  } else {
    // Create a new product object with the provided data
    const productData = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      tags: req.body.tags,
      images: req.body.images,
      originalPrice: req.body.originalPrice,
      discountPrice: req.body.discountPrice,
      stock: req.body.stock,
      shopId: shopId, // Assign the shopId
      shop: shop, // Assign the shop object
    };

    // Create the product in the database
    const product = await productModel.create(productData);

    res.status(201).json({
      status: "success",
      product,
    });
  }
});

exports.getAllProduct = catchAsync(async (req, res, next) => {
  try {
    const products = await productModel.find({ shopId: req.params.id });

    res.status(200).json({
      status: "success",
      products,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);

    if (!product) {
      return next(new ErrorHandler("product with this id is not found", 404));
    }

    res.status(200).json({
      status: "success",
      message: "Delete successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});

exports.getallproduct = catchAsync(async (req, res, next) => {
  const products = await productModel.find();

  res.status(200).json({
    status: "success",
    result: products.length,
    products,
  });
});

//review for product
exports.createReview = catchAsync(async (req, res, next) => {
  const { user, rating, comment, productId, orderId } = req.body;

  const product = await productModel.findById(productId);

  const review = {
    user,
    rating,
    comment,
    productId,
  };

  const isReviewed = product.reviews.find(
    (rev) => rev.user._id === req.user._id
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user._id === req.user._id) {
        (rev.rating = rating), (rev.comment = comment), (rev.user = user);
      }
    });
  } else {
    product.reviews.push(review);
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  await orderModel.findByIdAndUpdate(
    orderId,
    { $set: { "cart.$[elem].isReviewed": true } },
    { arrayFilters: [{ "elem._id": productId }], new: true }
  );

  res.status(200).json({
    success: true,
    message: "Reviwed succesfully!",
  });
});
