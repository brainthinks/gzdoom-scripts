# GZDoom Installer for Ubuntu

Note that I'm using Linux Mint, but this should work on any Ubuntu-based distribution.

## Prerequisites

* Ubuntu or a derivative
* One or more Doom WAD files

## Use

Simply run

```
install.sh
```

Note that there are currently no configuration options for where files live - all paths are relative, but hard coded.  This is something I can change in the future, if anyone is interested in this project.


## PSX Doom

In my script for running my local copy of the PSX Doom TC, I got the following error message:

```
Script error, "PSXDOOM.PK3:sbarinfo.txt" line 13:
Expected identifier but got 'null' instead.
```

So I opened that file in a text editor (from within Linux Mint's default archive browser) and simply removed line 13, which read:

```
NULL -1;
```

I was able to confirm that this was done elsewhere - this line is commented out in at least the files PCHUDAR1.PK3 and PCHUDAR2.PK3, so I am not afraid to leave it commented out in PSXDOOM.PK3.  Perhaps they were experimenting with it and forgot to comment it out for the release.

### Notes

* The customizer has a bunch of extra goodies - too bad it's Windows only... You can still add your own pk3 files, some of which I've included.
* Case sensitivity of the configuration file matters, so you must name the config file PSXDOOM.CFG, otherwise, a file with that name will be created for you, but with Windows line endings, even in the filename!
* GL_LIGHT_AMBIENT has been removed from GZDoom - see the reference link below.  I mention this because it gives a warning in the terminal if you use the standard psxdoom.cfg options that are in the supplied .bat file.
* It seems that SECRETMESSAGE has also been removed, but I wasn't able to find a reference to confirm this.
* I had to run psxdoom twice (without making any changes) to get the sound to work.

### Todos

* Need an install script for the psxdoom assets
* Script to update NULL -1 ?


## References
* [https://zdoom.org/wiki/Compile_GZDoom_on_Linux](https://zdoom.org/wiki/Compile_GZDoom_on_Linux)
* [https://www.doomworld.com/vb/wads-mods/57957-psx-doom-final-doom-tc-version-2-135-now-released/](https://www.doomworld.com/vb/wads-mods/57957-psx-doom-final-doom-tc-version-2-135-now-released/)
* [https://www.doomworld.com/vb/post/1074676](https://www.doomworld.com/vb/post/1074676)
* [http://www.mediafire.com/psxdoomtc](http://www.mediafire.com/psxdoomtc)
* [http://www.wad-archive.com/wad/f903b3d8f4ec67351837808c4bd2ca53](http://www.wad-archive.com/wad/f903b3d8f4ec67351837808c4bd2ca53)
* [https://github.com/coelckers/gzdoom/commit/36f87b7135afa27dde8e74b457bf03585402c38f](https://github.com/coelckers/gzdoom/commit/36f87b7135afa27dde8e74b457bf03585402c38f)
* [https://zdoom.org/wiki/Command_line_parameters](https://zdoom.org/wiki/Command_line_parameters)