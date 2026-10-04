# Juego de Parejas

Misión M1 · El Despertar del DOM — Web Development I.

## Cómo probarlo
Abre index.html en el navegador (o con Live Server). Pulsa «Jugar»:
Empareja las imágenes con el número de intentos mínimo posible y de forma rápida. Tiempo y clicks cuentan, al acabar aparecerá una breve ficha técnica relativa a cada vehículo de la marca Alpine. No se cuenta con opción de reinicio ni pausa por DISEÑO. Para volver a jugar se debe cambiar la dificultad o refrescar la página. La puntuación por acierto estará multiplicada por el número de parejas del nivel. Incorporación de sonidos de fallo y acierto para los clicks. Además se tendrá la opción de guardar la mejor puntuación y el nombre del jugador actual (únicamente visual, no usará ni almacenamiento local ni base de datos).


## Uso de IA 
Recordatorio y correciones sobre html, css, js, boostrap, etc.
Ejemplo de prompt: ayudame a hacer el diseño visual con css de lo siguiente: selector de dificultad: (facil, media, dificil)--- boton play--- tiempo score debajo el tablero de imagenes.
Preguntas sobre el uso de javascript para conseguir el cambio de dificultad, modo de visibilidad, temporizador.
Correción de problemas y condiciones en funciones como guardar mejor puntuación. Elección de mejor opción entre getElementById o document.querySelector(".tiempo").
Control para evitar que toogle para cambio de tema entre en funcionamiento cuando se está introduciendo un nombre que contiene la t.


## Autopsia
Elección de cambio del tema oscuro-claro a través de boostrap en lugar de tener una variante por cada clase. Cambio de boostrap por css básico para adaptar mejor a condiciones de entrega. Ejemplo de rechazar lo primero que devuelve la IA y pedirle modificaciones para que se adapte a lo que quiero de forma fiel:
"con lo que me has dado se queda todo negro y yo quiero que se aplique alpine como fondo de las secciones" Respuesta IA: "Sí, porque en lo anterior hice que .game-controls y .board usaran var(--panel), que en oscuro es prácticamente negro. Si quieres que las secciones tengan el estilo Alpine, reutiliza tu clase .alpine como fondo".
Si uso display none las cards no se mostrarían por lo que tuve que jugar con la transparencia de la imagen en su lugar.
Cambio a un único listner por tablero, incorporación de un bloqueo a los clicks para que el tiempo de espera no dé problemas.
Elección entre visiblidad permanente o no del input para mejor puntuación. Finalmente para evitar cambios de nombre durante la propia partida solo se mostrará tras acabar el juego.
Se crea emparejado como booleana porque comparar strings de "true" y "false" es más costoso
