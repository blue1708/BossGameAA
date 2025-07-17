function LoginModal({ isOpen, onClose, onLogin }) {
    try {
        const [isRegistering, setIsRegistering] = React.useState(false);
        const [formData, setFormData] = React.useState({
            email: '',
            password: '',
            name: '',
            confirmPassword: ''
        });

        if (!isOpen) return null;

        const handleSubmit = (e) => {
            e.preventDefault();
            
            if (isRegistering) {
                if (formData.password !== formData.confirmPassword) {
                    alert('Las contraseñas no coinciden');
                    return;
                }
                
                const userData = {
                    id: Date.now(),
                    name: formData.name,
                    email: formData.email,
                    avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face`,
                    joinDate: new Date().toLocaleDateString('es-MX'),
                    gamesOwned: 0,
                    achievements: 0,
                    level: 1
                };
                
                localStorage.setItem('boss_user', JSON.stringify(userData));
                onLogin(userData);
            } else {
                // Login simulado
                const userData = {
                    id: 1,
                    name: 'Gamer Pro',
                    email: formData.email,
                    avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face`,
                    joinDate: '15/01/2023',
                    gamesOwned: 12,
                    achievements: 48,
                    level: 7
                };
                
                localStorage.setItem('boss_user', JSON.stringify(userData));
                onLogin(userData);
            }
            
            onClose();
        };

        return (
            <div data-name="login-modal" data-file="components/LoginModal.js" className="fixed inset-0 z-50 overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-75" onClick={onClose}></div>
                
                <div className="absolute inset-0 flex items-center justify-center p-4">
                    <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold neon-text">
                                {isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}
                            </h2>
                            <button onClick={onClose} className="text-gray-400 hover:text-white">
                                <i className="fas fa-times text-xl"></i>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {isRegistering && (
                                <input
                                    type="text"
                                    placeholder="Nombre completo"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-green-400"
                                    required
                                />
                            )}
                            
                            <input
                                type="email"
                                placeholder="Correo electrónico"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-green-400"
                                required
                            />
                            
                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={formData.password}
                                onChange={(e) => setFormData({...formData, password: e.target.value})}
                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-green-400"
                                required
                            />
                            
                            {isRegistering && (
                                <input
                                    type="password"
                                    placeholder="Confirmar contraseña"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-green-400"
                                    required
                                />
                            )}
                            
                            <button type="submit" className="w-full btn-primary py-3 rounded-lg font-bold">
                                {isRegistering ? 'Crear Cuenta' : 'Iniciar Sesión'}
                            </button>
                        </form>

                        <div className="mt-6 text-center">
                            <button 
                                onClick={() => setIsRegistering(!isRegistering)}
                                className="text-green-400 hover:text-green-300"
                            >
                                {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('LoginModal component error:', error);
        reportError(error);
    }
}
