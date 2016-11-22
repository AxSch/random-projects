var currentPokemon = '';

var region = $.ajax({
    url: 'http://pokeapi.co/api/v2/generation/1/',
    dataType: 'json',
    method: 'GET',
    /*success: function(data) {
        var pokeArr = $.map(data, function(value, index) {
            return [value];
           
        });
    }*/

});

console.log(region);




/*$("#pokeTest").on("click", function(json) {
    $.getJSON('http://pokeapi.co/api/v2/generation/1/', function(json) {
        $(".pokeDescript").html(JSON.stringify(json));
    });
});*/