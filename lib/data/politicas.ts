/**
 * Políticas del Meditation Club y aviso de privacidad.
 * El texto legal vive aquí, no en el JSX.
 */

export const POLITICAS_CLUB = [
  "Las membresías son personales y tienen vigencia únicamente durante el mes vigente.",
  "Las sesiones presenciales deben reservarse previamente y están sujetas a disponibilidad.",
  "Puedes solicitar un cambio de fecha hasta un día antes de la sesión reservada. El cambio dependerá de que exista espacio en otra fecha.",
  "Si necesitas cancelar, deberás avisar con un mínimo de 9 horas de anticipación. Podrás reponer la sesión durante septiembre únicamente si hay disponibilidad en otra fecha.",
  "Las cancelaciones realizadas con menos de 9 horas de anticipación y las inasistencias sin previo aviso se considerarán como sesión utilizada y no podrán recuperarse.",
  "Los pagos no son reembolsables.",
  "Al solicitar tu inscripción, tu lugar se conservará durante 24 horas. Después de ese plazo, si no se ha recibido el pago, el espacio volverá a quedar disponible.",
  "Las sesiones online se realizan únicamente en vivo. No se enviarán grabaciones ni habrá reposición por no conectarse.",
  "El lugar queda oficialmente confirmado una vez recibido el pago.",
] as const;

export const PRIVACIDAD = [
  {
    titulo: "Quiénes somos",
    cuerpo:
      "InnerFlow Meditation Club opera este sitio desde Monterrey, México. Las reservas y el pago se gestionan por Instagram (@innerflow.mx), no dentro de esta página.",
  },
  {
    titulo: "Qué datos recabamos",
    cuerpo:
      "Este sitio no pide cuentas, no tiene formularios y no procesa pagos. No guardamos tu nombre, teléfono ni datos bancarios. Si nos escribes por Instagram, esos datos los recibe Instagram según sus propias políticas.",
  },
  {
    titulo: "Qué queda en tu dispositivo",
    cuerpo:
      "Solo usamos un dato local de sesión para no repetir la animación de entrada. No usamos cookies de seguimiento ni publicidad.",
  },
  {
    titulo: "Con quién se comparte",
    cuerpo:
      "No vendemos ni cedemos datos. Instagram, si lo usas para reservar, es un tercero independiente. El pago se confirma fuera de este sitio.",
  },
  {
    titulo: "Tus derechos",
    cuerpo:
      "Puedes pedir acceso, rectificación, cancelación u oposición al tratamiento de tus datos (derechos ARCO, LFPDPPP) escribiendo a @innerflow.mx. Atenderemos en un plazo razonable.",
  },
] as const;
