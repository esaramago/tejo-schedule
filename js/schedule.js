function scheduleLoop(schedule_list, current_time, schedule, array, dayoftheweek, hour, minute) {

    // check which day of the week is today
    if (
        schedule_list === 'saturday' && dayoftheweek == 6 ||
        schedule_list === 'sunday' && dayoftheweek == 0 ||
        schedule_list === 'weekday' && dayoftheweek > 0 && dayoftheweek < 6
    ) {
        next_schedule_index = 0;

        // loop json to get data and build html of today's schedule
        $.each( schedule, function( key, val ) {

            // get "decimal" schedule time
            var schedule_time = val.hour +'.'+ val.minute;
            if ( schedule_time < 5) { // if current time is after midnight
                schedule_time = Number(schedule_time) + 24;
            }

            // get next departure time
            if (schedule_time <= current_time) {
                array.push( '<div><span>' + val.hour +':'+ val.minute + '</span></div>');

                next_schedule_index++; // here i can get the last true iteration. That iteration is the next schedule time
            }
            else if (schedule_time > current_time) {
                array.push( '<div><span class="comming">' + val.hour +':'+ val.minute + '</span></div>');
            }
        });

        // get hour and minute of the next schedule
        next_schedule_time_hour = schedule[next_schedule_index]['hour'];
        next_schedule_time_minute = schedule[next_schedule_index]['minute'];

        // get hour and minute of the schedule after the next
        later_schedule_time_hour = schedule[next_schedule_index + 1]['hour'];
        later_schedule_time_minute = schedule[next_schedule_index + 1]['minute'];
    }
    else {
        // Populate schedules that aren't from today
        $.each( schedule, function( key, val ) {
            array.push( "<div><span>" + val.hour +':'+ val.minute + "</span></div>");
        });
    }

}
function schedule(way, trip) {

    // Get Time
    var date = new Date(), // create current day valiable
        dayoftheweek = date.getDay(), // get day of the week
        dd = date.getDate(),
        mm = date.getMonth()+1, //January is 0!
        yyyy = date.getFullYear(),
        hour = date.getHours(), // get hours
        minute = date.getMinutes(), // get minutes
        second = date.getSeconds(); // get seconds

    // if current time is after midnight change to last day
    if (hour < 2) {

        if ( dayoftheweek == 0 ) {
            dayoftheweek = 6;
        }
        else {
            dayoftheweek = dayoftheweek - 1;
        }
    }

    // get "decimal" current time
    var current_time = Number(hour +'.'+ minute);

    // if current time is after midnight
    if ( current_time < 2) {
        current_time = current_time + 24;
    }

    // Get JSON data
    $.getJSON('json/'+ trip +'.json', function( data ) {

        // create arrays
        var weekdays_arr    = [];
        var saturdays_arr   = [];
        var sundays_arr     = [];

        scheduleLoop('saturday', current_time, data.saturdays, saturdays_arr, dayoftheweek, hour, minute);
        scheduleLoop('sunday', current_time, data.sundays, sundays_arr, dayoftheweek, hour, minute);
        scheduleLoop('weekday', current_time, data.weekdays, weekdays_arr, dayoftheweek, hour, minute);

        $('#saturdays-'+ way +'-schedule').html(saturdays_arr).find('span:eq('+ next_schedule_index +')').addClass('current');
        $('#sundays-'+ way +'-schedule').html(sundays_arr).find('span:eq('+ next_schedule_index +')').addClass('current');
        $('#weekdays-'+ way +'-schedule').html(weekdays_arr).find('span:eq('+ next_schedule_index +')').addClass('current');

        // if next schedule is after midnight
        if (next_schedule_time_hour >= 0 && next_schedule_time_hour <= 2) {
            // fix day
            dd = dd + 1;
        }
        //console.log(yyyy +'/'+ mm +'/'+ dd +' '+ next_schedule_time_hour +':'+ next_schedule_time_minute +':00')

        $('#'+ way +'-countdown').countdown(yyyy +'/'+ mm +'/'+ dd +' '+ next_schedule_time_hour +':'+ next_schedule_time_minute +':00', function(event) {
            var $this = $(this).html(event.strftime(''
                + '<div class="countdown-item"><span class="countdown-value">%H</span></div>'
                + '<span class="countdown-separator">:</span>'
                + '<div class="countdown-item"><span class="countdown-value">%M</span></div>'
                + '<span class="countdown-separator">:</span>'
                + '<div class="countdown-item"><span class="countdown-value">%S</span></div>'));
        })/*.on('finish.countdown', function(event) {
            schedule('outbound', outbound_trip);
            schedule('return', return_trip);
        });*/

        // Next departures
        $('#next-'+ way +'-departure').text(next_schedule_time_hour +':'+ next_schedule_time_minute);
        $('#later-'+ way +'-departure').text(later_schedule_time_hour +':'+later_schedule_time_minute);

        var $navtab = $('#'+ way +'-schedule').find('.nav-tab');

        // if it's saturday
        if ( dayoftheweek === 6 /*|| dayoftheweek === 0 && hour < 5*/) {

            // open saturday's tab
            $navtab.eq(1).click();
            // add class "current" to the next schedule time if today it's saturday
            $('#saturdays-'+ way +'-schedule').find('span:eq('+ next_schedule_index +')').addClass('current');
        }
        // if it's sunday
        else if ( dayoftheweek === 0 ) {
            // open sunday's tab
            $navtab.eq(2).click();
            // add class "current" to the next schedule time if today it's sunday
            $('#sundays-'+ way +'-schedule').find('span:eq('+ next_schedule_index +')').addClass('current');
        }
        // if it's a weekday
        else {
            // add class "current" to the next schedule time if today it's a weekday
            $('#weekdays-'+ way +'-schedule').find('span:eq('+ next_schedule_index +')').addClass('current');
        }

    });
}
// get trip
var outbound_trip = $('#outbound-trip').data('destination') + '-' + $('#return-trip').data('destination');
var return_trip =  $('#return-trip').data('destination') + '-' + $('#outbound-trip').data('destination');

schedule('outbound', outbound_trip);
schedule('return', return_trip);
