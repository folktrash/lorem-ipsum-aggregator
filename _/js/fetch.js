var fetch = window.FETCH || {};//namespace
FETCH = function () {//harness
	var boot = function () {
		yepnope([{
			load: ['_/js/libs/jquery.1.6.4.min.js','_/js/ipsum.js'],
			complete: function () {IPSUM.boot()}
		},{
			load: 'http://www.google-analytics.com/ga.js',
			complete: function () {var tracker = _gat._getTracker("UA-142589-6");tracker._trackPageview();}
		}]);	
	}
	return {boot:boot}
}();