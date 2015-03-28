$('#outbound-trip').on('click', function() {
    $('#outbound-schedule').addClass('active');
});

$('#outbound-schedule').on('click', function() {
    $(this).removeClass('active');
});
