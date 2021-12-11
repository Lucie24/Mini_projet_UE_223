/**
 * On attend que le DOM soit totalement chargé
 */
 document.addEventListener("DOMContentLoaded", function() {


    /*
    Je commente le code demain, la il est 3h je suis mort
    */

    var form = document.getElementById('home'); 

    var tabGame = {
        "facile" : {
           "class" : "puzzle_grid_1",
           "nbr_grid" : 9
        },
        "moyen" : {
            "class" : "puzzle_grid_2",
            "nbr_grid" : 16
        },
        "difficile" : {
            "class" : "puzzle_grid_3",
            "nbr_grid" : 25
        }
    }

    form.addEventListener('submit', function(e){    
        clickVerifForm(e);
    }, false);


    function clickVerifForm(e){
        e.preventDefault();

        var name_player = document.getElementById('name_player').value;

        var difficulty = form.querySelector('select');
        var difficulty_valeur = difficulty.options[difficulty.selectedIndex].value;

        document.getElementById('home').remove();

        var article = document.getElementById('article');
        var section_game = document.createElement("SECTION");
        article.appendChild(section_game);
        section_game.setAttribute("id", "game");

        var header_game = document.createElement("HEADER");
        section_game.appendChild(header_game);
        header_game.setAttribute("id", "header_game");

        var h1 = document.createElement("H1");
        header_game.appendChild(h1);

        var header_game_id = document.getElementById("header_game");
        var title_header_game = header_game_id.querySelector("h1");
        title_header_game.innerText = "Bonne chance "+name_player+" !";

        var div_puzzle_game = document.createElement("DIV");
        section_game.appendChild(div_puzzle_game);
        div_puzzle_game.setAttribute("class", "puzzle");

        var div_grid_puzzle_game = document.createElement("DIV");
        div_puzzle_game.appendChild(div_grid_puzzle_game);
        div_grid_puzzle_game.setAttribute("class", "puzzle_grid "+tabGame[difficulty_valeur]["class"]);

        for (let i = 0; i < tabGame[difficulty_valeur]["nbr_grid"]; i++) {
            var div_puzzle_grid_piece_game = document.createElement("DIV");
            div_grid_puzzle_game.appendChild(div_puzzle_grid_piece_game);
            div_puzzle_grid_piece_game.setAttribute("class", "puzzle_grid_piece");
        }

        var div_valid_game = document.createElement("DIV");
        div_puzzle_game.appendChild(div_valid_game);
        div_valid_game.setAttribute("class", "valid");

        var input_valid_game = document.createElement("INPUT");
        div_valid_game.appendChild(input_valid_game);
        input_valid_game.setAttribute("type", "submit");
        input_valid_game.setAttribute("name", "valid");
        input_valid_game.setAttribute("value", "Valider");
        input_valid_game.setAttribute("class", "puzzle_validation_btn");

    }

});