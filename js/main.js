




// Page transitions
$('#outbound-trip').on('tap swipeleft', function() {
    $('#outbound-schedule').addClass('active');
});
$('#return-trip').on('tap swipeleft', function() {
    $('#return-schedule').addClass('active');
});

var schedules = $('#outbound-schedule, #return-schedule');
$('.back-to-home').on('tap', function() {
    schedules.removeClass('active');
});
$('.schedule-wrapper').on('swiperight', function() {
    schedules.removeClass('active');
});


// Schedule tabs
$('.nav-tab').on('click', function() {
    var $this = $(this);
    var schedule = $this.data('schedule');

    // nav tabs
    $this.siblings('.nav-tab').removeClass('active');
    $this.addClass('active');

    // tabs
    $this.closest('.page-content').find('.schedule').removeClass('active');
    $('#'+ schedule +'-schedule').addClass('active');
});










