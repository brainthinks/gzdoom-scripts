#!/usr/bin/env bash

# Destroy the previous build
rm -rf ./dist/

# Build
./scripts/build.js

# Copy static assets
cp -R ./src/img ./dist