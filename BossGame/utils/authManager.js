const AuthManager = {
    getCurrentUser: () => {
        try {
            const user = localStorage.getItem('boss_user');
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error('Error loading user:', error);
            return null;
        }
    },

    saveUser: (userData) => {
        try {
            localStorage.setItem('boss_user', JSON.stringify(userData));
            return userData;
        } catch (error) {
            console.error('Error saving user:', error);
            return null;
        }
    },

    logout: () => {
        try {
            localStorage.removeItem('boss_user');
            return true;
        } catch (error) {
            console.error('Error during logout:', error);
            return false;
        }
    },

    updateUser: (updates) => {
        try {
            const currentUser = AuthManager.getCurrentUser();
            if (currentUser) {
                const updatedUser = { ...currentUser, ...updates };
                return AuthManager.saveUser(updatedUser);
            }
            return null;
        } catch (error) {
            console.error('Error updating user:', error);
            return null;
        }
    },

    isLoggedIn: () => {
        return AuthManager.getCurrentUser() !== null;
    },

    getWishlist: () => {
        try {
            const wishlist = localStorage.getItem('boss_wishlist');
            return wishlist ? JSON.parse(wishlist) : [];
        } catch (error) {
            console.error('Error loading wishlist:', error);
            return [];
        }
    },

    saveWishlist: (wishlistItems) => {
        try {
            localStorage.setItem('boss_wishlist', JSON.stringify(wishlistItems));
            return wishlistItems;
        } catch (error) {
            console.error('Error saving wishlist:', error);
            return [];
        }
    },

    addToWishlist: (game) => {
        const wishlist = AuthManager.getWishlist();
        const exists = wishlist.find(item => item.id === game.id);
        
        if (!exists) {
            const updatedWishlist = [...wishlist, game];
            return AuthManager.saveWishlist(updatedWishlist);
        }
        return wishlist;
    },

    removeFromWishlist: (gameId) => {
        const wishlist = AuthManager.getWishlist();
        const updatedWishlist = wishlist.filter(item => item.id !== gameId);
        return AuthManager.saveWishlist(updatedWishlist);
    },

    getNotifications: () => {
        try {
            const notifications = localStorage.getItem('boss_notifications');
            return notifications ? JSON.parse(notifications) : [];
        } catch (error) {
            console.error('Error loading notifications:', error);
            return [];
        }
    },

    saveNotifications: (notifications) => {
        try {
            localStorage.setItem('boss_notifications', JSON.stringify(notifications));
            return notifications;
        } catch (error) {
            console.error('Error saving notifications:', error);
            return [];
        }
    },

    addNotification: (notification) => {
        const notifications = AuthManager.getNotifications();
        const newNotification = {
            id: Date.now(),
            read: false,
            time: new Date().toLocaleString('es-MX'),
            ...notification
        };
        const updated = [newNotification, ...notifications].slice(0, 20);
        return AuthManager.saveNotifications(updated);
    }
};
