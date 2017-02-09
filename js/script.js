const $red = $("[data-color='red']");
const $green = $("[data-color='green']");
const $yellow = $("[data-color='yellow']");
const $blue = $("[data-color='blue']");

let isStrictMode = false;
let powerOn = false;

let c;
let osc;
let g;

function readySoundMaker() { // Prepares a muted oscillator.
    c = new AudioContext();
    osc = c.createOscillator();
    g = c.createGain();
    osc.type = "triangle";
    g.gain.value = 0;
    osc.connect(g);
    g.connect(c.destination);
    osc.start(0);
}

readySoundMaker();

$(document).ready(() => {

    $(".quarter.circle").css("transition-duration", ".1s;"); // Stops weird border-radius transition before script is loaded.

    $(".quarter-circle").on("mousedown", button => {
        $(".quarter-circle").not(button.target).addClass("darkened");
        $(button.target).removeClass("darkened");
        if (!powerOn) {
            osc.frequency.value = $(button.target).data("frequency");
            g.gain.value = .25;
            $(button.target).on("mouseup", button => {
                g.gain.value = 0;
                $(button.target).addClass("darkened");
            });
        } else {
            return;
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
        g.gain.value = 0;
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