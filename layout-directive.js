angular.module('resize-directive',[])
.directive('resizeRow',function(){

return {
	restrict: 'A',
        replace:true,
	scope:{},
	link: function(scope, elem, attr){
		var dividerElem = document.createElement('div');
	        dividerElem.className = 'divider';
            dividerElem.addEventListener('mousedown',onMouseDown, false);
			elem.append(dividerElem);

		var yCoord = 0;
		var totalHeight = 0;
		var topHeight = 0;
		var bottomHeight = 0;
		var topOffset = 0;
		var delta = 0;
		function onMouseDown(e){
			yCoord = e.pageY;
			document.addEventListener('mousemove',onMouseMove, false);
			document.addEventListener('mouseup',onMouseUp, false);
			topOffset = elem[0].getBoundingClientRect().top;

			totalHeight  = elem[0].getBoundingClientRect().height + elem[0].nextElementSibling.getBoundingClientRect().height;
			topHeight = elem[0].getBoundingClientRect().height ;
			bottomHeight = elem[0].nextElementSibling.getBoundingClientRect().height;
			console.log(totalHeight+"="+topHeight+"+"+bottomHeight);
			//elem[0].nextElementSibling.style.maxHeight  = totalHeight - 10;
		}
		function onMouseMove(e){
			var bCoord = e.pageY - yCoord;
			var yDiff = bCoord;

			if(yDiff < 0){
				console.log(elem[0].getBoundingClientRect().height);
				    var newHeight1 = elem[0].getBoundingClientRect().height + yDiff;	
				    var newHeight2 = Math.abs(totalHeight - newHeight1);
				    console.log(newHeight1+" -- "+newHeight2);

				if(elem[0].nextElementSibling.getBoundingClientRect().height > 10 && elem[0].getBoundingClientRect().height > 10){
					elem[0].style.height = newHeight1+"px";
				}	
				if(elem[0].getBoundingClientRect().height > 10){
				elem[0].nextElementSibling.style.height = newHeight2+"px";
				}
			}
			else{
					var newHeight1 = elem[0].clientHeight + yDiff;
					var newHeight2 = elem[0].nextElementSibling.clientHeight - yDiff;
					if(elem[0].nextElementSibling.clientHeight > 10 ){	
						elem[0].style.height = newHeight1+"px";
					}
					if(elem[0].clientHeight > 10 && elem[0].nextElementSibling.clientHeight > 10){
						elem[0].nextElementSibling.style.height = newHeight2+"px";
					}
									
				
			}
			yCoord = e.pageY;
			
		}
		function onMouseUp(){
			document.removeEventListener('mousemove',onMouseMove, false);
			document.removeEventListener('mouseup',onMouseUp, false);
		}
	}


}


})
.directive('resizeColumn',function(){

return {
	restrict: 'A',
        replace:true,
	scope:{},
	link: function(scope, elem, attr){
		//elem[0].style.width = "calc((100% - 40px)/3)";
		var dividerWidth = 5;
		var dividerElem = document.createElement('div');
	        dividerElem.className = 'divider-y';
		dividerElem.classList.add('hidden-xs');
		dividerElem.classList.add('hidden-sm');
		dividerElem.style.width = dividerWidth+"px";
        dividerElem.addEventListener('mousedown',onMouseDown, false);
        //insertAfter(elem[0], dividerElem);
        
		elem.append(dividerElem);
		var xCoord = 0;
		var yCoord = 0;
		var oldx= 0;
		var direction = "";
		var parentElemWidth = elem[0].parentElement.getBoundingClientRect().width;
		var diff = 0;
		var ip = 0;	
		var refPoint = 0;
		var dividerLeftOffset = 0;
		var dividerRightOffset = 0;
		var rightBoundary = 0;
		var leftBoundary = 0;	
		var mouseDeltaLeft = 0;
		var mouseDeltaRight = 0;
		function onMouseDown(e){
			oldx = e.pageX;
			document.addEventListener('mousemove',onMouseMove, false);
			document.addEventListener('mouseup',onMouseUp, false);
			document.body.style.cursor = "col-resize";
			refPoint = e.pageX;
			
			dividerLeftOffset = elem[0].getBoundingClientRect().right - 10 - mouseDeltaRight ;
			dividerRightOffset = elem[0].getBoundingClientRect().right ;
			mouseDeltaLeft = refPoint - (elem[0].getBoundingClientRect().right - 10);
			mouseDeltaRight = dividerRightOffset - refPoint;
			ip = parseFloat(((elem[0].getBoundingClientRect().width + elem[0].nextElementSibling.getBoundingClientRect().width ) / elem[0].parentElement.getBoundingClientRect().width )*100).toFixed(8);
			rightBoundary = elem[0].nextElementSibling.getBoundingClientRect().right - dividerWidth;
			leftBoundary = elem[0].getBoundingClientRect().left + dividerWidth;
			e.preventDefault();
		}
		function onMouseMove(e){
			
		if (e.pageX < oldx && ((e.pageX - leftBoundary) > 0)) {
            		direction = "left";
			diff = oldx-e.pageX;
			oldx = e.pageX;
        	} 
		else if (e.pageX > oldx && (e.pageX < rightBoundary)) {
            		direction = "right";
			diff = e.pageX - oldx;
			oldx = e.pageX;
        	}
        else{
        	direction = "";
        	e.preventDefault();
        }
			if(direction == "left"){
					//console.log(e.pageX +" -- "+leftBoundary);
					var t =   Math.abs(parseFloat(((e.pageX + (dividerWidth/2) -  elem[0].getBoundingClientRect().left)/elem[0].parentElement.getBoundingClientRect().width)*100).toFixed(8));
					elem[0].style.width = t +"%";
					var t2 = ip - t ; 
					elem[0].nextElementSibling.style.width = t2 +"%";
			}
			else if(direction == "right"){
				   console.log(elem[0].nextElementSibling.clientWidth);
					var t =   Math.abs(parseFloat(((e.pageX - elem[0].getBoundingClientRect().left)/elem[0].parentElement.getBoundingClientRect().width)*100).toFixed(8));
					elem[0].style.width = t +"%";
					var t2 = ip - t ; 
					elem[0].nextElementSibling.style.width = t2 +"%";
					
			}
		
		}	
		function onMouseUp(){

			document.removeEventListener('mousemove',onMouseMove, false);
			document.removeEventListener('mouseup',onMouseUp, false);
			document.body.style.cursor = "default";
		}
		function round(value, decimals) {
  			return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
		}
		window.onresize=function(){
			//parentElemWidth = elem[0].parentElement.getBoundingClientRect().width;
			
		};
		function insertAfter(referenceNode, newNode) {
    		referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
		}
	}


}


});



/*full screen directive */


angular.module('fullscreen-directive',[])
.directive('fullScreen',function($compile){
	return {
		restrict: '',
		replace: false,
		link: function(scope, elem, attr){
			//console.log(elem);
			var elemToeffect = elem[0].getElementsByClassName('data-sec-container')[0];
			scope.state = close;
			var icon = document.createElement('span');
			icon.classList.add('glyphicon');
			icon.classList.add('glyphicon-resize-full');
			
			var classVal = "{'glyphicon-resize-full': state == 'close', 'glyphicon-resize-small': state == 'open'}";
			var iconTemp = '<span class="glyphicon glyphicon-resize-full" ng-class="'+classVal+'" ng-click="togglePane($event)"></span>';
			angular.element(elemToeffect).append($compile(iconTemp)(scope));
			

			scope.togglePane = function(e){

				var tempElem = e.target.parentElement;
				if(scope.state == "open"){
					icon.classList.remove('glyphicon-resize-full');
					icon.classList.add('glyphicon-resize-small');
					scope.state  = "close";
					tempElem.classList.remove('section-max');
					tempElem.parentElement.style.background = "none";
					document.documentElement.style.overflow = "auto";
				}
				else{
					icon.classList.remove('glyphicon-resize-small');
					icon.classList.add('glyphicon-resize-full');
					scope.state  = "open";
					tempElem.classList.add('section-max');
					tempElem.parentElement.style.background = "#fff";
					document.documentElement.style.overflow = "hidden";	
				}
				
				console.log(tempElem.parentElement);
				console.log(tempElem.getBoundingClientRect());

			}	

		}
	}
});