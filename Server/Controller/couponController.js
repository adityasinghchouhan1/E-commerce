
// const Coupon = require("../models/Coupon");

const CouponModel = require("../Modal/CouponModel");

// ✅ Create a new coupon (Admin)
const createCoupons = async (req, res) => {
  try {
    const { code, discountType, discountValue, minOrderAmount, expiryDate, usageLimit } = req.body;
    const coupon = await CouponModel.create({
      code,
      discountType,
      discountValue,
      minOrderAmount,
      expiryDate,
      usageLimit,
    });
    res.status(201).json({ success: true, coupon });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
}

// ✅ Validate and apply coupon
const applyCoupon = async (req, res) => {
  try {
    const { code, orderAmount } = req.body;

    const coupon = await CouponModel.findOne({ code: code.toUpperCase() });
    if (!coupon) return res.status(404).json({ success: false, message: "Invalid coupon code" });

    if (coupon.expiryDate < new Date()) {
      return res.status(400).json({ success: false, message: "Coupon expired" });
    }

    if (coupon.usedCount >= coupon.usageLimit) {
      return res.status(400).json({ success: false, message: "Coupon usage limit reached" });
    }

    if (orderAmount < coupon.minOrderAmount) {
      return res.status(400).json({ success: false, message: `Minimum order amount should be ₹${coupon.minOrderAmount}` });
    }

    let discount = 0;
    if (coupon.discountType === "percentage") {
      discount = (orderAmount * coupon.discountValue) / 100;
    } else {
      discount = coupon.discountValue;
    }

    const finalAmount = Math.max(orderAmount - discount, 0);

    res.json({
      success: true,
      discount,
      finalAmount,
      message: "Coupon applied successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

module.exports = {
 createCoupons,
 applyCoupon
}
