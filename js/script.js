const $green = $("[data-color='green']");
const $red = $("[data-color='red']");
const $yellow = $("[data-color='yellow']");
const $blue = $("[data-color='blue']");

const randomFlag = {
    1:$green,
    2:$red,
    3:$yellow,
    4:$blue
};

let isStrictMode = false;
let powerOn = false;

let c;
let conv;
let osc;
let g;

function newSequence() {
    let musicSequence = [];
    for (i = 0; i < 20; i++) {
        musicSequence.push(randomFlag[getRandomInt(1, 4)].data("frequency"));
    }
    return musicSequence;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
            g.gain.setTargetAtTime(.5, c.currentTime, .15);
            $(button.target).on("mouseup", button => {
                g.gain.setTargetAtTime(0, c.currentTime, .15);
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
        if (!powerOn) {
            osc.stop();
            readySoundMaker();
            $("#blocker").css("z-index", "99");
            $("#blocker").css("cursor", "wait");
            $(".quarter-circle").removeClass("darkened");
            $("#strict-mode").prop("disabled", true);
            powerOn = true;

            let musicSequence = newSequence();

            for (let i = 0; i < musicSequence.length; i++) {
                for (let j = 0; j < i; j++) {
                    
                }
            }



        } else {
            $("#blocker").css("z-index", "-1");
            for (let i = 1; i < 99999; i++) window.clearInterval(i); // Hack-ish solution to stopping interval song interval.
            osc.stop();
            $(".quarter-circle").addClass("darkened");
            $("#strict-mode").prop("disabled", false);
            powerOn = false;
            readySoundMaker();
        }
    });
});