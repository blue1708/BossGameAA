const CartManager = {
    getCart: () => {
        try {
            const cart = localStorage.getItem('boss_cart');
            return cart ? JSON.parse(cart) : [];
        } catch (error) {
            console.error('Error loading cart:', error);
            return [];
        }
    },

    saveCart: (cartItems) => {
        try {
            localStorage.setItem('boss_cart', JSON.stringify(cartItems));
        } catch (error) {
            console.error('Error saving cart:', error);
        }
    },

    addToCart: (game) => {
        const cart = CartManager.getCart();
        const existingItem = cart.find(item => item.id === game.id);
        
        if (!existingItem) {
            cart.push({ ...game, quantity: 1 });
            CartManager.saveCart(cart);
        }
        
        return cart;
    },

    removeFromCart: (gameId) => {
        const cart = CartManager.getCart();
        const updatedCart = cart.filter(item => item.id !== gameId);
        CartManager.saveCart(updatedCart);
        return updatedCart;
    },

    clearCart: () => {
        localStorage.removeItem('boss_cart');
        return [];
    },

    getLibrary: () => {
        try {
            const library = localStorage.getItem('boss_library');
            return library ? JSON.parse(library) : [];
        } catch (error) {
            console.error('Error loading library:', error);
            return [];
        }
    },

    addToLibrary: (games) => {
        try {
            const library = CartManager.getLibrary();
            const newGames = games.filter(game => !library.find(lib => lib.id === game.id));
            const updatedLibrary = [...library, ...newGames];
            localStorage.setItem('boss_library', JSON.stringify(updatedLibrary));
            return updatedLibrary;
        } catch (error) {
            console.error('Error adding to library:', error);
            return CartManager.getLibrary();
        }
    }
};
