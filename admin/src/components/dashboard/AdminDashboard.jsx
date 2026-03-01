import React from 'react';
import { useDispatch } from 'react-redux';
import { adminLogout } from '../../store/authSlice';
import adminService from '../../services/adminService';
import { useQuery } from '@tanstack/react-query';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { LogOut, Users, Trash2, ShieldCheck, Activity } from 'lucide-react';

const AdminDashboard = () => {
  const dispatch = useDispatch();

  // Queries
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['adminStats'],
    queryFn: adminService.getAdminStats,
  });

  const { data: workerStats = [], isLoading: workersLoading } = useQuery({
    queryKey: ['adminWorkerStats'],
    queryFn: adminService.getWorkerStats,
  });

  const loading = statsLoading || workersLoading;



  const handleLogout = () => {
    dispatch(adminLogout());
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Sample data for charts
  // Derived data for charts
  const userRoleData = [
    { name: 'Citizens', value: stats?.users?.citizens || 0 },
    { name: 'Workers', value: stats?.users?.workers || 0 },
    { name: 'Admins', value: (stats?.users?.total || 0) - ((stats?.users?.citizens || 0) + (stats?.users?.workers || 0)) }
  ];

  const COLORS = ['#06b6d4', '#8b5cf6', '#10b981'];

  const binStatusData = [
    { name: 'Empty', count: stats?.bins?.empty || 0 },
    { name: 'Full', count: stats?.bins?.full || 0 },
    { name: 'Requested', count: stats?.bins?.requested || 0 }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      {/* Sidebar / Topnav simplified for demo */}
      <nav className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-cyan-400" />
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Admin Portal
          </span>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors border border-gray-600 hover:border-gray-500"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </nav>

      <main className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Activity className="text-cyan-400" /> System Overview
          </h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-lg relative overflow-hidden group hover:border-cyan-500/50 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Users className="w-24 h-24 text-cyan-400" />
            </div>
            <p className="text-gray-400 text-sm font-medium mb-1">Total Users</p>
            <h2 className="text-4xl font-bold text-white">{stats?.users?.total || 0}</h2>
            <div className="mt-4 flex gap-4 text-sm">
              <span className="text-cyan-400">{stats?.users?.citizens || 0} Citizens</span>
              <span className="text-purple-400">{stats?.users?.workers || 0} Workers</span>
            </div>
          </div>
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-lg relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Trash2 className="w-24 h-24 text-emerald-400" />
            </div>
            <p className="text-gray-400 text-sm font-medium mb-1">Active Bins</p>
            <h2 className="text-4xl font-bold text-white">{stats?.bins?.total || 0}</h2>
            <div className="mt-4 flex gap-4 text-sm">
              <span className="text-emerald-400">{stats?.bins?.empty || 0} Good</span>
              <span className="text-gray-400">{(stats?.bins?.full || 0) + (stats?.bins?.overflowing || 0)} Need Pickup</span>
            </div>
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-lg relative overflow-hidden group hover:border-blue-500/50 transition-colors">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Activity className="w-24 h-24 text-blue-400" />
            </div>
            <p className="text-gray-400 text-sm font-medium mb-1">Pending Pickups</p>
            <h2 className="text-4xl font-bold text-white">{stats?.pickups?.pending || 0}</h2>
            <div className="mt-4 flex gap-4 text-sm">
              <span className="text-blue-400">{stats?.pickups?.completed || 0} Completed</span>
              <span className="text-gray-400">Total active requests</span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Pie Chart: User Distribution */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-6">User Distribution</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={userRoleData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {userRoleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6' }}
                    itemStyle={{ color: '#f3f4f6' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart: Bin Statuses */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-lg">
            <h3 className="text-lg font-semibold text-white mb-6">Bin Status Overview</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer>
                <BarChart data={binStatusData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                  <XAxis dataKey="name" stroke="#9ca3af" tickLine={false} axisLine={false} />
                  <YAxis stroke="#9ca3af" tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{fill: '#374151', opacity: 0.4}}
                    contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', color: '#f3f4f6', borderRadius: '0.5rem' }}
                  />
                  <Bar dataKey="count" fill="#06b6d4" radius={[4, 4, 0, 0]} maxBarSize={50}>
                    {binStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={
                        entry.name === 'Full' ? '#ef4444' : 
                        entry.name === 'Requested' ? '#f472b6' : '#10b981'
                      } />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Worker Performance Grid */}
        <div className="mt-8">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Users className="text-cyan-400" /> Worker Performance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {workerStats.map((ws) => (
              <div key={ws.worker._id} className="bg-gray-800 rounded-2xl p-6 border border-gray-700 shadow-lg hover:border-purple-500/50 transition-colors">
                <h4 className="text-xl font-bold text-white mb-4">{ws.worker.name || 'Unnamed Worker'}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700/50 rounded-xl p-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-semibold">Assigned</p>
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-3xl font-bold text-blue-400">{ws.dailyAssigned}</span>
                      <span className="text-sm font-medium text-gray-500">Today</span>
                    </div>
                    <div className="flex justify-between items-baseline mt-2 pt-2 border-t border-gray-600/50">
                      <span className="text-base font-semibold text-gray-300">{ws.totalAssigned}</span>
                      <span className="text-xs text-gray-500">Total</span>
                    </div>
                  </div>
                  <div className="bg-gray-700/50 rounded-xl p-4">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2 font-semibold">Completed</p>
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-3xl font-bold text-emerald-400">{ws.dailyCompleted}</span>
                      <span className="text-sm font-medium text-gray-500">Today</span>
                    </div>
                    <div className="flex justify-between items-baseline mt-2 pt-2 border-t border-gray-600/50">
                      <span className="text-base font-semibold text-gray-300">{ws.totalCompleted}</span>
                      <span className="text-xs text-gray-500">Total</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;
