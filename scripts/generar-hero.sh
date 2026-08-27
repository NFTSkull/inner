#!/usr/bin/env bash
# Genera el MP4 de fondo y el póster a partir de public/hero.MOV.
# Requiere ffmpeg. El MOV original se conserva como fuente.
set -euo pipefail
cd "$(dirname "$0")/.."

if [[ ! -f public/hero.MOV ]]; then
  echo "falta public/hero.MOV" >&2
  exit 1
fi

# Recorte anclado al borde inferior (cuenco completo) + zoom a manos
# y cuenco. Extiende el césped del borde inferior para subir el
# cuenco en el cuadro sin una franja de color falsa.
# Palíndromo ~8s. 1080×1920. Sin audio. faststart.
ffmpeg -y -i public/hero.MOV -an \
  -filter_complex "[0:v]scale=1080:-2,crop=1080:1180:0:740,scale=1080:1680,split[m][p];[p]crop=iw:80:0:ih-80,scale=1080:240:flags=bicubic[g];[m][g]vstack=inputs=2,fps=24,format=yuv420p,split[f][b];[b]reverse[r];[f][r]concat=n=2:v=1:a=0[v]" \
  -map "[v]" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 26 -preset medium \
  -movflags +faststart \
  public/hero.mp4

ffmpeg -y -ss 2.0 -i public/hero.MOV -frames:v 1 -update 1 \
  -vf "scale=1080:-2,crop=1080:1180:0:740,scale=1080:1680,split[m][p];[p]crop=iw:80:0:ih-80,scale=1080:240:flags=bicubic[g];[m][g]vstack=inputs=2" -q:v 5 \
  public/hero-poster.jpg

ls -lh public/hero.mp4 public/hero-poster.jpg
echo "hero generado"
