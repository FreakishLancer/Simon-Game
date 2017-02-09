const isFirefox = typeof InstallTrigger !== "undefined";

console.log(isFirefox);

let isStrictMode = false;
let powerOn = false;

let $red = $("[data-color='red']");
let $green = $("[data-color='green']");
let $yellow = $("[data-color='yellow']");
let $blue = $("[data-color='blue']");

let c;
let osc;
let g;

function readySoundMaker() {
    isFirefox ? c = new AudioContext() : c = new (window.AudioContext || window.webkitAudioContext)();
    osc = c.createOscillator();
    g = c.createGain();
    osc.type = "triangle";
    g.gain.value = .25;
    osc.start(0);
}

readySoundMaker();

$(document).ready(() => {

    $(".quarter.circle").css("transition-duration", ".1s;"); // Stops weird border-radius transition before script is loaded.

    $(".quarter-circle").on("click", button => {
        $(".quarter-circle").not(button.target).addClass("darkened");
        $(button.target).removeClass("darkened");
        if (!powerOn) {
            osc.frequency.value = $(button.target).data("frequency");
            osc.connect(g);
            g.connect(c.destination);
        } else {
            return;
        }
    });

    $(document).keypress(key => {

        if (key.keyCode === 38 || key.keyCode === 87) {
            if (!powerOn) {
                osc.frequency.value = $red.data("frequency");
                osc.connect(g);
                g.connect(c.destination);
            } else {
                return;
            }
        }
        else if (key.keyCode === 39 || key.keyCode === 68) {
            if (!powerOn) {
                osc.frequency.value = $green.data("frequency");
                osc.connect(g);
                g.connect(c.destination);
            } else {
                return;
            }
        }
        else if (key.keyCode === 37 || key.keyCode === 65) {
            if (!powerOn) {
                osc.frequency.value = $yellow.data("frequency");
                osc.connect(g);
                g.connect(c.destination);
            } else {
                return;
            }
        }
        else if (key.keyCode === 40 || key.keyCode === 83) {
            if (!powerOn) {
                osc.frequency.value = $blue.data("frequency");
                osc.connect(g);
                g.connect(c.destination);
            } else {
                return;
            }
        }
    });

    $("#strict-mode").on("click", () => {
        if (!isStrictMode) {
            $("#strict-mode span").text("On");
            isStrictMode = true;
        } else {
            $("#strict-mode span").text("Off");
            isStrictMode = false;
        }
    });

    $("#power").on("click", () => {
        osc.stop();
        if (!powerOn) {
            $(".quarter-circle").removeClass("darkened");
            $("#strict-mode").prop("disabled", true);
            powerOn = true;
        } else {
            $(".quarter-circle").addClass("darkened");
            $("#strict-mode").prop("disabled", false);
            powerOn = false;
            readySoundMaker();
        }
    });
});

// Pitch to Frequency Mappings
// B3 246.94
// G3 196.00
// E3 164.81
// C3 130.81

/*

c = new AudioContext();
osc = c.createOscillator();
osc.frequency.value = 247;
osc.type = "sawtooth";
osc.connect(c.destination);
osc.start(0);



*/