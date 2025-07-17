function UserLibrary({ isOpen, onClose, libraryGames }) {
    try {
        if (!isOpen) return null;

        return (
            <div data-name="user-library" data-file="components/UserLibrary.js" className="fixed inset-0 z-50 overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
                
                <div className="absolute inset-4 bg-gray-900 rounded-lg shadow-xl">
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between p-6 border-b border-gray-700">
                            <h2 className="text-2xl font-bold neon-text">Mi Biblioteca</h2>
                            <button onClick={onClose} className="text-gray-400 hover:text-white">
                                <i className="fas fa-times text-xl"></i>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6">
                            {libraryGames.length === 0 ? (
                                <div className="text-center py-12">
                                    <i className="fas fa-book text-4xl text-gray-600 mb-4"></i>
                                    <p className="text-xl text-gray-400">No tienes juegos en tu biblioteca</p>
                                    <p className="text-gray-500">Compra juegos para crear tu colección</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {libraryGames.map(game => (
                                        <div key={game.id} className="game-card rounded-lg overflow-hidden">
                                            <img src={game.image} alt={game.title} className="w-full h-32 object-cover" />
                                            <div className="p-4">
                                                <h3 className="font-bold mb-2">{game.title}</h3>
                                                <div className="flex items-center justify-between">
                                                    <span className={`text-sm px-2 py-1 rounded ${
                                                        game.status === 'Instalado' ? 'bg-green-600' :
                                                        game.status === 'Descargando' ? 'bg-blue-600' : 'bg-gray-600'
                                                    }`}>
                                                        {game.status || 'Listo para instalar'}
                                                    </span>
                                                    <button className="btn-primary px-4 py-1 rounded text-sm">
                                                        {game.status === 'Instalado' ? 'Jugar' : 'Instalar'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('UserLibrary component error:', error);
        reportError(error);
    }
}
