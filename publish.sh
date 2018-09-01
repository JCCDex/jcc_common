#!/bin/bash
username=`npm whoami`
echo $username
if test "$username" = "jccdex"; then
    npm version patch --no-git-tag-version
    gulp build
    npm publish
else
    echo "please login with jccdex account"
    exit 0
fi
