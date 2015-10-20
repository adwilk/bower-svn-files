#bower-svn-files

lists main files of installed bower components that come from an svn repository

install it
`
npm i --save bower-svn-files
`

get all files
`
var files = require('bsf').files
`

get files by extension
`
var files = require('bsf').ext(['png', 'jpg'])
`