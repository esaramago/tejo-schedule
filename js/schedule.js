function countdown() {

    // Get date and time
    var date = new Date();
    var dayoftheweek = date.getDay(); // get day of the week
    var dd = date.getDate();
    var mm = date.getMonth()+1; //January is 0!
    var yyyy = date.getFullYear();
    var hour = date.getHours(); // get hours
    var minute = date.getMinutes(); // get minutes
    var second = date.getSeconds(); // get seconds

    // Get JSON data
    $.getJSON('json/barreiro-terreiro.json', function( data ) {

        // if it's saturday
        if ( dayoftheweek === 6 ) {
            current_schedule = data.saturdays;
            $('.nav-tab').eq(1).click();
        }
        // if it's sunday
        else if ( dayoftheweek === 0 ) {
            current_schedule = data.sundays;
            $('.nav-tab').eq(2).click();
        }
        else {
            current_schedule = data.weekdays;
        }

        // loop json to get data and build html
        $.each( current_schedule, function( key, val ) {

            // get next departure time
            if (val.hour == hour && val.minute > minute || val.hour > hour && val.minute < minute) {

                // Creating html for countdown with Final Countdown plugin
                $('#outbound-countdown').countdown(yyyy +'/'+ mm +'/'+ dd +' '+ val.hour +':'+ val.minute +':00', function(event) {
                    var $this = $(this).html(event.strftime(''
                        + '<div class="countdown-item"><span>%H</span></div>'
                        + '<span class="countdown-separator">:</span>'
                        + '<div class="countdown-item"><span>%M</span></div>'
                        + '<span class="countdown-separator">:</span>'
                        + '<div class="countdown-item"><span>%S</span></div>'));
                }).on('finish.countdown', function(event) {
                    countdown();
                    schedule();
                });

                // Next departures
                $('#next-outbound-departure').text(val.hour+':'+val.minute);
                //$('#later-outbound-departure').text();

                // stop loop
                return false;
            }
        });
    });
}

function scheduleLoop(dayoftheweek, current_time, schedule, array, hour, minute) {

    next_schedule_index = 0;
    // loop json to get data and build html
    $.each( schedule, function( key, val ) {

        // get next departure time
        /*if (val.hour <= hour) {
            if (val.hour < hour) {
                array.push( '<div><span>' + val.hour +':'+ val.minute + '</span></div>');
                //console.log('1: '+ val.hour +':'+ val.minute)
            }
            else if (val.hour == hour && minute >= val.minute) {
                array.push( '<div><span>' + val.hour +':'+ val.minute + '</span></div>');
                console.log('prev 2: '+ val.hour +':'+ val.minute)
            }
            else if (val.hour == hour && minute < val.minute) {
                array.push( '<div><span class="current">' + val.hour +':'+ val.minute + '</span></div>');
                console.log('current 1: '+ val.hour +':'+ val.minute)
            }
        }
        else if (val.hour > hour && minute < val.minute) {
            array.push( '<div><span class="current">' + val.hour +':'+ val.minute + '</span></div>');
            console.log('current 2: '+ val.hour +':'+ val.minute)
        }
        else {
            array.push( '<div><span class="comming">' + val.hour +':'+ val.minute + '</span></div>');
        }*/

        // get "decimal" schedule time
        var schedule_time = val.hour +'.'+ val.minute;
        if ( schedule_time < 5) { // if current time is after midnight
            schedule_time = Number(schedule_time) + 24;
        }
        console.log(schedule_time);

        if (schedule_time <= current_time) {
            array.push( '<div><span>' + val.hour +':'+ val.minute + '</span></div>');

            next_schedule_index++; // here i can get the last true iteration. That iteration is the next schedule time
        }
        else if (schedule_time > current_time) {
            array.push( '<div><span class="comming">' + val.hour +':'+ val.minute + '</span></div>');
        }
    });

    // append html and add "current" class to the next schedule time
    if (dayoftheweek === 'saturday') { // if it's saturday
        $("#saturdays-outbound-schedule").html(array).find('span:eq('+ next_schedule_index +')').addClass('current');
    }
    else if (dayoftheweek === 'sunday') { // if it's sunday
        $("#sundays-outbound-schedule").html(array).find('span:eq('+ next_schedule_index +')').addClass('current');
    }
    else { // if it's weekday
        $("#weekdays-outbound-schedule").html(array).find('span:eq('+ next_schedule_index +')').addClass('current');
    }

}
function schedule() {

    // Get Time
    var date = new Date(); // create current day valiable
    var dayoftheweek = date.getDay(); // get day of the week
    var hour = date.getHours(); // get hours
    var minute = date.getMinutes(); // get minutes
    var second = date.getSeconds(); // get seconds

    // get "decimal" current time
    var current_time = hour +'.'+ minute;

    // if current time is after midnight
    if ( current_time < 5) {
        current_time = Number(current_time + 24);
    }
    console.log(current_time);

    // Get JSON data
    $.getJSON( "json/barreiro-terreiro.json", function( data ) {

        // create arrays
        var weekdays_arr    = [];
        var saturdays_arr   = [];
        var sundays_arr     = [];

        scheduleLoop('weekday', current_time, data.weekdays, weekdays_arr, hour, minute);
        scheduleLoop('saturday', current_time, data.saturdays, saturdays_arr, hour, minute);
        scheduleLoop('sunday', current_time, data.sundays, sundays_arr, hour, minute);

        console.log(data.saturdays[next_schedule_index]['hour']);
        console.log(data.saturdays[next_schedule_index]['minute']);

    });


}

countdown();
schedule();
