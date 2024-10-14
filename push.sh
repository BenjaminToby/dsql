#!/bin/bash

root_dir=/media/benoti/Ubuntu-Disk/Github/dsql

if [ -z "$1" ]; then
    msg="Updates"
else
    msg="$1"
fi

# cp "$root_dir/package-shared/types/"* "$root_dir/types/" ||
#     {
#         echo "Copy Failed!"
#         exit 1
#     }

git add . && git commit -m "$msg" && git push
