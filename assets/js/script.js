/**
 * On attend que le DOM soit totalement chargé
 */
 $(document).ready(function() {

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

    // if ($("#difficulty option:selected").length)
    // {
    //   $("#difficulty").blur();
    // }
    //
    // // $("#difficulty").click(function()
    // // {
    // //   //$(this).style.borderRadius = "15px 15px 0 0";
    // //   $("#difficulty").css({border-radius : "25px"});
    // // });

    const Reg_exp = /^([A-Za-zÀ-ÖØ-öø-ÿ]{3,25})$/;

    // Listener pout le submit du formulaire contenu dans le section d'id home
    $('#home').on('submit', function(e){
        // fonction au moment où le formulaire est submit
        clickVerifForm(e);
        return false;
    });


    function clickVerifForm(e){
        e.preventDefault();

        // récupère l'element DOM (input) d'id name_player
        var name_player = $('#name_player');
        // récupère la valeur du input d'id name_player (soit le nom du joueur renseigné dans le input)
        var name_player_value = $('#name_player').val();
        // test si la donnée (nom du joueur) respecte des conditions
        if (!Reg_exp.test(name_player_value)) {
            // place le focus sur l'input
            name_player.focus();
            // met une couleur de fond
            name_player.css("background-color", "rgba(255, 0, 0, 0.1)");
            // définit la valeur de name_player en une chaine de caractere vide
            name_player.val("");
            // modification du placeholder
            name_player.attr("placeholder", "");
            // Envoi d'un message d'erreur dans le paragraphe dédié (en le vidant avant s'il contenait déjà un message)
            $(".id_player").first().css("padding", "1.83rem 6rem");
            $("#error_msg").html("");
            $("#error_msg").html("Seulement des lettres ! :) <br> De 3 à 25 caractères !");
            // return false pour quitter la fonction en cours (clickVerifForm)
            return false;
        }


        // du form récupère la valeur du select qui est sélectionné (soit la difficulte selectionne par le joueur)
        var difficulty_valeur = $("#home select option:selected").val();

        // supprime l'element du DOM d'id "home" avec la methode remove (soit toute la zone du formulaire de parametrage du jeu)
        $('#home').remove();

        /*********************************/

        // appel un element du DOM avec pour id article
        var article = $('#article');

        /*********************************/

        // création de la page de jeu
        init_game(name_player_value, difficulty_valeur, article);

    }

    function init_game(name_player_value, difficulty_valeur, article) {
        // creation d'une balise "section" dans le document
        var section_game = $("<section id='game'></section>");
        // ajout de cette balise "section" dans l'element article
        article.append(section_game);

        /**
         * Les lignes qui suivent font plus ou moins la meme chose que les deux lignes au-dessus.
         * L'objectif est de créer une nouvelle arborescence HTML
         */

        var header_game = $("<header id='header_game'></header>");
        section_game.append(header_game);

        header_game.append("<h1>À vous de jouer "+name_player_value+" !</h1>");

        var div_puzzle_game = $("<div class='puzzle'></div>");
        section_game.append(div_puzzle_game);

        var div_grid_puzzle_game = $("<div class='puzzle_grid "+tabGame[difficulty_valeur]["class"]+"'></div>");
        div_puzzle_game.append(div_grid_puzzle_game);

        // en fonction du nombre de cases défini ici : tabGame[difficulty_valeur]["nbr_grid"]. Creation de plusieurs div
        for (let i = 0; i < tabGame[difficulty_valeur]["nbr_grid"]; i++) {
            div_grid_puzzle_game.append("<div class='puzzle_grid_piece'></div>");
        }

        var div_valid_game = $("<div class='valid'></div>");
        div_puzzle_game.append(div_valid_game);

        // le bouton de validation du puzzle
        div_valid_game.append("<input type='submit' name='valid' value='Valider' id='puzzle_validation_btn' />");
    }

});