'use strict';

const basePath = '/media/user/linux_storage/games/doom';

// The path that contains the gzdoom executable and the default gzdoom mods.
const gzdoomBuildPath = `${basePath}/gzdoom/gzdoom_build/gzdoom/build`;

const paths = {
  // The root directory for all doom assets.
  base: basePath,
  // The directory that contains the doom wads.
  wads: `${basePath}/WADs`,
  // The directory that contains the mod files.
  mods: `${basePath}/mods`,
  // The directory that contains the gzdoom configurations for each game type.
  configs: `${basePath}/configs`,
  getConfigDir: (name) => `${basePath}/configs/${name}`,
  getConfig: (name) => `${basePath}/configs/${name}/gzdoom.ini`,
  // The path to the gzdoom binary
  gzdoom: gzdoomBuildPath,
  // The path to the default gzdoom mods
  gzdoomMods: gzdoomBuildPath,
};

const bins = {
  gzdoom: 'gzdoom',
  // gzdoom: `${paths.gzdoom}/gzdoom`,
};

const wads = {
  doom_shareware: `${paths.wads}/doom.wad`,
  doom_registered: `${paths.wads}/doom1.wad`,
  ultimate_doom: `${paths.wads}/doomu.wad`,
  doom2: `${paths.wads}/doom2.wad`,
};

const mods = {};

mods.gzdoom = {
  lights: `${paths.gzdoom}/lights.pk3`,
  brightmaps: `${paths.gzdoom}/brightmaps.pk3`,
  gzdoom: `${paths.gzdoom}/gzdoom.sf2`,
  zd_extra: `${paths.gzdoom}/zd_extra.pk3`,
};

mods.hddoom = {
  gore: `${paths.mods}/doomhd/DooM - HD Gore.pk3`,
  items: `${paths.mods}/doomhd/DooM - HD Items.pk3`,
  monsters: `${paths.mods}/doomhd/DooM - HD Monsters.pk3`,
  sprites: `${paths.mods}/doomhd/DooM - HD Sprites.pk3`,
  textures: `${paths.mods}/doomhd/DooM - HD Textures.pk3`,
  walls_bloods: `${paths.mods}/doomhd/DooM - HD Walls Bloods.pk3`,
};

mods.idkfa = `${paths.mods}/idkfa/IDKFAv2.wad`;
mods.ultimateDoomVisor = `${paths.mods}/Ultimate_DoomVisor_v1.85_2016-09-07/UDV_v1.85_A_BASE.pk3`;
mods.pbhud = `${paths.mods}/hxrtchud/HXRTCHUD-PB3_v8.2.pk3`;
mods.brutalDoom = `${paths.mods}/brutal_doom/BD21RC7.pk3`;
mods.projectBrutality = `${paths.mods}/project_brutality/project_brutality_master.pk3`;
mods.andersMapInfo = `${paths.mods}/anders/mapinfo.txt`;
mods.ultimateDoomOneEpisode = `${paths.mods}/anders/ultimate_doom_one_episode/mapinfo.txt`;

mods.mapsOfChaos = {
  overkill: `${paths.mods}/MapsOfChaos.2/mapsofchaos-ok.wad`,
  // D64ULTDM: `${paths.mods}/MapsOfChaos.2/D64ULTDM.WAD`,
};

mods.hellsPlayground = {
  gzdoomFiles: [
    `${paths.mods}/hells_playground/Hells Playground V1.0/Resource Files/GZDoom/Hell's Playground GZDoom Missing Object Patch.pk3`,
    `${paths.mods}/hells_playground/Hells Playground V1.0/Resource Files/GZDoom/Hell's Playground GZDoom Texture Improvement Addon.pk3`,
  ],
  resourceFiles: [
    `${paths.mods}/hells_playground/Hells Playground V1.0/Resource Files/Hell's Playground Resource File 1.pk3`,
    `${paths.mods}/hells_playground/Hells Playground V1.0/Resource Files/Hell's Playground Resource File 2.pk3`,
  ],
  brutalDoom: [
    // `${paths.mods}/hells_playground/Hells Playground V1.0/Resource Files/Brutal Doom Patch/Hell's Playground Brutal Doom Patch.pk3`,
    // `${paths.mods}/hells_playground/Hells Playground V1.0/Hell's Playground/Brutal Doom Version/custom monsters/Hell's Playground  Brutal Doom + custom  200 monsters.wad`,
    `${paths.mods}/hells_playground/Hells Playground V1.0/Hell's Playground/Brutal Doom Version/original + brutal doom monsters/Hell's Playground  Brutal Doom 200 monsters.wad`,
  ],
};

mods.ultraHdTextures = {
  doom: [
    `${paths.mods}/hoover1979-ultrahd-doom-texture-pack/HOOVER1979_UltraHD_Texture_Pack_02102018-1k/HOOVER1979_UltraHD_Texture_Pack_02102018_Main_file-1k.pk3`,
    `${paths.mods}/hoover1979-ultrahd-doom-texture-pack/HOOVER1979_UltraHD_Texture_Pack_02102018-1k/HOOVER1979_UltraHD_Texture_Pack_02102018_Doom_1_Override-1k.pk3`,
  ],
  doom2: [
    `${paths.mods}/hoover1979-ultrahd-doom-texture-pack/HOOVER1979_UltraHD_Texture_Pack_02102018-1k/HOOVER1979_UltraHD_Texture_Pack_02102018_Main_file-1k.pk3`,
    `${paths.mods}/hoover1979-ultrahd-doom-texture-pack/HOOVER1979_UltraHD_Texture_Pack_02102018-1k/HOOVER1979_UltraHD_Texture_Pack_02102018_Doom_2_Override-1k.pk3`,
  ],
  tnt: [
    `${paths.mods}/hoover1979-ultrahd-doom-texture-pack/HOOVER1979_UltraHD_Texture_Pack_02102018-1k/HOOVER1979_UltraHD_Texture_Pack_02102018_Main_file-1k.pk3`,
    `${paths.mods}/hoover1979-ultrahd-doom-texture-pack/HOOVER1979_UltraHD_Texture_Pack_02102018-1k/HOOVER1979_UltraHD_Texture_Pack_02102018_Evilution_Override-1k.pk3`,
  ],
  plutonia: [
    `${paths.mods}/hoover1979-ultrahd-doom-texture-pack/HOOVER1979_UltraHD_Texture_Pack_02102018-1k/HOOVER1979_UltraHD_Texture_Pack_02102018_Main_file-1k.pk3`,
    `${paths.mods}/hoover1979-ultrahd-doom-texture-pack/HOOVER1979_UltraHD_Texture_Pack_02102018-1k/HOOVER1979_UltraHD_Texture_Pack_02102018_Plutonia_Experiment_Override-1k.pk3`,
  ],
};

mods.doomOpenWorld = `${paths.mods}/ultimate_doom_open_world/Doom1OWBeta.wad`;

mods.psxDoom = {
  pcdfclt: `${paths.mods}/psxdoom/assets-enabled/PCDFCLT.PK3`,
  psxfdhud: `${paths.mods}/psxdoom/assets-enabled/PSXFDHUD.PK3`,
  psxfdssg: `${paths.mods}/psxdoom/assets-enabled/PSXFDSSG.PK3`,
  psxlogo: `${paths.mods}/psxdoom/assets-enabled/PSXLOGO.PK3`,
  psxnmare: `${paths.mods}/psxdoom/assets-enabled/PSXNMARE.PK3`,
  psxsound: `${paths.mods}/psxdoom/assets-enabled/PSXSOUND.PK3`,
  psxwill: `${paths.mods}/psxdoom/assets-enabled/PSXWILL.PK3`,
  psxload: `${paths.mods}/psxdoom/PSXLOAD.PK3`,
};

mods.brutalDoom64 = {
  // note that gamev2 can be replaced with project brutality,
  // which allows you to play the doom64 levels with project
  // brutality weapons and monsters.
  bd64gamev2: mods.projectBrutality,
  // bd64gamev2: `${paths.mods}/brutal_doom_64/bd64gamev2.pk3`,
  bd64mapsV2: `${paths.mods}/brutal_doom_64/bd64mapsV2.pk3`,
  ZD64MUSIC: `${paths.mods}/brutal_doom_64/ZD64MUSIC.pk3`,
};

const purist = {
  config: paths.getConfig('purist'),
  savedir: paths.getConfigDir('purist'),
  iwad: wads.doom_registered,
};

const vanilla = {
  config: paths.getConfig('vanilla'),
  savedir: paths.getConfigDir('vanilla'),
  iwad: wads.doom_registered,
  file: [
    ...Object.values(mods.gzdoom),
  ],
};

const psxDoom = {
  config: paths.getConfig('psxDoom'),
  savedir: paths.getConfigDir('psxDoom'),
  exec: `${paths.mods}/psxdoom/PSXDOOM.CFG`,
  iwad: wads.doom2,
  file: [
    ...Object.values(mods.gzdoom),
    mods.psxDoom.pcdfclt,
    mods.psxDoom.psxfdhud,
    mods.psxDoom.psxfdssg,
    mods.psxDoom.psxlogo,
    mods.psxDoom.psxnmare,
    mods.psxDoom.psxsound,
    mods.psxDoom.psxwill,
    mods.projectBrutality,
    mods.psxDoom.psxload,
    mods.andersMapInfo,
  ],
};

const brutalDoom = {
  config: paths.getConfig('brutalDoom'),
  savedir: paths.getConfigDir('brutalDoom'),
  iwad: wads.ultimate_doom,
  file: [
    ...Object.values(mods.gzdoom),
    ...Object.values(mods.mapsOfChaos),
    mods.brutalDoom,
    mods.ultimateDoomOneEpisode,
    mods.andersMapInfo,
  ],
};

const brutalDoom2 = {
  config: paths.getConfig('brutalDoom'),
  savedir: paths.getConfigDir('brutalDoom'),
  iwad: wads.doom2,
  file: [
    ...Object.values(mods.gzdoom),
    ...Object.values(mods.mapsOfChaos),
    mods.brutalDoom,
    mods.andersMapInfo,
  ],
};

const hellsPlayground = {
  config: paths.getConfig('hellsPlayground'),
  savedir: paths.getConfigDir('hellsPlayground'),
  iwad: wads.doom2,
  file: [
    ...Object.values(mods.gzdoom),
    mods.brutalDoom,
    // ...mods.ultraHdTextures.doom2,
    ...mods.hellsPlayground.gzdoomFiles,
    ...mods.hellsPlayground.brutalDoom,
    ...mods.hellsPlayground.resourceFiles,
    // mods.andersMapInfo,
  ],
};

const brutalDoom64 = {
  config: paths.getConfig('brutalDoom64'),
  savedir: paths.getConfigDir('brutalDoom64'),
  iwad: wads.doom2,
  file: [
    ...Object.values(mods.brutalDoom64),
    mods.andersMapInfo,
  ],
};

module.exports = {
  paths,
  bins,
  wads,
  mods,
  presets: {
    purist,
    vanilla,
    brutalDoom,
    brutalDoom2,
    psxDoom,
    hellsPlayground,
    brutalDoom64,
  },
};
