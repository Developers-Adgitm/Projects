const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

//Create new order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    status: "success",
    data: order,
  });
});

//get single order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }
  res.status(200).json({
    success: true,
    order,
  });
});

//get user orders
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id }).populate(
    "user",
    "name email"
  );
  if (!orders) {
    return next(new ErrorHandler("No orders found", 404));
  }
  res.status(200).json({
    success: true,
    orders,
  });
});

//get all orders Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find();
  let totalAmount = 0;
  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

//Update order status Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("Order is already delivered", 400));
  }
  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }

  if (req.body.status === "Processing") {
    order.orderItems.forEach(async (ord) => {
      await updateStock(ord.product, ord.quantity);
    });
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await Order.bulkSave({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, qty) {
  const product = await Product.findById({ id });
  product.stock -= qty;
  await product.save({ validateBeforeSave: false });
}

//delete order Admin

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return next(new ErrorHandler("Order not found with this id", 404));
  }

  await order.remove();
  res.status(200).json({
    success: true,
  });
});