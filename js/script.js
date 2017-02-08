let isStrictMode = false;

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

});

// Pitch to Frequency Mappings
// B4 494
// G4 392
// E4 330
// C4 262