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
let osc;
let g;

let currentSeqInd;
let currentNumOfNotes;
let tonesPressed;
let sequenceToRepeat;

function newSequence() { // Non-consecutive tones.
    let musicSequence = [];
    let prevTone = getRandomInt(1, 4);
    let nextTone;
    for (i = 0; i < 20; i++) {
        musicSequence.push(randomFlag[prevTone].data("frequency"));

        nextTone = getRandomInt(1, 4);
        if (prevTone === nextTone) {
            while (prevTone === nextTone) {
                nextTone = getRandomInt(1, 4);
            }
        }
        prevTone = nextTone;
    }
    console.log(musicSequence);
    return musicSequence;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function readySoundMaker() { // Prepares a muted oscillator.
    c = new window.AudioContext || window.webkitAudioContext;
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

    $(".quarter.circle").css("transition-duration", ".1s"); // Stops weird border-radius transition before script is loaded.

    $(".quarter-circle").on("mousedown", button => {
        $(".quarter-circle").not(button.target).addClass("darkened");
        $(button.target).removeClass("darkened");
        if (!powerOn) {
            osc.frequency.value = $(button.target).data("frequency");
            g.gain.setTargetAtTime(.65, c.currentTime, .15);
            $(button.target).on("mouseup", button => {
                g.gain.setTargetAtTime(0, c.currentTime + .15, .15);
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
            osc.stop(0);
            readySoundMaker();
            $("#blocker").css("z-index", "99");
            $(".quarter-circle").removeClass("darkened");
            $("#strict-mode").prop("disabled", true);
            powerOn = true;

            let musicSequence = newSequence();
            sequenceToRepeat = [];
            let playerSequence = [];

            currentNumOfNotes = 0;
            currentSeqInd = 0;
            tonesPressed = 0;

            let song = setInterval(playSequence, 400);

            function playSequence() {
                currentSeqInd < 9 ? $("#round-num").text(`0${currentSeqInd + 1}`) : $("#round-num").text(`${currentSeqInd + 1}`);
                
                {
                    $("#blocker").css("z-index", "99");
                    osc.type = "triangle";
                    g.gain.setTargetAtTime(.65, c.currentTime, .15);
                    osc.frequency.value = musicSequence[currentSeqInd];
                    $(".quarter-circle:not(.darkened)").addClass("darkened");
                    $(`.quarter-circle[data-frequency*="${musicSequence[currentSeqInd]}"]`).removeClass("darkened");
                }

                currentSeqInd++;
                tonesPressed = 0;
                playerSequence = [];

                if (currentSeqInd > currentNumOfNotes) {
                    clearInterval(song);
                    sequenceToRepeat = musicSequence.slice(0, currentSeqInd);
                    console.log(sequenceToRepeat);
                    currentSeqInd = 0;
                    setTimeout(() => {
                        $(".quarter-circle:not(.darkened)").addClass("darkened");
                        $("#blocker").css("z-index", "-1");
                    }, 400);
                    g.gain.setTargetAtTime(0, c.currentTime + .5, .15);
                }
            }

            $(".quarter-circle").on("mousedown", button => {
                if (powerOn) {
                    {
                        $(".quarter-circle").not(button.target).addClass("darkened");
                        $(button.target).removeClass("darkened");
                        osc.frequency.value = $(button.target).data("frequency");
                        g.gain.setTargetAtTime(.65, c.currentTime, .15);

                        $(button.target).on("mouseup", button => {
                            g.gain.setTargetAtTime(0, c.currentTime + .15, .15);
                            $(button.target).addClass("darkened");
                        });
                    }

                    tonesPressed++;

                    playerSequence.push($(button.target).data("frequency"));

                    if (playerSequence[tonesPressed - 1] !== sequenceToRepeat[tonesPressed - 1]) {
                        g.gain.setTargetAtTime(0, c.currentTime + .3, .15);
                        $("#blocker").css("z-index", "99");
                        osc.type = "sine";
                        g.gain.setTargetAtTime(.65, c.currentTime, .15);
                        osc.frequency.value = 155.56;

                        $("h1").addClass("invisible");
                        $("#wrong-text").removeClass("invisible");
                        setTimeout(() => {
                            $("h1").removeClass("invisible");
                            $("#wrong-text").addClass("invisible");
                        }, 500);
                        setTimeout(() => {
                            if (currentNumOfNotes >= 20) return;

                            song = setInterval(playSequence, 400);
                        }, 400);
                        return;
                    }

                    let isSame = (playerSequence.length == sequenceToRepeat.length) && playerSequence.every((frequency, index) => {
                        return frequency === sequenceToRepeat[index];
                    });

                    if (isSame && tonesPressed === sequenceToRepeat.length) {
                        g.gain.setTargetAtTime(0, c.currentTime + .25, .15);
                        $("#blocker").css("z-index", "99");
                        setTimeout(() => {
                            $("h1").addClass("invisible");
                            $("#correct-text").removeClass("invisible");
                            osc.type = "sine";
                            g.gain.setTargetAtTime(.65, c.currentTime, .1);
                            osc.frequency.value = 329.628;
                        }, 500);
                        setTimeout(() => {
                            g.gain.setTargetAtTime(0, c.currentTime, .1);
                            osc.frequency.value = 220;
                        }, 700);
                        setTimeout(() => {
                            $("h1").removeClass("invisible");
                            $("#correct-text").addClass("invisible");
                        }, 1000);
                        currentNumOfNotes++;
                        setTimeout(() => {
                            if (currentNumOfNotes >= 20) return;

                            song = setInterval(playSequence, 400);
                        }, 600);
                    }
                    
                } else return;
            });

        } else {
            currentNumOfNotes = 0;
            currentSeqInd = 0;
            tonesPressed = 0;
            sequenceToRepeat = [];

            $("#blocker").css("z-index", "-1");
            for (let i = 1; i < 99999; i++) window.clearInterval(i); // Hack-ish solution to stopping interval song interval.
            osc.stop(0);
            $(".quarter-circle").addClass("darkened");
            $("#strict-mode").prop("disabled", false);
            $("#round-num").text("00");
            powerOn = false;
            readySoundMaker();
        }
    });
});