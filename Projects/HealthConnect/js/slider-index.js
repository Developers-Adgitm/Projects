jQuery(function() {

	$('#js-main-slider').pogoSlider({
		autoplay: true,
		autoplayTimeout: 2500,
		displayProgess: true,
		preserveTargetSize: true,
		targetWidth: 1000,
		targetHeight: 300,
		responsive: true
	}).data('plugin_pogoSlider');

});