#!/usr/bin/env bash

# NVidia at one time had a docker wrapper that would allow you to take advantage
# of the host video drivers (or something to that effect).  After a significant
# amount searching the internet (I wish I had kept my resources...), I was able
# to find the various pieces of the puzzle needed to get a docker container
# configured to use the host video drivers.  However, the next major version of
# their docker technology got rid of the ability to directly access the host's
# X instance... which made this whole thing useless.  Additionally, this is
# definitely overkill just to play doom.  However, I thought it was a cool idea,
# and it took a lot of work, so I'm keeping it here for posterity's sake until
# I can replace it with something better.

# @todo - I'm pretty sure I have my notes saved in boostnote!

PULSE_SOCKET_PATH="/run/user/$UID/pulse/native"
X11_SOCKET_PATH="/tmp/.X11-unix"
XAUTHORITY_PATH="/home/$USER/.Xauthority"

docker container run -ti \
  --rm \
  --device=/dev/nvidia0:/dev/nvidia0 \
  --device=/dev/nvidiactl:/dev/nvidiactl \
  --device=/dev/nvidia-uvm:/dev/nvidia-uvm \
  -e DISPLAY=$DISPLAY \
  -e "XAUTHORITY=$XAUTHORITY_PATH" \
  -v "$X11_SOCKET_PATH:/tmp/.X11-unix" \
  -e "PULSE_SERVER=unix:/root/pulsesocket" \
  -v "$PULSE_SOCKET_PATH:/root/pulsesocket" \
  -v "$WAD_DIR:/root/wads" \
  -v "$MOD_DIR:/root/mods" \
  -v "$CONFIG_DIR:/root/.config/gzdoom" \
  gzdoom \
  gzdoom \
    /usr/games/gzdoom/lights.pk3 \
    /usr/games/gzdoom/brightmaps.pk3 \
    /usr/games/gzdoom/gzdoom.sf2 \
    /usr/games/gzdoom/zd_extra.pk3 \
    "$@"
