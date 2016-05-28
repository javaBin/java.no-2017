/**
 * Created by hakonj on 05/09/15.
 */


$(function () {
    var element = $("header");
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();


        if (scroll > 0) {
            element.addClass("sticky");
        } else {
            element.removeClass("sticky");
        }
    });

    var sammy = $.sammy(function() {
            this.get('#:test', function() {
                //var anchor = this.href.split("#")[1];
                var anchor = this.params['test'];
                var position = 0;

                if (anchor !== "" && anchor !== "home") {
                    position = $("#" + anchor).offset().top - $("header").outerHeight();
                }

                $('html, body').animate({
                    scrollTop: position
                }, 500);

                //return false;
            });
        }
    );

    var url = "http://api.meetup.com/2/events?group_id=7480032%2C8449272%2C7371452%2C4060032%2C10847532%2C1764379&status=upcoming&order=time&limited_events=False&desc=false&offset=0&format=json&page=20&fields=&sig_id=14499833&sig=5cd7131eecfb2f8b4581762dd8c58c77c266d23d";
    $.ajax({
        url: url,
        type: "GET",
        dataType: "jsonp",
        success: function (data) {
            $(".meetup-loading").hide();
            var eventsList = "";
            if (data.results.length == 0) {
                eventsList = '<section><h2>Vi har for tiden ingen planlagte meetups.</h2></section>';
            } else {
                $.each(data.results, function (i, item) {
                    var remainingSeats = "";
                    if (item.rsvp_limit) {
                        remainingSeats = '<span>' + (item.rsvp_limit - item.yes_rsvp_count) + ' ledige plasser</span>';
                    }
                    var venueCity = typeof item.venue !== "undefined" ? item.venue.city : null;
                    var venueName = typeof item.venue !== "undefined" ? item.venue.name : null;
                    var venueString = venueCity === null || venueName === null ? "Foreløpig ingen lokasjon." : venueName + ', ' + venueCity;
                    eventsList = eventsList +
                        '<div class="meetup">' +
                        '   <figure>' +
                        '       <img class="map" src="http://maps.googleapis.com/maps/api/staticmap?center=' + venueCity + ',Norway&zoom=10&size=75x75&sensor=false"/>' +
                        '       <figcaption>' + item.group.name + '</figcaption>' +
                        '   </figure>' +
                        '   <div>' +
                        '       <span class="region">' + item.group.name + '</span>' +
                        '       <span><a class="eventlink" href="' + item.event_url + '">' + item.name + '</a></span>' +
                        '       <span class="venue">' + venueString + '</span>' +
                        '       <span class="timeanddate">' + moment(new Date(item.time)).format("dddd, MMMM DD, HH:mm") + '</span>' +
                        '   </div>' +
                        '   <div>' +
                        '       <span class="rsvp-count">' + item.yes_rsvp_count + '</span>' +
                        '       <span>påmeldte</span>' +
                        remainingSeats +
                        '   </div>' +
                        '</div>';
                });
            }

            $("#meetup").html($("#meetup").html() + '<div class="flex-box">' + eventsList + '</div>');
        },
        beforeSend: setHeaders
    });

    function setHeaders(xhr) {
        xhr.setRequestHeader("Origin", "http://java.no");
    }

    sammy.run('#home');
});