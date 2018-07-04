#!/usr/bin/env bash

# Unique name, used to identify the configuration
# @todo - null check for $NAME

# The root directory for all doom assets.
BASE_PATH="/media/user/linux_storage/games/doom"

# The directory that contains the doom wads.
WAD_PATH="$BASE_PATH/WADs"

# The directory that contains the mod files.
MOD_PATH="$BASE_PATH/mods"

# The directory that contains the configurations.
# Each folder in this directory should be the $NAME of a particular gzdoom script configuration.
# The config file itself is expected to be "gzdoom.ini".
CONFIG_FILE="$BASE_PATH/configs/$NAME/gzdoom.ini"

# The path that contains the gzdoom executable and the default gzdoom mods.
GZDOOM_PATH="$BASE_PATH/gzdoom/gzdoom_build/gzdoom/build"

# All default GZDoom mods
GZDOOM_BASE_MODS="\
$GZDOOM_PATH/lights.pk3 \
$GZDOOM_PATH/brightmaps.pk3 \
$GZDOOM_PATH/gzdoom.sf2 \
$GZDOOM_PATH/zd_extra.pk3 \
"

# All default HDDoom mods
HDDOOM_BASE_MODS="\
$MOD_PATH/doomhd/DooM - HD Gore.pk3 \
$MOD_PATH/doomhd/DooM - HD Items.pk3 \
$MOD_PATH/doomhd/DooM - HD Monsters.pk3 \
$MOD_PATH/doomhd/DooM - HD Sprites.pk3 \
$MOD_PATH/doomhd/DooM - HD Textures.pk3 \
$MOD_PATH/doomhd/DooM - HD Walls Bloods.pk3 \
"

# Default Doom Visor mod
DOOM_VISOR_MOD="$MOD_PATH/Ultimate_DoomVisor_v1.85_2016-09-07/UDV_v1.85_A_BASE.pk3"

# Default Project Brutality mod
PROJECT_BRUTALITY_MOD="$MOD_PATH/project_brutality/project brutality 3.0 test 8-19-17.pk3"

# Anders mapinfo fixes
ANDERS_MAP_INFO="$MOD_PATH/anders/mapinfo.txt"

function runGZDoom () {
  "$GZDOOM_PATH/gzdoom" -config "$CONFIG_FILE" "$@"
}
