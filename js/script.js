let isStrictMode = false;
let powerOn = false;
let $red = $("[data-color='red']");
let $green = $("[data-color='green']");
let $yellow = $("[data-color='yellow']");
let $blue = $("[data-color='blue']");

let c = new AudioContext();
let osc = c.createOscillator();
osc.type = "square";
osc.connect(c.destination);

$(document).ready(() => {

    $(".quarter-circle").on("click", button => {
        if (!powerOn) {
            osc.frequency.value = $(button.target).data("frequency");
            osc.start(0);
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
        osc.stop();
        if (!powerOn) {
            $("#strict-mode").prop("disabled", true);
            powerOn = true;
            console.log(powerOn);
        } else {
            $("#strict-mode").prop("disabled", false);
            powerOn = false;
            console.log(powerOn);
        }
    });
});

// Pitch to Frequency Mappings
// B3 247
// G3 196
// E3 165
// C3 131

/*

c = new AudioContext();
osc = c.createOscillator();
osc.frequency.value = 247;
osc.type = "sawtooth";
osc.connect(c.destination);
osc.start(0);



*/