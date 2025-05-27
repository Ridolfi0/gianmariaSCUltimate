@echo off
call clasp pull
call npm run build
call bash ./gas.sh
call clasp push
