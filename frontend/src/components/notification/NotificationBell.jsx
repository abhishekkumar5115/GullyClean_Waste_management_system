// src/components/notifications/NotificationBell.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';
import NotificationList from './NotificationList';
import { useSelector, useDispatch } from 'react-redux';
import { markAllRead } from '../../store/notificationsSlice';

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const ref = useRef();
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notifications.list);
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleBellClick = () => {
    setOpen((o) => !o);
    if (unreadCount > 0) {
      dispatch(markAllRead());
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={handleBellClick}
        className="btn btn-ghost btn-circle relative"
        title="Notifications"
      >
        <Bell className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="badge badge-sm badge-error indicator-item">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 z-50">
          <NotificationList notifications={notifications} />
        </div>
      )}
    </div>
  );
}
