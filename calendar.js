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
	var extend = function(to, from, overwrite)
    {
        var prop, hasProp;
        for (prop in from) {
            hasProp = to[prop] !== undefined;
            if (hasProp && typeof from[prop] === 'object' && from[prop] !== null && from[prop].nodeName === undefined) {
                if (isDate(from[prop])) {
                    if (overwrite) {
                        to[prop] = new Date(from[prop].getTime());
                    }
                }
                else if (isArray(from[prop])) {
                    if (overwrite) {
                        to[prop] = from[prop].slice(0);
                    }
                } else {
                    to[prop] = extend({}, from[prop], overwrite);
                }
            } else if (overwrite || !hasProp) {
                to[prop] = from[prop];
            }
        }
        return to;
    };


	var defaults = {
		defaultDate : new Date(),
		format : "dd/mm/yyyy",
		onSelect : null
		
	}

	
	function WinkelCalendar(options){

		  if (!this.options) {
                	this.options = extend({}, defaults, true);
            	  }

                  this.options = extend(this.options, options, true);

	          var opts = this.options;
		  
		  this.date = new Date(opts.defaultDate);

		  this.el = document.createElement('div');
		  this.createView();
		  this.attachEvents();
		  //this.onDateSelect = null;
	}
	WinkelCalendar.prototype.createView = function(){

		  var self = this;
		  var year = self.date.getFullYear(),
		      month = self.date.getMonth(),
		      current_day = self.date.getDate();



		// get first day of month
		  var firstDay = new Date(year, month, 1);
		  var startingDay = firstDay.getDay();
		  
		  // find number of days in month
		  var monthLength = cal_days_in_month[self.date.getMonth()];
		  
		  // compensate for leap year
		  if (month == 1) { // February only!
		    if((year % 4 == 0 && year % 100 != 0) || year % 400 == 0){
		      monthLength = 29;
		    }
		  }
		  
		  // do the header
		  var monthName = cal_months_labels[month]

		  var html = document.createElement("table"); 
		  html.setAttribute('class','calendar-table');
		  var headerRow = document.createElement('tr');
		  var headerTh = document.createElement('th');
		  headerTh.setAttribute('colspan','7');
		  headerTh.textContent = current_day + " " + monthName + " " + year;
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
			  if(day == parseInt(current_day)){
				dateCell.classList.add('selected-day');
			  }
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

		  self.el.appendChild(html);
		  document.getElementById('container').appendChild(self.el);
		  
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
		var elem = self.el;
		elem.addEventListener('click', self.onCalendarClick.bind(this), false);

	}

	WinkelCalendar.prototype.onCalendarClick = function(){
		var self = this;
		var elem = self.el;
		if(event.target.hasOwnProperty('isDate') && event.target.innerHTML != ""){

			var date = event.target.innerHTML;
			self.day = date;
			elem.getElementsByClassName('selected-day')[0].classList.remove('selected-day');
			event.target.classList.add('selected-day');
			self.updateHeader();
		}
	}
	WinkelCalendar.prototype.updateHeader = function(){
		this.el.children[0].children[0].children[0].innerHTML = "";
		this.el.children[0].children[0].children[0].innerHTML = this.date.getDate()+ " " + cal_months_labels[this.date.getMonth()] + " " + this.date.getFullYear();
		if(typeof this.options.onSelect === 'function'){
			this.options.onSelect.call(this, this.date);
		}
		
	}

	window.WinkelCalendar = WinkelCalendar || {};
	
})(window);
