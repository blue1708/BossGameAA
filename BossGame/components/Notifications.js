function Notifications({ notifications, onDismiss, onMarkAllRead }) {
    try {
        const [isVisible, setIsVisible] = React.useState(false);
        const unreadCount = notifications.filter(n => !n.read).length;

        React.useEffect(() => {
            if (notifications.length > 0) {
                setIsVisible(true);
                const timer = setTimeout(() => setIsVisible(false), 5000);
                return () => clearTimeout(timer);
            }
        }, [notifications]);

        if (!isVisible || notifications.length === 0) return null;

        return (
            <div data-name="notifications" data-file="components/Notifications.js" className="fixed top-20 right-4 z-40 w-80">
                <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden">
                    <div className="flex items-center justify-between p-4 border-b border-gray-700">
                        <div className="flex items-center space-x-2">
                            <i className="fas fa-bell text-green-400"></i>
                            <h3 className="font-bold">Notificaciones</h3>
                            {unreadCount > 0 && (
                                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                    {unreadCount}
                                </span>
                            )}
                        </div>
                        <button 
                            onClick={() => setIsVisible(false)}
                            className="text-gray-400 hover:text-white"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    <div className="max-h-64 overflow-y-auto">
                        {notifications.slice(0, 5).map(notification => (
                            <div 
                                key={notification.id} 
                                className={`p-4 border-b border-gray-800 last:border-b-0 ${
                                    !notification.read ? 'bg-gray-800' : 'bg-gray-900'
                                }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <i className={`fas ${notification.icon} text-${notification.color}-400`}></i>
                                            <h4 className="font-medium text-sm">{notification.title}</h4>
                                        </div>
                                        <p className="text-xs text-gray-400">{notification.message}</p>
                                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                    </div>
                                    <button
                                        onClick={() => onDismiss(notification.id)}
                                        className="text-gray-500 hover:text-gray-300 ml-2"
                                    >
                                        <i className="fas fa-times text-xs"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {unreadCount > 0 && (
                        <div className="p-3 border-t border-gray-700">
                            <button
                                onClick={onMarkAllRead}
                                className="text-green-400 hover:text-green-300 text-sm w-full text-center"
                            >
                                Marcar todas como leídas
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error('Notifications component error:', error);
        reportError(error);
    }
}
