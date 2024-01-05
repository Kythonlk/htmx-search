#!/bin/bash

# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
. ~/.nvm/nvm.sh

# Install the latest LTS Node.js version
nvm install --lts

# Update package lists and install Node.js and npm (as a fallback)
sudo apt update
sudo apt install nodejs npm

# Install pm2 globally
sudo npm install -g pm2

