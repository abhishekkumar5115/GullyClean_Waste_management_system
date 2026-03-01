import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPickup } from '../../store/pickupSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Send, MapPin, AlertCircle, Trash2, Camera, Upload } from 'lucide-react';
import { toast } from 'react-toastify';

import api from '../../api/api';

const PickupRequestForm = () => {
  const [searchParams] = useSearchParams();
  const initialBinId = searchParams.get('binId') || '';
  const initialLocation = searchParams.get('location') || '';

  const [binId, setBinId] = useState(initialBinId);
  const [location, setLocation] = useState(initialLocation);
  const [notes, setNotes] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status } = useSelector((state) => state.pickup);

  // If auto-filled, we might want to "lock" them conceptually, but visually we just make them readonly for better UX
  const isAutoFilled = !!initialBinId;

  const handleFileChange = (e) => {
      const selectedFile = e.target.files[0];
      if (selectedFile) {
          setFile(selectedFile);
          const url = URL.createObjectURL(selectedFile);
          setPreviewUrl(url);
      }
  };

  const removeFile = () => {
      setFile(null);
      setPreviewUrl(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    let citizenPhoto = null;
    if (file) {
      try {
        const formData = new FormData();
        formData.append('image', file);
        const { data } = await api.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-upload-context': `CITIZEN-Req-${binId || 'NoBin'}`,
          },
        });
        citizenPhoto = data.imageUrl;
      } catch (err) {
        console.error('Image upload failed', err);
        toast.error('Failed to upload photo');
        setUploading(false);
        return;
      }
    }

    dispatch(createPickup({ binId, location, notes, citizenPhoto }))
      .unwrap()
      .then(() => {
        toast.success('Pickup requested successfully! 🌱');
        setUploading(false);
        navigate('/bins');
      })
      .catch((error) => {
        setUploading(false);
        toast.error(error || 'Failed to request pickup.');
      });
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 relative">
      <div className="bg-white rounded-[2rem] shadow-[0_8px_40px_rgb(0,0,0,0.08)] border border-gray-100 overflow-hidden relative z-10">
        
        {/* Abstract Header Graphic */}
        <div className="h-32 bg-indigo-600 relative overflow-hidden">
             <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
             <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
             <div className="absolute bottom-[-50px] left-[-50px] w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
             
             <div className="absolute bottom-6 left-8 flex items-center gap-4">
                 <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 text-white shadow-lg">
                    <Trash2 size={28} strokeWidth={2} />
                 </div>
                 <div>
                     <h2 className="text-2xl font-black text-white leading-tight">Request Cleanup</h2>
                     <p className="text-blue-100 font-medium text-sm">Help keep our city perfectly clean.</p>
                 </div>
             </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Bin ID */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center"><Trash2 size={12} /></span>
                  Bin Identifier
                </label>
                <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. BIN-1234"
                      className={`uppercase w-full pl-5 pr-4 py-3.5 text-gray-900 font-medium text-lg border-2 rounded-2xl transition-all focus:outline-none focus:ring-4 focus:ring-blue-100 ${isAutoFilled ? 'bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-50 border-gray-200 focus:border-blue-500 hover:border-gray-300'}`}
                      required
                      readOnly={isAutoFilled}
                      value={binId}
                      onChange={(e) => setBinId(e.target.value.toUpperCase())}
                    />
                    {isAutoFilled && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 bg-gray-200 px-2 py-1 rounded-md uppercase">Locked</div>
                    )}
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"><MapPin size={12} /></span>
                  Bin Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Near Main Gate"
                  className={`w-full px-5 py-3.5 text-gray-900 font-medium text-lg border-2 rounded-2xl transition-all focus:outline-none focus:ring-4 focus:ring-emerald-100 ${isAutoFilled ? 'bg-gray-100 border-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-50 border-gray-200 focus:border-emerald-500 hover:border-gray-300'}`}
                  required
                  readOnly={isAutoFilled}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
          </div>

          <hr className="border-gray-100" />

          {/* Notes */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center"><AlertCircle size={12} /></span>
              Additional Context
            </label>
            <textarea
              rows={3}
              placeholder="Any details to help workers find the bin or understand the situation?"
              className="w-full px-5 py-4 text-gray-900 border-2 rounded-2xl border-gray-200 bg-gray-50 focus:outline-none focus:ring-4 focus:ring-amber-100 focus:border-amber-500 hover:border-gray-300 transition-all resize-none"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Photo Upload Area */}
          <div className="space-y-3">
             <label className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center"><Camera size={12} /></span>
              Photo Evidence (Optional)
            </label>
            
            <div className={`w-full relative border-2 border-dashed rounded-3xl p-8 transition-all duration-300 text-center ${previewUrl ? 'border-purple-300 bg-purple-50/30' : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-gray-400'}`}>
                {previewUrl ? (
                    <div className="relative inline-block">
                        <img src={previewUrl} alt="Bin preview" className="max-h-48 rounded-2xl shadow-md border-4 border-white" />
                        <button 
                            type="button" 
                            onClick={removeFile}
                            className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 hover:scale-110 transition-all"
                        >
                            ✕
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center space-y-3">
                        <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center text-purple-500 mb-2">
                            <Upload size={28} />
                        </div>
                        <p className="text-gray-600 font-medium">Click to upload a picture of the bin</p>
                        <p className="text-sm text-gray-400">JPG, PNG, max 5MB</p>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </div>
                )}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-6 border-t border-gray-100">
            <button
              type="submit"
              disabled={status === 'loading' || uploading}
              className={`w-full py-4 px-8 text-xl font-bold text-white rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_8px_20px_rgb(79,70,229,0.2)] hover:shadow-[0_8px_25px_rgb(79,70,229,0.4)] ${
                status === 'loading' || uploading
                  ? 'bg-gray-400 cursor-not-allowed shadow-none'
                  : 'bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-1'
              }`}
            >
              {(status === 'loading' || uploading) ? (
                <div className="flex items-center gap-3">
                    <span className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></span>
                    <span>Processing Request...</span>
                </div>
              ) : (
                <>
                  Confirm Pickup Request
                  <Send size={22} className="ml-1" />
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default PickupRequestForm;
