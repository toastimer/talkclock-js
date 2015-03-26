$(document).ready(function() {

    // Length of talk
    var length = 2*60;

    var defaults = {
        max: 420,
        mid: 360,
        min: 300
    }

    // UI Objects
    var $timer = $("#timer");
    var $startButton = $("#startButton");
    var $stopButton = $("#stopButton");
    var $timePicker = $("#timePicker");

    var $gIcon = $("#gIcon");
    var $oIcon = $("#oIcon");
    var $rIcon = $("#rIcon");

    // Setup max, med, and min values
    var max, mid, min;
    
    function updateIcons() {
        console.log("updateIcons() fired");

        $gIcon.html(secondsToTime(min));
        $oIcon.html(secondsToTime(mid));
        $rIcon.html(secondsToTime(max));
    }

    function secondsToTime(s) {
        var minutes = parseInt( s / 60 ) % 60;
        var seconds = s % 60;

        return (minutes < 10 ? "" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
    }

    $timePicker.selectpicker().change(function() {
        var selection = $timePicker.val();
        console.log("Time selector changed: " + selection); 
        if (selection != 0 && selection != "def") {
            length = selection * 60
            if (length >= 1*60) {
                max = length
                if (length >= 3*60) {
                    min = max-120;
                    mid = (max+min)/2;
                } else if (length == 1*60) {
                    min = max-30;
                    mid = min+15;
                } else {
                    min = max-60;    
                    mid = (max+min)/2;
                }
            }
            updateIcons();
        } else if (selection == 0) {
            // get custom length from text field
            $('.custom').fadeIn("slow"); 
        } else if (selection == "def") {
            max = defaults.max;
            mid = defaults.mid;
            min = defaults.min;
            updateIcons();
        }
    });

    $startButton.click(function() {
        console.log("Start button clicked");
        $timer.timer("start");
        $startButton.fadeOut("slow", function() {
            $stopButton.fadeIn("slow");   
        });
        var interval = window.setInterval(function() {
            var ellapsed = $timer.timer("get_seconds");
            if (ellapsed < length) {
                if (ellapsed >= min && ellapsed < mid) {
                    $("body").attr("id", "green");
                }
                if (ellapsed >= mid) {
                    $("body").attr("id", "yellow");
                }
            } else {
                $("body").attr("id", "red");
            }
        }, 1);
    });

    $stopButton.click(function() {
        console.log("Stop button clicked");
        $timer.timer("pause");
        $stopButton.fadeOut("slow", function() {
            $startButton.fadeIn("slow");    
        });
    });

});
