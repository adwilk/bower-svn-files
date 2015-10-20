var bsf = require("../")('./spec/mock-components/');

describe('bower-svn-files', function () {
	it('should contain the list of files', function () {
		expect(bsf.files.length).toBe(4);
	});

	it('should filter files by extension', function () {
		expect(bsf.ext('js').length).toBe(1);
		expect(bsf.ext(['png', 'jpg']).length).toBe(2);
	});
});