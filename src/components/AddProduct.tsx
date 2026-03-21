import { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";

export default function AddProduct() {
  const { userRole } = useAuth();

  const [form, setForm] = useState({
    name: "",
    team: "",
    category: "jersey",
    basePrice: "",
    originalBasePrice: "",
    image: "",
    isNew: false,
    isBestseller: false,
  });

  // 🔒 Admin Protection
  if (userRole !== "admin") {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Access Denied ❌
      </div>
    );
  }

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // ✅ FIXED SUBMIT FUNCTION
  const handleSubmit = async () => {
    try {
      const price = Number(form.basePrice);
      const originalPrice = Number(form.originalBasePrice);

      await addDoc(collection(db, "products"), {
        name: form.name,
        team: form.team,
        category: form.category,

        // 🔥 IMPORTANT: STORE BOTH FORMATS
        basePrice: price,
        originalBasePrice: originalPrice,
        price: price,
        originalPrice: originalPrice,

        // 🔥 FIX: always store image as array
        image: [form.image],

        rating: 0,
        reviews: 0,

        isNew: form.isNew,
        isBestseller: form.isBestseller,
      });

      alert("Product added ✅");

      // reset form
      setForm({
        name: "",
        team: "",
        category: "jersey",
        basePrice: "",
        originalBasePrice: "",
        image: "",
        isNew: false,
        isBestseller: false,
      });

    } catch (error) {
      console.error(error);
      alert("Error adding product ❌");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl mb-6">Add Product</h1>

      <div className="grid gap-4 max-w-md">

        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="p-2 bg-gray-800 rounded"
        />

        <input
          name="team"
          placeholder="Team Name"
          value={form.team}
          onChange={handleChange}
          className="p-2 bg-gray-800 rounded"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="p-2 bg-gray-800 rounded"
        >
          <option value="jersey">Jersey</option>
          <option value="accessory">Accessory</option>
        </select>

        <input
          name="basePrice"
          placeholder="Price"
          value={form.basePrice}
          onChange={handleChange}
          className="p-2 bg-gray-800 rounded"
        />

        <input
          name="originalBasePrice"
          placeholder="Original Price"
          value={form.originalBasePrice}
          onChange={handleChange}
          className="p-2 bg-gray-800 rounded"
        />

        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="p-2 bg-gray-800 rounded"
        />

        <label>
          <input
            type="checkbox"
            name="isNew"
            checked={form.isNew}
            onChange={handleChange}
          />{" "}
          New Product
        </label>

        <label>
          <input
            type="checkbox"
            name="isBestseller"
            checked={form.isBestseller}
            onChange={handleChange}
          />{" "}
          Bestseller
        </label>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 p-2 rounded"
        >
          Add Product
        </button>

      </div>
    </div>
  );
}