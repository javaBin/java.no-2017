/**
 * Created by hakonj on 05/09/15.
 */

$(function() {
    var element = $("header");
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        console.log(scroll);
        console.log(element);

        if(scroll > 0) {
            element.addClass("sticky");
        } else {
            element.removeClass("sticky");
        }
    });
});