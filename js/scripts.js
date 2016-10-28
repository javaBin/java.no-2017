/**
 * Created by hakonj on 05/09/15.
 */


$(function () {
    var navbar = $("#navbar");
    function mycketBraFraaga(event) {
        if(event !== undefined) {
            event.preventDefault();
        }

        var scroll = $(window).scrollTop();


        if (scroll > 0) {
            navbar.addClass("sticky");
        } else {
            navbar.removeClass("sticky");
        }
    }

    $(window).scroll(mycketBraFraaga);
    $("body").on({
        "touchmove": mycketBraFraaga
    });

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

    var url = "http://api.meetup.com/2/events?group_id=7480032%2C8449272%2C7371452%2C4060032%2C10847532%2C1764379&status=upcoming&order=time&limited_events=False&desc=false&offset=0&format=json&page=20&fields=&sig_id=14499833&sig=5cd7131eecfb2f8b4581762dd8c58c77c266d23d";
    $.ajax({
        url: url,
        type: "GET",
        dataType: "jsonp",
        success: function (data) {
            var resultsHash = {};

            $.each(data.results, function (i, item) {

                moment.locale('no');
                item.time = moment(new Date(item.time)).format("dddd, MMMM DD, HH:mm");
                // item.available_rsvp = (item.rsvp_limit - item.yes_rsvp_count) || 0;


                var index = item.venue.city;

                var result = resultsHash[index];
                if (result === undefined) {
                    result = [];
                }

                result.push(item);

                resultsHash[index] = result;


            });

            var template = $.templates("#meetupTemplate");
            var htmlOutput = template.render(resultsHash);

            $("#meetup article").html(htmlOutput);
        },
        beforeSend: setHeaders
    });

    function setHeaders(xhr) {
        xhr.setRequestHeader("Origin", "http://java.no");
    }

    sammy.run('#');
});