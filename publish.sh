#!/bin/bash

if [ -z "$1" ]; then
    msg="Updates"
else
    msg="$1"
fi

npm run compile && git add . && git commit -m "$msg" && git push && git push origin2 main && npm publish
