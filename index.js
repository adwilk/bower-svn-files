var fs = require('fs');
var path = require('path');
var base;

var getComponents = function(){
	return fs.readdirSync(base).filter(function(file) {
		return fs.statSync(path.join(base, file)).isDirectory();
	}).map(function(dir){
		return path.join(base, dir, 'trunk/bower.json');
	});
};

var addToArray = function(array, thing){
	if(!array) array = [];
	if(typeof array === 'string') array = [array];

	if(typeof thing === 'string'){
		array.push(thing);
	} else if(thing) {
		array = array.concat(thing);
	}

	return array;
};

var getFiles = function(){
	return getComponents(base).map(function(component){
		var compFiles;

		try {
			compFiles = require(component).main;
		} catch (err) {}

		return compFiles;
	}).reduce(function(previous, current){
		return addToArray(previous, current);
	});
};

var getByExtensions = function(extensions){
	if(typeof extensions === 'string') extensions = [extensions];

	return getFiles().filter(function(file){
		return extensions.indexOf(path.extname(file).substring(1)) !== -1;
	});
}

module.exports = function(userBase){
	base = path.join(__dirname, userBase ? userBase : 'bower-components');

	return {
		files: getFiles(base),
		ext: getByExtensions
	}
};