;
(function () {

	'use strict';

	var mobileMenuOutsideClick = function () {

		$(document).click(function (e) {
			var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle");
			if (!container.is(e.target) && container.has(e.target).length === 0) {

				if ($('body').hasClass('offcanvas')) {

					$('body').removeClass('offcanvas');
					$('.js-fh5co-nav-toggle').removeClass('active');
				}
			}
		});

	};


	var offcanvasMenu = function () {

		$('#page').prepend('<div id="fh5co-offcanvas" />');
		$('#page').prepend('<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle fh5co-nav-white"><i></i></a>');
		var clone1 = $('.menu-1 > ul').clone();
		$('#fh5co-offcanvas').append(clone1);
		var clone2 = $('.menu-2 > ul').clone();
		$('#fh5co-offcanvas').append(clone2);

		$('#fh5co-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#fh5co-offcanvas')
			.find('li')
			.removeClass('has-dropdown');

		// Hover dropdown menu on mobile
		$('.offcanvas-has-dropdown').mouseenter(function () {
			var $this = $(this);

			$this
				.addClass('active')
				.find('ul')
				.slideDown(500, 'easeOutExpo');
		}).mouseleave(function () {

			var $this = $(this);
			$this
				.removeClass('active')
				.find('ul')
				.slideUp(500, 'easeOutExpo');
		});


		$(window).resize(function () {

			if ($('body').hasClass('offcanvas')) {

				$('body').removeClass('offcanvas');
				$('.js-fh5co-nav-toggle').removeClass('active');

			}
		});
	};


	var burgerMenu = function () {

		$('body').on('click', '.js-fh5co-nav-toggle', function (event) {
			var $this = $(this);


			if ($('body').hasClass('overflow offcanvas')) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();

		});
	};



	var contentWayPoint = function () {
		var i = 0;
		$('.animate-box').waypoint(function (direction) {

			if (direction === 'down' && !$(this.element).hasClass('animated-fast')) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function () {

					$('body .animate-box.item-animate').each(function (k) {
						var el = $(this);
						setTimeout(function () {
							var effect = el.data('animate-effect');
							if (effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if (effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if (effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						}, k * 200, 'easeInOutExpo');
					});

				}, 100);

			}

		}, {
			offset: '85%'
		});
	};


	var dropdown = function () {

		$('.has-dropdown').mouseenter(function () {

			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');

		}).mouseleave(function () {
			var $this = $(this);

			$this
				.find('.dropdown')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});

	};


	var testimonialCarousel = function () {
		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			items: 1,
			loop: true,
			margin: 0,
			responsiveClass: true,
			nav: false,
			dots: true,
			smartSpeed: 800,
			autoHeight: true,
		});
	};

	var goToTop = function () {

		$('.js-gotop').on('click', function (event) {

			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');

			return false;
		});

		$(window).scroll(function () {

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});

	};

	var showCart = function () {
		$(window).scroll(function () {
			var $win = $(window);

			if ($win.scrollTop() > 200) {
				$('.cart__floating').addClass('active');
			} else {
				$('.cart__floating').removeClass('active');
			}

		});
	};


	// Loading page
	var loaderPage = function () {
		$(".fh5co-loader").fadeOut("slow");
	};

	var counter = function () {
		$('.js-counter').countTo({
			formatter: function (value, options) {
				return value.toFixed(options.decimals);
			},
		});
	};

	var counterWayPoint = function () {
		if ($('#fh5co-counter').length > 0) {
			$('#fh5co-counter').waypoint(function (direction) {

				if (direction === 'down' && !$(this.element).hasClass('animated')) {
					setTimeout(counter, 400);
					$(this.element).addClass('animated');
				}
			}, {
				offset: '90%'
			});
		}
	};

	// Parallax
	var parallax = function () {
		$(window).stellar();
	};


	$(function () {
		mobileMenuOutsideClick();
		parallax();
		offcanvasMenu();
		burgerMenu();
		contentWayPoint();
		dropdown();
		testimonialCarousel();
		goToTop();
		showCart();
		loaderPage();
		counter();
		counterWayPoint();
	});
}());

/*------------------------
Home Carousel
------------------------*/
try {
	$('.banner__carousel').slick({
		dots: true,
		infinite: true,
		speed: 300,
		slidesToShow: 1,
		slidesToScroll: 1
	});
} catch (e) {
	console.log(`Carrossel falhou: ` + e.message);
}

/*------------------------
Gallery Filter
------------------------*/
$(document).ready(function () {

	$(".filter-button").click(function () {
		if ($(".filter-button").removeClass("active")) {
			$(this).removeClass("active");
		}
		
		$(this).addClass("active");

		var value = $(this).attr('data-filter');

		if (value == "all") {
			$('.filter').show('1000');
		} else {
			$(".filter").not('.' + value).hide('3000');
			$('.filter').filter('.' + value).show('3000');

		}
	});

	// Array of products in cart
	const productsCart = [];

	// Add product to cart
	$(".btn-add-cart").on('click', function(e){
		e.preventDefault();

		// Create product object
		const product = {
			id: $(this).parent().parent().parent().parent().attr('data-id'),
			name: $(this).parent().parent().parent().parent().find('.product-title').html(),
			price: $(this).parent().parent().parent().parent().find('.product-price').html(),
			quantity: 0,
		};

		// Validate if product is already in cart
		if (productsCart.length === 0) {
			productsCart.push(product);
		} else {
			const isAdded = productsCart.find(item => item.id === product.id);
			if(!isAdded) {
				productsCart.push(product);
			}
		}

		console.log(productsCart);

		// Change cart button state		
		$('.cart__items').addClass('active');
		let itemsValueNumber = productsCart.length;
		$('.cart__items').text(itemsValueNumber);
	});

	//@TODO
	// Efetuar lógica para remoção de produtos do carrinho
	// Efetuar lógica para passar array de produtos via WhatsApp

	$('.js-cart').on('click', function (){
		createTable(productsCart);
	})

	// Generate table of items
	function createTable(data) {
		let table = $('.table-items');

		for (let i = 0; i < data.length; i++) {
			let row = `
				<tr>
					<td>${data[i].name}</td>
					<td>R$ ${data[i].price}</td>
					<td>${data[i].quantity}</td>
					<td>R$ ${data[i].price * data[i].quantity}</td>
					<td><a href="#!" title="Remover item" class="btn btn-sm btn-danger"><i class="icon-trash"></i></a></td>
				</tr>
			`;

			table.append(row);
		}
	}


});