# Scire — Portal demo

Prototipo navegable del portal de Scire Clinical Diagnosis. Sin backend, sin
base de datos, datos ficticios. Ver `../docs/PRD.md` y `../docs/TECH-SPEC.md`.

## Correrlo

```bash
npm install
npm run dev
```

Abre `http://localhost:5173/`.

## Probarlo (spec 01)

1. En la pantalla de ingreso, con la pestaña **Paciente** activa, entra con:
   - Tipo de documento: `CC`
   - Número de documento: `1091678432`
   - Fecha de nacimiento: `12/04/1988`
2. Deberías llegar a **Mis órdenes**, con 4 órdenes de María Fernanda
   Contreras Rangel: una ámbar (*Remitida*) y tres verdes (*Lista*). Para ver
   el estado *En proceso*, entra como Jairo Alonso Peñaranda Suárez
   (`CC` `88234561`, `03/11/1975`).
3. Haz clic en cualquier fila para ver el detalle del resultado, con valores,
   unidades y rangos de referencia. El botón "Descargar PDF" se ve pero está
   deshabilitado a propósito.
4. Abre la orden remitida (`SCR-100550`, 24 de octubre) y lee la nota
   explicando por qué tarda más.
5. Recarga la página (F5) estando en `/paciente`: la sesión debe mantenerse.
6. Entra directo por URL a `http://localhost:5173/paciente/orden/ord-002`
   (sin pasar por el login): debe cargar, no dar 404. Esa orden tiene dos
   valores **fuera de rango**, marcados en rojo con icono y texto.
7. Prueba con datos que no existen (otro documento) y confirma que el error
   aparece en línea, nunca como un `alert()` del navegador.
8. Prueba la navegación completa con teclado (`Tab`, `Enter`): el foco debe
   verse siempre y debe moverse al título de cada pantalla nueva.

Otros pacientes de prueba, mismo patrón: ver `src/datos/fixtures.ts`.

## Probarlo (spec 02 — tablero institucional)

1. En la pantalla de ingreso, cambia a la pestaña **Institución** y entra con
   la identificación de convenio `CONV-4471` (Consultorio Médico Norte de
   Santander).
2. Deberías llegar al **tablero**, con tres contadores (en proceso, remitidas,
   listas) y una tabla de 4 órdenes de pacientes distintos.
3. Filtra por estado, por rango de fechas o escribe un nombre en "Paciente":
   los contadores y las filas deben recalcularse juntos. Prueba un nombre que
   no exista para ver el vacío "Ningún resultado con estos filtros", distinto
   del vacío que se ve si el convenio no tuviera ninguna orden.
4. Haz clic en una fila: llegas a la misma pantalla de resultado que usa el
   paciente, con una línea extra "Convenio: ..." y un botón "Volver al
   tablero" (no "Volver a mis órdenes").
5. Sal (botón "Salir") y vuelve a entrar con el otro convenio,
   `CONV-2208` (IPS San Rafael de Cúcuta): debes ver pacientes y órdenes
   completamente distintos. Ninguna institución ve las órdenes de la otra.
6. Recarga la página (F5) estando en `/institucion`: la sesión institucional
   debe mantenerse.
7. Prueba un código de convenio que no existe: el error aparece en línea,
   nunca como `alert()`.

## Probarlo (spec 03 — agendar, cotizar y pulido)

1. Desde `/` (sin iniciar sesión), haz clic en **"Agenda una toma
   domiciliaria"**. La pantalla `/agendar` debe cargar sin pedir login.
2. Da clic en "Enviar solicitud" con el formulario vacío: los ocho campos
   deben marcar error en línea, incluida la casilla de autorización. Ningún
   `alert()`.
3. Haz clic en "política de tratamiento de datos": debe abrir `/privacidad`
   en una pestaña nueva, con un aviso de que es un borrador.
4. Completa el formulario y envíalo. Debes llegar a una pantalla de
   confirmación con un número de solicitud (`AG-XXXXXX`).
5. Desde `/`, haz clic en **"cotiza"**. En `/cotizar`, marca dos o tres
   exámenes: el total debe sumar en vivo. Cada precio y el total llevan la
   etiqueta "EJEMPLO" o "VALOR DE EJEMPLO, NO ES UNA TARIFA REAL" — nunca se
   ven como precios reales.
6. Haz clic en "Enviar cotización por WhatsApp": debe abrir
   `api.whatsapp.com` con el número de Scire y un mensaje que lista los
   exámenes elegidos y el total.
7. Entra a una URL inventada, por ejemplo `http://localhost:5173/lo-que-sea`:
   debe mostrar el 404 con la marca de Scire y un botón de vuelta al inicio.
8. Recorre `/`, `/agendar` y `/cotizar` solo con teclado (`Tab`, `Enter`): el
   foco debe verse siempre, incluidos los enlaces "Agenda una toma
   domiciliaria" y "cotiza" al final de la pantalla de ingreso.

Con esto los cuatro módulos del PRD están completos. Ver `../docs/PRD.md` y
`../docs/BLUEPRINT.md`.
