# Condiciones generales para la realización

- El trabajo en cuestión es de carácter obligatorio y deberá ser presentado en fecha
de final, para su exposición.
- Las tecnologías para realizar este trabajo son:
    - MongoDB (base de datos)
    - Express.js (routeo)
    - React.js / React Native (FrontEnd)
    - Node.js (BackEnd)
    - Typescript (Frontend y Backend)
    - Librerías de UI: AntD, Chakra UI, MaterialUI.
    - Las condiciones adicionales (obligatorias):
    - Seguridad con jwt utilizando localstorage/cookie/session
    - Mínimo de DOS role que se loguean en el sistema
    - Alguna migración inicial de datos para que el sistema funcione
    - Relaciones entre distintas entidades
    - Logueo de errores
    - Validación de datos en frontend y backend
    - Valores cargados en variables de entorno (front y back)
    - Mínimo de 5 páginas con ruteo (front)
    - Mínimo de 4 entidades (back)
    - Documentación de la API (colección de Postman/Insomnia o Swagger/OpenAPI) con los endpoints principales; uso correcto de verbos HTTP y códigos de estado
    - Paginación y filtros en al menos un listado
    - Pruebas, con herramienta <Vitest | Jest>: Cobertura mínima del 40%(statements), reporte de coverage entregado junto al repo; tests deintegración (supertest) de al menos el 50% de las rutas del backend, tests de al menos el 30% de los componentes del frontend
    - _(opcional) Utilización de un bucket (AWS S3)_
    - _(opcional) Deployado en la nube (render, Railway, AWS)_
- El trabajo debe reproducir lo mejor posible las condiciones de un sistema real para la empresa. Por tratarse de una adaptación de caso real, la especificación puede contener las mismas ambigüedades que un sistema real. En tales casos, se puede consultar al docente del curso para resolver las dudas que tengan los alumnos.
- **Importante**: Al ser dominios menos habituales que un banco, una escuela o un supermercado, se espera que el alumno investigue brevemente cómo funciona el negocio o proceso real (roles, terminología, flujo típico) antes de modelar el sistema - se puede consultar con el docente, pero no reemplaza esa investigación inicial.

# Condiciones generales de aprobación
- El trabajo debe funcionar correctamente, de acuerdo a todas las especificaciones solicitadas. Un trabajo que no contemple o implemente algunas de las funcionalidades descritas no podrá ser aprobado.
- Documentación a incluir para la entrega: Repositorio de código online publicado para su revisión.
- Se deberá incluir en dicho repositorio, un archivo de guía que muestre una descripción general del módulo e indique cómo correr/levantar dicho proyecto localmente junto con las migraciones correspondientes para poseer los datos iniciales (Readme.md).
- El repositorio debe mostrar un historial de commits incremental (no un único commit final).
- La aplicación debe efectuar el tratamiento de errores necesario (y de la manera pertinente), que le otorgue robustez a la aplicación (buen manejo de errores por pantalla, log en archivos de texto, etc.).

# Presentación del Trabajo

El desarrollo del trabajo práctico estará compuesto por la implementación del módulo asignado funcionando, junto con un repositorio el cual contenga el código desarrollado.

En un instancia de examen oral, se deberá exponer la defensa de lo realizado en dicho proyecto. 

El link al repositorio en el cual se encontrará el proyecto, deberá ser informado para su revisión una semana antes, como mínimo, de la exposición final en fecha de examen.

**Importante**: se puede pedir una modificación, nueva funcionalidad/corrección en el momento de la presentación.

# Descripción general

El sistema a implementar debe contemplar las funcionalidades:

- Registro y autenticación de usuarios con roles de coordinador y voluntario.
- Administración de donantes (empresas o particulares) y registro de las
donaciones recibidas, indicando tipo de producto, cantidad y fecha de
vencimiento.
- Administración de organizaciones beneficiarias y de la cantidad de personas que asiste cada una.
- Armado de entregas: se asignan productos disponibles en stock a una
organización beneficiaria para una fecha.
- Control de stock por producto contemplando los vencimientos (no se puede entregar producto vencido).
- Registro de campañas de recolección y de los voluntarios asignados a cada una.
- Panel del coordinador con stock disponible, próximas entregas y productos próximos a vencer.
