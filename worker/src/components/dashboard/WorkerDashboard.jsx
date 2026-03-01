import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { workerLogout } from '../../store/authSlice';
import api from '../../api/api';
import workerService from '../../services/workerService';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { LogOut, MapPin, Calendar, CheckCircle, Camera, UploadCloud, X, Recycle, User, ChevronDown } from 'lucide-react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const WorkerDashboard = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { workerUser } = useSelector((state) => state.auth);
  
  const [selectedTask, setSelectedTask] = useState(null);
  
  const [photo, setPhoto] = useState(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const fileInputRef = useRef(null);

  // React Query Fetch Tasks
  const { data: tasks = [], isLoading: tasksLoading } = useQuery({
    queryKey: ['workerTasks'],
    queryFn: workerService.getAssignedTasks,
  });

  // React Query Fetch Stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['workerStats'],
    queryFn: workerService.getWorkerStats,
  });

  // React Query Completion Mutation
  const completeMutation = useMutation({
    mutationFn: ({ taskId, photoFile }) => workerService.completePickup(taskId, photoFile),
    onSuccess: () => {
      setSelectedTask(null);
      setPhoto(null);
      toast.success('Task completed successfully! Great job! 🎉');
      // Invalidate queries to fetch fresh data
      queryClient.invalidateQueries({ queryKey: ['workerTasks'] });
      queryClient.invalidateQueries({ queryKey: ['workerStats'] });
    },
    onError: (error) => {
      console.error('Error completing task:', error);
      toast.error('Failed to complete task. Please try again.');
    },
  });

  const handleComplete = async (e) => {
    e.preventDefault();
    if (!photo) {
      toast.warning("Please upload a photo of the empty bin.");
      return;
    }
    
    completeMutation.mutate({ taskId: selectedTask._id, photoFile: photo });
  };

  const handleLogout = () => {
    dispatch(workerLogout());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <header className="fixed w-full top-0 z-50 transition-all duration-300 py-2 bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-200/50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Brand Logo & Title */}
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-3 group cursor-default">
                <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg">
                  <Recycle className="text-white w-6 h-6 transform group-hover:-rotate-90 transition-transform duration-500" />
                </div>
                <div className="flex flex-col hidden sm:flex">
                  <span className="text-xl font-extrabold tracking-tight text-gray-900">
                    Gully Clean
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-wider text-blue-600">
                    Smart City Waste
                  </span>
                </div>
              </div>
              <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
              <h1 className="text-lg font-bold text-gray-700">
                Worker Dashboard
              </h1>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
                >
                  <img 
                    alt="Avatar" 
                    src={`https://ui-avatars.com/api/?name=${workerUser?.name?.replace(/\s/g, '+')}&background=random&color=fff&bold=true`} 
                    className="w-7 h-7 rounded-full bg-gray-200 shadow-sm"
                  />
                  <span className="text-sm font-semibold text-gray-700 hidden sm:block">
                    {workerUser?.name?.split(' ')[0]}
                  </span>
                  <ChevronDown size={14} className={`transition-transform duration-300 text-gray-400 ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-100/50 py-2 z-50 transform origin-top-right transition-all">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-bold text-gray-900 truncate">{workerUser?.name}</p>
                      <p className="text-xs font-medium text-blue-600 capitalize mt-0.5">{workerUser?.role || 'worker'}</p>
                    </div>
                    <div className="p-2">
                      <Link 
                        to="/profile" 
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-xl transition-colors mb-1"
                      >
                        <User size={16} /> My Profile
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <LogOut size={16} /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto pt-28 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Worker Dashboard</h2>
          <p className="mt-1 text-sm text-gray-500">Manage your assigned bins and view your performance.</p>
        </div>

        {/* Worker Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center gap-4">
              <div className="p-4 bg-blue-100 rounded-xl text-blue-600">
                <CheckCircle size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Completed Today</p>
                <h3 className="text-2xl font-bold text-gray-900">{stats.dailyCompleted}</h3>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center gap-4">
              <div className="p-4 bg-green-100 rounded-xl text-green-600">
                <CheckCircle size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Total Completed</p>
                <h3 className="text-2xl font-bold text-gray-900">{stats.totalCompleted}</h3>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex items-center gap-4">
              <div className="p-4 bg-orange-100 rounded-xl text-orange-600">
                <Calendar size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Tasks</p>
                <h3 className="text-2xl font-bold text-gray-900">{stats.pendingTasks}</h3>
              </div>
            </div>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">Assigned Pickups</h2>
        </div>

        {tasksLoading ? (
          <div className="flex justify-center py-20">
            <div className="h-10 w-10 border-4 border-blue-500 border-t-transparent flex items-center justify-center rounded-full animate-spin" />
          </div>
        ) : tasks.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">You're all caught up!</h3>
            <p className="text-gray-500">There are currently no bins assigned to you for pickup.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <div key={task._id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#F58AED]/10 text-[#F58AED] border border-[#F58AED]/20">
                      Bin: {task.bin?.binId}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(task.requestedDate).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{task.location}</h3>
                  
                  {task.notes && (
                    <p className="text-sm text-gray-600 mb-4 bg-gray-50 p-3 rounded-lg border border-gray-100 italic">
                      "{task.notes}"
                    </p>
                  )}
                  
                  <div className="mt-6 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => setSelectedTask(task)}
                      className="w-full inline-flex justify-center items-center gap-2 px-4 py-2.5 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                      <CheckCircle size={18} />
                      Mark as Completed
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Completion Modal */}
      {selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-gray-900/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-6 overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Complete Pickup</h3>
                </div>
                <button 
                  onClick={() => { setSelectedTask(null); setPhoto(null); }} 
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="mb-6 space-y-1">
                <p className="text-gray-900 font-medium flex items-center gap-2">
                  <MapPin size={16} className="text-gray-500" /> 
                  {selectedTask.location}
                </p>
                <p className="text-sm text-gray-500 pl-6">Bin ID: {selectedTask.bin?.binId}</p>
              </div>

              {/* Upload Area */}
              <div 
                className={`border-2 border-dashed rounded-xl p-8 mb-6 cursor-pointer flex flex-col items-center justify-center text-center transition-colors ${
                  photo ? 'border-green-300 bg-green-50 hover:bg-green-100' : 'border-blue-200 bg-blue-50 hover:bg-blue-100'
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                {photo ? (
                  <>
                    <CheckCircle className="w-12 h-12 text-green-500 mb-3" />
                    <p className="font-semibold text-gray-900 truncate max-w-full px-4">{photo.name}</p>
                    <p className="text-sm text-gray-500 mt-1">Tap to change image</p>
                  </>
                ) : (
                  <>
                    <UploadCloud className="w-12 h-12 text-blue-500 mb-3" />
                    <p className="font-semibold text-gray-900">Upload Empty Bin Photo</p>
                    <p className="text-sm text-gray-500 mt-1">Required proof of completion</p>
                  </>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={(e) => setPhoto(e.target.files[0])} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <button
                  onClick={() => { setSelectedTask(null); setPhoto(null); }}
                  className="w-full sm:w-1/3 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleComplete}
                  disabled={completeMutation.isPending || !photo}
                  className="w-full sm:w-2/3 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  {completeMutation.isPending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={20} />
                      Confirm Completion
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerDashboard;
