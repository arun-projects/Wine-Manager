$(document).ready(function() {

  var ENDPOINT_URL = "your url here";

  // Create Handlebars template
  var wineTemplate = Handlebars.compile($("#wine-template").html());

  // Cache the #wine-container selector for later use
  var $wineContainer = $("#wine-container");

  function getWines() {
    $.ajax({
      type: "GET",
      url: ENDPOINT_URL,
      success: function(wines) {
        wines.forEach(function(wine) {
          $wineContainer.append(wineTemplate(wine));
        });
      },
      error: function() {
        alert("Something went wrong...");
      }
    });
  }

  // Initial get wines on page load
  getWines();

  $("#new-wine-form").on("submit", function(event) {
    event.preventDefault();

    var formData = {
      name: $("input[name='name']").val(),
      year: $("input[name='year']").val(),
      grapes: $("input[name='grapes']").val(),
      country: $("input[name='country']").val(),
      region: $("input[name='region']").val(),
      price: $("input[name='price']").val(),
      picture: $("input[name='picture']").val(),
      description: $("textarea[name='description']").val()
    }

    $.ajax({
      type: "POST",
      url: ENDPOINT_URL,
      data: formData,
      success: function() {
        // Close the modal
        $("#add-wine-modal").modal("hide");

        // Clear the new wine form
        $("#new-wine-form")[0].reset();

        // Get all wines again to refresh view
        getWines();
      },
      error: function() {
        alert("Something went wrong...");
      }
    });
  });

});
