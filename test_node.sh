#!/bin/bash
for f in test/**/*buffer*.js;
do out/Release/node $f;
done
