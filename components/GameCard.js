function GameCard({ game, onAddToCart, onGameClick, user, onLoginRequired }) {
    try {
        const [isHovered, setIsHovered] = React.useState(false);

        const handleAddToCart = (e) => {
            e.stopPropagation();
            if (!user) {
                onLoginRequired();
                return;
            }
            onAddToCart(game);
        };

        return (
            <div 
                data-name="game-card" 
                data-file="components/GameCard.js"
                className="game-card rounded-lg overflow-hidden card-hover cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => onGameClick(game)}
            >
                <div className="relative">
                    <img 
                        src={game.image} 
                        alt={game.title}
                        className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 left-2 flex flex-col space-y-1">
                        {game.discount && (
                            <div className="bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
                                -{game.discount}%
                            </div>
                        )}
                        {game.isNew && (
                            <div className="bg-blue-500 text-white px-2 py-1 rounded text-sm font-bold">
                                NUEVO
                            </div>
                        )}
                        {game.price === 0 && (
                            <div className="bg-green-500 text-white px-2 py-1 rounded text-sm font-bold">
                                GRATIS
                            </div>
                        )}
                    </div>
                    {isHovered && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                            <button 
                                onClick={handleAddToCart}
                                className="btn-primary px-6 py-2 rounded-lg font-semibold"
                            >
                                {game.price === 0 ? 'Descargar' : 'Agregar al Carrito'}
                            </button>
                        </div>
                    )}
                </div>
                
                <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{game.title}</h3>
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                                <i 
                                    key={i}
                                    className={`fas fa-star text-sm ${i < game.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                                ></i>
                            ))}
                            <span className="text-sm text-gray-400 ml-2">({game.reviews})</span>
                        </div>
                        <div className="flex flex-col items-end">
                            {game.originalPrice && game.originalPrice !== game.price && (
                                <span className="text-sm text-gray-400 line-through">${game.originalPrice}</span>
                            )}
                            <span className="text-lg font-bold text-green-400">
                                {game.price === 0 ? 'GRATIS' : `$${game.price}`}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                        {game.genres.slice(0, 2).map(genre => (
                            <span key={genre} className="text-xs bg-gray-700 px-2 py-1 rounded">
                                {genre}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('GameCard component error:', error);
        reportError(error);
    }
}
