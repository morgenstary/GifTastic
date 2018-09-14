var foods = ['pancakes', 'pizza', 'hotdogs', 'taco', 'sushi', 'doughnut', 'pasta', 'bacon', 'cheeseburger', 'sandwich'];
    
        function buildButtons() {
            $("#food-selector").empty();
            for (var i = 0; i < foods.length; i++) {
                var foodButton = $("<button class='foodItem'>").html(foods[i]);
                $("#food-selector").append(foodButton);
            }
        }

        $("#add-food").on('click', function() {
           event.preventDefault();
           $("#message").text("");
           var userFood = $("#food").val();
           if (userFood.length > 0 && foods.indexOf(userFood) === -1) {
                foods.push(userFood); 
                buildButtons();
           } else {
               $("#message").text("You did not enter an item or the item you selected already has a button.");
           }
           $("#food").val("");
        });

        $('#food-selector').on('click', '.foodItem', function(){
            $("#message").text("");
            var food = $(this).text();

            $.get({
                url: "https://api.giphy.com/v1/gifs/search?q=" + food + "&api_key=dc6zaTOxFJmzC&limit=10g",
                success: function (result) {
                    var data = result.data;
                    for (var i = 0; i < data.length; i++) {
                        var gifObject = data[i];
                        var imageDiv = $("<div>");
                        var rating = gifObject.ratings;
                        var pRating = $("<p>").text("Rating: " + data[i].rating);
                        var gifURLStill = gifObject.images.fixed_height_still.url;
                        var gifURLAnimated = gifObject.images.fixed_height.url;
                        var imageTag = $("<img>");
                        imageTag.attr("src", gifURLStill);
                        imageTag.attr("data-still", gifURLStill);
                        imageTag.attr("data-animated", gifURLAnimated);
                        imageTag.attr("data-state", "still");
                        imageTag.addClass("giphyImg");
                        imageDiv.append(pRating);
                        imageDiv.append(imageTag);
                        $("#container").append(imageDiv);
                    }
                },
                error: function (error) {
                    console.log(error);
                }
            });
        });

        $("#container").on('click', '.giphyImg', function(){
            $("#message").text("");
            var state = $(this).attr("data-state");
            if (state === "still") {
                var animatedURL = $(this).attr("data-animated");
                $(this).attr("src", animatedURL);
                $(this).attr("data-state", "animated");
            } else {
                var stillURL = $(this).attr("data-still");
                $(this).attr("src", stillURL);
                $(this).attr("data-state", "still");
            }

        });


        buildButtons();