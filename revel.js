// instersection observer class controlls
$.fn.revel = function(passedOptions) {

	var initOptions = $.extend({
		// instersection observer config
		rootMargin: "0px",
		threshold: [0,.25,.5,.75,1],
		entryThreshold: 0.5,
		exitThreshold: 0,

		// custom options
		once: false,
		duration: "0.5s",
		delay: "0s",
		delayShow: false,
		delayHide: false,

	}, passedOptions);

    this.each(function() {

		// clone init options so each element can be handled differently
		var options = $.extend({}, initOptions);

		var css = {
			trasitionDuration :  "0.5s",
			trasitionDelay :  "0",
		};

		var $this = $(this);

		// boolen flag to unobserve after first run
		if ($this.data("revel")) {
			options.classes = $this.data('revel');
		}

		// boolen flag to unobserve after first run
		if ($this.attr('data-revel-once')) {
			options.once = $this.data('revel-once');
		}
	
		// animation speed
		if ($this.attr('data-revel-duration')) {
			options.duration = $this.data('revel-duration');
		}

		// animation delay
		if ($this.attr('data-revel-delay')) {
			options.delay = $this.data('revel-delay');
		}
		if ($this.attr('data-revel-delay-hide')) {
			options.delayHide = $this.data('revel-delay-hide');
		}
		if ($this.attr('data-revel-delay-show')) {
			options.delayShow = $this.data('revel-delay-show');
		}

		// apply style options
		css.transitionDuration = options.duration;
		css.transitionDelay = options.delay;

		// applt the transition css
		$this.css(css);

		var intersectionObserver = new IntersectionObserver(function(entries) {

			if (!entries && entries.length == 0) {
				return;
			}
			
			var entry = entries[0];
			
			// show
			if (entry.intersectionRatio > options.entryThreshold) {
				// css.transitionDelay = options.delayShow ? options.delayShow : options.delay;
				css.transitionDelay = options.delayShow ? options.delayShow : options.delay;

				// apply action specific css if it changed
				$this.css(css).removeClass(classes);
				
				// unobserve when once flag defined
				if (options.once) {
					observer.unobserve(entry.target);
				}
			} 

			// hide
			if (entry.intersectionRatio <= options.exitThreshold) {

				css.transitionDelay = options.delayHide ? options.delayHide : options.delay;

				$this.css(css).addClass(classes);
			}

		}, options);

        intersectionObserver.observe(this);
    });
};
