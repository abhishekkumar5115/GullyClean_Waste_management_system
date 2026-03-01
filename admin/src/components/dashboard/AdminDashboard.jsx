import React from 'react';
import { useDispatch } from 'react-redux';
import { adminLogout } from '../../store/authSlice';
import adminService from '../../services/adminService';
import { useQuery } from '@tanstack/react-query';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { LogOut, Users, Trash2, ShieldCheck, Activity, Target, TrendingUp, Cpu, Server } from 'lucide-react';

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
      <div className="min-h-screen bg-[#0B1121] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
           <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
           <p className="text-cyan-500 font-bold tracking-widest text-sm uppercase">Loading Secure Data</p>
        </div>
      </div>
    );
  }

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
    <div className="min-h-screen bg-[#0B1121] text-gray-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-100">
      
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 bg-[#0B1121]/80 backdrop-blur-xl border-b border-white/5 shadow-lg">
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black tracking-tight text-white leading-none">ADMINISTRATOR</h1>
              <p className="text-[10px] font-bold text-cyan-400 tracking-widest uppercase mt-0.5">Secure Terminal</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
             <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-bold text-green-400 uppercase tracking-widest">System Online</span>
             </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-red-500/10 hover:text-red-400 rounded-lg text-sm font-bold transition-all border border-white/10 hover:border-red-500/30 text-gray-300"
            >
              <LogOut size={16} />
              Terminate Session
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto p-6 space-y-8 pt-8 pb-20">
        
        {/* Header Title Area */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-2">
          <div>
            <h2 className="text-3xl font-black text-white flex items-center gap-3 tracking-tight">
              <Activity className="text-cyan-400 w-8 h-8" /> Central Command
            </h2>
            <p className="text-gray-400 font-medium mt-1 ml-11">Overview of all active city nodes and workforce metrics.</p>
          </div>
        </div>

        {/* Global KPI Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="bg-[#131B2F] rounded-3xl p-6 border border-white/5 shadow-2xl relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-500 hover:-translate-y-1">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all"></div>
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
              <Users className="w-16 h-16 text-cyan-400" />
            </div>
            
            <div className="relative z-10">
               <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
                     <Users size={20} className="text-cyan-400" />
                  </div>
                  <p className="text-cyan-400 text-xs font-bold uppercase tracking-widest">Network Citizens</p>
               </div>
               
               <h2 className="text-5xl font-black text-white mb-4 tracking-tighter">{stats?.users?.total || 0}</h2>
               
               <div className="flex gap-3 text-sm font-medium">
                  <div className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                     <span className="text-gray-300">{stats?.users?.citizens || 0} Citizens</span>
                  </div>
                  <div className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                     <span className="text-gray-300">{stats?.users?.workers || 0} Workers</span>
                  </div>
               </div>
            </div>
          </div>

          <div className="bg-[#131B2F] rounded-3xl p-6 border border-white/5 shadow-2xl relative overflow-hidden group hover:border-emerald-500/40 transition-all duration-500 hover:-translate-y-1">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all"></div>
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
              <Trash2 className="w-16 h-16 text-emerald-400" />
            </div>
            
            <div className="relative z-10">
               <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                     <Server size={20} className="text-emerald-400" />
                  </div>
                  <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Active Hardware (Bins)</p>
               </div>
               
               <h2 className="text-5xl font-black text-white mb-4 tracking-tighter">{stats?.bins?.total || 0}</h2>
               
               <div className="flex gap-3 text-sm font-medium">
                  <div className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
                     <span className="text-gray-300 mx-1">{stats?.bins?.empty || 0} Good</span>
                  </div>
                  <div className="bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20 flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>
                     <span className="text-red-300">{(stats?.bins?.full || 0) + (stats?.bins?.overflowing || 0)} Critical</span>
                  </div>
               </div>
            </div>
          </div>

          <div className="bg-[#131B2F] rounded-3xl p-6 border border-white/5 shadow-2xl relative overflow-hidden group hover:border-blue-500/40 transition-all duration-500 hover:-translate-y-1">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all"></div>
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
              <Target className="w-16 h-16 text-blue-400" />
            </div>
            
            <div className="relative z-10">
               <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                     <Target size={20} className="text-blue-400" />
                  </div>
                  <p className="text-blue-400 text-xs font-bold uppercase tracking-widest">Action Queue</p>
               </div>
               
               <h2 className="text-5xl font-black text-white mb-4 tracking-tighter">{stats?.pickups?.pending || 0}</h2>
               
               <div className="flex gap-3 text-sm font-medium">
                  <div className="bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                     <span className="text-gray-300">{stats?.pickups?.completed || 0} Completed</span>
                  </div>
                  <div className="bg-cyan-500/10 px-3 py-1.5 rounded-lg border border-cyan-500/20 flex items-center gap-2 text-cyan-300">
                     Total Pending Ops
                  </div>
               </div>
            </div>
          </div>

        </div>

        {/* Analytics Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
          
          <div className="bg-[#131B2F] rounded-3xl p-8 border border-white/5 shadow-2xl relative">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
               <Cpu className="text-cyan-400" /> User Roles Distribution
            </h3>
            <div className="h-80 w-full relative z-10">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={userRoleData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                    cornerRadius={8}
                  >
                    {userRoleData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ backgroundColor: '#0B1121', borderColor: 'rgba(255,255,255,0.1)', color: '#f3f4f6', borderRadius: '1rem', fontWeight: 'bold', padding: '12px 20px', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}
                    itemStyle={{ color: '#f3f4f6', fontSize: '16px' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ paddingTop: '20px', fontWeight: 'bold', color: '#9ca3af' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-[#131B2F] rounded-3xl p-8 border border-white/5 shadow-2xl relative">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
               <TrendingUp className="text-emerald-400" /> Infrastructure Health
            </h3>
            <div className="h-80 w-full relative z-10">
              <ResponsiveContainer>
                <BarChart data={binStatusData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#2a3449" vertical={false} opacity={0.5} />
                  <XAxis dataKey="name" stroke="#6b7280" tickLine={false} axisLine={false} tick={{fontWeight: 'bold', fontSize: 13}} dy={10} />
                  <YAxis stroke="#6b7280" tickLine={false} axisLine={false} tick={{fontWeight: 'bold'}} dx={-10} />
                  <Tooltip 
                    cursor={{fill: '#1e293b', opacity: 0.6}}
                    contentStyle={{ backgroundColor: '#0B1121', borderColor: 'rgba(255,255,255,0.1)', color: '#f3f4f6', borderRadius: '1rem', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="count" fill="#06b6d4" radius={[8, 8, 0, 0]} maxBarSize={60}>
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
        <div className="pt-8">
          <div className="flex items-center justify-between mb-6">
             <h3 className="text-2xl font-black text-white flex items-center gap-3 tracking-tight">
               <Users className="text-purple-400 w-7 h-7" /> Node Operators (Workers)
             </h3>
             <div className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-lg text-sm font-bold">
               {workerStats.length} Operators Online
             </div>
          </div>
          
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {workerStats.map((ws) => (
              <div key={ws.worker._id} className="bg-[#131B2F] rounded-2xl p-6 lg:p-8 border border-white/5 shadow-2xl hover:border-purple-500/30 transition-colors flex flex-col sm:flex-row gap-8 items-center">
                
                {/* Worker Identity */}
                <div className="flex flex-col items-center sm:items-start sm:w-1/3">
                   <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 p-1 mb-4 shadow-lg shadow-purple-500/20">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${ws.worker.name?.replace(/\s/g, '+')}&background=0B1121&color=fff&bold=true&size=100`} 
                        alt="worker" 
                        className="w-full h-full rounded-xl object-cover"
                      />
                   </div>
                   <h4 className="text-xl font-black text-white text-center sm:text-left">{ws.worker.name || 'Unnamed Operator'}</h4>
                   <p className="text-xs text-purple-400 font-bold uppercase tracking-widest mt-1">ID: {ws.worker._id.substring(0,8)}</p>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 w-full sm:w-2/3">
                  
                  {/* Assigned Stats */}
                  <div className="bg-[#0B1121] rounded-2xl p-5 border border-white/5">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black mb-3">Tasks Dispatched</p>
                    <div className="flex justify-between items-end mb-4">
                      <span className="text-4xl font-black text-blue-400 leading-none">{ws.dailyAssigned}</span>
                      <span className="text-xs font-bold text-gray-400 bg-white/5 px-2 py-1 rounded-md">Today</span>
                    </div>
                    <div className="w-full h-px bg-white/5 my-3"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-300">{ws.totalAssigned}</span>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Altogether</span>
                    </div>
                  </div>
                  
                  {/* Completed Stats */}
                  <div className="bg-[#0B1121] rounded-2xl p-5 border border-white/5">
                    <p className="text-[10px] text-gray-500 uppercase tracking-widest font-black mb-3">Tasks Resolved</p>
                    <div className="flex justify-between items-end mb-4">
                      <span className="text-4xl font-black text-emerald-400 leading-none">{ws.dailyCompleted}</span>
                      <span className="text-xs font-bold text-gray-400 bg-white/5 px-2 py-1 rounded-md">Today</span>
                    </div>
                    <div className="w-full h-px bg-white/5 my-3"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-300">{ws.totalCompleted}</span>
                      <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Altogether</span>
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
