/**
 * On attend que le DOM soit totalement chargé
 */
 document.addEventListener("DOMContentLoaded", function() {

    // appel d'un element du DOM
    var form = document.getElementById('home');

    // création d'un tableau multidimensionnel associatif pour les données de difficulté
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

    const Reg_exp = /^([A-Za-zÀ-ÖØ-öø-ÿ]{3,25})$/;

    // Listener pout le submit du formulaire contenu dans le section d'id home
    form.addEventListener('submit', function(e){
        // fonction au moment où le formulaire est submit
        clickVerifForm(e);
    }, false);


    function clickVerifForm(e){
        e.preventDefault();

        // récupère l'element DOM (input) d'id name_player
        var name_player = document.getElementById('name_player');
        // récupère la valeur du input d'id name_player (soit le nom du joueur renseigné dans le input)
        var name_player_value = document.getElementById('name_player').value;
        // test si la donnée (nom du joueur) respecte des conditions
        if (!Reg_exp.test(name_player_value)) {
            // place le focus sur l'input
            name_player.focus()
            // met une couleur de fond
            name_player.style.backgroundColor = "rgba(255, 0, 0, 0.1)";
            // défini la valeur de name_player en une chaine de caractere vide
            name_player.value = "";
            // modification du placeholder
            name_player.setAttribute("placeholder", "");
            // return false pour quitter la fonction en cours (clickVerifForm)
            return false;
        }


        // du form récupère la valeur du select qui est sélectionnée (soit la difficulte selectionne pas le joueur)
        var difficulty = form.querySelector('select');
        var difficulty_valeur = difficulty.options[difficulty.selectedIndex].value;

        // supprime l'element du DOM d'id "home" avec la methode remove (soit toute la zone du formulaire de parametrage du jeu)
        document.getElementById('home').remove();

        /*********************************/

        // appel un element du DOM avec pour id article
        var article = document.getElementById('article');

        /*********************************/

        // création de la page de jeu
        init_game(name_player_value, difficulty_valeur, article);

    }

    function init_game(name_player_value, difficulty_valeur, article) {
        // creation d'une balise "section" dans le document
        var section_game = document.createElement("SECTION");
        // ajout de cette balise "section" dans l'element article
        article.appendChild(section_game);
        // definition d'attribut avec le nom de l'attribut et son contenu
        section_game.setAttribute("id", "game");

        /**
         * Les lignes qui suivent font plus ou moins la meme chose que les trois lignes au-dessus.
         * L'ojectif est de créer une nouvelle arborescence HTML
         */

        var header_game = document.createElement("HEADER");
        section_game.appendChild(header_game);
        header_game.setAttribute("id", "header_game");

        var h1 = document.createElement("H1");
        header_game.appendChild(h1);

        var header_game_id = document.getElementById("header_game");
        var title_header_game = header_game_id.querySelector("h1");
        title_header_game.innerText = "Bonne chance "+name_player_value+" !";

        var div_puzzle_game = document.createElement("DIV");
        section_game.appendChild(div_puzzle_game);
        div_puzzle_game.setAttribute("class", "puzzle");

        var div_grid_puzzle_game = document.createElement("DIV");
        div_puzzle_game.appendChild(div_grid_puzzle_game);
        div_grid_puzzle_game.setAttribute("class", "puzzle_grid "+tabGame[difficulty_valeur]["class"]);

        // en fonction du nombre de défini ici : tabGame[difficulty_valeur]["nbr_grid"]. Creation de plusieurs div
        for (let i = 0; i < tabGame[difficulty_valeur]["nbr_grid"]; i++) {
            var div_puzzle_grid_piece_game = document.createElement("DIV");
            div_grid_puzzle_game.appendChild(div_puzzle_grid_piece_game);
            div_puzzle_grid_piece_game.setAttribute("class", "puzzle_grid_piece");
        }

        var div_valid_game = document.createElement("DIV");
        div_puzzle_game.appendChild(div_valid_game);
        div_valid_game.setAttribute("class", "valid");

        // le bouton de validation du puzzle
        var input_valid_game = document.createElement("INPUT");
        div_valid_game.appendChild(input_valid_game);
        input_valid_game.setAttribute("type", "submit");
        input_valid_game.setAttribute("name", "valid");
        input_valid_game.setAttribute("value", "Valider");
        input_valid_game.setAttribute("id", "puzzle_validation_btn");
    }

});
