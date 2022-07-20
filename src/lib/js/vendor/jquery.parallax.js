(function( $ ){
	var $window = $(window);
	var windowHeight = $window.height();

	$window.resize(function () {
		windowHeight = $window.height();
	});

	$.fn.parallax = function(ypos,outerDiv){
		var $this = $(this);
		var firstTop;
		var firstLeft;
		var getHeight = function(jqo) {
			return jqo.height();
		};

		if (arguments.length < 1 || ypos === null) ypos = 0;
		// if (arguments.length < 2 || xpos === null) xpos = 0;
		if (arguments.length < 2 || outerDiv === null) outerDiv = 'body';

		$this.each(function(){
		  firstTop = $this.offset().top;
			staticTop = parseInt($this.css('top'));
			//firstLeft = parseInt($this.css('left'));
		});

		function update(){
			//var preScrollTop = Number(sessionStorage.getItem("preScrollTop"));
			var pos_y = $window.scrollTop();
			// var distance = preScrollTop - pos_y;
			// sessionStorage.setItem("preScrollTop",pos_y);
			// var pos_x = 10;
			$this.each(function(){
				var $element = $(this);
				var top = $element.offset().top;
				var height = getHeight($element);

				if (top + height < pos_y || top > pos_y + windowHeight) {
					return;
				}

				if(ypos===0)return;
				console.log("staticTop",staticTop);
				console.log("firstTop",firstTop);
				console.log("pos_y",pos_y);
				console.log("height",height);
				// console.log("distance",distance);
				//var _top = Math.round(Math.round((firstTop - pos_y) * ypos));
				// if(distance>0){
				// 	console.log("yemian222--页面向上移动--看到下面的内容");
				// 	// _top = Math.ceil(parseInt($this.css('top')) + distance*ypos)
				// }
				// else if(distance<0){
				// 	console.log("yemian111--页面向下移动--看到上面的内容");
				// 	// _top = Math.ceil(parseInt($this.css('top')) + distance*ypos)
				// }
				var _top = Math.round(Math.round((firstTop - pos_y) * ypos));
				// $this.css('top',_top + "px");
				$this.css('transform','translateY(' +_top + 'px)');
				$this.addClass('active');
			});
		}

		$window.bind('scroll', update).resize(update);
		update();
	}
})(jQuery);
