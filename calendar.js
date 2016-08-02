(function(window){
  'use strict';


	// these are labels for the days of the week
	var cal_days_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

	// these are human-readable month name labels, in order
	var cal_months_labels = ['January', 'February', 'March', 'April',
	                     'May', 'June', 'July', 'August', 'September',
	                     'October', 'November', 'December'];

	// these are the days of the week for each month, in order
	var cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	// this is the current date
	var cal_current_date = new Date(); 
	
	function WinkelCalendar(month, year){
		  this.month = (isNaN(month) || month == null) ? cal_current_date.getMonth() : month;
		  this.year  = (isNaN(year) || year == null) ? cal_current_date.getFullYear() : year;
		  this.date = null;
		  this.html = '';
		  this.renderView();
		  this.attachEvents();
	}
	WinkelCalendar.prototype.renderView = function(){
		// get first day of month
		  var firstDay = new Date(this.year, this.month, 1);
		  var startingDay = firstDay.getDay();
		  
		  // find number of days in month
		  var monthLength = cal_days_in_month[this.month];
		  
		  // compensate for leap year
		  if (this.month == 1) { // February only!
		    if((this.year % 4 == 0 && this.year % 100 != 0) || this.year % 400 == 0){
		      monthLength = 29;
		    }
		  }
		  
		  // do the header
		  var monthName = cal_months_labels[this.month]
		  
		  this.html = document.createElement("div");
		  
		  
		  var html = document.createElement("table"); 
		  html.setAttribute('class','calendar-table');
		  var headerRow = document.createElement('tr');
		  var headerTh = document.createElement('th');
		  headerTh.setAttribute('colspan','7');
		  headerTh.textContent = this.date+ " " +monthName + " " + this.year;
		  headerRow.appendChild(headerTh);
		  html.appendChild(headerRow);	  
		  var daysRow = document.createElement('tr');
		  daysRow.setAttribute('class','calendar-header');
		  for(var i = 0; i <= 6; i++ ){
			  var daysTd = document.createElement('td');
			  daysTd.setAttribute('class','calendar-header-day');
			  daysTd.textContent = cal_days_labels[i];
			  daysRow.appendChild(daysTd);
		  }
		  html.appendChild(daysRow);

		  // fill in the days
		  var day = 1;
		  var dateRow = null;
		  // this loop is for is weeks (rows)
		  for (var i = 0; i < 9; i++) {
		    // this loop is for weekdays (cells)
			  dateRow = document.createElement('tr');
		    for (var j = 0; j <= 6; j++) { 
		    	var dateCell = document.createElement('td');
		    	dateCell.setAttribute('class','calendar-day');
		      if (day <= monthLength && (i > 0 || j >= startingDay)) {
		    	  dateCell.textContent = day;
			  dateCell.isDate = true;
		        day++;
		      }
		      dateRow.appendChild(dateCell);
		    }
		    // stop making rows if we've run out of days
		    if (day > monthLength) {
		      break;
		    } else {
		    	html.appendChild(dateRow);
		    }
		  }
		  html.appendChild(dateRow);

		  this.html = html;
		  document.getElementById('container').appendChild(this.html);
		  
	}
	WinkelCalendar.prototype.getHTML = function() {
		  return this.html;
		}
	WinkelCalendar.prototype.update = function(){
		this.name = "solomon";
		this.renderView();
	}
	WinkelCalendar.prototype.attachEvents = function(){
		var self = this;
		var elem = self.html;
		elem.addEventListener('click',function(event){
if(event.target.hasOwnProperty('isDate') && event.target.innerHTML != ""){

			var date = event.target.innerHTML;
			self.date = date;
			self.updateDate(date);
}
		});

	}
	WinkelCalendar.prototype.updateDate = function(){
		console.log(this.html.children[0].innerText);	
		 this.html.children[0].children[0].innerText = this.date+ " " + cal_months_labels[this.month] + " " + this.year;
		console.log(this.date);
	}
	window.WinkelCalendar = WinkelCalendar || {};
	
})(window);
