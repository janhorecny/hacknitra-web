#!/bin/zsh
# optimize all png in assets-src -> site/public/img/*.webp (max 1600px)
out=../site/public/img; mkdir -p $out
for f in *.png; do n=${f:r}; [ -f $out/$n.webp ] && [ $out/$n.webp -nt $f ] && continue; magick "$f" -resize '1600x1600>' -quality 82 $out/$n.webp && echo "$n $(du -h $out/$n.webp | cut -f1)"; done
