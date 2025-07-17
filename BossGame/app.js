function App() {
    try {
        const [games] = React.useState(gameData);
        const [cartItems, setCartItems] = React.useState([]);
        const [libraryGames, setLibraryGames] = React.useState([]);
        const [wishlistGames, setWishlistGames] = React.useState([]);
        const [notifications, setNotifications] = React.useState([]);
        const [user, setUser] = React.useState(null);
        const [isCartOpen, setIsCartOpen] = React.useState(false);
        const [isLibraryOpen, setIsLibraryOpen] = React.useState(false);
        const [isWishlistOpen, setIsWishlistOpen] = React.useState(false);
        const [isLoginOpen, setIsLoginOpen] = React.useState(false);
        const [isProfileOpen, setIsProfileOpen] = React.useState(false);
        const [selectedGame, setSelectedGame] = React.useState(null);
        const [searchQuery, setSearchQuery] = React.useState('');
        const [activeSection, setActiveSection] = React.useState('tienda');

        React.useEffect(() => {
            setCartItems(CartManager.getCart());
            setLibraryGames(CartManager.getLibrary());
            setWishlistGames(AuthManager.getWishlist());
            setNotifications(AuthManager.getNotifications());
            setUser(AuthManager.getCurrentUser());
        }, []);

        const handleLogin = (userData) => {
            setUser(userData);
            AuthManager.addNotification({
                title: '¡Bienvenido a BOSS!',
                message: `Hola ${userData.name}, disfruta de nuestros juegos premium`,
                icon: 'fa-user-check',
                color: 'green'
            });
            setNotifications(AuthManager.getNotifications());
        };

        const handleLogout = () => {
            AuthManager.logout();
            setUser(null);
            setIsProfileOpen(false);
            setCartItems([]);
            CartManager.clearCart();
        };

        const handleAddToCart = (game) => {
            if (!user) {
                setIsLoginOpen(true);
                return;
            }
            
            const updatedCart = CartManager.addToCart(game);
            setCartItems(updatedCart);
            
            AuthManager.addNotification({
                title: 'Juego agregado al carrito',
                message: `${game.title} está listo para comprar`,
                icon: 'fa-shopping-cart',
                color: 'blue'
            });
            setNotifications(AuthManager.getNotifications());
        };

        const handleCartToggle = () => {
            if (!user) {
                setIsLoginOpen(true);
                return;
            }
            setIsCartOpen(!isCartOpen);
        };

        const handleAddToWishlist = (game) => {
            if (!user) {
                setIsLoginOpen(true);
                return;
            }
            const updatedWishlist = AuthManager.addToWishlist(game);
            setWishlistGames(updatedWishlist);
        };

        const handleRemoveFromWishlist = (gameId) => {
            const updatedWishlist = AuthManager.removeFromWishlist(gameId);
            setWishlistGames(updatedWishlist);
        };

        const handleCheckout = () => {
            if (cartItems.length === 0) return;
            
            const purchasedGames = cartItems.map(item => ({ ...item, status: 'Listo para instalar' }));
            const updatedLibrary = CartManager.addToLibrary(purchasedGames);
            setLibraryGames(updatedLibrary);
            
            const clearedCart = CartManager.clearCart();
            setCartItems(clearedCart);
            setIsCartOpen(false);
            
            AuthManager.addNotification({
                title: '¡Compra exitosa!',
                message: `${purchasedGames.length} juego(s) agregado(s) a tu biblioteca`,
                icon: 'fa-check-circle',
                color: 'green'
            });
            setNotifications(AuthManager.getNotifications());
            
            alert('¡Compra exitosa! Los juegos se agregaron a tu biblioteca.');
        };

        const handleDismissNotification = (notificationId) => {
            const updated = notifications.filter(n => n.id !== notificationId);
            setNotifications(updated);
            AuthManager.saveNotifications(updated);
        };

        const handleMarkAllRead = () => {
            const updated = notifications.map(n => ({ ...n, read: true }));
            setNotifications(updated);
            AuthManager.saveNotifications(updated);
        };

        return (
            <div data-name="app" data-file="app.js" className="min-h-screen">
                <Header
                    onCartToggle={handleCartToggle}
                    onLibraryToggle={() => setIsLibraryOpen(!isLibraryOpen)}
                    onWishlistToggle={() => setIsWishlistOpen(!isWishlistOpen)}
                    onLoginToggle={() => setIsLoginOpen(!isLoginOpen)}
                    onProfileToggle={() => setIsProfileOpen(!isProfileOpen)}
                    onLogout={handleLogout}
                    onNavigation={setActiveSection}
                    activeSection={activeSection}
                    cartCount={cartItems.length}
                    user={user}
                    onSearch={setSearchQuery}
                />

                <main className="container mx-auto px-4 py-8">
                    <FeaturedGames games={games} onGameClick={setSelectedGame} />
                    <GameCategories
                        games={games}
                        onGameClick={setSelectedGame}
                        onAddToCart={handleAddToCart}
                        searchQuery={searchQuery}
                        activeSection={activeSection}
                        user={user}
                        onLoginRequired={() => setIsLoginOpen(true)}
                    />
                </main>

                <Notifications
                    notifications={notifications}
                    onDismiss={handleDismissNotification}
                    onMarkAllRead={handleMarkAllRead}
                />

                <LoginModal
                    isOpen={isLoginOpen}
                    onClose={() => setIsLoginOpen(false)}
                    onLogin={handleLogin}
                />

                <UserProfile
                    isOpen={isProfileOpen}
                    onClose={() => setIsProfileOpen(false)}
                    user={user}
                    libraryGames={libraryGames}
                />

                <Cart
                    isOpen={isCartOpen}
                    onClose={() => setIsCartOpen(false)}
                    cartItems={cartItems}
                    onRemoveItem={(id) => setCartItems(CartManager.removeFromCart(id))}
                    onCheckout={handleCheckout}
                />

                <Wishlist
                    isOpen={isWishlistOpen}
                    onClose={() => setIsWishlistOpen(false)}
                    wishlistGames={wishlistGames}
                    onRemoveFromWishlist={handleRemoveFromWishlist}
                    onAddToCart={handleAddToCart}
                />

                <UserLibrary
                    isOpen={isLibraryOpen}
                    onClose={() => setIsLibraryOpen(false)}
                    libraryGames={libraryGames}
                />

                <GameModal
                    game={selectedGame}
                    isOpen={!!selectedGame}
                    onClose={() => setSelectedGame(null)}
                    onAddToCart={handleAddToCart}
                    onAddToWishlist={handleAddToWishlist}
                />
            </div>
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
