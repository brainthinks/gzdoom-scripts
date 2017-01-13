#!/usr/bin/env bash

# Use the current path as the root for where we put files
readonly ROOT=$(pwd)

# git url for the gzdoom project
readonly GIT_URL="git://github.com/coelckers/gzdoom.git"

# directory to place backup of compiled files
readonly BACKUP_ROOT="$ROOT/gzdoom_build/backups/"

# determine if 64 architecture
readonly ARCH=$([ "$(uname -m)" = "x86_64" ] && echo 64 || echo "")

# prepare FMODEX information
readonly FMODEX_FILENAME="fmodapi44462linux"
readonly FMODEX_URL="http://zdoom.org/files/fmod/$FMODEX_FILENAME.tar.gz"
readonly FMODEX_LIBRARY_PATH="$ROOT"/gzdoom_build/gzdoom/"$FMODEX_FILENAME"/api/lib/libfmodex"$ARCH"-4.44.62.so
readonly FMODEX_INCLUDE_DIR="$ROOT"/gzdoom_build/gzdoom/"$FMODEX_FILENAME"/api/inc

function install_dependencies () {
  # install dependencies, except fmodex and git
  sudo apt-get install -y \
    gcc \
    make \
    cmake \
    libsdl2-dev \
    libgl1-mesa-dev \
    nasm \
    libgtk-3-dev \
    zlib1g-dev \
    libbz2-dev \
    libjpeg-dev \
    gxmessage \
    git \
    libfluidsynth-dev \
    libgme-dev \
    libglew-dev \
    libopenal-dev \
    timidity \
    libwildmidi-dev \
    libmpg123-dev \
    libsndfile1-dev \
    build-essential \
    tar
}

function create_build_directory () {
  # create build directory
  mkdir -pv "$ROOT"/gzdoom_build/gzdoom
  cd "$ROOT"/gzdoom_build/gzdoom
}

function download_source () {
  # prepare source code
  git clone "$GIT_URL" .
  git config --local --add remote.origin.fetch +refs/tags/*:refs/tags/*
  git pull
  git checkout --detach refs/tags/"$GIT_TAG"
}

function download_fmod () {
  # install fmodex
  cd "$ROOT"/gzdoom_build
  wget -nc "$FMODEX_URL"
  tar -xvzf "$FMODEX_FILENAME.tar.gz" -C gzdoom
}

function compile_latest_release () {
  cd "$ROOT"/gzdoom_build/gzdoom

  local -r GIT_TAG="$(git tag -l | grep -v 9999 | grep -E '^g[0-9]+([.][0-9]+)*$' | \
    sed 's/^g//' | sort -n -t . -k 1,1 -k 2,2 -k 3,3 -k 4,4 | \
    tail -n 1 | sed 's/^/g/')"

  mkdir build
  cd build
  make clean
  cmake -DCMAKE_BUILD_TYPE=Release -DFMOD_LIBRARY="$FMODEX_LIBRARY_PATH" -DFMOD_INCLUDE_DIR="$FMODEX_INCLUDE_DIR" ..
  make
}

function backup () {
  cd "$ROOT"/gzdoom_build

  local -r BACKUP_DIR="$BACKUP_ROOT$(sed -n 's/.*#define GIT_DESCRIPTION "\(.*\)".*/\1/p' gzdoom/src/gitinfo.h)"

  mkdir -pv $BACKUP_DIR
  cp -v gzdoom/build/{gzdoom,gzdoom.pk3,lights.pk3,brightmaps.pk3,output_sdl/liboutput_sdl.so} $BACKUP_DIR
  cp -v $FMODEX_LIBRARY_PATH $BACKUP_DIR
}

function install_gzdoom () {
  echo "todo"
}

install_dependencies
create_build_directory
download_source
download_fmod
compile_latest_release
backup
install_gzdoom

exit 0