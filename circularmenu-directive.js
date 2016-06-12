angular.module("circularMenu-directive",[]).directive("dragCircularMenu",function(){
	return {
		restrict: 'EA',
		replace:true,
		scope:{
			angle:"=",
			placement:"@",
			buttonConfig:"=",
			menuItems:"=",
			onwingClick:"&"
		},
		templateNamespace: 'svg',
		template:  '<div class="menuContainer {{jumpAnim}}" style="position:fixed;z-index: 99999;">'+
		'<button class="{{open}}" ng-click="toggleMenu($event)" style="outline: none;position:absolute;border:none;z-index:1000;cursor:pointer;border-radius:{{button.buttonWidth}}px;width:{{button.buttonWidth}}px;height:{{button.buttonWidth}}px;background-color:{{button.color}};color:{{button.textColor}};font-size: 16px;    box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, .3), inset 0px 4px 1px 1px rgb(70, 240, 169), inset 0px -3px 1px 1px rgba(107, 179, 91, 0.5);"><span style="display:block;position:absolute;top:0;left:0;bottom:0;right:0;margin:auto;width:100%;height:45%;pointer-events:none;-webkit-transition:all .3s linear;animation-fill-mode:forwards;">Menu</span><img style="position:absolute;top:0;left:0;right:0;bottom:0;margin:auto;-webkit-transition:all .3s linear;-webkit-transform:scale(0);pointer-events:none;width: 25px;height: 25px;vertical-align: middle;"src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABNklEQVRYR72X4RHCMAhGPzZwEx1BJ9cN1E3cAI+a3MWWJECT+qderu17IgFCzPzE73Mjok/6PvXCzCcAd4EQM78AnAHIdbpEAb8AeIuA2DyOkFjDAVxJwnCEhAon+iwCsyVq8CUHymybEYkWfCMwOhI9uCowSsICrwrslbDCmwJRCQ+8K+CV8MJNAlaJCNws0JOIwl0CNYlUR6SxLLV9Ka+OpvZXiCwtUClW8lgI7o5ApWzLsvuX53e5I1D8FTnsshRu5W4BJeFEIDxPuAS0bE+hDM8TZoHWVtvTRU0Cln0elegKWOCV3WFKzKaABx6VqApE4BEJVWAP3CuxERgB90hoQ2m4sWi9pLc71mP5ULglEuXBZAq8J5GPZlPhTYl0Og73c8sMUd6zzol8OpZ7XJOMF1yRwBcvdFd8lXEKegAAAABJRU5ErkJggg=="/></button>'+
		'<div class="menu-list1 {{positionClass}}" style="position:absolute;width:{{width}}px;height:{{height}}px;left:{{button.buttonWidth/2}}px;top: -{{height/2 - button.buttonWidth/2}}px;">'+
		'<div ng-repeat="wing in wings" class="{{positionClass}} {{open}} {{rotate}}" style="pointer-events:none;width:{{width}}px;height:{{height}}px;position:absolute;-webkit-transition: all .3s cubic-bezier(0.680, -0.550, 0.265, 1.550);-webkit-transform-origin-x: 0px;-webkit-transform-origin-y: {{height/2}}px;-webkit-transform:rotate({{wing.rotate}}) scale({{wing.show}});cursor:pointer;">'+ 
		'<svg ng-attr-width="{{width}}px" ng-attr-height="{{height}}px" >'+
		'<path ng-attr-d="{{path}}" style="fill:{{wing.color}};pointer-events:auto;" ng-click="wingClick(wing)" ng-mouseover="hoverIn(wing,$event)" ng-mouseleave="hoverOut(wing,$event)"></path>'+
		'<text class="wing-text" style="fill:{{wing.titleColor}};font-size: 12px;" x="45%" y="50%" dominant-baseline="middle" text-anchor="right" letter-spacing="2px" ng-attr-transform="rotate(0)">{{wing.title}}</text>'+
		'</svg>'+
		'</div>'+
		'</div>'+
		'</div>',
		link:function(scope,elem,attr){
			scope.wings = scope.menuItems || [];
			scope.button = scope.buttonConfig || {};
			scope.positionClass = scope.placement || "bottomLeft";	
			var angle = scope.angle || 360/scope.wings.length;
			var radius = scope.buttonConfig.menuRadius;
			var innerRadius = scope.button.buttonWidth/2 + 10;
			var height = radius;
			x1 = parseInt(0 + radius*Math.cos(Math.PI*(360-angle/2)/180));
			y1 = parseInt(height/2 + radius*Math.sin(Math.PI*(360-angle/2)/180));
			x2 = parseInt(0 + radius*Math.cos(Math.PI*(angle/2)/180));
			y2 = parseInt(height/2 + radius*Math.sin(Math.PI*(angle/2)/180)); 
			a1 = parseInt(0 + innerRadius*Math.cos(Math.PI*(360-angle/2)/180));
			b1 = parseInt(height/2 + innerRadius*Math.sin(Math.PI*(360-angle/2)/180));
			a2 = parseInt(0 + innerRadius*Math.cos(Math.PI*(angle/2)/180));
			b2 = parseInt(height/2 +1+ innerRadius*Math.sin(Math.PI*(angle/2)/180)); 
			scope.width = radius;
			scope.height = height;
			scope.path = "M"+a1+","+b1+" L"+x1+","+y1+" A"+radius+","+radius+" 0 0, 1"+" "+x2+","+y2+" L"+a2+","+b2+"  A"+innerRadius+","+innerRadius+" 1 0, 0"+" "+a1+","+b1+" z";
			scope.open = "menuclose";
			scope.jumpAnim  = "";
			scope.rotate = "";
			var windowElement = angular.element(window)[0];
			var centreX = windowElement.innerWidth/2 - scope.button.buttonWidth/2;
			var centreY = windowElement.innerHeight/2 - scope.button.buttonWidth/2;
			windowElement.onresize = function(){
				centreX = windowElement.innerWidth/2 - scope.button.buttonWidth/2;
				centreY = windowElement.innerHeight/2 - scope.button.buttonWidth/2;
				if(scope.positionClass == "bottomRight"){
					elem.css({
						width: scope.button.buttonWidth+'px',
						height: scope.button.buttonWidth+'px',
						top: (windowElement.innerHeight- scope.button.buttonWidth - scope.button.gutter.bottom)+'px',
						left: (windowElement.innerWidth-scope.button.buttonWidth - scope.button.gutter.right)+'px'
					});
				}
				else if(scope.positionClass == "bottomLeft"){
					elem.css({
						width: scope.button.buttonWidth+'px',
						height: scope.button.buttonWidth+'px',
						top: (windowElement.innerHeight- scope.button.buttonWidth - scope.button.gutter.bottom)+'px',
						left: scope.button.gutter.left+'px'
					});
				}
				else if(scope.positionClass == "topRight"){
					elem.css({
						width: scope.button.buttonWidth+'px',
						height: scope.button.buttonWidth+'px',
						top: scope.button.gutter.top+'px',
						left: (windowElement.innerWidth-scope.button.buttonWidth - scope.button.gutter.right)+'px'
					});
				}
			}
			if(scope.positionClass == "topLeft"){
				elem.css({
					width: scope.button.buttonWidth+'px',
					height: scope.button.buttonWidth+'px',
					top: scope.button.gutter.top+'px',
					left:scope.button.gutter.left+'px'
				});
			}
			else if(scope.positionClass == "topRight"){
				elem.css({
					width: scope.button.buttonWidth+'px',
					height: scope.button.buttonWidth+'px',
					top: scope.button.gutter.top+'px',
					left: (windowElement.innerWidth-scope.button.buttonWidth - scope.button.gutter.right)+'px'
				});
			}
			else if(scope.positionClass == "bottomRight"){
				elem.css({
					width: scope.button.buttonWidth+'px',
					height: scope.button.buttonWidth+'px',
					top: (windowElement.innerHeight- scope.button.buttonWidth - scope.button.gutter.bottom)+'px',
					left: (windowElement.innerWidth-scope.button.buttonWidth - scope.button.gutter.right)+'px'
				});
			}
			else if(scope.positionClass == "bottomLeft"){
				elem.css({
					width: scope.button.buttonWidth+'px',
					height: scope.button.buttonWidth+'px',
					top: (windowElement.innerHeight- scope.button.buttonWidth - scope.button.gutter.bottom)+'px',
					left: scope.button.gutter.left+'px'
				});
			}
			var startX = 0, startY = 0, x = 20, y =  20;
			var drag = false;
			var dragStart = false;
			elem[0].addEventListener('mousedown',mousedown,false );
			document.addEventListener('mousemove', mousemove, false);
			elem[0].addEventListener('touchmove', function(event) {							
			    var touch = event.targetTouches[0];
			    x = touch.pageX-(scope.button.buttonWidth/2);
			    y = touch.pageY-(scope.button.buttonWidth/2);
			    elem.css({
					top: y + 'px',
					left:  x + 'px'
				});
			    event.preventDefault();
			  }, false);
			elem[0].addEventListener('mouseup', mouseup, false);

			function mousedown(event) {
				if(event.target.tagName == "BUTTON"){
					dragStart = true;
					scope.jumpAnim = "";
					event.preventDefault();
					startX = event.offsetX;
					startY = event.offsetY;
				}
			}
			function mousemove(event) {
				if(dragStart){
					scope.jumpAnim = "";
					drag = true;
					y = event.clientY - startY;
					x = event.clientX - startX;
					elem.css({
						top: y + 'px',
						left:  x + 'px'
					});
				}
			}
			function mouseup() {
				dragStart = false;
			}
			scope.toggleMenu = function(event){
				if(drag == true){
					scope.jumpAnim = "jumpAnim";
					elem.css({"-webkit-transition":"all 900ms cubic-bezier(0.680, -0.550, 0.265, 1.550)"});
					setTimeout(function(){
						scope.jumpAnim = "";
						elem.css({"-webkit-transition":"none"});
						scope.$apply();
					},900);
					var textElem = angular.element(document.getElementsByClassName('wing-text'));
					if(y > centreY && x < centreX){
						elem.css({
							top: (windowElement.innerHeight- scope.button.buttonWidth - scope.button.gutter.bottom) + 'px',
							left:  scope.button.gutter.left+'px'
						});
						y = windowElement.innerHeight- scope.button.buttonWidth - scope.button.gutter.bottom;
						x = scope.button.gutter.left;
						scope.positionClass = "bottomLeft";
						scope.adjustMenu("bottomLeft");
				    	textElem.attr('transform','rotate(0,'+scope.width/2+','+scope.height/2+')');	
				    	textElem.attr('text-anchor','left');
					}
					else if(y < centreY && x < centreX){
						elem.css({
							top: scope.button.gutter.top+'px',
							left: scope.button.gutter.left+'px'
						});
						y  = scope.button.gutter.top;
						x = scope.button.gutter.left;
						scope.positionClass = "topLeft";
						scope.adjustMenu("topLeft");
				    	textElem.attr('transform','rotate(0,'+scope.width/2+','+scope.height/2+')');	
				    	textElem.attr('text-anchor','left');
					}
					else if(y < centreY && x > centreX){
						elem.css({
							top: scope.button.gutter.top+'px',
							left: (windowElement.innerWidth-scope.button.buttonWidth - scope.button.gutter.right) + 'px'
						});
						y  = scope.button.gutter.top;
						x = windowElement.innerWidth-scope.button.buttonWidth - scope.button.gutter.right ;
						scope.positionClass = "topRight";	
						scope.adjustMenu("topRight");
				    	textElem.attr('transform','rotate(180,'+scope.width/2+','+scope.height/2+')');
				    	textElem.attr('text-anchor','middle');
					}
					else if(y > centreY && x > centreX){
						elem.css({
							top: (windowElement.innerHeight- scope.button.buttonWidth - scope.button.gutter.bottom) + 'px',
							left: (windowElement.innerWidth-scope.button.buttonWidth - scope.button.gutter.right) + 'px'
						});
						y  = windowElement.innerHeight- scope.button.buttonWidth - scope.button.gutter.bottom;
						x = windowElement.innerWidth-scope.button.buttonWidth - scope.button.gutter.right ;
						scope.positionClass = "bottomRight";	
						scope.adjustMenu("bottomRight");
				    	textElem.attr('transform','rotate(180,'+scope.width/2+','+scope.height/2+')');
				    	textElem.attr('text-anchor','middle');
					}
					drag = false;
				}
				else if(drag == false){
					if(scope.open == "menuclose"){
						scope.openWings(scope.wings);
						angular.element(event.target).find("span").css({"-webkit-transform":"scale(0)"});
						angular.element(event.target).find("img").css({"-webkit-transform":"scale(1)"});
						setTimeout(function(){
							scope.rotateWings(scope.wings);
							scope.open = "menuopen";
							scope.$apply();
						},400);
					}
					else{
						scope.rotateWings(scope.wings);
						angular.element(event.target).find("span").css({"-webkit-transform":"scale(1)"});
						angular.element(event.target).find("img").css({"-webkit-transform":"scale(0)"});
						setTimeout(function(){
							scope.closeWings(scope.wings);
							scope.open = "menuclose";
							scope.$apply();
						},400);


					}
				}
			};
			scope.initMenu = function(position){
				angular.forEach(scope.wings,function(item,index){
					if(position == "topLeft"){
						item.rotate = scope.button.angles.topLeft+"deg";
					}
					else if(position == "topRight"){
						item.rotate = scope.button.angles.topRight+"deg";
					}
					else if(position == "bottomRight"){
						item.rotate = scope.button.angles.bottomRight+"deg";
					}
					else if(position == "bottomLeft"){
						item.rotate = scope.button.angles.bottomLeft+"deg";
					}
				});
			}
			scope.adjustMenu = function(position){
				angular.forEach(scope.wings,function(item,index){
					if(position == "topLeft" && scope.open == "menuopen"){
						item.rotate = (scope.button.angles.topLeft + index*angle)+"deg";
					}
					else if(position == "topLeft" && scope.open == "menuclose"){
						item.rotate = scope.button.angles.topLeft+"deg";
					}
					else if(position == "topRight" && scope.open == "menuopen"){
						item.rotate = (scope.button.angles.topRight + index*angle)+"deg";
					}
					else if(position == "topRight" && scope.open == "menuclose"){
						item.rotate = scope.button.angles.topRight+"deg";
					}
					else if(position == "bottomRight" && scope.open == "menuopen"){
						item.rotate = (scope.button.angles.bottomRight + index*angle)+"deg";
					}
					else if(position == "bottomRight" && scope.open == "menuclose"){
						item.rotate = scope.button.angles.bottomRight+"deg";
					}
					else if(position == "bottomLeft" && scope.open == "menuopen"){
						item.rotate = (scope.button.angles.bottomLeft + index*angle)+"deg";
					}
					else if(position == "bottomLeft" && scope.open == "menuclose"){
						item.rotate = scope.button.angles.bottomLeft+"deg";
					}
				});
			};
			scope.hoverIn = function(wing,event){
				angular.element(event.target).parent().parent().css("-webkit-transform","rotate("+wing.rotate+") scale(1.2)");
			};
			scope.hoverOut = function(wing,event){
				angular.element(event.target).parent().parent().css("-webkit-transform","rotate("+wing.rotate+") scale(1)");
			}
			scope.openWings = function(wings){
				angular.forEach(wings,function(item){
						item.show = 1;
				});
			}
			scope.closeWings = function(wings){
				angular.forEach(wings,function(item){
						item.show = 0;
				});
			}
			scope.rotateWings = function(wings){
				angular.forEach(wings,function(item,index){
					if(scope.open == "menuclose"){
						if(scope.positionClass == "topLeft"){
							item.rotate = (scope.button.angles.topLeft + index*angle)+"deg";
						}
						else if(scope.positionClass == "topRight"){
							item.rotate = (scope.button.angles.topRight + index*angle)+"deg";
						}
						else if(scope.positionClass == "bottomRight"){
							item.rotate = (scope.button.angles.bottomRight + index*angle)+"deg";
						}
						else if(scope.positionClass == "bottomLeft"){
							item.rotate = (scope.button.angles.bottomLeft + index*angle)+"deg";
						}

					}
					else{
						if(scope.positionClass == "topLeft"){
							item.rotate = scope.button.angles.topLeft+"deg";
						}
						else if(scope.positionClass == "topRight"){
							item.rotate = scope.button.angles.topRight+"deg";
						}
						else if(scope.positionClass == "bottomRight"){
							item.rotate = scope.button.angles.bottomRight+"deg";
						}
						else if(scope.positionClass == "bottomLeft"){
							item.rotate = scope.button.angles.bottomLeft+"deg";
						}
					}
				});
			}
			scope.initMenu(scope.positionClass);
			scope.wingClick = function(wing){
				scope.onwingClick({"wing":wing});
			}
		}
	}
})
