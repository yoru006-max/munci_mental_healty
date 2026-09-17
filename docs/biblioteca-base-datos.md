# Idea de base de datos para la biblioteca

## Modelo recomendado

### `users`
- id: uuid / text
- email: text
- name: text
- created_at: timestamp
- role: text (`admin`, `user`)

### `books`
- id: uuid / text
- owner_id: uuid / text -> referencia a `users.id`
- title: text
- author: text
- category: text
- description: text
- file_name: text
- file_url: text
- file_type: text
- format: text (`pdf`, `epub`, `txt`, `doc`, `mobi`)
- visibility: text (`private`, `public`)
- cover_image_url: text (opcional)
- created_at: timestamp
- updated_at: timestamp

### `book_progress`
- id: uuid / text
- user_id: uuid / text
- book_id: uuid / text
- current_page: integer
- percentage: float
- updated_at: timestamp

## Relación
- Un usuario puede tener muchos libros.
- Un libro pertenece a un solo usuario propietario.
- Un usuario puede tener progreso en muchos libros.
- Los libros públicos pueden verse por cualquier usuario autenticado.

## Recomendación práctica
Para este proyecto, la mejor opción de implementación es:
- `Supabase` para autenticación + storage + postgres.
- `books` en PostgreSQL para metadata.
- `file_url` apuntando al archivo guardado en Supabase Storage.
- `book_progress` para guardar lectura y avanzados por usuario.

## Consulta típica
- Obtener libros del usuario actual.
- Obtener libros públicos.
- Obtener un libro por id y validarlo contra el propietario.
- Guardar o actualizar el progreso de lectura.
