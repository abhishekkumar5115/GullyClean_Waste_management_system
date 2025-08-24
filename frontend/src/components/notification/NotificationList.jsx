// src/components/notifications/NotificationList.jsx
import React from 'react';
import { X } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { removeNotification, markRead } from '../../store/notificationsSlice';

export default function NotificationList({ notifications }) {
  const dispatch = useDispatch();

  if (notifications.length === 0) {
    return (
      <div className="card bg-base-100 shadow">
        <div className="card-body text-center text-gray-500">
          No notifications.
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-base-100 shadow">
      <div className="card-body p-2">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`flex items-start p-2 mb-1 rounded hover:bg-gray-100 ${
              n.read ? 'opacity-60' : 'bg-gray-50'
            }`}
          >
            <div className="flex-1 cursor-pointer" onClick={() => dispatch(markRead(n.id))}>
              <p className="text-sm font-medium">{n.title}</p>
              <p className="text-xs text-gray-600">{n.message}</p>
              <p className="text-[10px] text-gray-400 mt-1">{new Date(n.date).toLocaleString()}</p>
            </div>
            <button
              onClick={() => dispatch(removeNotification(n.id))}
              className="btn btn-ghost btn-xs text-gray-400 ml-2"
              title="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
