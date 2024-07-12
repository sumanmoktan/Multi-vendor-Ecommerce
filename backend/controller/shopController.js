const shopModel = require("../model/shopModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsync = require("../middleware/catchAsync");
const sendShopToken = require("../utils/sellerToken");

exports.createShop = catchAsync(async (req, res, next) => {
  const { email } = req.body;
  const selleremail = await shopModel.findOne({ email });

  if (selleremail) {
    return next(new ErrorHandler("user already exist", 400));
  }

  const seller = await shopModel.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    // avatar: req.file.avatar,
    zipCode: req.body.zipCode,
    address: req.body.address,
    phoneNumber: req.body.phoneNumber,
  });

  sendShopToken(seller, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please provide the all fields!", 400));
  }

  const user = await shopModel.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("User doesn't exists!", 400));
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    return next(
      new ErrorHandler("Please provide the correct information", 400)
    );
  }
  sendShopToken(user, 201, res);
});

exports.getSeller = catchAsync(async (req, res, next) => {
  const seller = await shopModel.findById(req.seller._id);
  if (!seller) {
    return next(new ErrorHandler("seller is not find with this id", 404));
  }

  res.status(200).json({
    status: "success",
    seller,
  });
});

//get all information of shop
exports.shopInfo = catchAsync(async (req, res, next) => {
  try {
    const shop = await shopModel.findById(req.params.id);

    res.status(200).json({
      status: "success",
      shop,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 500));
  }
});

exports.logout = catchAsync(async (req, res, next) => {
  try {
    res.cookie("seller_token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      // sameSite: "none",
      // secure: true,
    });
    res.status(201).json({
      success: true,
      message: "Log out successful!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

//update shop profile picture
exports.UploadShopProfile = catchAsync(async (req, res, next) => {
  let existsSeller = await shopModel.findById(req.seller._id);

  const imageId = existsSeller.avatar.public_id;

  await cloudinary.v2.uploader.destroy(imageId);

  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
  });

  existsSeller.avatar = {
    public_id: myCloud.public_id,
    url: myCloud.secure_url,
  };

  await existsSeller.save();

  res.status(200).json({
    success: true,
    seller: existsSeller,
  });
});

//update seller info
exports.updateSellerInfo = catchAsync(async (req, res, next) => {
  const { name, description, address, phoneNumber, zipCode } = req.body;

  const shop = await shopModel.findOne(req.seller._id);

  if (!shop) {
    return next(new ErrorHandler("User not found", 400));
  }

  shop.name = name;
  shop.description = description;
  shop.address = address;
  shop.phoneNumber = phoneNumber;
  shop.zipCode = zipCode;

  await shop.save();

  res.status(201).json({
    success: true,
    shop,
  });
});
