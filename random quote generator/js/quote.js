var social;

function getQuote() {
    $.ajax({
        headers: {
            "X-Mashape-Key": "dZR8KdopjqmshrB1RpbMfheH9daIp1q2ujPjsnjyUh13vRrlDS",
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        url: "https://andruxnet-random-famous-quotes.p.mashape.com/?cat=movies",
        success: function(data) {
            var quot = JSON.parse(data);
            //console.log(quot);
            movQuote = quot.quote;
            movAuthor = quot.author;
            //console.log(movQuote);
            //console.log(movAuthor);
            $(".quote").html(movQuote);
            $(".author").html(movAuthor);
        }

    });
}


$(document).ready(function() {

    getQuote();
    $("#quotRand").on("click", getQuote);
    $("#quotShare").on("click", function() {
        getQuote();
        social = window.open('https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + movQuote + '" ' + movAuthor));
    });

});