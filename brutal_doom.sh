#!/usr/bin/env bash

NAME="brutal_doom"

source "./_utils.sh"

runGZDoom \
  -iwad "$WAD_PATH/doom1.wad" \
  -file \
    "$GZDOOM_BASE_MODS" \
    "$DOOM_VISOR_MOD" \
    "$PROJECT_BRUTALITY_MOD" \
    "$HDDOOM_BASE_MODS" \
    "$ANDERS_MAP_INFO" \
    "$@"
