$(document).ready(() => {
    // Getting jQuery references to the post body, title, form, and author select
    var dateInput = $("#date");
    var cityInput = $("#city");
    var shapeInput = $("#shape");
    var durationInput = $("#duration");
    var summaryInput = $("#summary");
    var datePosted = $("#datePosted");

    // Adding an event listener for when the form is submitted
    $("#newUfo").on("submit", function (event) {
        event.preventDefault(event);
        console.log("hellooooo")

        // Constructing a newPost object to hand to the database
        var newPost = {
            date: dateInput
                .val(),
            city: cityInput
                .val(),
            shape: shapeInput
                .val(),
            duration: durationInput
                .val(),
            summary: summaryInput
                .val(),
            datePosted: datePosted
                .val()
        };
        submitPost(newPost);
    });

    // Submits a new post and brings user to blog page upon completion
    function submitPost(post) {
        $.post("/api/posts", post, function () {
            window.location.href = "/sightings";
        });
    }
});
