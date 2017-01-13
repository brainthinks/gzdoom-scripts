#!/usr/bin/env bash

./gzdoom.sh \
	-file \
		../../mods/psxdoom/PSXLOAD.PK3 \
		../../mods/psxdoom/assets-enabled/*.PK3 \
	-iwad ../../WADs/doom2.wad \
	-exec ./PSXDOOM.CFG