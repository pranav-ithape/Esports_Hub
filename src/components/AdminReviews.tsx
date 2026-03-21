import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Star, Trash2 } from "lucide-react";
import { useAuth } from "./AuthContext";

export default function AdminReviews() {
  const { userRole } = useAuth();
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔒 ADMIN PROTECTION
  if (userRole !== "admin") {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Access Denied ❌
      </div>
    );
  }

  // ✅ FETCH REVIEWS
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const snap = await getDocs(collection(db, "reviews"));
        const data = snap.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));
        setReviews(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // ❌ DELETE REVIEW
  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, "reviews", id));
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl mb-6">Admin Reviews Panel</h1>

      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p>No reviews found</p>
      ) : (
        <div className="grid gap-4">
          {reviews.map((review) => (
            <Card key={review.id} className="bg-gray-900 border-gray-700">
              <CardContent className="p-4">

                {/* Product */}
                <h2 className="text-lg font-bold">
                  {review.productName || "Unknown Product"}
                </h2>

                {/* User */}
                <p className="text-sm text-gray-400">
                  By: {review.userName || "Anonymous"}
                </p>

                {/* Rating */}
                <div className="flex items-center mt-2">
                  <Star className="text-yellow-400 w-4 h-4 mr-1" />
                  <span>{review.rating}</span>
                </div>

                {/* Comment */}
                <p className="mt-2">{review.comment}</p>

                {/* Delete */}
                <Button
                  onClick={() => handleDelete(review.id)}
                  className="mt-4 bg-red-600 hover:bg-red-700"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>

              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}