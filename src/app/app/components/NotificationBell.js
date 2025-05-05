import { useState } from 'react';

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: 'Deployment of "E-commerce Platform" completed successfully',
      time: '5 minutes ago',
      read: false
    },
    {
      id: 2,
      message: 'Deployment of "Task Management App" failed',
      time: '20 minutes ago',
      read: false
    },
    {
      id: 3,
      message: 'New deployment started by @web3_enthusiast',
      time: '1 hour ago',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;
  
  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };
  
  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="relative">
      <button 
        className="relative p-2 text-gray-300 hover:text-white transition duration-300"
        onClick={toggleNotifications}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50">
          <div className="p-3 border-b border-gray-700 flex justify-between items-center">
            <h3 className="text-white font-medium">Notifications</h3>
            {unreadCount > 0 && (
              <button 
                className="text-xs text-blue-400 hover:text-blue-300"
                onClick={markAllAsRead}
              >
                Mark all as read
              </button>
            )}
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              <div>
                {notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    className={`p-3 border-b border-gray-700 hover:bg-gray-750 ${!notification.read ? 'bg-gray-750' : ''}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="flex items-start">
                      {!notification.read && (
                        <span className="h-2 w-2 mt-1 mr-2 bg-blue-500 rounded-full"></span>
                      )}
                      <div className={`flex-1 ${notification.read ? 'pl-4' : ''}`}>
                        <p className="text-sm text-white">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500">
                No notifications
              </div>
            )}
          </div>
          
          <div className="p-2 border-t border-gray-700 text-center">
            <button className="text-sm text-blue-400 hover:text-blue-300">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
