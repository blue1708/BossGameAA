function Wishlist({ isOpen, onClose, wishlistGames, onRemoveFromWishlist, onAddToCart }) {
    try {
        if (!isOpen) return null;

        return (
            <div data-name="wishlist" data-file="components/Wishlist.js" className="fixed inset-0 z-50 overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
                
                <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-900 shadow-xl">
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between p-4 border-b border-gray-700">
                            <h2 className="text-xl font-bold neon-text">Lista de Deseos</h2>
                            <button onClick={onClose} className="text-gray-400 hover:text-white">
                                <i className="fas fa-times text-xl"></i>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4">
                            {wishlistGames.length === 0 ? (
                                <div className="text-center py-8">
                                    <i className="fas fa-heart text-4xl text-gray-600 mb-4"></i>
                                    <p className="text-gray-400">Tu lista de deseos está vacía</p>
                                    <p className="text-sm text-gray-500 mt-2">Agrega juegos que te interesen</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {wishlistGames.map(game => (
                                        <div key={game.id} className="bg-gray-800 p-3 rounded-lg">
                                            <div className="flex items-center space-x-3">
                                                <img src={game.image} alt={game.title} className="w-16 h-16 object-cover rounded" />
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-sm">{game.title}</h3>
                                                    <p className="text-green-400 font-bold">${game.price}</p>
                                                    {game.discount && (
                                                        <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                                                            -{game.discount}% OFF
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex flex-col space-y-2">
                                                    <button
                                                        onClick={() => onAddToCart(game)}
                                                        className="btn-primary px-3 py-1 rounded text-xs"
                                                    >
                                                        Comprar
                                                    </button>
                                                    <button
                                                        onClick={() => onRemoveFromWishlist(game.id)}
                                                        className="text-red-400 hover:text-red-300 text-xs"
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {wishlistGames.length > 0 && (
                            <div className="border-t border-gray-700 p-4">
                                <p className="text-sm text-gray-400 text-center">
                                    {wishlistGames.length} juego{wishlistGames.length !== 1 ? 's' : ''} en tu lista
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Wishlist component error:', error);
        reportError(error);
    }
}
