#!/usr/bin/env bash
# Genera el MP4 de fondo y el póster a partir de public/hero.MOV.
# Requiere ffmpeg. El MOV original se conserva como fuente.
set -euo pipefail
cd "$(dirname "$0")/.."

if [[ ! -f public/hero.MOV ]]; then
  echo "falta public/hero.MOV" >&2
  exit 1
fi

# Palíndromo: ida y vuelta para que el lazo de ~8s no corte el gesto.
# 1080 de ancho (el clip es vertical). Sin audio. faststart para streaming.
ffmpeg -y -i public/hero.MOV -an \
  -filter_complex "[0:v]scale=1080:-2,fps=24,format=yuv420p,split[f][b];[b]reverse[r];[f][r]concat=n=2:v=1:a=0[v]" \
  -map "[v]" \
  -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 26 -preset medium \
  -movflags +faststart \
  public/hero.mp4

ffmpeg -y -ss 2.0 -i public/hero.MOV -frames:v 1 -update 1 \
  -vf "scale=1080:-2" -q:v 5 \
  public/hero-poster.jpg

ls -lh public/hero.mp4 public/hero-poster.jpg
echo "hero generado"
