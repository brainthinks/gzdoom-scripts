#!/usr/bin/env bash

# Unique name, used to identify the configuration
NAME="complex_doom"

# Used to locate the "WADs", "mods", and "configs" directories
ASSET_DIR="/media/user/linux_storage/games/doom"

WAD_DIR="$ASSET_DIR/WADs/" \
MOD_DIR="$ASSET_DIR/mods/" \
CONFIG_DIR="$ASSET_DIR/configs/$NAME/" \
./_container.sh \
  -iwad /root/wads/doomu.wad \
  -file \
    "/root/mods/complex_doom/complex-doom.v26a2.pk3" \
    "/root/mods/complex_doom/lca-v1.5.9.5.pk3" \
		"$@"
