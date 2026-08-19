/**
 * Divisor de secciones: las tres ondas concéntricas del sello de
 * InnerFlow, en azul al 25 por ciento. Nunca una línea recta.
 */
export function OndaDivisor({ className = "" }: { className?: string }) {
  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="block h-14 w-full text-azul sm:h-20"
        fill="none"
      >
        <path
          d="M -20 30 C 220 8, 480 52, 720 34 C 960 16, 1220 54, 1460 28"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.25"
        />
        <path
          d="M -20 52 C 230 32, 470 72, 720 55 C 970 38, 1210 74, 1460 50"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.22"
        />
        <path
          d="M -20 74 C 240 58, 460 90, 720 76 C 980 62, 1200 92, 1460 72"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.18"
        />
      </svg>
    </div>
  );
}
