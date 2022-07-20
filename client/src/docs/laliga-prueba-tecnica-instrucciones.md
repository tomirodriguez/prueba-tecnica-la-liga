# Prueba técnica de Front End de LaLiga

Este documento comprende los requerimientos para realizar la prueba técnica de Front-End de LaLiga.

Se requiere el uso de GIT para la realización de la prueba. Esperamos que nos facilites acceso a un repositorio privado, o este mismo comprimido y enviado como un archivo adjunto.

Debes enviar el ejercicio contestando al correo desde el que has recibido la prueba, manteniendo en copia a las personas del mail original.

<br />

# Requisitos técnicos

_IMPORTANTE_: Si tu aplicación no cumple con alguno de estos requisitos, será automáticamente descalificada.

- La prueba técnica debe estar implementada con `TypeScript`
- No debe haber componentes de clase, sólo componentes funcionales
- Para almacenar el estado, debe realizarse con `redux` y `redux-saga`
- Para manejar el routing de la aplicación, debes hacerlo con `react-router-dom`
- Los estilos de la aplicación deben realizarse con [`Chakra`](https://chakra-ui.com/docs/components)
- Los test de las funcionalidades han de incluirse con [`react-testing-library`](https://github.com/testing-library/react-testing-library)
- Usar `eslint` y `prettier`

Algunas de estas librerías te las proporcionamos en este starter ya integradas para evitarte el trabajo de hacerlo. Puedes añadir todas las librerías que necesites, aunque no olvides documentar las decisiones tomadas en la memoria del `README.md`.

<br />

# Historias de usuario a implementar

Vamos a realizar una pequeña y sencilla aplicación tipo SPA con React que se conecte a una API de pruebas. El objetivo es que el usuario que te proveemos pueda autenticar en ella y acceder a un listado de clubs. Si no está autenticado, el usuario no deberá poder acceder a la vista de listado

> Puedes encontrar toda la documentación que necesitas sobre la API de pruebas en el [Swagger](http://localhost:4000/api-docs)

_IMPORTANTE_: Si tu aplicación no cumple con alguno de estos requisitos, será automáticamente descalificada.

## 1. Vista: "Login"

Esta vista deberá mostrarse en la ruta `/login` del navegador.

Tendrás que realizar un refactor sobre el código propuesto cumpliendo los siguientes requisitos:

- Código limpio y funcional
- Custom hooks
- Conexión a la store
- Conexión de la API con sagas
- Gestión adecuada del token de autenticación para conectar el resto de la API

El formulario está integrado con el endpoint [_POST_] `http://localhost:4000/login` y el siguiente payload:

| email: string        | password: string |
| -------------------- | ---------------- |
| `fake.user@fake.com` | `123`            |

Siéntete libre de modificar los estilos de la vista de `"login"`, así como su ubicación y cualquier cosa que consideres.

<br />

## 2. Vista: "Listado"

Esta vista deberá mostrarse en la ruta `/clubs` del navegador.

Deberá mostrarse en pantalla un listado de clubs obtenidos a partir del endpoint _GET_ `http://localhost:4000/api/clubs`. En este listado, por cada club deberá mostrarse al menos:

- `avatar`
- `foundationDate`
- `name`
- Algún elemento visual que indique que el club es favorito ⭐

Por otro lado la vista ha de cumplir con los siguientes requisitos:

- El listado deberá estar paginado, mostrando no más de 6 elementos por página.
- Debes incluir un filtro debounce de búsqueda por nombre con el parámetro `name_like` (ej: http://localhost:4000/api/clubs?offset=0&limit=10&name_like=clubname)
- Los clubes del listado podrán añadirse a favoritos con un componente [Switch](https://chakra-ui.com/docs/components/switch)
- Para actualizar los clubs se hará con el endpoint [_PATCH_] `http://localhost:4000/api/clubs/{club}` y el siguiente payload: { favorite: boolean }
- El listado debe poder filtrarse por `"favoritos"`
- Un botón con el texto "Cerrar Sesión" que devuelva a la vista de "Login" y haga perder sesión al usuario.

<br />

## 3. Consideraciones adicionales de la aplicación:

- Si el usuario tiene sesión, se le mostrará la vista "Listado". De lo contrario, no podrá acceder nunca a ella.
- Un usuario con sesión en el navegador no podrá acceder a "Login" salvo que la pierda (por ejemplo, pulsando el botón "Cerrar Sesión").
- La aplicación se visualiza correctamente en dispositivos móviles a partir de una resolución de `375px x 667px` (resolución de iPhone 6).

<br />

# Valoraremos...

- Emplear los patrones estándar y aplicar las guías de estilo oficiales de las librerías que te solicitamos usar.
- Código bien estructurado y legible según los estándares de la guía Clean Code.
- Que documentes tu código pensando en que será leído por otro desarrollador.
- Que no hay código duplicado y/o copipasteado.
- Que has usado javascript moderno, declarativo y aplicando los patrones funcionales propuestos por React y Redux.
- Aderirses a los principios SOLID, al menos aquellos que pueden aplicarse en React.
- Una consola limpia de errores y warnings.
- Flujo de uso y manejo de errores (con feedback para el usuario) correctos.

Pon mucha atención y detalle a todo esto, pues serán los criterios que emplearemos para evaluarte.

De forma opcional, valoraremos muy positivamente si además...

- Tu app tiene una UI cuidada y con un look & feel agradable.
- Has dado cobertura de test a la aplicación.

Y cualquier otra adición (animaciones, efectos diferenciales, etc) será bienvenida. No dudes en dar rienda suelta a tu imaginación si consideras que mejora tu aplicación.

## Cómo entregar la prueba

La prueba técnica se deberá desarrollar en un repositorio privado en github y compartir con el usuario desarrollo-laligatech:

- [desarrollo-laligatech](https://github.com/desarrollo-laligatech)
