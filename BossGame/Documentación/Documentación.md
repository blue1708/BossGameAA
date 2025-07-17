## **1. Planeación y Análisis del Negocio**

---

### *1.1 Definición del problema y objetivos.*

* **Problema:** La falta de una plataforma centralizada y eficiente para la venta de videojuegos digitales dificulta la expansión del negocio y la interacción con los clientes. Las soluciones actuales pueden carecer de escalabilidad, seguridad y una experiencia de usuario optimizada, limitando el alcance del mercado y la gestión de inventario.
* **Objetivo General:** Crear un **e-commerce de videojuegos digitales** robusto, escalable y seguro, que facilite la compra y venta de títulos, gestione eficazmente el inventario y proporcione una experiencia de usuario fluida y protegida.
* **Objetivos Específicos:**
    * Proveer un catálogo digital interactivo y fácil de navegar para los usuarios.
    * Implementar un sistema de carrito de compras intuitivo y seguro.
    * Gestionar eficientemente las cuentas de usuario y sus preferencias.
    * Automatizar el proceso de pedidos y la entrega de licencias digitales.
    * Garantizar la seguridad de las transacciones y la protección de datos sensibles.
    * Ofrecer métodos de pago seguros y diversos.
    * Implementar un sistema de autenticación y autorización robusto.
    * Permitir la escalabilidad futura de la plataforma para agregar nuevas funcionalidades y servicios.

### *1.2 Creación del modelo de negocio (canvas o BPMN).*

* **Modelo de Negocio (Canvas):**

    * **Socios Clave:**
        * Distribuidores de videojuegos.
        * Plataformas de pago (Stripe, PayPal, etc.).
        * Proveedores de servicios en la nube.
    * **Actividades Clave:**
        * Gestión de catálogo de videojuegos.
        * Procesamiento de pagos y pedidos.
        * Atención al cliente.
        * Marketing y promoción.
        * Mantenimiento y actualización de la plataforma.
    * **Recursos Clave:**
        * Plataforma de e-commerce (software y hardware).
        * Catálogo de videojuegos digitales.
        * Personal técnico y de soporte.
        * Base de datos de clientes y transacciones.
    * **Propuesta de Valor:**
        * Acceso fácil y rápido a una amplia variedad de videojuegos digitales.
        * Experiencia de compra segura y confiable.
        * Entrega instantánea de licencias.
        * Precios competitivos y ofertas exclusivas.
        * Soporte al cliente eficiente.
    * **Relación con Clientes:**
        * Soporte en línea (chat, email).
        * Notificaciones de ofertas y lanzamientos.
        * Programas de fidelización.
        * Comunidades en línea.
    * **Canales:**
        * Sitio web e-commerce.
        * Redes sociales.
        * Email marketing.
    * **Segmentos de Clientes:**
        * Gamers casuales y hardcore.
        * Personas interesadas en adquirir videojuegos de forma digital.
        * Usuarios que buscan comodidad y seguridad en sus compras en línea.
    * **Estructura de Costos:**
        * Desarrollo y mantenimiento de la plataforma.
        * Licencias de software y tarifas de proveedores de servicios.
        * Costos de marketing y publicidad.
        * Salarios del personal.
        * Comisiones de plataformas de pago.
    * **Fuentes de Ingresos:**
        * Venta directa de videojuegos digitales.
        * Membresías o suscripciones (opcional, a futuro).
        * Publicidad (opcional, a futuro).

### *1.3 Análisis de casos de uso.*

* **Usuario (Cliente):**
    * **Registrarse en la plataforma:** Crear una cuenta de usuario.
    * **Iniciar sesión:** Acceder a la cuenta existente.
    * **Explorar catálogo:** Navegar por los videojuegos disponibles.
    * **Buscar videojuegos:** Encontrar títulos específicos por nombre, género, etc.
    * **Ver detalles del videojuego:** Acceder a la descripción, precio, capturas de pantalla, etc.
    * **Agregar/Eliminar videojuego al carrito:** Gestionar los ítems antes de la compra.
    * **Realizar pago:** Completar la transacción de compra.
    * **Ver historial de pedidos:** Consultar las compras realizadas.
    * **Descargar videojuego/Obtener clave:** Acceder a la licencia o descarga después de la compra.
    * **Actualizar perfil:** Modificar datos personales y preferencias.
    * **Contactar soporte:** Enviar consultas o reportar problemas.
* **Administrador:**
    * **Gestionar usuarios:** Crear, modificar, eliminar y suspender cuentas de usuario.
    * **Gestionar catálogo:** Añadir, editar y eliminar videojuegos del inventario.
    * **Gestionar pedidos:** Ver y actualizar el estado de los pedidos.
    * **Gestionar categorías/géneros:** Organizar los videojuegos.
    * **Gestionar promociones/descuentos:** Crear y aplicar ofertas.
    * **Ver reportes de ventas:** Acceder a métricas y estadísticas.
    * **Gestionar métodos de pago:** Configurar y habilitar opciones de pago.

### *1.4 Identificación de servicios (catálogo, carrito, usuario, pedidos, pagos).*

* **Servicio de Catálogo:**
    * Funcionalidad principal: Ofrecer y gestionar la información de los videojuegos disponibles.
    * Operaciones: `GET /videojuegos` (obtener todos), `GET /videojuegos/{id}` (obtener por ID), `POST /videojuegos` (crear), `PUT /videojuegos/{id}` (actualizar), `DELETE /videojuegos/{id}` (eliminar).
    * Información: Nombre, descripción, precio, género, plataforma, requisitos del sistema, imágenes, clave de licencia.
* **Servicio de Carrito:**
    * Funcionalidad principal: Permitir a los usuarios agregar y gestionar los videojuegos que desean comprar.
    * Operaciones: `GET /carrito/{userId}` (obtener carrito de un usuario), `POST /carrito/{userId}/items` (añadir item), `PUT /carrito/{userId}/items/{itemId}` (actualizar cantidad), `DELETE /carrito/{userId}/items/{itemId}` (eliminar item).
    * Información: ID del usuario, lista de ítems (ID de videojuego, cantidad, precio unitario).
* **Servicio de Usuario:**
    * Funcionalidad principal: Gestionar las cuentas de usuario, autenticación y autorización.
    * Operaciones: `POST /usuarios/registro` (registrar), `POST /usuarios/login` (iniciar sesión), `GET /usuarios/{id}` (obtener perfil), `PUT /usuarios/{id}` (actualizar perfil).
    * Información: ID de usuario, nombre, email, contraseña (hash), rol (cliente/admin), historial de pedidos (referencia).
* **Servicio de Pedidos:**
    * Funcionalidad principal: Registrar y gestionar las compras realizadas por los usuarios.
    * Operaciones: `POST /pedidos` (crear pedido), `GET /pedidos/{userId}` (obtener pedidos por usuario), `GET /pedidos/{id}` (obtener detalle de pedido), `PUT /pedidos/{id}/estado` (actualizar estado del pedido).
    * Información: ID de pedido, ID de usuario, fecha, estado (pendiente, completado, cancelado), lista de ítems comprados (ID de videojuego, precio, cantidad), total, ID de transacción de pago.
* **Servicio de Pagos:**
    * Funcionalidad principal: Procesar las transacciones financieras y comunicarse con pasarelas de pago.
    * Operaciones: `POST /pagos/procesar` (iniciar pago), `POST /pagos/webhook` (recibir confirmación de pasarela de pago), `GET /pagos/{id}` (consultar estado de pago).
    * Información: ID de transacción, ID de pedido, monto, estado (pendiente, exitoso, fallido), método de pago, detalles de la tarjeta (tokenizados/ofuscados).

### *1.5 Identificación de procesos de negocio y modelado BPMN.*

* **Proceso de Compra de Videojuego Digital:**
    * **Actor:** Cliente, Sistema.
    * **Evento de Inicio:** Cliente inicia sesión o navega como invitado.
    * **Tareas:**
        1.  **Explorar/Buscar Videojuego:** Cliente navega por el catálogo o usa el buscador.
        2.  **Ver Detalles del Videojuego:** Cliente revisa la información del juego.
        3.  **Agregar al Carrito:** Cliente añade el videojuego al carrito.
        4.  **Revisar Carrito:** Cliente visualiza los ítems en su carrito.
        5.  **Iniciar Proceso de Pago:** Cliente procede a finalizar la compra.
        6.  **Seleccionar Método de Pago:** Cliente elige cómo pagar.
        7.  **Ingresar Datos de Pago:** Cliente introduce la información requerida.
        8.  **Procesar Pago (Servicio de Pagos):** El sistema envía la información a la pasarela de pago.
        9.  **Confirmación de Pago (Pasarela de Pago):** La pasarela de pago responde con éxito o fallo.
        10. **Crear Pedido (Servicio de Pedidos):** Si el pago es exitoso, el sistema genera un nuevo pedido.
        11. **Asignar Licencia/Clave:** El sistema asocia una clave de licencia o habilita la descarga.
        12. **Notificar Cliente:** El sistema envía un correo electrónico de confirmación de compra y acceso al videojuego.
    * **Evento de Fin:** Cliente recibe su videojuego digital.

* **Proceso de Gestión de Inventario (Simplificado):**
    * **Actor:** Administrador, Sistema.
    * **Evento de Inicio:** Administrador desea añadir un nuevo videojuego.
    * **Tareas:**
        1.  **Acceder Panel de Administración:** Administrador inicia sesión.
        2.  **Seleccionar Gestión de Catálogo:** Administrador navega a la sección de videojuegos.
        3.  **Añadir Nuevo Videojuego:** Administrador ingresa los detalles del videojuego (nombre, descripción, precio, etc.).
        4.  **Subir Licencias/Claves:** Administrador adjunta las claves digitales.
        5.  **Guardar Videojuego (Servicio de Catálogo):** El sistema registra el nuevo videojuego y sus claves.
        6.  **Confirmar Adición:** El sistema notifica al administrador la adición exitosa.
    * **Evento de Fin:** Nuevo videojuego disponible en el catálogo.