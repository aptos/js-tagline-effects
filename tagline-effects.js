var App = function () {

	function infoBubbles () {
		var showBubble = function (el) {
			if ($(".bubbles").css("display") == "none") return;
			var answer = $(el).attr('data-target');
			var top = $(el).position().top - 6;
			$("#" + answer).css({
				display: "block",
				position: "absolute",
				top: top + "px"});
		};
		var hideBubbles = function () {
			$(".bubble").css({display: "none"});
		};

		$(".bubble-control").hover(function () {
			showBubble(this);
		}, function () {
			hideBubbles();
		});

		$(".bubble-control").click(function (el) {
			hideBubbles();
			showBubble(this);
		});
		// show the first bubble - so we know something's there
		// $(".bubble:first-child").css({display: "block"});
	}


	function typewriter (target) {
		var taglines = [
		"The Technical Skills Marketplace",
		"The Marketplace for WebApp Developers",
		"The IT Consulting Marketplace",
		"The Cloud Consulting Marketplace",
		"The Security Consulting Marketplace"
		];

		// Initial timers, counters, and target
		var counter = 0,
		speed = 60,
		pause = 7000,
		text_pause = 1000,
		lastText = "",
		n = 0,
		timer = null;

		// Typing animation, one letter, then wait or pause
		var type = function () {
			var wait = speed;
			lastText = $(target)[0].innerHTML;
			if (taglines[n].charAt(counter) == ",") {
				wait = text_pause;
			}
			lastText+= taglines[n].charAt(counter);
			counter++;
			if (counter == taglines[n].length) wait = pause;
			if (counter == taglines[n].length + 1) {
				counter = 0;
				lastText = "";
				n = ( n == taglines.length -1) ? 0 : n + 1;
			}
			$(target)[0].innerHTML = lastText;
			var top = $(window).scrollTop();
			timer = setTimeout(type, wait);
		};

		//  Scrolling will start/stop the animation
		$(window).scroll( function() {
			if ($(window).scrollTop() === 0) {
				setTimeout(type, speed);
			}
			clearTimeout(timer);
		});

		// Animate the taglines
		if ($(target)[0]) {
			setTimeout( function () {
				$(target)[0].innerHTML = "";
				setTimeout(type, speed);
			}, pause );
		}
	}

	function taglineFader(target, i,iSpeed, iPause) {
		var taglines = [
		"The Technical Skills Marketplace",
		"The Marketplace for WebApp Developers",
		"The IT Consulting Marketplace",
		"The Cloud Consulting Marketplace",
		"The Security Consulting Marketplace"
		];
		$(target).html(taglines[i]);
		$(target).fadeIn(iSpeed,function() {
			setTimeout(function() {
				$(target).fadeOut(iSpeed,function() {
					setTimeout(function() {
						if (i++ == taglines.length) i = 0;
						taglineFader(target, i,iSpeed,iPause); 
					},iPause);
				});
			},iPause);
		});
	}

	return {
		init: function () {
			infoBubbles();
			taglineFader("#jumbotron-tagline", 0, 3000, 200);
			typewriter("#jumbotron-tagline");
		},
		//  Will replace all date items of class humanize_date on the page
		humanizeDates: function () {
			$(".humanize_date").each( function () {
				var h_date = moment($(this).text()).fromNow();
				$(this).text(h_date);
			});
		}
	};
}();

jQuery(document).ready(function() {
	App.init();
});