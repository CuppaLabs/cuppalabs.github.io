angular.module('layout-resize',[])
.directive('columnResize', function(){
	return {
		restrict: '',
		replace: false,
		link: function(scope, elem, attr){

			var rows = elem[0].getElementsByClassName('row');
			var height = document.body.clientHeight;
			var width = document.body.getBoundingClientRect().width;
			
			//dividerElem.addEventListener('mousedown',onMouseDown, false);
				angular.forEach(rows, function(item,i){
					var columns = item.getElementsByClassName('data-section');
					angular.forEach(columns, function(item, j){
						var dividerElem = document.createElement('div');
							dividerElem.classList.add('divider-column');
							dividerElem.addEventListener('mousedown',onMouseDown, false);
							var w = (width - 20)/columns.length;
							var per = (w/width) * 100;
							//columns[j].style.width =   'calc((100% - 20px)/'+columns.length+')';
							columns[j].style.width =   per+'%';
							//var widthPercent = 
							if(j != columns.length-1){
								insertAfter(dividerElem, columns[j]);
							}
							
					});
				});
			var oldx = 0;
			var xcoord = 0;
			var direction = "";
			var targetElem = null;
			var leftElem = null;
			var rightElem = null;
			var mouseDown = false;
			var startWidth1, startWidth2;
			document.addEventListener('mousemove',onMouseMove, false);
			document.addEventListener('mouseup',onMouseUp, false);

			function onMouseDown(e){
				oldx = e.clientX;
				xcoord = e.pageX;

				targetElem = e.target;
				leftElem = e.target.previousSibling.previousSibling;
				rightElem = e.target.nextSibling;
				startWidth1 = leftElem.offsetWidth;
				startWidth2 = rightElem.offsetWidth;
				mouseDown = true;
				document.body.style.cursor = "col-resize";
				e.preventDefault();
			}
			function onMouseMove(e){
				if(mouseDown){
					var x = e.clientX;
					var diff = parseInt(Math.abs(x - xcoord));
					console.log(diff);
					var diffPer = round((diff/width)*100,4);
					console.log(diffPer+'%');
					if ((e.pageX < oldx) && leftElem.getBoundingClientRect().width > 0) {
			            direction = "left";
			            var newWidth = startWidth1 + x - xcoord;
			            var newWidthPer = round((newWidth/width)*100,4);
			            //leftElem.style.width = newWidthPer+"%";
			            leftElem.style.width = newWidthPer+"%";
			              //leftElem.style.width = 'calc('+percentwidth(leftElem)+' - '+diff+'px)';
			            var newWidth2 = startWidth2 - x + xcoord;
			            var newWidthPer2 = round((newWidth2/width)*100,4);
			            //console.log(percentwidth(rightElem));
			            //rightElem.style.width = newWidthPer2+"%";
			            rightElem.style.width = newWidthPer2+"%";
						  //rightElem.style.width = 'calc('+percentwidth(rightElem)+' + '+diff+'px)';



			        } else if ((e.pageX > oldx)) {
			            direction = "right";
			             var newWidth = startWidth1 + x - xcoord;
			            var newWidthPer = round((newWidth/width)*100,4);
			            //leftElem.style.width = newWidthPer+"%";
			            leftElem.style.width = newWidthPer+'%';

			             //leftElem.style.width = 'calc('+percentwidth(leftElem)+' + '+diff+'px)';

			            var newWidth2 = startWidth2 - x + xcoord;
			            var newWidthPer2 = round((newWidth2/width)*100,4);
			            //rightElem.style.width = newWidthPer2+"%";
			            rightElem.style.width = newWidthPer2+'%';
			             //rightElem.style.width = 'calc('+percentwidth(rightElem)+' - '+diff+'px)';
			        }
			        //xcoord = e.pageX;
					oldx = e.pageX;
				}
			}
			function onMouseUp(e){
				if(mouseDown){
					mouseDown = false;
					document.body.style.cursor = "default";
				}
				
			}
			function insertAfter(newNode, referenceNode) {
    			referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling.nextSibling);
			}
			function setColumnWidths(){
				angular.forEach(rows, function(item,i){
					var columns = item.getElementsByClassName('data-section');
					angular.forEach(columns, function(item, j){
							//var w = (width - 20)/columns.length;
							//var per = (w/width) * 100;
							columns[j].style.width =   ((width-2*columns.length)/columns.length)+'px';
					});
				});
			}
			function round(value, decimals) {
  				return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
			}
			function percentwidth(elem){
    var pa= elem.offsetParent || elem;
    return ((elem.offsetWidth/pa.offsetWidth)*100).toFixed(4)+'%';
}
			window.onresize = function(){
				width = document.body.getBoundingClientRect().width;
				//setColumnWidths();
			}
		}
	}
});