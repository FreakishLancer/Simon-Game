const $red = $("[data-color='red']");
const $green = $("[data-color='green']");
const $yellow = $("[data-color='yellow']");
const $blue = $("[data-color='blue']");

let isStrictMode = false;
let powerOn = false;

let c;
let osc;
let g;

function readySoundMaker() {
    c = new AudioContext();
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