import { useAuth } from "./AuthContext";

export default function AdminDashboard({ onNavigate }: any) {
  const { userRole } = useAuth();

  // 🔒 Protect page
  if (userRole !== "admin") {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Access Denied ❌
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* Players */}
        <div
          className="bg-gray-900 p-6 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-800 transition"
          onClick={() => onNavigate?.("add-player")}
        >
          <h2 className="text-lg">Players</h2>
          <p className="text-sm text-gray-400">Manage players</p>
        </div>

        {/* Teams */}
        <div
          className="bg-gray-900 p-6 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-800 transition"
          onClick={() => onNavigate?.("add-team")}
        >
          <h2 className="text-lg">Teams</h2>
          <p className="text-sm text-gray-400">Manage teams</p>
        </div>

        {/* Tournaments */}
        <div
          className="bg-gray-900 p-6 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-800 transition"
          onClick={() => onNavigate?.("add-tournament")}
        >
          <h2 className="text-lg">Tournaments</h2>
          <p className="text-sm text-gray-400">Manage tournaments</p>
        </div>

        {/* Products */}
        <div
          className="bg-gray-900 p-6 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-800 transition"
          onClick={() => onNavigate?.("add-product")}
        >
          <h2 className="text-lg">Products</h2>
          <p className="text-sm text-gray-400">Manage shop</p>
        </div>

        {/* Reviews */}
        <div
          className="bg-gray-900 p-6 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-800 transition"
          onClick={() => onNavigate?.("admin-reviews")}
        >
          <h2 className="text-lg">Reviews</h2>
          <p className="text-sm text-gray-400">Manage reviews</p>
        </div>

        {/* 🔥 NEW: ORDERS */}
        <div
          className="bg-gray-900 p-6 rounded-lg border border-gray-700 cursor-pointer hover:bg-gray-800 transition"
          onClick={() => onNavigate?.("admin-orders")}
        >
          <h2 className="text-lg">Orders</h2>
          <p className="text-sm text-gray-400">Manage orders</p>
        </div>

      </div>

    </div>
  );
}