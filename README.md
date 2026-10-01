# Juego de Parejas

Misión M1 · El Despertar del DOM — Web Development I.

## Cómo probarlo
Abre index.html en el navegador (o con Live Server). Pulsa «Jugar»:
Empareja las imágenes con el número de intentos mínimo posible y de forma rápida. Tiempo y clicks cuentan, al acabar aparecerá una breve descripción relativa a cada foto.

## Uso de IA 
Recordatorio y correciones sobre html, css, js, boostrap, etc.
Ejemplo de prompt: ayudame a hacer el diseño visual con css de lo siguiente: selector de dificultad: (facil, media, dificil)--- boton play--- tiempo score debajo el tablero de imagenes.
Preguntas sobre el uso de javascript para conseguir el cambio de dificultad, modo de visibilidad, temporizador.


## Autopsia
Elección de cambio del tema oscuro-claro a través de boostrap en lugar de tener una variante por cada clase. Cambio de boostrap por css básico para adaptar mejor a condiciones de entrega. Ejemplo de rechazar lo primero que devuelve la IA y pedirle modificaciones para que se adapte a lo que quiero de forma fiel:
"con lo que me has dado se queda todo negro y yo quiero que se aplique alpine como fondo de las secciones" Respuesta IA: "Sí, porque en lo anterior hice que .game-controls y .board usaran var(--panel), que en oscuro es prácticamente negro. Si quieres que las secciones tengan el estilo Alpine, reutiliza tu clase .alpine como fondo".
Si uso display none las cards no se mostrarían por lo que tuve que jugar con la transparencia de la imagen en su lugar.
