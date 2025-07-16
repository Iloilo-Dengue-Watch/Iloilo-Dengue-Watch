#!/bin/bash

# Default commit message
commit_message="Change dist"

# Parse optional --message argument
while getopts ":m:" opt; do
  case ${opt} in
    m )
      commit_message=$OPTARG
      ;;
    \? )
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
  esac
done

# Build the project
npm run build

# Navigate to the target directory and remove the old dist
cd ../../../dengue-watch
rm -rf dist
echo "Removed dist from dengue-watch"

# Move the new dist to the target directory
cd ../GitHub/AI4GHI-Challenge/frontend
mv dist ../../../dengue-watch/dist
echo "Moved dist to dengue-watch"

# Commit and push changes with the specified or default commit message
cd ../../../dengue-watch
git add *
git commit -m "$commit_message"
git push
