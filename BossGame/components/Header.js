function Header({ onCartToggle, onLibraryToggle, onWishlistToggle, cartCount, user, onSearch, onLoginToggle, onProfileToggle, onLogout, onNavigation, activeSection }) {
    try {
        const [searchQuery, setSearchQuery] = React.useState('');

        const handleSearch = (e) => {
            e.preventDefault();
            onSearch(searchQuery);
        };

        const handleCartClick = () => {
            if (!user) {
                onLoginToggle();
                return;
            }
            onCartToggle();
        };

        const navItems = [
            { id: 'tienda', name: 'Tienda', icon: 'fas fa-store' },
            { id: 'novedades', name: 'Novedades', icon: 'fas fa-star' },
            { id: 'ofertas', name: 'Ofertas', icon: 'fas fa-fire' },
            { id: 'categorias', name: 'Categorías', icon: 'fas fa-th-large' }
        ];

        return (
            <header data-name="header" data-file="components/Header.js" className="bg-black bg-opacity-50 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-8">
                            <h1 className="text-3xl font-bold font-mono neon-text">BOSS</h1>
                            <nav className="hidden md:flex space-x-6">
                                {navItems.map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => onNavigation(item.id)}
                                        className={`flex items-center space-x-2 hover:text-green-400 transition-colors ${
                                            activeSection === item.id ? 'text-green-400' : ''
                                        }`}
                                    >
                                        <i className={item.icon}></i>
                                        <span>{item.name}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Buscar videojuegos..."
                                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:border-green-400"
                                />
                                <button type="submit" className="absolute right-3 top-2.5 text-gray-400 hover:text-green-400">
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </form>

                        <div className="flex items-center space-x-4">
                            {user && (
                                <>
                                    <button 
                                        onClick={onWishlistToggle}
                                        className="hidden md:flex items-center space-x-2 hover:text-green-400 transition-colors"
                                    >
                                        <i className="fas fa-heart"></i>
                                        <span>Deseados</span>
                                    </button>
                                    
                                    <button 
                                        onClick={onLibraryToggle}
                                        className="hidden md:flex items-center space-x-2 hover:text-green-400 transition-colors"
                                    >
                                        <i className="fas fa-book"></i>
                                        <span>Biblioteca</span>
                                    </button>
                                </>
                            )}
                            
                            <button 
                                onClick={handleCartClick}
                                className="relative hover:text-green-400 transition-colors"
                            >
                                <i className="fas fa-shopping-cart text-xl"></i>
                                {cartCount > 0 && user && (
                                    <span className="absolute -top-2 -right-2 bg-green-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </button>

                            <div className="relative">
                                {user ? (
                                    <div className="flex items-center space-x-2">
                                        <button 
                                            onClick={onProfileToggle}
                                            className="flex items-center space-x-2 hover:text-green-400 transition-colors"
                                        >
                                            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                                            <span className="hidden md:inline">{user.name}</span>
                                        </button>
                                        <button onClick={onLogout} className="text-red-400 hover:text-red-300 ml-2">
                                            <i className="fas fa-sign-out-alt"></i>
                                        </button>
                                    </div>
                                ) : (
                                    <button 
                                        onClick={onLoginToggle}
                                        className="btn-primary px-4 py-2 rounded-lg font-semibold"
                                    >
                                        Iniciar Sesión
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        );
    } catch (error) {
        console.error('Header component error:', error);
        reportError(error);
    }
}
