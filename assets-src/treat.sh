#!/bin/zsh
# Ladička Duotone: luminance -> sigmoidal contrast -> mono grain -> map Grafit/Partitura
# usage: treat.sh in.png out.webp [maxpx]
in=$1; out=$2; max=${3:-1800}
magick "$in" -resize "${max}x${max}>" -colorspace Gray -sigmoidal-contrast 5,45% \
  -attenuate 0.22 +noise Gaussian -colorspace Gray \
  +level-colors '#141414','#EFECE6' -quality 84 "$out"
