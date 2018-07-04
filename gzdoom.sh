#!/usr/bin/env bash

# Unique name, used to identify the configuration
NAME="gzdoom"

# Used to locate the "WADs", "mods", and "configs" directories
ASSET_DIR="/media/user/linux_storage/games/doom"

WAD_DIR="$ASSET_DIR/WADs/" \
MOD_DIR="$ASSET_DIR/mods/" \
CONFIG_DIR="$ASSET_DIR/configs/$NAME/" \
./_container.sh \
  -iwad /root/wads/doom1.wad \
  -file \
    "/root/mods/anders/mapinfo.txt" \
    "$@"
