#!/bin/bash
npm run build
cd ../../../dengue-watch
rm -rf dist
echo Removed dist from dengue-watch
cd ../GitHub/AI4GHI-Challenge/frontend
mv dist ../../../dengue-watch/dist
echo moved dist to dengue-watch
cd ../../../dengue-watch
git add *
git commit -m "Change dist"
git push
