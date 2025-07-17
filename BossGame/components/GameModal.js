function GameModal({ game, isOpen, onClose, onAddToCart, onAddToWishlist }) {
    try {
        if (!isOpen || !game) return null;

        return (
            <div data-name="game-modal" data-file="components/GameModal.js" className="fixed inset-0 z-50 overflow-y-auto">
                <div className="absolute inset-0 bg-black bg-opacity-75" onClick={onClose}></div>
                
                <div className="relative min-h-screen flex items-center justify-center p-4">
                    <div className="relative bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center"
                        >
                            <i className="fas fa-times"></i>
                        </button>

                        <div className="relative">
                            <img src={game.heroImage || game.image} alt={game.title} className="w-full h-64 object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                        </div>

                        <div className="p-6">
                            <div className="flex flex-col md:flex-row justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-3xl font-bold mb-2">{game.title}</h2>
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="flex items-center space-x-1">
                                            {[...Array(5)].map((_, i) => (
                                                <i key={i} className={`fas fa-star ${i < game.rating ? 'text-yellow-400' : 'text-gray-600'}`}></i>
                                            ))}
                                            <span className="text-gray-400 ml-2">({game.reviews} reseñas)</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    {game.originalPrice && game.originalPrice !== game.price && (
                                        <div className="text-gray-400 line-through text-lg">${game.originalPrice}</div>
                                    )}
                                    <div className="text-3xl font-bold text-green-400">
                                        {game.price === 0 ? 'GRATIS' : `$${game.price}`}
                                    </div>
                                    <div className="flex space-x-2 mt-2">
                                        <button
                                            onClick={() => onAddToCart(game)}
                                            className="btn-primary px-6 py-2 rounded-lg font-bold"
                                        >
                                            {game.price === 0 ? 'Descargar' : 'Agregar al Carrito'}
                                        </button>
                                        <button
                                            onClick={() => onAddToWishlist(game)}
                                            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                                        >
                                            <i className="fas fa-heart"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className="text-xl font-bold mb-3">Acerca de este juego</h3>
                                <p className="text-gray-300 leading-relaxed">{game.description}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <h3 className="text-lg font-bold mb-3">Detalles del Juego</h3>
                                    <div className="space-y-2 text-sm">
                                        <div><span className="text-gray-400">Desarrollador:</span> {game.developer}</div>
                                        <div><span className="text-gray-400">Editor:</span> {game.publisher}</div>
                                        <div><span className="text-gray-400">Fecha de lanzamiento:</span> {game.releaseDate}</div>
                                        <div><span className="text-gray-400">Plataforma:</span> PC</div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold mb-3">Géneros</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {game.genres.map(genre => (
                                            <span key={genre} className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                                                {genre}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('GameModal component error:', error);
        reportError(error);
    }
}
