let isStrictMode = false,
    powerOn = false;

$(document).ready(() => {

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
        if (!powerOn) {
            $("#strict-mode").prop("disabled", true);
            powerOn = true;
        } else {
            $("#strict-mode").prop("disabled", false);
            powerOn = false;
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
gainer = c.createGain();
gainer.gain.value = .15;
osc.frequency.value = 330;
osc.type = "sawtooth";
osc.connect(gainer);
osc.start(0);



*/