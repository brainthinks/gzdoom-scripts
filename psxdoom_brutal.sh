#!/usr/bin/env bash

NAME="psxdoom_brutal"

source "./_utils.sh"

runGZDoom \
  -exec "$MOD_PATH/psxdoom/PSXDOOM.CFG" \
  -iwad "$WAD_PATH/doom2.wad" \
  -file \
    "$GZDOOM_BASE_MODS" \
    "$MOD_PATH/psxdoom/assets-enabled/*.PK3" \
    "$DOOM_VISOR_MOD" \
    "$PROJECT_BRUTALITY_MOD" \
    "$MOD_PATH/psxdoom/PSXLOAD.PK3" \
    "$HDDOOM_BASE_MODS" \
    "$ANDERS_MAP_INFO" \
    "$@"
