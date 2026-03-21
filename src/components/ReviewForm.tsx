import { useState } from "react";
import { db } from "../lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function ReviewForm({ productId }: { productId: string }) {
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  const handleSubmit = async () => {
    if (!review) {
      alert("Write review ❗");
      return;
    }

    try {
      await addDoc(collection(db, "reviews"), {
        productId,
        rating,
        review,
        userName: "User", // later from auth
        createdAt: serverTimestamp(),
      });

      alert("Review submitted ✅");
      setReview("");
    } catch (error) {
      console.error(error);
      alert("Error ❌");
    }
  };

  return (
    <div className="mt-4 space-y-3">
      <h3 className="text-foreground">Give Review</h3>

      {/* Rating */}
      <select
        className="w-full p-2 bg-background border border-border"
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
      >
        <option value={5}>⭐⭐⭐⭐⭐</option>
        <option value={4}>⭐⭐⭐⭐</option>
        <option value={3}>⭐⭐⭐</option>
        <option value={2}>⭐⭐</option>
        <option value={1}>⭐</option>
      </select>

      <Input
        placeholder="Write your review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
      />

      <Button onClick={handleSubmit}>
        Submit Review
      </Button>
    </div>
  );
}