function Cart({ isOpen, onClose, cartItems, onRemoveItem, onUpdateQuantity, onCheckout }) {
    try {
        const total = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);

        if (!isOpen) return null;

        return (
            <div data-name="cart" data-file="components/Cart.js" className="fixed inset-0 z-50 overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
                
                <div className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-900 shadow-xl">
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between p-4 border-b border-gray-700">
                            <h2 className="text-xl font-bold neon-text">Carrito de Compras</h2>
                            <button onClick={onClose} className="text-gray-400 hover:text-white">
                                <i className="fas fa-times text-xl"></i>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4">
                            {cartItems.length === 0 ? (
                                <div className="text-center py-8">
                                    <i className="fas fa-shopping-cart text-4xl text-gray-600 mb-4"></i>
                                    <p className="text-gray-400">Tu carrito está vacío</p>
                                    <p className="text-sm text-gray-500 mt-2">Agrega algunos juegos increíbles</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="flex items-center space-x-3 bg-gray-800 p-3 rounded-lg">
                                            <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded" />
                                            <div className="flex-1">
                                                <h3 className="font-medium text-sm">{item.title}</h3>
                                                <p className="text-green-400 font-bold">
                                                    {item.price === 0 ? 'GRATIS' : `$${item.price}`}
                                                </p>
                                                <div className="flex items-center space-x-1 text-xs text-gray-400">
                                                    {item.genres.slice(0, 2).map(genre => (
                                                        <span key={genre}>{genre}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => onRemoveItem(item.id)}
                                                className="text-red-400 hover:text-red-300"
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="border-t border-gray-700 p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-lg font-bold">Total:</span>
                                    <span className="text-2xl font-bold text-green-400">
                                        ${total.toFixed(2)} MXN
                                    </span>
                                </div>
                                <button
                                    onClick={onCheckout}
                                    className="w-full btn-primary py-3 rounded-lg font-bold text-lg"
                                >
                                    Finalizar Compra
                                </button>
                                <p className="text-xs text-gray-500 text-center mt-2">
                                    Acceso instantáneo después del pago
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('Cart component error:', error);
        reportError(error);
    }
}
