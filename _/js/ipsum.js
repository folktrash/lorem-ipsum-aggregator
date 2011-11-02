 var ipsum = window.IPSUM || {};//namespace
IPSUM = function () {//harness
	var boot = function () {
		IPSUM.Agent.sniff();
		if (!IPSUM.Agent.config.mobile) {
			IPSUM.Desktop.boot();	
		} else {
			IPSUM.Mobile.boot();
		}
	}
	return {boot:boot}
}();
IPSUM.Desktop = function () {
	var boot = function () {//desktop stuff
		IPSUM.Dev.log('dekstop version!');
	}
	return {boot:boot}
}();
IPSUM.Mobile = function () {
	var dom = {}
	var boot = function () {
		IPSUM.Dev.log('mobile version!');
		window.top.scrollTo(0, 1);
		
		dom.entry = $('.entry');
		dom.rink = $('.entry').find('a');
		
		// dom.entry.bind('touchmove',function () {
		// 	
		// 	dom.entry.removeClass('touched');
		// 	$(this).addClass('touched');
		// 	$(this).find('a').trigger('click');
		// 	
		// });
		
		IPSUM.Dev.log(dom.rink);
		
		dom.rink.focus(function () {
			
			dom.entry.removeClass('touched');
			$(this).parent().addClass('touched');
			
		});
		
	}
	return {boot:boot}
}();
IPSUM.Agent = function () {//much of this is not needed
	var config = {
		os: null,
		browser: null,
		dimension: {
			width: null,
			height: null
		},
		touch: false,
		tablet: false,
		mobile: false
	}
	var sniff = function () {
		screenSize();
		setOS();
		setBrowser();
		setTouch();
		setTablet();
		setMobile();
		orientationFix();
	}
	var screenSize = function () {//we do need this for centering
		config.dimension.width = screen.width;
		config.dimension.height = screen.height;
		IPSUM.Dev.log('config.dimension.width: ' + config.dimension.width);
		IPSUM.Dev.log('config.dimension.height: ' + config.dimension.height);
	}
	var setOS = function () {/*todo:we need this? no dog, no.*/
		if (navigator.userAgent.match(/windows/i)) {
			config.os = 'win';
		} else if (navigator.userAgent.match(/mac/i)) {
			config.os = 'mac';
		} else {
			config.os = 'other';
		}
		IPSUM.Dev.log('config.os: ' + config.os);
	}
	var setBrowser = function () {/*todo:we need this? no dog.*/
		if (navigator.userAgent.match(/msie/i)) {
			config.browser = 'ie';
		} else if (navigator.userAgent.match(/firefox/i)) {
			config.browser = 'ff';
		} else if (navigator.userAgent.match(/chrome/i)) {
			config.browser = 'ch';
		} else if (navigator.userAgent.match(/safari/i)) {
			config.browser = 'sf';
		} else {
			config.browser = 'un';	
		}
		IPSUM.Dev.log('config.browser: ' + config.browser);
	}
	var setTouch = function () {//todo:if > try/catch - ?//this we need.
		if("createTouch" in document) {config.touch = true;}
		IPSUM.Dev.log('config.touch: ' + config.touch);
	}
	var orientationFix = function () {//this we need (though, could be in mobile?)
		if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
			var viewportmeta = document.querySelector('meta[name="viewport"]');//todo: querySelector burps in ie7
			viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0';
			document.body.addEventListener('gesturestart', function() {
				//alert('something?');
				viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
			}, false);
		}
	}
	var setTablet = function () {//todo: add other tabletss? not yet dog.
		if (navigator.userAgent.match(/iPad/i)) {config.tablet = true;}
		IPSUM.Dev.log('config.tablet: ' + config.tablet);
	}
	var setMobile = function () {//big assumption //this we need
		if (config.dimension.width < 600) {config.mobile = true;}
		IPSUM.Dev.log('config.mobile: ' + config.mobile);
	}
	return {
		config: config,//open up
		sniff: sniff
	}
}();
IPSUM.Dev = function () {
	var debug = true;
	var log = function (msg) {if (typeof (console) != "undefined" && debug) {console.log(msg);}}
	return {log:log}
}();