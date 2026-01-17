import React, { useEffect, useState } from "react";
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react";
import AdminSidebar from "../Components/AdminBar/AdminSideBar";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  Filler,

} from "chart.js";
import { Pie, Line, Doughnut } from "react-chartjs-2";
import { getAdminDashboard } from "../api/adminApi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  Filler ,
);

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminDashboard()
      .then((res) => setDashboard(res.data))
      .catch((err) => console.error("Dashboard error:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent mb-4"></div>
          <p className="text-lg font-medium text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }



  const productCategoryData = {
    labels: dashboard.productsByCategory.map((c) => c.category),
    datasets: [
      {
        data: dashboard.productsByCategory.map((c) => c.count),
        backgroundColor: ["#6366f1", "#22c55e", "#f59e0b", "#ec4899"],
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  const ordersOverTimeData = {
    labels: dashboard.revenueOverTime.map((o) => o.date),
    datasets: [
      {
        label: "Revenue",
        data: dashboard.revenueOverTime.map((o) => o.amount),
        borderColor: "#6366f1",
        backgroundColor: "rgba(99,102,241,0.1)",
        borderWidth: 3,
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "#6366f1",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointHoverRadius: 6,
      },
    ],
  };

  const userStatusData = {
    labels: ["Active", "Blocked"],
    datasets: [
      {
        data: [
          dashboard.usersByStatus.active,
          dashboard.usersByStatus.blocked,
        ],
        backgroundColor: ["#22c55e", "#ef4444"],
        borderWidth: 0,
        hoverOffset: 8,
      },
    ],
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      
      <div className="w-64 fixed h-screen bg-white border-r border-slate-200 shadow-lg z-10 hidden lg:block">
        <AdminSidebar />
      </div>

     
      <div className="flex-1 lg:ml-64 w-full">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8"
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
              Welcome, Admin 
            </h1>
            <p className="text-slate-600 mt-2 text-sm sm:text-base">
              Overview of your store performance
            </p>
          </motion.div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <StatCard 
              title="Users" 
              value={dashboard.totalUsers} 
              icon={<Users className="w-8 h-8" />}
              color="indigo"
              delay={0.1}
            />
            <StatCard 
              title="Orders" 
              value={dashboard.totalOrders} 
              icon={<ShoppingCart className="w-8 h-8" />}
              color="emerald"
              delay={0.2}
            />
            <StatCard 
              title="Revenue" 
              value={`₹${dashboard.totalRevenue}`} 
              icon={<DollarSign className="w-8 h-8" />}
              color="amber"
              delay={0.3}
            />
            <StatCard
              title="Products Sold"
              value={dashboard.totalProductsPurchased}
              icon={<Package className="w-8 h-8" />}
              color="pink"
              delay={0.4}
            />
          </div>

         
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            <ChartBox title="Products by Category" delay={0.5}>
              <Pie data={productCategoryData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
            </ChartBox>

            <ChartBox title="Revenue Over Time" delay={0.6}>
              <Line data={ordersOverTimeData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
            </ChartBox>

            <ChartBox title="User Status" delay={0.7}>
              <Doughnut data={userStatusData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
            </ChartBox>
          </div>
        </div>
      </div>
    </div>
  );
}



function StatCard({ title, value, icon, color, delay }) {
  const colorMap = {
    indigo: {
      bg: "bg-indigo-50",
      text: "text-indigo-600",
      border: "border-indigo-100"
    },
    emerald: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      border: "border-emerald-100"
    },
    amber: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      border: "border-amber-100"
    },
    pink: {
      bg: "bg-pink-50",
      text: "text-pink-600",
      border: "border-pink-100"
    }
  };

  const colors = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.03, y: -4 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-5 sm:p-6 flex items-center justify-between border border-slate-200"
    >
      <div className="flex-1">
        <p className="text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-wide">
          {title}
        </p>
        <p className="text-2xl sm:text-3xl font-bold mt-2 text-slate-800">
          {value}
        </p>
      </div>
      <div className={`${colors.bg} ${colors.text} p-3 sm:p-4 rounded-xl`}>
        {icon}
      </div>
    </motion.div>
  );
}

function ChartBox({ title, children, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 p-5 sm:p-6 border border-slate-200"
    >
      <h2 className="text-base sm:text-lg font-semibold mb-4 text-slate-800 text-center">
        {title}
      </h2>
      <div className="h-52 sm:h-60">{children}</div>
    </motion.div>
  );
}