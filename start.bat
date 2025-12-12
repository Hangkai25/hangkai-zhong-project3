@echo off
echo Starting Backend...
start cmd /k "node server.js"

echo Starting Frontend...
start cmd /k "npm run dev"

echo Project started.
