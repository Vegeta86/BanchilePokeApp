app.service('PokemonService', ['$http', function($http) {
    this.getPokemons = function() {
        return $http.get('https://pokeapi.co/api/v2/pokemon?limit=1000'); // Ajusta el límite según tus necesidades
    };

    this.getPokemonDetails = function(name) {
        return $http.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    };

    this.searchPokemons = function(searchText) {
        return this.getPokemons().then(response => {
            return response.data.results.filter(pokemon => pokemon.name.includes(searchText.toLowerCase()));
        });
    };
}]);
