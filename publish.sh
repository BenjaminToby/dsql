#!/bin/bash

if [ -z "$1" ]; then
    msg="Updates"
else
    msg="$1"
fi

git add . && git commit -m "$msg" && git push --all origin && npm publish
