function GameCategories({ games, onGameClick, onAddToCart, searchQuery, activeSection, user, onLoginRequired }) {
    try {
        const [selectedCategory, setSelectedCategory] = React.useState('Todos');
        const [sortBy, setSortBy] = React.useState('popular');

        const categories = ['Todos', 'Acción', 'RPG', 'Estrategia', 'Aventura', 'Simulación', 'Deportes', 'Shooter'];

        let filteredGames = games;

        // Filtrar por sección activa
        if (activeSection === 'novedades') {
            filteredGames = filteredGames.filter(game => game.isNew);
        } else if (activeSection === 'ofertas') {
            filteredGames = filteredGames.filter(game => game.discount);
        }

        // Filtrar por categoría
        if (selectedCategory !== 'Todos') {
            filteredGames = filteredGames.filter(game => 
                game.genres.includes(selectedCategory)
            );
        }

        // Filtrar por búsqueda
        if (searchQuery) {
            filteredGames = filteredGames.filter(game =>
                game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                game.genres.some(genre => genre.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        }

        // Ordenar juegos
        filteredGames.sort((a, b) => {
            switch (sortBy) {
                case 'precio-bajo':
                    return a.price - b.price;
                case 'precio-alto':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
                case 'fecha':
                    return new Date(b.releaseDate) - new Date(a.releaseDate);
                default:
                    return b.reviews - a.reviews;
            }
        });

        const getSectionTitle = () => {
            switch (activeSection) {
                case 'novedades':
                    return 'Últimos Lanzamientos';
                case 'ofertas':
                    return 'Ofertas Especiales';
                case 'categorias':
                    return 'Explorar por Categorías';
                default:
                    return 'Catálogo de Juegos';
            }
        };

        return (
            <section data-name="game-categories" data-file="components/GameCategories.js" className="mb-8">
                <div className="mb-6">
                    <h2 className="text-2xl font-bold mb-4 neon-text">{getSectionTitle()}</h2>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                        <div className="flex flex-wrap gap-2">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                        selectedCategory === category
                                            ? 'bg-green-400 text-black'
                                            : 'bg-gray-800 text-white hover:bg-gray-700'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-green-400"
                        >
                            <option value="popular">Más Popular</option>
                            <option value="rating">Mejor Valorados</option>
                            <option value="precio-bajo">Precio: Menor a Mayor</option>
                            <option value="precio-alto">Precio: Mayor a Menor</option>
                            <option value="fecha">Más Recientes</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredGames.map(game => (
                        <GameCard
                            key={game.id}
                            game={game}
                            onGameClick={onGameClick}
                            onAddToCart={onAddToCart}
                            user={user}
                            onLoginRequired={onLoginRequired}
                        />
                    ))}
                </div>

                {filteredGames.length === 0 && (
                    <div className="text-center py-12">
                        <i className="fas fa-search text-4xl text-gray-600 mb-4"></i>
                        <p className="text-xl text-gray-400">No se encontraron juegos que coincidan con tu búsqueda</p>
                        <p className="text-gray-500 mt-2">Intenta con otros términos o categorías</p>
                    </div>
                )}
            </section>
        );
    } catch (error) {
        console.error('GameCategories component error:', error);
        reportError(error);
    }
}
