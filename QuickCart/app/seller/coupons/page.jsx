"use client";
import { useState } from "react";
import { createCoupon } from "@/components/utils/createCoupon";

export default function CouponAdminPage() {
  const [form, setForm] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "",
    minOrderAmount: "",
    expiryDate: "",
    usageLimit: 1,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await createCoupon(form);
    if (res.success) {
      setMessage("✅ Coupon created successfully!");
      setForm({
        code: "",
        discountType: "percentage",
        discountValue: "",
        minOrderAmount: "",
        expiryDate: "",
        usageLimit: 1,
      });
    } else {
      setMessage(`❌ ${res.message}`);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Create Coupon</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Coupon Code */}
        <input
          type="text"
          name="code"
          value={form.code}
          onChange={handleChange}
          placeholder="Coupon Code"
          className="w-full border p-2 rounded"
          required
        />

        {/* Discount Type */}
        <select
          name="discountType"
          value={form.discountType}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="percentage">Percentage</option>
          <option value="flat">Flat</option>
        </select>

        {/* Discount Value */}
        <input
          type="number"
          name="discountValue"
          value={form.discountValue}
          onChange={handleChange}
          placeholder="Discount Value"
          className="w-full border p-2 rounded"
          required
        />

        {/* Minimum Order */}
        <input
          type="number"
          name="minOrderAmount"
          value={form.minOrderAmount}
          onChange={handleChange}
          placeholder="Minimum Order Amount"
          className="w-full border p-2 rounded"
        />

        {/* Expiry Date */}
        <input
          type="date"
          name="expiryDate"
          value={form.expiryDate}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        {/* Usage Limit */}
        <input
          type="number"
          name="usageLimit"
          value={form.usageLimit}
          onChange={handleChange}
          placeholder="Usage Limit"
          className="w-full border p-2 rounded"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Create Coupon
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center font-medium text-green-600">{message}</p>
      )}
    </div>
  );
}
