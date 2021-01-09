https://www.youtube.com/watch?v=lXWDkPCzeE4

===========================================
tsc --init


npm init


npm install webpack webpack-cli ts-loader -D


npm install typescript -D

npm install --save-dev lite-server

===========================================

create "src" for all source typescript files

create "public" / "dist" folder to contain final files.

===========================================

update below values in tsconfig.json
"target": "es6",                          
"module": "ES2015",

=========================================

ADD BELOW Scripts in package.json

"build": "webpack",
"start": "lite-server",

========================================

to run webpack

npm run build

===========================

to run lite server

npm start

===========================
