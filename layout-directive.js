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

		var xCoord = 0;
		var yCoord = 0;

		function onMouseDown(e){
			xCoord = e.pageX;
			yCoord = e.pageY;
			document.addEventListener('mousemove',onMouseMove, false);
			document.addEventListener('mouseup',onMouseUp, false);
		}
		function onMouseMove(e){
			var aCoord = e.pageX;
			var bCoord = e.pageY;
			var xDiff = aCoord - xCoord;
			var yDiff = bCoord - yCoord;
			xCoord = e.pageX;
			yCoord = e.pageY;

			var newHeight1 = elem[0].clientHeight + yDiff;	
			if(newHeight1){

			}
			elem[0].style.height = newHeight1+"px";
			if(yDiff < 0){
					var newHeight2 = elem[0].nextElementSibling.clientHeight + Math.abs(yDiff);
					elem[0].nextElementSibling.style.height = newHeight2+"px";
			}
			else{
					var newHeight2 = elem[0].nextElementSibling.clientHeight - yDiff;
					elem[0].nextElementSibling.style.height = newHeight2+"px";				
				
			}			
			
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
		var dividerElem = document.createElement('div');
	        dividerElem.className = 'divider-y';
		dividerElem.classList.add('hidden-xs');
		dividerElem.classList.add('hidden-sm');
                dividerElem.addEventListener('mousedown',onMouseDown, false);
		elem.append(dividerElem);
		var xCoord = 0;
		var yCoord = 0;
		var oldx= 0;
		var direction = "";
		var parentElemWidth = elem[0].parentElement.getBoundingClientRect().width;
		var diff = 0;
		
		function onMouseDown(e){
			oldx = e.pageX;
			document.addEventListener('mousemove',onMouseMove, false);
			document.addEventListener('mouseup',onMouseUp, false);
			document.body.style.cursor = "col-resize";
		}
		function onMouseMove(e){

		if (e.pageX < oldx) {
            		direction = "left";
			diff = oldx-e.pageX;
        	} 
		else if (e.pageX > oldx) {
            		direction = "right";
			diff = e.pageX - oldx;
        	}
		 			
			if(direction == "right"){
				var newWidth1 = elem[0].getBoundingClientRect().width + diff ;
				var percent = (newWidth1/elem[0].parentElement.getBoundingClientRect().width)*100;
				var newWidth2 = elem[0].nextElementSibling.getBoundingClientRect().width - diff;
				var p1 = (newWidth2/elem[0].parentElement.getBoundingClientRect().width)*100;
				if(((elem[0].nextElementSibling.getBoundingClientRect().width + elem[0].nextElementSibling.getBoundingClientRect().left) - (elem[0].getBoundingClientRect().width + elem[0].getBoundingClientRect().left)) > 15){
					elem[0].style.width =  round(percent,8) +"%";
					elem[0].nextElementSibling.style.width = round(p1,8)+"%";
				}
			}
			else if(direction == "left"){
				var newWidth1 = elem[0].getBoundingClientRect().width - diff ;
				var percent = (newWidth1/elem[0].parentElement.getBoundingClientRect().width)*100;
				var newWidth2 = elem[0].nextElementSibling.getBoundingClientRect().width + diff;
				var p2 = (newWidth2/elem[0].parentElement.getBoundingClientRect().width)*100;
				if(dividerElem.offsetLeft > 5){
					elem[0].style.width = round(percent,8) +"%";
					elem[0].nextElementSibling.style.width = round(p2,8)+"%";
				}
				
				
			}
		oldx = e.pageX;
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




/*css */ 
html,body {
    height: 100%;
    -webkit-user-select: none;     
}
*{
   box-sizing: border-box;
}
.navbar{
    margin-bottom : 0px;
    border: 0px;
    border-radius: 0px;
}
.navbar-right{
   margin-right: 0px;
}
.fixed-header-wrapper{
    margin-top: 50px;
}
.primary-header{
   background: #333;
}
.sub-header{
    background: #ccc;
}
.wrapper{
    width: 100%;
}
.page-wrapper{
    min-height: 463px;
}
.page-wrapper.menu-expand{
	margin-left: 70px;
}
.page-wrapper.menu-collapse{
	margin-left: 0px;
}
.wrapper-content{
    padding: 10px 10px 50px;
}
.data-row{
    height: calc(50vh - 80px);
    min-height: 30px;
    position: relative;
    display: flex;
}
.data-section{
    height: 100%; 
    overflow: hidden; 
    padding: 0px; 
    padding-right: 10px;
}
.one-row{
    height: calc(100% - 110px) !important;
    min-height: 300px !important;
}
.left-menu{
    position: fixed;
    top: 0;
    bottom: 0;
    width: 70px;
    background: #333;
    z-index: 2001;
}
.left-menu.open{
    margin-left: 0px;
}
.left-menu.close{
    margin-left: -70px;
}
.left-menu-fixed-header{
    top: 50px;
}
.left-menu-relative-header{
    top: 0px;
}

.footer {
    background: none repeat scroll 0 0 white;
    border-top: 1px solid #e7eaec;
    bottom: 0;
    left: 0;
    padding: 10px 35px;
    position: absolute;
    right: 0;
}
.footer.fixed{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 10px 20px;
    background: white;
    border-top: 1px solid #e7eaec;
}
.left-menu-fixed-footer{
    bottom: 41px;
}
.left-menu-relative-footer{
    bottom: 0px;
}
.section-expand{
    background: #ddd;
    position: fixed;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: 999;
    left: 0;
    top: 100px;
    bottom: 40px;
    transition: all 5s linear;
}

.divider{
    height: 10px;
    width: 100%;
    background: #000000;
    position: absolute;
    bottom: 0px;
    cursor:row-resize;
}
.divider-y{
   height: 100%;
   width: 10px;
   background: #000000;
   position: absolute;
   right:0;
   top: 0;
   cursor:col-resize;
}
iframe{
pointer-events: none;
}
.data-sec-container{
   height: calc(100% - 15px);
   overflow: auto;
   background: #fff;

}
.data-section .glyphicon{
    position: absolute;
    top: 6px;
    right: 15px;
    font-size: 17px;
    background: #ccc;
    padding: 10px;
}
@media (min-width: 768px){
.data-row {
    display: block;
}
}
@media (min-width: 1200px){
.data-row {
    display: flex;
}
}
@media (max-width: 768px){
.footer {
    position: relative;
}
.wrapper-content{
    padding-bottom: 10px;
}
}


/* Maximize Styles */

.section-max{
   position: fixed;

   z-index: 999;
   width: calc(100% - 20px);
  height: calc(100vh - 15px);
  z-index: 100;
  top: 110px;
  left: 10px;
  background: #fff;
 -webkit-transform-origin: 0 0;
  transform-origin: 0 0;


}

<div class="wrapper">
		<nav class="left-menu" ng-class="{'close': leftMenu == false,'open': leftMenu == true, 'left-menu-fixed-header': fixedHeader == true, 'left-menu-relative-header': fixedHeader == false, 'left-menu-fixed-footer': fixedFooter == true, 'left-menu-relative-footer': fixedFooter == false }">

		</nav>
		<div class="page-wrapper" ng-class="{'fixed-header-wrapper' : fixedHeader == true, 'menu-collapse': leftMenu == false, 'menu-expand': leftMenu == true }">
				<nav class="navbar navbar-default primary-header" ng-class="fixedHeader? 'navbar-fixed-top':''">
					<div class="navbar-header"> 
						<button aria-controls="bs-navbar" aria-expanded="false" class="collapsed navbar-toggle" data-target="#bs-navbar" data-toggle="collapse" type="button">
							 <span class="sr-only">Toggle navigation</span> 
							 <span class="icon-bar"></span> 
							 <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a href="../" class="navbar-brand">Project Name</a> 
					</div> 
							<nav class="collapse navbar-collapse" id="bs-navbar"> 
								<ul class="nav navbar-nav"> 
									<li> <a href="#">Item 1</a> </li> 
									<li> <a href="#">Item 2</a> </li> 
									<li class="active"> <a href="#">Item 3</a> </li> 
									<li> <a href="#">Item 4</a> </li> 
									<li> <a href="#">Item 5</a> </li> 
								</ul> 
								<ul class="nav navbar-nav navbar-right"> 
									<li><a href="#">Item 6</a></li> 
									<li><a href="#">Item 7</a></li> 
									<li><a href="#">Item 8</a></li>
								 </ul> 
							</nav> 
				</nav>
				<nav class="navbar navbar-default sub-header">
					<div class="navbar-header"> 
						<button aria-controls="bs-navbar" aria-expanded="false" class="collapsed navbar-toggle" data-target="#bs-navbar" data-toggle="collapse" type="button">
							 <span class="sr-only">Toggle navigation</span> 
							 <span class="icon-bar"></span> 
							 <span class="icon-bar"></span> <span class="icon-bar"></span> </button>
					</div> 
							<nav class="collapse navbar-collapse" id="bs-navbar"> 
								<ul class="nav navbar-nav"> 
									<li> <a href="#">Item 1</a> </li> 
									<li> <a href="#">Item 2</a> </li> 
									<li> <a href="#">Item 3</a> </li> 
									<li> <a href="#">Item 4</a> </li> 
									<li> <a href="#">Item 5</a> </li> 
								</ul> 
								<ul class="nav navbar-nav navbar-right"> 
									<li><a href="#">Item 6</a></li> 
									<li><a href="#">Item 7</a></li> 
									<li><a href="#">Item 8</a></li>
								 </ul> 
							</nav> 
				</nav>
				<div class="col-lg-12">
					<div class="wrapper wrapper-content col-sm-12">
						<div class="row data-row" resize-row>
							<div class="col-lg-4 col-sm-12 data-section" resize-column full-screen style="background: #ccc;">
								<div class="data-sec-container"><iframe src="http://www.apple.com" style="width: 100%;HEIGHT: 100%;"></iframe></div>
							</div>
							<div class="col-lg-4 col-sm-12  data-section" resize-column style="background: #ddd;">
								
							</div>
							<div class="col-lg-4 col-md-4 col-sm-12 data-section" style="background: #eee;">
									<label>Fixed Header</label>
									ON<input type="radio" name="toggleHeader" ng-model="fixedHeader" ng-value= "true" />
									OFF<input type="radio" name="toggleHeader" ng-model="fixedHeader" ng-value= "false" />
									<br>
									<label>Fixed Footer</label>
									ON<input type="radio" name="toggleFooter" ng-model="fixedFooter" ng-value= "true" />
									OFF<input type="radio" name="toggleFooter" ng-model="fixedFooter" ng-value= "false" />
									<br>
									<label>Left Menu Toggle</label>
									ON<input type="radio" name="toggleMenu" ng-model="leftMenu" ng-value= "true" />
									OFF<input type="radio" name="toggleMenu" ng-model="leftMenu" ng-value= "false" />
							</div>
						</div>
						<div class="row data-row" resize-row>
							<div class="col-lg-4 col-sm-12 data-section" resize-column style="background: #ffcece;">
							</div>
							<div class="col-lg-4 col-sm-12 data-section" resize-column full-screen>
								<div class="data-sec-container" >
								<table class="table"> 
									<thead> 
										<tr> 
											<th>#</th> 
											<th>Column heading</th> 
											<th>Column heading</th> 
											<th>Column heading</th> 
										</tr> 
									</thead> 
									<tbody> 
										<tr class="active"> <th scope="row">1</th> <td>Column content</td> <td>Column content</td> <td>Column content</td> </tr> 
										<tr> <th scope="row">2</th> <td>Column content</td> <td>Column content</td> <td>Column content</td> </tr> 
										<tr class="success"> <th scope="row">3</th> <td>Column content</td> <td>Column content</td> <td>Column content</td> </tr>
										<tr> <th scope="row">4</th> <td>Column content</td> <td>Column content</td> <td>Column content</td> </tr> 
										<tr class="info"> <th scope="row">5</th> <td>Column content</td> <td>Column content</td> <td>Column content</td> </tr> 
										<tr> <th scope="row">6</th> <td>Column content</td> <td>Column content</td> <td>Column content</td></tr> 
										<tr class="warning"> <th scope="row">7</th> <td>Column content</td> <td>Column content</td> <td>Column content</td> </tr> 
										<tr> <th scope="row">8</th> <td>Column content</td> <td>Column content</td> <td>Column content</td> </tr>
										<tr class="danger"> <th scope="row">9</th> <td>Column content</td> <td>Column content</td> <td>Column content</td></tr>
									</tbody> 
								</table>

								</div>
						
							</div>
							<div class="col-lg-4 col-sm-12 data-section" style="background: #dedeff;">
							</div>
						</div>
					        <div class="row data-row"> 
							<div class="col-lg-6 col-sm-12 data-section" resize-column style="background: #6782ab;">
								 <div class="row data-row" resize-row> 
									<div class="col-lg-6 col-sm-12 data-section" resize-column style="background: #d7e687;">
									</div>
									<div class="col-lg-6 col-sm-12 data-section" style="background: #5e9a5d;">
									</div>
								</div>
								 <div class="row data-row"> 
									<div class="col-lg-4 col-sm-12 data-section" resize-column style="background: #5e9a5d;">
									</div>
									<div class="col-lg-8 col-sm-12 data-section" style="background: #d7e687;">
									</div>
								</div>
							</div>
							<div class="col-lg-6 col-sm-12 data-section" style="background: #b189a8;">
							</div>
						</div>
					</div> 
					<div class="footer col-sm-12" ng-class="fixedFooter ? 'fixed':''">
                    				<div class="pull-right">10GB of <strong>250GB</strong> Free.</div>
                    				<div><strong>Copyright</strong> Example Company © 2014-2015</div>
                			</div>
				</div>
			
		</div>
	</div>
