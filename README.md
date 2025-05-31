# Laboratorio 3 - Base de Datos 1

## Descripción
Este proyecto es una aplicación CRUD completa para gestionar productos y sus categorías relacionadas. Utiliza Prisma como ORM y PostgreSQL como base de datos. Incluye validaciones, una vista en la base de datos para facilitar la visualización, y una API desarrollada con Express.js.

## Requisitos
- Node.js (versión 16 o superior)
- PostgreSQL instalado y corriendo
- Postman o cualquier cliente HTTP para probar la API

## Configuración
1. Clona este repositorio:
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd Lab3DB
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura la conexión a la base de datos:
   - Abre el archivo `.env`.
   - Deberas de crear un nuevo server en tu computadora local por medio de PostgreSQL
   - Asegúrate de que la variable `DATABASE_URL` tenga tus credenciales de PostgreSQL:
     ```env
     DATABASE_URL="postgresql://<usuario>:<contraseña>@localhost:5432/<nombre_base_datos>?schema=public"
     ```

4. Crea la base de datos y aplica las migraciones:
   ```bash
   npx prisma migrate dev --name init
   ```

5. Llena la base de datos con datos iniciales (opcional):
   ```bash
   node prisma/seed.js
   ```

## Ejecución
1. Inicia el servidor:
   ```bash
   node api.js
   ```

2. La API estará disponible en `http://localhost:3000`.

## Endpoints
### Productos
- **GET** `/products` - Lista todos los productos.
- **GET** `/products/:id` - Obtiene un producto específico.
- **POST** `/products` - Crea un nuevo producto.
- **PUT** `/products/:id` - Actualiza un producto existente.
- **DELETE** `/products/:id` - Elimina un producto.

### Categorías
- **GET** `/categories` - Lista todas las categorías.

## Ejemplo de uso
### Crear un producto
Usa Postman o cualquier cliente HTTP para enviar una solicitud POST:
```json
POST http://localhost:3000/products
{
  "producto": "Laptop Gaming",
  "precio": "1299.99",
  "existencia": 5,
  "status": "en_produccion",
  "condition": "NUEVO",
  "categories": [1, 2]
}
```

### Actualizar un producto
```json
PUT http://localhost:3000/products/1
{
  "producto": "Laptop Gaming Pro",
  "precio": "1499.99",
  "existencia": 3,
  "status": "en_produccion",
  "condition": "USADO",
  "categories": [1, 2]
}
```

### Eliminar un producto
```json
DELETE http://localhost:3000/products/1
```

## Notas
- Asegúrate de que el servidor de PostgreSQL esté corriendo antes de iniciar el proyecto.
- Si tienes problemas con las migraciones, usa el comando:
  ```bash
  npx prisma migrate reset
  ```
- Si necesitas ayuda, consulta la documentación de Prisma: [https://www.prisma.io/docs](https://www.prisma.io/docs).

## Créditos
Proyecto desarrollado como parte del Laboratorio 3 de la clase Base de Datos 1.
