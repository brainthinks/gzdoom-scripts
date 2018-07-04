#!/usr/bin/env bash

NAME="mapsOfChaos"

source "./_utils.sh"

runGZDoom \
  -iwad "$WAD_PATH/doom2.wad" \
  -file \
    "$MOD_PATH/MapsOfChaos.2/mapsofchaos-ok.wad" \
    "$MOD_PATH/MapsOfChaos.2/D64ULTDM.WAD" \
    "$MOD_PATH/idkfa/IDKFAv2.wad" \
    "$MOD_PATH/Ultimate_DoomVisor_v1.85_2016-09-07/UDV_v1.85_A_BASE.pk3" \
    "$MOD_PATH/project_brutality/project brutality 3.0 test 8-19-17.pk3" \
    "$MOD_PATH/doomhd/DooM - HD Gore.pk3" \
    "$MOD_PATH/doomhd/DooM - HD Items.pk3" \
    "$MOD_PATH/doomhd/DooM - HD Monsters.pk3" \
    "$MOD_PATH/doomhd/DooM - HD Sprites.pk3" \
    "$MOD_PATH/doomhd/DooM - HD Textures.pk3" \
    "$MOD_PATH/doomhd/DooM - HD Walls Bloods.pk3" \
    "$MOD_PATH/anders/mapinfo.txt" \
    "$@"

