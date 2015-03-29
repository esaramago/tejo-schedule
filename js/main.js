


// Get JSON data
$.getJSON( "json/barreiro-terreiro.json", function( data ) {

    // create arrays
    var weekdays_arr    = [];
    var saturdays_arr   = [];
    var sundays_arr     = [];

    // loop json to get data and build html
    $.each( data.weekdays[0], function( key, val ) {
        weekdays_arr.push( "<div><span>" + val + "</span></div>" );
    });
    $.each( data.saturdays[0], function( key, val ) {
        saturdays_arr.push( "<div><span>" + val + "</span></div>" );
    });
    $.each( data.sundays[0], function( key, val ) {
        sundays_arr.push( "<div><span>" + val + "</span></div>" );
    });

    // append html
    $("#weekdays-outbound-schedule").html(weekdays_arr);
    $("#saturdays-outbound-schedule").html(saturdays_arr);
    $("#sundays-outbound-schedule").html(sundays_arr);
});
$.getJSON( "json/terreiro-barreiro.json", function( data ) {

    // create arrays
    var weekdays_arr    = [];
    var saturdays_arr   = [];
    var sundays_arr     = [];

    // loop json to get data and build html
    $.each( data.weekdays[0], function( key, val ) {
        weekdays_arr.push( "<div><span>" + val + "</span></div>" );
    });
    $.each( data.saturdays[0], function( key, val ) {
        saturdays_arr.push( "<div><span>" + val + "</span></div>" );
    });
    $.each( data.sundays[0], function( key, val ) {
        sundays_arr.push( "<div><span>" + val + "</span></div>" );
    });

    // append html
    $("#weekdays-return-schedule").html(weekdays_arr);
    $("#saturdays-return-schedule").html(saturdays_arr);
    $("#sundays-return-schedule").html(sundays_arr);
});


// Page transitions
$('#outbound-trip').on('click', function() {
    $('#outbound-schedule').addClass('active');
});
$("#outbound-trip").swipe( {
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        if (direction == 'left') {
            $('#outbound-schedule').addClass('active');
        }
    }
});

$('#return-trip').on('click', function() {
    $('#return-schedule').addClass('active');
});
$("#return-trip").swipe( {
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        if (direction == 'left') {
            $('#return-schedule').addClass('active');
        }
    }
});

$('.back-to-home').on('click', function() {
    $('#outbound-schedule, #return-schedule').removeClass('active');
});
$('.schedule-wrapper').swipe( {
    swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        if (direction == 'right') {
            $('#outbound-schedule, #return-schedule').removeClass('active');
        }
    }
});




// Schedule tabs
$('.nav-tab').on('click', function() {
    var $this = $(this);
    var schedule = $this.data('schedule');

    // nav tabs
    $this.siblings('.nav-tab').removeClass('active');
    $this.addClass('active');

    // tabs
    $('.schedule').removeClass('active');
    $('#'+ schedule +'-schedule').addClass('active');
});













