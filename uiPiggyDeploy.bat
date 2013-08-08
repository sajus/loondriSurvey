@echo off
node tools/r.js -o tools/build.js
cd publish
mv * ../../
 
