"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Boton } from "@/components/ui/Boton";
import {
  CONTACTO_COPY,
  CONTACTO_INTERESES,
  SITE,
  type ContactoInteresId,
} from "@/lib/data/site";
import { enlaceReserva } from "@/lib/data/sesiones";

const CAMPO =
  "w-full border border-tinta/20 bg-papel px-4 py-3 text-cuerpo text-tinta outline-none transition-[border-color,box-shadow] duration-[var(--dur-corta)] ease-[var(--ease-respiro)] placeholder:text-tinta-suave/70 focus:border-azul-hondo focus:shadow-[0_0_0_3px_color-mix(in_srgb,var(--color-azul)_45%,transparent)]";

type FormState = {
  nombre: string;
  email: string;
  whatsapp: string;
  interes: ContactoInteresId | "";
  organizacion: string;
  fechaTentativa: string;
  participantes: string;
  mensaje: string;
};

const INICIAL: FormState = {
  nombre: "",
  email: "",
  whatsapp: "",
  interes: "",
  organizacion: "",
  fechaTentativa: "",
  participantes: "",
  mensaje: "",
};

function labelInteres(id: ContactoInteresId | ""): string {
  if (!id) return "";
  return CONTACTO_INTERESES.find((i) => i.id === id)?.label ?? id;
}

export function FormularioContacto() {
  const [form, setForm] = useState<FormState>(INICIAL);

  const esEmpresa = form.interes === "empresa-colegio";
  const mostrarFecha =
    form.interes === "celebracion-evento" ||
    form.interes === "empresa-colegio" ||
    form.interes === "evento-abierto" ||
    form.interes === "colaboracion" ||
    form.interes === "sesion-privada";

  const mostrarParticipantes =
    form.interes === "celebracion-evento" ||
    form.interes === "empresa-colegio" ||
    form.interes === "evento-abierto" ||
    form.interes === "colaboracion";

  const mensajeCompuesto = useMemo(() => {
    const lineas = [
      "Hola, escribo desde el formulario de contacto de Inner Flow.",
      form.nombre ? `Nombre: ${form.nombre}` : null,
      form.email ? `Email: ${form.email}` : null,
      form.whatsapp ? `WhatsApp: ${form.whatsapp}` : null,
      form.interes ? `Interés: ${labelInteres(form.interes)}` : null,
      esEmpresa && form.organizacion
        ? `Organización: ${form.organizacion}`
        : null,
      form.fechaTentativa
        ? `Fecha tentativa: ${form.fechaTentativa}`
        : null,
      form.participantes
        ? `Participantes: ${form.participantes}`
        : null,
      form.mensaje ? `Cuéntame un poco más: ${form.mensaje}` : null,
    ].filter(Boolean);
    return lineas.join("\n");
  }, [form, esEmpresa]);

  const alCambiar = (campo: keyof FormState, valor: string) => {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  };

  const alEnviar = (e: FormEvent) => {
    e.preventDefault();
    if (!form.nombre.trim() || !form.interes) return;
    window.open(
      enlaceReserva(mensajeCompuesto),
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
      <form
        onSubmit={alEnviar}
        className="space-y-6 lg:col-span-7"
        noValidate
      >
        <Campo label="Nombre" htmlFor="contacto-nombre" requerido>
          <input
            id="contacto-nombre"
            name="nombre"
            type="text"
            autoComplete="name"
            required
            placeholder="Escribe tu nombre"
            value={form.nombre}
            onChange={(e) => alCambiar("nombre", e.target.value)}
            className={CAMPO}
            style={{ borderRadius: "var(--radius-tactil)" }}
          />
        </Campo>

        <Campo label="Correo electrónico" htmlFor="contacto-email">
          <input
            id="contacto-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Escribe tu correo"
            value={form.email}
            onChange={(e) => alCambiar("email", e.target.value)}
            className={CAMPO}
            style={{ borderRadius: "var(--radius-tactil)" }}
          />
        </Campo>

        <Campo label="WhatsApp" htmlFor="contacto-whatsapp">
          <input
            id="contacto-whatsapp"
            name="whatsapp"
            type="tel"
            autoComplete="tel"
            placeholder="Escribe tu número"
            value={form.whatsapp}
            onChange={(e) => alCambiar("whatsapp", e.target.value)}
            className={CAMPO}
            style={{ borderRadius: "var(--radius-tactil)" }}
          />
        </Campo>

        <Campo label="¿Qué te interesa?" htmlFor="contacto-interes" requerido>
          <div
            id="contacto-interes"
            role="radiogroup"
            aria-label="Qué te interesa"
            className="flex flex-wrap gap-2"
          >
            {CONTACTO_INTERESES.map((op) => {
              const sel = form.interes === op.id;
              return (
                <button
                  key={op.id}
                  type="button"
                  role="radio"
                  aria-checked={sel}
                  onClick={() => alCambiar("interes", op.id)}
                  className="px-3.5 py-2 text-cuerpo transition-colors duration-[400ms] ease-[var(--ease-respiro)]"
                  style={{
                    borderRadius: "var(--radius-tactil)",
                    border: sel
                      ? "1.5px solid var(--color-tinta)"
                      : "1.5px solid color-mix(in srgb, var(--color-tinta) 22%, transparent)",
                    backgroundColor: sel
                      ? "color-mix(in srgb, var(--color-lima) 55%, var(--color-papel))"
                      : "var(--color-papel)",
                    color: "var(--color-tinta)",
                    fontWeight: sel ? 400 : 300,
                  }}
                >
                  {op.label}
                </button>
              );
            })}
          </div>
          {/* Campo oculto para required nativo / accesibilidad de form */}
          <input
            type="text"
            name="interes"
            value={form.interes}
            required
            tabIndex={-1}
            aria-hidden="true"
            className="sr-only"
            onChange={() => undefined}
          />
        </Campo>

        {esEmpresa && (
          <Campo
            label="Organización"
            htmlFor="contacto-org"
            hint="Empresa, colegio o institución"
          >
            <input
              id="contacto-org"
              name="organizacion"
              type="text"
              value={form.organizacion}
              onChange={(e) => alCambiar("organizacion", e.target.value)}
              className={CAMPO}
              style={{ borderRadius: "var(--radius-tactil)" }}
            />
          </Campo>
        )}

        {mostrarFecha && (
          <Campo
            label="Fecha tentativa"
            htmlFor="contacto-fecha"
            hint="Si ya la tienes"
          >
            <input
              id="contacto-fecha"
              name="fechaTentativa"
              type="text"
              placeholder="Selecciona una fecha, si ya la tienes"
              value={form.fechaTentativa}
              onChange={(e) => alCambiar("fechaTentativa", e.target.value)}
              className={CAMPO}
              style={{ borderRadius: "var(--radius-tactil)" }}
            />
          </Campo>
        )}

        {mostrarParticipantes && (
          <Campo
            label="Número aproximado de participantes"
            htmlFor="contacto-participantes"
          >
            <input
              id="contacto-participantes"
              name="participantes"
              type="text"
              placeholder="Escribe el número de personas"
              value={form.participantes}
              onChange={(e) => alCambiar("participantes", e.target.value)}
              className={CAMPO}
              style={{ borderRadius: "var(--radius-tactil)" }}
            />
          </Campo>
        )}

        <Campo
          label="Cuéntame un poco más"
          htmlFor="contacto-mensaje"
          hint="¿Qué te gustaría vivir o crear?"
        >
          <textarea
            id="contacto-mensaje"
            name="mensaje"
            rows={5}
            value={form.mensaje}
            onChange={(e) => alCambiar("mensaje", e.target.value)}
            className={`${CAMPO} min-h-[8rem] resize-y`}
            style={{ borderRadius: "var(--radius-tactil)" }}
          />
        </Campo>

        <div className="pt-2">
          <Boton variante="primario" type="submit">
            Enviar solicitud
          </Boton>
          <p className="mt-4 max-w-md text-cuerpo text-tinta-suave">
            {CONTACTO_COPY.notaRespuesta}
          </p>
        </div>
      </form>

      <aside className="lg:col-span-5">
        <div
          className="border border-tinta/12 bg-papel px-6 py-8 sm:px-8"
          style={{ borderRadius: "var(--radius-papel)" }}
        >
          <p className="text-etiqueta uppercase tracking-[0.14em] text-tinta-suave">
            También puedes encontrarme en
          </p>
          <ul className="mt-6 space-y-4 text-cuerpo text-tinta">
            <li>
              <a
                href={SITE.emailHref}
                className="enlace-plumon font-normal"
              >
                Correo: {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={enlaceReserva("Hola, quiero hablar con Inner Flow.")}
                target="_blank"
                rel="noopener noreferrer"
                className="enlace-plumon font-normal"
              >
                WhatsApp: {SITE.whatsappDisplay}
              </a>
            </li>
            <li>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="enlace-plumon font-normal"
              >
                Instagram: {SITE.instagramHandle}
              </a>
            </li>
          </ul>
          <p className="mt-6 text-cuerpo text-tinta-suave">
            Para propuestas corporativas, colegios, eventos y
            colaboraciones, el correo electrónico es el medio recomendado.
            Para reservaciones y preguntas rápidas, también puedes escribirme
            por WhatsApp.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <Boton variante="secundario" href={SITE.emailHref} externo>
              Enviar un correo
            </Boton>
            <Boton
              variante="primario"
              href={enlaceReserva("Hola, quiero hablar con Inner Flow.")}
              externo
            >
              Hablar por WhatsApp
            </Boton>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="enlace-plumon text-cuerpo font-normal"
            >
              Seguir a Inner Flow en Instagram
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}

function Campo({
  label,
  htmlFor,
  children,
  requerido,
  hint,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  requerido?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="flex flex-wrap items-baseline justify-between gap-2 text-etiqueta uppercase tracking-[0.12em] text-tinta-suave"
      >
        <span>
          {label}
          {requerido ? " *" : ""}
        </span>
        {hint && (
          <span className="normal-case tracking-normal text-tinta-suave/80">
            {hint}
          </span>
        )}
      </label>
      <div className="mt-2">{children}</div>
    </div>
  );
}
