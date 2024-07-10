app.controller('PokemonController', ['$scope', 'PokemonService', function($scope, PokemonService) {
    $scope.searchText = '';
    $scope.pokemons = [];
    $scope.filteredPokemons = [];
    $scope.selectedPokemon = null;
    $scope.pokemonSummary = {};
    
    $scope.currentPage = 1;
    $scope.itemsPerPage = 10;

    // Obtener la lista de Pokémon
    PokemonService.getPokemons().then(function(response) {
        $scope.pokemons = response.data.results;
        $scope.filterPokemons();
        $scope.generateSummary();
    });

    // Filtrar los Pokémon según el texto ingresado y manejar paginación
    $scope.filterPokemons = function() {
        let filtered = $scope.pokemons.filter(pokemon => 
            pokemon.name.toLowerCase().includes($scope.searchText.toLowerCase())
        );
        $scope.filteredPokemons = filtered.slice(
            ($scope.currentPage - 1) * $scope.itemsPerPage, 
            $scope.currentPage * $scope.itemsPerPage
        );
        $scope.totalPages = Math.ceil(filtered.length / $scope.itemsPerPage);
    };

    // Seleccionar un Pokémon y obtener su información detallada
    $scope.selectPokemon = function(pokemon) {
        PokemonService.getPokemonDetails(pokemon.name).then(function(response) {
            $scope.selectedPokemon = response.data;
        });
    };

    // Generar el resumen de Pokémon por letra inicial
    $scope.generateSummary = function() {
        let summary = {};
        $scope.pokemons.forEach(pokemon => {
            let initial = pokemon.name.charAt(0).toUpperCase();
            summary[initial] = summary[initial] ? summary[initial] + 1 : 1;
        });
        $scope.pokemonSummary = summary;
    };

    // Cambiar de página
    $scope.changePage = function(page) {
        if (page < 1 || page > $scope.totalPages) return;
        $scope.currentPage = page;
        $scope.filterPokemons();
    };
}]);
