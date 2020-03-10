#!/bin/bash

# Linting of source files
node_modules/eslint/bin/eslint.js src/
jshint src/

# Linting of testing files
node_modules/eslint/bin/eslint.js test/
jshint test/
