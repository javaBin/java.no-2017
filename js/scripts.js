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

    var url = "//api.meetup.com/2/events?group_id=7480032%2C8449272%2C7371452%2C4060032%2C10847532%2C1764379&status=upcoming&order=time&limited_events=False&desc=false&offset=0&format=json&page=20&fields=&sig_id=14499833";
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
                "javaBin-Sogn": "Sogn"
            };

            var resultsHash = {
                "Oslo": undefined,
                "Bergen": undefined,
                "Stavanger": undefined,
                "Sørlandet": undefined,
                "Trondheim": undefined,
                "Vestfold": undefined,
                "Sogn": undefined
            };

            moment.locale('no');

            //console.log(data.results);

            $.each(data.results, function (i, item) {

                item.time = moment(new Date(item.time)).format("dddd, MMMM DD, HH:mm");

                var city = "Ukjent region";
                if (item.venue !== undefined) {
                    city = item.venue.city;
                }

                var index = regionsnavnoverride[item.group.urlname] || city;

                var result = resultsHash[index];
                if (result === undefined) {
                    result = [];
                }

                result.push(item);

                resultsHash[index] = result;

            });

            //console.log(resultsHash);

            if (resultsHash.length <= 0) {
                return;
            }

            var template = $.templates("#meetupTemplate");
            var htmlOutput = template.render(resultsHash);

            $("#replaceMeetupList").replaceWith(htmlOutput);
        },
        beforeSend: setHeaders
    });

    function setHeaders(xhr) {
        xhr.setRequestHeader("Origin", "http://java.no");
    }

    sammy.run('#');
});