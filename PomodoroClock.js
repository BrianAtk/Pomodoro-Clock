$(document).ready(function () {
    var timerOn = false;
    var onBreak = false;
    var count = 0;
    var counter;
    // set default times
    $(".break").text(5);
    $(".sessionTime").text(25);
    // increase break time
    $(".addBreak").click(function () {

        $(".break").text(parseInt($('.break').text()) + 1);
    });
    //decrease break time
    $(".subBreak").click(function () {
        if (parseInt($('.break').text()) > 0) {
            $(".break").text(parseInt($('.break').text()) - 1);
        }
    });
    // increae session time
    $(".addSession").click(function () {
        $(".sessionTime").text(parseInt($('.sessionTime').text()) + 1);
    });
    // decreae session time
    $(".subSession").click(function () {
        if (parseInt($('.sessionTime').text())) {
            $(".sessionTime").text(parseInt($('.sessionTime').text()) - 1);
        }

    });

    count = parseInt($('.sessionTime').text()) * 60;
    counter = setInterval(timer, 1000);

    function zeroPad(num) {
        return (num >= 10) ? num.toString() : '0' + num.toString();
    }

    function ringAlarm() {
        document.getElementById("alarm").play();

    }

    function ringAlarm2() {
        document.getElementById("alarm2").play();

    }

    $("#cancelTimer").click(function () {
        count = 0;
        timerOn = false;
        onBreak = false;
        $(".message").text("");
    });
    $("#resetTimer").click(function () {
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
        $(".message").text("");
    });

    $("#beginTimer").click(function () {
        //beginTimer();
        timerOn = true;
        count = parseInt($('.sessionTime').text()) * 60;
        if (count > 0) {
            onBreak = false;
            $(".message").text("Get To Work");
        } else {
            count = parseInt($('.break').text()) * 60;
            if (count > 0) {
                timerOn = false;
                onBreak = true;
                $(".message").text("Break Time!!");
            } else {
                timerOn = false;
                onBreak = false;
            }
        }

    });

    function timer() {
        if (timerOn || onBreak) {
            count -= 1;
            var hoursRemaining = Math.floor(count / 3600);
            var minutesRemaining = Math.floor(count / 60);
            if (minutesRemaining) {
                minutesRemaining = minutesRemaining % 60;
            }

            var secondsRemaining = Math.floor(count % 60);
            if (count === 0) {
                //    clearInterval(counter);
                if (timerOn) {
                    timerOn = false;
                    count = parseInt($('.break').text()) * 60;
                    if (count > 0) {
                        timerOn = false;
                        onBreak = true;
                        $(".message").text("Break Time!!");
                        ringAlarm();
                    }
                } else {
                    if (onBreak == true) {
                        onBreak = false;
                        $(".message").text("");
                        ringAlarm2();
                    }
                }
            }

            document.getElementById("hours").innerHTML = zeroPad(hoursRemaining);
            document.getElementById("minutes").innerHTML = zeroPad(minutesRemaining);
            document.getElementById("seconds").innerHTML = zeroPad(secondsRemaining);
        }
    }

});
