let isStrictMode = false;

$(document).ready(() => {

    $("#strict-mode").on("click", () => {
        if (!isStrictMode) {
            $("#strict-mode span").text("On");
            $("#strict-mode").css("left", "21.5%");
            isStrictMode = true;
        } else {
            $("#strict-mode span").text("Off");
            $("#strict-mode").css("left", "20.5%");
            isStrictMode = false;
        }
    });

});

// Pitch to Frequency Mappings
// B4 494
// G4 392
// E4 330
// C4 262