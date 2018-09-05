$(document).ready(() => {
	const parallaxImage = $("[data-parallax-image]");
	const scroller = $("[data-scroll-top]");
	const headerToggle = $("[data-panel-toggle]");
	const headerPanel = $("[data-panel]");
	const clHeaderPanel = "header__panel";
	let lastScrollTop = 0;

	parallaxImage.parallax('100%', 0.2, false);

	scroller.on('click', (e) => {
		e.preventDefault();

		$('html, body').animate({
			scrollTop: 0
		}, 300);
	});

	headerToggle.on("click", (e) => {
		e.preventDefault();

		console.log(e.target);

		$("body").toggleClass('no-scroll');
		$(e.target).toggleClass(`${clHeaderPanel}__toggle--active`);
		headerPanel.toggleClass(`${clHeaderPanel}--opened`);
	});

	$(window).scroll(() => {
		hasScrolled();
	});

	const hasScrolled = () => {
		const scrollTop = $(this).scrollTop();

		if (scrollTop > lastScrollTop && scrollTop > 0){
			$('[data-header]').addClass('header--hidden');
		} else {
			if(scrollTop + $(window).height() < $(document).height()) {
				$('[data-header]').removeClass('header--hidden');
			}
		}

		lastScrollTop = scrollTop;
	};

	new ModalVideo("[data-video-play]");
});