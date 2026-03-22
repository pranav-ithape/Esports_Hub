import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc
} from "firebase/firestore";
import { useAuth } from "./AuthContext";

export default function AdminOrders() {
  const { userRole } = useAuth();

  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔒 ADMIN PROTECTION
  if (userRole !== "admin") {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Access Denied ❌
      </div>
    );
  }

  // 🔥 FETCH ORDERS
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const snap = await getDocs(collection(db, "orders"));

        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // 🔥 UPDATE STATUS
  const updateStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, "orders", id), { status });

      // update UI instantly
      setOrders((prev) =>
        prev.map((o) =>
          o.id === id ? { ...o, status } : o
        )
      );

    } catch (error) {
      console.error(error);
      alert("Error updating status ❌");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-3xl font-bold mb-6">Admin Orders</h1>

      {loading ? (
        <p>Loading...</p>
      ) : orders.length === 0 ? (
        <p>No orders found ❌</p>
      ) : (
        <div className="space-y-6">

          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-700 rounded-lg p-5 bg-gray-900"
            >

              {/* HEADER */}
              <div className="flex justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-400">
                    Order ID: {order.id}
                  </p>
                  <p className="text-sm">
                    User ID: {order.userId}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-yellow-400">
                    ₹{order.totalAmount}
                  </p>

                  <p
                    className={`text-sm capitalize ${
                      order.status === "pending"
                        ? "text-red-400"
                        : order.status === "approved"
                        ? "text-yellow-400"
                        : "text-green-400"
                    }`}
                  >
                    {order.status}
                  </p>
                </div>
              </div>

              {/* CUSTOMER */}
              <div className="mb-4">
                <p className="text-sm text-gray-400">Customer</p>
                <p>{order.customer?.name}</p>
                <p>{order.customer?.phone}</p>
                <p className="text-sm text-gray-400">
                  {order.customer?.address}
                </p>
              </div>

              {/* ITEMS */}
              <div className="space-y-2">
                <p className="text-sm text-gray-400">Items</p>

                {order.items?.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex justify-between border-b border-gray-800 pb-2"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              {/* PAYMENT */}
              <div className="mt-4">
                <p className="text-sm text-gray-400">Payment</p>
                <p>{order.paymentMethod}</p>

                {order.paymentScreenshot && (
                  <p className="text-xs text-gray-500">
                    Screenshot: {order.paymentScreenshot}
                  </p>
                )}
              </div>

              {/* 🔥 ACTION BUTTONS */}
              <div className="mt-4 flex gap-2">

                {order.status === "pending" && (
                  <button
                    onClick={() =>
                      updateStatus(order.id, "approved")
                    }
                    className="bg-yellow-600 px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                )}

                {order.status === "approved" && (
                  <button
                    onClick={() =>
                      updateStatus(order.id, "delivered")
                    }
                    className="bg-green-600 px-3 py-1 rounded"
                  >
                    Mark Delivered
                  </button>
                )}

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}