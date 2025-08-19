import React, { useEffect, useState } from "react";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    const fetchDashboard = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/dashboard/${user.id}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        const data = await res.json();
        setDashboardData(data);
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading dashboard...</p>;
  if (!dashboardData) return <p className="text-center mt-10">No data available.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl text-white font-bold mb-4">Welcome, {dashboardData.name} 👋</h2>

      <div className="grid grid-cols-2 gap-6">
        <div className="p-4 bg-white rounded-2xl shadow-md">
          <h3 className="font-semibold">Solved Problems</h3>
          <p className="text-xl">{dashboardData.solved?.length || 0}</p>
        </div>

        <div className="p-4 bg-white rounded-2xl shadow-md">
          <h3 className="font-semibold">Bookmarked Problems</h3>
          <p className="text-xl">{dashboardData.bookmarks?.length || 0}</p>
        </div>
      </div>
    </div>
  );
}
