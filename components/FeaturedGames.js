function FeaturedGames({ games, onGameClick }) {
    try {
        const [currentSlide, setCurrentSlide] = React.useState(0);
        const featuredGames = games.filter(game => game.featured).slice(0, 3);

        React.useEffect(() => {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % featuredGames.length);
            }, 5000);
            return () => clearInterval(interval);
        }, [featuredGames.length]);

        if (featuredGames.length === 0) return null;

        const currentGame = featuredGames[currentSlide];

        return (
            <section data-name="featured-games" data-file="components/FeaturedGames.js" className="relative h-96 mb-8 rounded-lg overflow-hidden">
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
                    style={{ backgroundImage: `url(${currentGame.heroImage || currentGame.image})` }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                </div>
                
                <div className="relative z-10 h-full flex items-center">
                    <div className="container mx-auto px-4">
                        <div className="max-w-2xl">
                            <h2 className="text-5xl font-bold mb-4 neon-text">{currentGame.title}</h2>
                            <p className="text-xl mb-6 text-gray-200">{currentGame.description}</p>
                            <div className="flex items-center space-x-4">
                                <button 
                                    onClick={() => onGameClick(currentGame)}
                                    className="btn-primary px-8 py-3 rounded-lg text-lg font-bold"
                                >
                                    View Details
                                </button>
                                <div className="text-3xl font-bold text-green-400">
                                    ${currentGame.price}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {featuredGames.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${
                                index === currentSlide ? 'bg-green-400' : 'bg-gray-600'
                            }`}
                        />
                    ))}
                </div>
            </section>
        );
    } catch (error) {
        console.error('FeaturedGames component error:', error);
        reportError(error);
    }
}
