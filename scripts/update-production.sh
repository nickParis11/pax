#!/bin/bash
git pull --rebase upstream master
npm install
npm run build
pm2 restart server-index
