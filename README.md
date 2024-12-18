# repo_sw1_practica

## Resumen para la Parte Práctica del Examen de SWI

### 1. **HTML**

- **Estructura básica**: `<!DOCTYPE html>` → `<html>` → `<head>` (metadatos, estilos) → `<body>` (contenido visible).
- **Elementos importantes**:
  - `meta` para configuración del viewport.
    ```html
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    ```
  - `favicon` usando `<link rel="icon" href="ruta" type="image/x-icon">`.
  - **Etiquetas básicas**: `h1` a `h6` (encabezados), `p` (párrafos), `div`, `span`, `ul`, `li`, `ol`.
  - **Atributos**: `id`, `class`, `style`, `src`, `alt`.
  - **Formularios**:
    ```html
    <form action="/submit" method="POST">
      <label for="username">Nombre:</label>
      <input type="text" id="username" name="username" required>
      <label for="password">Contraseña:</label>
      <input type="password" id="password" name="password" required>
      <label for="confirm-password">Repetir Contraseña:</label>
      <input type="password" id="confirm-password" required>
      <button type="submit">Enviar</button>
    </form>
    <script>
      const form = document.querySelector('form');
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
        if (!passwordRegex.test(password)) {
          alert('La contraseña debe tener al menos 6 caracteres, un número y un caracter especial.');
        } else if (password !== confirmPassword) {
          alert('Las contraseñas no coinciden.');
        } else {
          alert('Formulario enviado correctamente.');
          form.submit();
        }
      });
    </script>
    ```
- **Errores comunes**:
  - Evitar etiquetas vacías.
  - Uso correcto de `alt` para las imágenes.
  - Anidamiento correcto de etiquetas (respetar estructura de apertura y cierre).

---

### 2. **CSS**

- **Formas de incrustar CSS**:

  - **Externo**: `<link rel="stylesheet" href="styles.css">` en `<head>`.
  - **Interno**: `<style>` dentro del `<head>`.
  - **En línea**: `style="propiedad: valor;"` (no recomendado).

- **Principales Atributos de CSS**:

  - **`border`**: Define los bordes de un elemento.

    ```css
    div {
      border: 2px solid black;
    }
    ```

  - **`display`**: Controla el comportamiento del elemento.

  - **Principales valores de `display`**:

    - **`block`**: El elemento ocupa todo el ancho disponible y comienza en una nueva línea.
      ```css
      div {
        display: block;
      }
      ```
    - **`inline`**: El elemento solo ocupa el espacio necesario y no comienza en una nueva línea.
      ```css
      span {
        display: inline;
      }
      ```
    - **`flex`**: Permite un diseño flexible en una dimensión (fila o columna).
      ```css
      .container {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      ```
    - **`grid`**: Facilita un diseño en dos dimensiones con filas y columnas.
      ```css
      .grid-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
      }
      ```

  - **`color`**: Cambia el color del texto.

    ```css
    p {
      color: red;
    }
    ```

  - **`background`**: Define el fondo del elemento.

    ```css
    div {
      background: lightblue;
    }
    ```

  - **`transition`**: Efectos de animación en propiedades.

    ```css
    button {
      transition: background-color 0.5s;
    }
    button:hover {
      background-color: yellow;
    }
    ```

  - **`z-index`**: Controla la superposición de elementos.

    ```css
    .box {
      position: absolute;
      z-index: 10;
    }
    ```

- **Modelo de caja**:

  - Componentes: `content`, `padding`, `border`, `margin`.
  - Uso de `box-sizing: border-box` para incluir `padding` y `border` en `width` y `height`.

---

### 3. **JavaScript y Node.js**

- **Guardar Contraseña Cifrada en Node.js**:

  **Servidor (Node.js con bcrypt y base de datos)**:
  ```javascript
  const express = require('express');
  const bcrypt = require('bcrypt');
  const bodyParser = require('body-parser');
  const app = express();
  app.use(bodyParser.urlencoded({ extended: true }));

  const users = []; // Simulación de una base de datos

  app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const saltRounds = 10;
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      users.push({ username, password: hashedPassword });
      res.send('Usuario registrado con éxito.');
    } catch (err) {
      res.status(500).send('Error al registrar usuario');
    }
  });

  app.listen(3000, () => console.log('Servidor en puerto 3000'));
  ```

- **Instalación de bcrypt**:
  ```bash
  npm install bcrypt express body-parser
  ```

---

### 4. **Ejemplo de Archivo EJS**

- **EJS File**:

  ```ejs
  <!DOCTYPE html>
  <html>
  <head>
    <title><%= title %></title>
  </head>
  <body>
    <% if (role === 'admin') { %>
      <h1>Bienvenido, Admin</h1>
    <% } else { %>
      <h1>Bienvenido, Usuario</h1>
    <% } %>

    <ul>
      <% for (let i = 0; i < items.length; i++) { %>
        <li><%= items[i] %></li>
      <% } %>
    </ul>
  </body>
  </html>
  ```

- **Datos enviados desde Node.js**:

  ```javascript
  app.get('/', (req, res) => {
    res.render('index', {
      title: 'Inicio',
      role: 'admin',
      items: ['Elemento 1', 'Elemento 2', 'Elemento 3']
    });
  });
  ```

