# Changelog
## 2026-07-24

### Añadido
- Se añadió un logo SVG con forma de ojo al menú lateral.
- Se incorporaron símbolos a botones que se mostraban vacíos en Gestión de Pacientes.
- Se agregó una animación de apertura y cierre al menú hamburguesa en móvil y tablet.
- Se añadió una transición que transforma el botón hamburguesa en el logo al desplegar el menú.
- Se incorporaron al menú de pacientes las acciones «Ver última ficha», «Ver fichas», «Editar datos personales» y «Eliminar».
- Se añadieron ventanas emergentes temporales para las acciones de consulta de fichas.
- Se agregaron fecha de nacimiento, teléfono y correo electrónico al modelo local de pacientes.

### Modificado
- Se aplicó al menú lateral un estilo invertido con fondo azul oscuro, textos blancos y estados hover destacados.
- Se reemplazó la barra y el desplazamiento del hover por un subrayado animado en los textos de navegación.
- Se ocultó el ícono principal del logo en la versión responsiva y se reposicionó el botón de despliegue.
- Se redujo el espacio vertical vacío del menú lateral en su versión responsiva.
- Se mejoró la responsividad de Gestión de Pacientes, incluyendo tarjetas, tablas, acciones y paginación.
- Se actualizó el encabezado de Gestión de Pacientes.
- Se alineó el botón de más opciones junto al botón «Crear Receta».
- Se limitó la edición de pacientes a nombre completo, RUT, fecha de nacimiento, sexo biológico, teléfono y email.
- Se actualizó automáticamente la edad del paciente a partir de su fecha de nacimiento.
- Se mejoró la distribución de espacios del formulario «Editar datos personales».
- Se cambió el nombre mostrado en el acceso de «Visium Pro» a «Visium».
- Se corrigió la interfaz del login y su responsividad.

### Corregido
- Se corrigió la carga y persistencia de pacientes en `localStorage` mediante una clave específica de la aplicación.
- Se corrigió la visualización de datos y controles en Gestión de Pacientes.
- Se corrigió el posicionamiento del menú contextual para mantenerlo dentro de la ventana y alineado con su botón.
- Se corrigió el botón de más opciones para que cierre el menú contextual al presionarlo nuevamente.
- Se añadió el ícono visible de papelera a la acción «Eliminar».

### Quitado

- Se quitó el botón para agregar pacientes de Gestión de Pacientes.

## 2026-07-23

### Añadido
- Se incorporó la vista de Citas y se actualizó la navegación hacia Gestión de Pacientes.

### Modificado
- Se corrigieron la ruta y los estilos aislados de Gestión de Pacientes.
- Se modernizó el menú lateral, su estado activo y la adaptación del encabezado.
- Se mejoró la responsividad de Dashboard, menú lateral y encabezado.

## 2026-07-22

### Añadido
- Se actualizó la sección de recetas.
- Se añadió el flujo de nuevo paciente a las rutas.
- Se ocultó el botón de nuevo paciente en el header de la vista de nuevo paciente.

### Modificado
- Se realizaron ajustes en la vista y navegación relacionada con pacientes.

### Merge
- Se integraron cambios provenientes de las ramas de gestión de pacientes y recetas.

## 2026-07-21

### Añadido
- Se incorporó la gestión de pacientes y la vista de nuevo paciente.
- Se crearon los componentes HeaderMenu y MenuLateral.
- Se añadió el layout HomeLayout y MainLayout.

### Modificado
- Se actualizaron los componentes App, AppRouter, Dashboard, HeaderMenu, MenuLateral y varias páginas.
- Se ajustó la estructura general de páginas y rutas.

### Merge
- Se integró la rama de gestión de pacientes.

## 2026-07-15

### Inicio del proyecto
- Se realizó el primer commit inicial del repositorio.
- Se limpió y actualizó el README.
