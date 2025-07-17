function UserProfile({ isOpen, onClose, user, libraryGames, achievements }) {
    try {
        const [activeTab, setActiveTab] = React.useState('perfil');

        if (!isOpen || !user) return null;

        const tabs = [
            { id: 'perfil', name: 'Perfil', icon: 'fas fa-user' },
            { id: 'biblioteca', name: 'Biblioteca', icon: 'fas fa-book' },
            { id: 'logros', name: 'Logros', icon: 'fas fa-trophy' },
            { id: 'configuracion', name: 'Configuración', icon: 'fas fa-cog' }
        ];

        return (
            <div data-name="user-profile" data-file="components/UserProfile.js" className="fixed inset-0 z-50 overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-75" onClick={onClose}></div>
                
                <div className="absolute inset-4 bg-gray-900 rounded-lg shadow-xl">
                    <div className="flex h-full">
                        {/* Sidebar */}
                        <div className="w-64 bg-gray-800 p-6 rounded-l-lg">
                            <div className="text-center mb-8">
                                <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
                                <h2 className="text-xl font-bold neon-text">{user.name}</h2>
                                <p className="text-gray-400">Nivel {user.level}</p>
                            </div>
                            
                            <nav className="space-y-2">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                                            activeTab === tab.id ? 'bg-green-400 text-black' : 'text-gray-300 hover:bg-gray-700'
                                        }`}
                                    >
                                        <i className={tab.icon}></i>
                                        <span>{tab.name}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-6 overflow-y-auto">
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-3xl font-bold">Mi Perfil</h1>
                                <button onClick={onClose} className="text-gray-400 hover:text-white">
                                    <i className="fas fa-times text-xl"></i>
                                </button>
                            </div>

                            {activeTab === 'perfil' && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="bg-gray-800 p-6 rounded-lg text-center">
                                            <i className="fas fa-gamepad text-3xl text-green-400 mb-2"></i>
                                            <div className="text-2xl font-bold">{libraryGames.length}</div>
                                            <div className="text-gray-400">Juegos</div>
                                        </div>
                                        <div className="bg-gray-800 p-6 rounded-lg text-center">
                                            <i className="fas fa-trophy text-3xl text-yellow-400 mb-2"></i>
                                            <div className="text-2xl font-bold">{user.achievements}</div>
                                            <div className="text-gray-400">Logros</div>
                                        </div>
                                        <div className="bg-gray-800 p-6 rounded-lg text-center">
                                            <i className="fas fa-star text-3xl text-blue-400 mb-2"></i>
                                            <div className="text-2xl font-bold">{user.level}</div>
                                            <div className="text-gray-400">Nivel</div>
                                        </div>
                                    </div>
                                    
                                    <div className="bg-gray-800 p-6 rounded-lg">
                                        <h3 className="text-xl font-bold mb-4">Información Personal</h3>
                                        <div className="space-y-3">
                                            <div><span className="text-gray-400">Nombre:</span> {user.name}</div>
                                            <div><span className="text-gray-400">Email:</span> {user.email}</div>
                                            <div><span className="text-gray-400">Miembro desde:</span> {user.joinDate}</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'biblioteca' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {libraryGames.map(game => (
                                        <div key={game.id} className="bg-gray-800 rounded-lg overflow-hidden">
                                            <img src={game.image} alt={game.title} className="w-full h-32 object-cover" />
                                            <div className="p-4">
                                                <h3 className="font-bold mb-2">{game.title}</h3>
                                                <div className="text-sm text-gray-400">
                                                    Estado: {game.status || 'Listo para instalar'}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {activeTab === 'logros' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-gray-800 p-4 rounded-lg flex items-center space-x-4">
                                        <i className="fas fa-shopping-cart text-2xl text-green-400"></i>
                                        <div>
                                            <h3 className="font-bold">Primera Compra</h3>
                                            <p className="text-sm text-gray-400">Realizaste tu primera compra</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-800 p-4 rounded-lg flex items-center space-x-4">
                                        <i className="fas fa-heart text-2xl text-red-400"></i>
                                        <div>
                                            <h3 className="font-bold">Coleccionista</h3>
                                            <p className="text-sm text-gray-400">Tienes más de 5 juegos</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('UserProfile component error:', error);
        reportError(error);
    }
}
