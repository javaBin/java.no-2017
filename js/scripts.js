/**
 * Created by hakonj on 05/09/15.
 */

$(function() {
    var element = $("header");
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();


        if(scroll > 0) {
            element.addClass("sticky");
        } else {
            element.removeClass("sticky");
        }
    });

    $("header a").click(function() {
        var anchor = this.href.split("#")[1];
        var position = 0;

        if(anchor !== "") {
            position = $("#" + anchor).offset().top;
        }

        $('html, body').animate({
            scrollTop: position
        }, 1000);

        return false;
    });
});