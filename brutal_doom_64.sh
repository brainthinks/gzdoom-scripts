#!/usr/bin/env bash

# Unique name, used to identify the configuration
NAME="brutal_doom_64"

# Used to locate the "WADs", "mods", and "configs" directories
ASSET_DIR="/media/user/linux_storage/games/doom"

WAD_DIR="$ASSET_DIR/WADs/" \
MOD_DIR="$ASSET_DIR/mods/" \
CONFIG_DIR="$ASSET_DIR/configs/$NAME/" \
./_container.sh \
  -iwad /root/wads/doom2.wad \
  -file \
    "/root/mods/brutal_doom_64/bd64gamev2.pk3" \
    "/root/mods/brutal_doom_64/bd64mapsV2.pk3" \
    "/root/mods/brutal_doom_64/ZD64MUSIC.pk3" \
    "/root/mods/brutal_doom_64/BD64BE.pk3" \
    "/root/mods/anders/mapinfo.txt" \
    "$@"

    # bd64gamev2 and brutal doom are interchangable
    # "/root/mods/brutal_doom/bd21testnov5.pk3" \
