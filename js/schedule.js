function schedule() {

    // Current day of the week
    var date = new Date(); // create current day valiable
    var dayoftheweek = date.getDay(); // get day of the week

    // if it's saturday
    if ( dayoftheweek === 6 ) {
        $('.nav-tab').eq(2).click();
    }
    // if it's sunday
    else if ( dayoftheweek === 0 ) {
        $('.nav-tab').eq(1).click();
    }
    // if it's a weekday
    else {
        //$('.nav-tab').eq(0).click();
    }


    // Get Time
    var hour = date.getHours(); // get hours
    var minute = date.getMinutes(); // get minutes
    var second = date.getSeconds(); // get seconds


    var dd = date.getDate();
    var mm = date.getMonth()+1; //January is 0!
    var yyyy = date.getFullYear();



    console.log('horas: '+ hour +' '+ minute +' '+ second);

    // Get JSON data
    $.getJSON( "json/barreiro-terreiro.json", function( data ) {

        // create arrays
        var weekdays_arr    = [];
        var saturdays_arr   = [];
        var sundays_arr     = [];

        // loop json to get data and build html
        $.each( data.weekdays, function( key, val ) {
            // check next departure hour
            if (val.hour >= hour) {

                // check next departure minute
                if (val.minute > minute) {

                    weekdays_arr.push( '<div class="next"><span>' + val.hour +':'+ val.minute + '</span></div>');

                    // Next departures
                    $('#next-outbound-departure').text(val.hour+':'+val.minute);
                    //$('#later-outbound-departure').text()

                    // Creating html for countdown with Final Countdown plugin
                    $('#outbound-countdown').countdown(yyyy +'/'+ mm +'/'+ dd +' '+ val.hour +':'+ val.minute +':00', function(event) {
                        var $this = $(this).html(event.strftime(''
                            + '<div class="countdown-item"><span>%H</span></div>'
                            + '<span class="countdown-separator">:</span>'
                            + '<div class="countdown-item"><span>%M</span></div>'
                            + '<span class="countdown-separator">:</span>'
                            + '<div class="countdown-item"><span>%S</span></div>'));
                    }).on('finish.countdown', function(event) {
                        schedule();
                    });

                    //'2015/4/3 14:30:00'
                    //yyyy +'/'+ mm +'/'+ dd +' '+ val.hour +':'+ val.minute +':00'

                    /* OLD
                        // calculate remaining time
                        var remaining_hours = val.hour - hour;
                        var remaining_minutes = val.minute - minute;
                        var remaining_seconds = 60 - second;

                        // put in 2 digits and append
                        $('#outbound-hour').text(('0' + remaining_hours).slice(-2));
                        $('#outbound-minute').text(('0' + remaining_minutes).slice(-2));
                        $('#outbound-second').text(('0' + remaining_seconds).slice(-2));
                    */


                    // stop loop
                    return false;
                }
                else if (val.minute <= minute) {
                    // get previous (if is in the same hour than the next)
                    weekdays_arr.push( '<div><span>' + val.hour +':'+ val.minute + '</span></div>');
                }
            }
            else if (val.hour < hour) {
                weekdays_arr.push( '<div><span>' + val.hour +':'+ val.minute + '</span></div>');
            }
        });
        $.each( data.weekdays, function( key, val ) {

            // get comming time schedules
            if (val.hour > (hour+1)) {
                weekdays_arr.push( '<div class="comming"><span>' + val.hour +':'+ val.minute + '</span></div>');
            }
        });

        $.each( data.saturdays, function( key, val ) {
            saturdays_arr.push( "<div><span>" + val.hour +':'+ val.minute + "</span></div>");
        });
        $.each( data.sundays, function( key, val ) {
            sundays_arr.push( "<div><span>" + val.hour +':'+ val.minute + "</span></div>");
        });

        // append html
        $("#weekdays-outbound-schedule").html(weekdays_arr);
        $("#saturdays-outbound-schedule").html(saturdays_arr);
        $("#sundays-outbound-schedule").html(sundays_arr);

    });


}

schedule();
