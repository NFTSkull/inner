/** "Yoga & Matcha" → el "&" en rosa suave; el resto hereda el color. */
export function NombreEvento({ nombre }: { nombre: string }) {
  return (
    <>
      {nombre.split("&").map((parte, i) => (
        <span key={i}>
          {i > 0 && <span className="text-rosa">&amp;</span>}
          {parte}
        </span>
      ))}
    </>
  );
}
