/**
 * Created by hakonj on 05/09/15.
 */


$(function () {
    var navbar = $("#navbar");

    function addSticky() {
        navbar.addClass("sticky");
    }

    function removeSticky() {
        navbar.removeClass("sticky");
    }

    function mycketBraFraaga() {
        var scroll = $(window).scrollTop();


        if (scroll > 0) {
            addSticky();
        } else {
            removeSticky();
        }
    }

    $(window).scroll(mycketBraFraaga);
    /* Dette må fikles med... */
    /*    $("body").on({
     "touchmove": mycketBraFraaga,
     "touchstart": addSticky,
     "touchend": removeSticky
     });*/

    var sammy = $.sammy(function () {
            this.get('#:test', function () {
                //var anchor = this.href.split("#")[1];
                var anchor = this.params['test'];
                var position = 0;

                if (anchor !== "" && anchor !== "home") {
                    position = $("#" + anchor).offset().top - navbar.outerHeight();
                }

                $('html, body').animate({
                    scrollTop: position
                }, 500);

                //return false;
            });
        }
    );

    var url = "//api.meetup.com/2/events?group_id=7480032%2C8449272%2C7371452%2C4060032%2C10847532%2C1764379%2C30349557&status=upcoming&order=time&limited_events=False&desc=false&offset=0&format=json&page=20&fields=&sig_id=14499833";
    $.ajax({
        url: url,
        type: "GET",
        dataType: "jsonp",
        success: function (data) {
            const regionsnavnoverride = {
                "javaBin-Oslo": "Oslo",
                "javaBin-Bergen": "Bergen",
                "javaBin-Stavanger": "Stavanger",
                "javaBin-Sorlandet": "Sørlandet",
                "javaBin-Trondheim": "Trondheim",
                "javaBin-Vestfold": "Vestfold",
                "javaBin-Sogn": "Sogn",
                "javaBin-Tromso": "Tromsø"
            };

            moment.locale('no');

            var mapOfRegionsWithEvents = data.results.reduce(function (acc, current) {
                var city = "Ukjent region";
                if (current.venue !== undefined) {
                    city = current.venue.city;
                }

                var index = regionsnavnoverride[current.group.urlname] || city;

                current.time = moment(new Date(current.time)).format("dddd, MMMM DD, HH:mm");

                (acc[index] = acc[index] || []).push(current);
                return acc;
            }, {});

            Object.keys(mapOfRegionsWithEvents).forEach(function (region) {
                var events = mapOfRegionsWithEvents[region];

                var eventsHtml = events.map(function (prop) {
                    return "<li><h3><a href='" + prop.event_url + "'>" + prop.name + "</a></h3><p>" + prop.time + "</p></li>"
                });

                if (eventsHtml.length !== 0) {
                    $("#upcoming-meetups-" + region).replaceWith("<ul>" + eventsHtml.join("") + "</ul>")
                }
            });
        },
        beforeSend: setHeaders
    });

    function setHeaders(xhr) {
        xhr.setRequestHeader("Origin", "http://java.no");
    }

    sammy.run('#');
});