/**
 * Políticas del Meditation Club, operación de servicios y aviso de privacidad.
 * Fuente Club: historico del sitio. Operacion: Restructuración página web.
 */

export const POLITICAS_CLUB = [
  "Las membresías son personales y tienen vigencia únicamente durante el mes vigente.",
  "Las sesiones presenciales deben reservarse previamente y están sujetas a disponibilidad.",
  "Puedes solicitar un cambio de fecha hasta un día antes de la sesión reservada. El cambio dependerá de que exista espacio en otra fecha.",
  "Si necesitas cancelar, deberás avisar con un mínimo de 9 horas de anticipación. Podrás reponer la sesión durante el mes vigente únicamente si hay disponibilidad en otra fecha.",
  "Las cancelaciones realizadas con menos de 9 horas de anticipación y las inasistencias sin previo aviso se considerarán como sesión utilizada y no podrán recuperarse.",
  "Los pagos no son reembolsables.",
  "Al solicitar tu inscripción, tu lugar se conservará durante 24 horas. Después de ese plazo, si no se ha recibido el pago, el espacio volverá a quedar disponible.",
  "Las sesiones online se realizan únicamente en vivo. No se enviarán grabaciones ni habrá reposición por no conectarse.",
  "El lugar queda oficialmente confirmado una vez recibido el pago.",
] as const;

/** Notas operativas compartidas (documento). No son texto legal. */
export const POLITICAS_OPERACION = [
  {
    titulo: "Anticipo",
    cuerpo:
      "Las fechas de sesiones privadas, celebraciones y experiencias corporativas se reservan con un anticipo del 50%. El resto del pago deberá cubrirse antes de la experiencia, según las condiciones de la propuesta.",
  },
  {
    titulo: "Espacio y traslado",
    cuerpo:
      "La renta de un espacio privado se cotiza por separado. Puede aplicarse un costo adicional de traslado fuera de la zona establecida.",
  },
  {
    titulo: "Materiales",
    cuerpo:
      "En celebraciones, el material de dinámicas (flores) está incluido únicamente en Celebración Inner Flow. Los tapetes para participantes no están incluidos. En experiencias corporativas de piso, la organización proporciona tapetes; materiales individuales o consumibles se cotizan por separado.",
  },
  {
    titulo: "Disponibilidad y cambios",
    cuerpo:
      "La disponibilidad está sujeta a confirmación. Los cambios de fecha en experiencias corporativas están sujetos a disponibilidad.",
  },
] as const;

export const PRIVACIDAD = [
  {
    titulo: "Quiénes somos",
    cuerpo:
      "Inner Flow opera este sitio desde Monterrey, México. Las reservas y propuestas se confirman por WhatsApp o correo (innerflowmx@gmail.com). El pago se gestiona fuera de esta página.",
  },
  {
    titulo: "Qué datos recabamos",
    cuerpo:
      "Este sitio no crea cuentas ni procesa pagos. El formulario de contacto abre WhatsApp con un mensaje compuesto en tu dispositivo. Si nos escribes por WhatsApp o correo, esos canales reciben tus datos según sus propias políticas.",
  },
  {
    titulo: "Qué queda en tu dispositivo",
    cuerpo:
      "Solo usamos un dato local de sesión para no repetir la animación de entrada. No usamos cookies de seguimiento ni publicidad.",
  },
  {
    titulo: "Con quién se comparte",
    cuerpo:
      "No vendemos ni cedemos datos. WhatsApp y el correo, si los usas, son terceros independientes. El pago se confirma fuera de este sitio.",
  },
  {
    titulo: "Tus derechos",
    cuerpo:
      "Puedes pedir acceso, rectificación, cancelación u oposición al tratamiento de tus datos (derechos ARCO, LFPDPPP) escribiendo a innerflowmx@gmail.com, por WhatsApp o a @innerflow.mx. Atenderemos en un plazo razonable.",
  },
] as const;
