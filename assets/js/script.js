/**
 * On attend que le DOM soit totalement chargé
 */
 $(document).ready(function() {

    // création d'un tableau multidimensionnel associatif pour les données de difficulté
    var tabGame = {
        "facile" : {
           "class" : "puzzle_grid_1",
           "nbr_grid" : 9,
           "files" : "assets/img/puzzle/3x3/"
        },
        "moyen" : {
            "class" : "puzzle_grid_2",
            "nbr_grid" : 16,
            "files" : "assets/img/puzzle/4x4/"
        },
        "difficile" : {
            "class" : "puzzle_grid_3",
            "nbr_grid" : 25,
            "files" : "assets/img/puzzle/5x5/"
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

    // Listener pour le submit du formulaire contenu dans le section d'id home
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

        // requête AJAX vers envoi.php en vue d'envoyer le nom du joueur en BDD
        // puis récupérer les données du joueur
        $.ajax({

            type: 'POST',
            url: 'assets/php/envoi.php',
            data: {name: JSON.stringify(name_player_value)},
            dataType: 'json'

        }).done(function(data) {

            // récupère les données du joueur de la réponse JSON
            var id_joueur = data.id_joueur;
            var nom_joueur = data.nom_joueur;
            var meilleur_score = data.meilleur_score;

            // du form récupère la valeur du select qui est sélectionné (soit la difficulte selectionne par le joueur)
            var difficulty_valeur = $("#home select option:selected").val();

            // supprime l'element du DOM d'id "home" avec la methode remove (soit toute la zone du formulaire de parametrage du jeu)
            $('#home').remove();

            /*********************************/

            // appel un element du DOM avec pour id article
            var article = $('#article');

            /*********************************/

            // création de la page de jeu
            init_game(name_player_value, difficulty_valeur, article, id_joueur, nom_joueur, meilleur_score);

        });

    }

    function init_game(name_player_value, difficulty_valeur, article, id_joueur, nom_joueur, meilleur_score) {
        // creation d'une balise "section" dans le document
        var section_game = $("<section id='game'></section>");
        // ajout de cette balise "section" dans l'element article
        article.append(section_game);

        var div_puzzle_pieces = $("<div id='puzzle-pieces'></div>");
        section_game.append(div_puzzle_pieces);

        /**
         * Les lignes qui suivent font plus ou moins la meme chose que les deux lignes au-dessus.
         * L'objectif est de créer une nouvelle arborescence HTML
         */

        var header_game = $("<header id='header_game'></header>");
        section_game.append(header_game);

        header_game.append("<h1>À vous de jouer "+name_player_value+" !</h1>");

        var div_puzzle_game = $("<div class='puzzle'></div>");
        section_game.append(div_puzzle_game);

        div_puzzle_game.append("<p>ID : #"+id_joueur+" | Joueur : "+nom_joueur+" | Meilleur score : "+meilleur_score);

        var div_grid_puzzle_game = $("<div class='puzzle_grid "+tabGame[difficulty_valeur]["class"]+"'></div>");
        div_puzzle_game.append(div_grid_puzzle_game);

        // en fonction du nombre de cases défini ici : tabGame[difficulty_valeur]["nbr_grid"]. Creation de plusieurs div
        for (let i = 0; i < tabGame[difficulty_valeur]["nbr_grid"]; i++) {
            div_grid_puzzle_game.append("<div class='puzzle_grid_piece'></div>");
        }

        var div_valid_game = $("<div class='valid'></div>");
        div_puzzle_game.append(div_valid_game);

        // le bouton de validation du puzzle
        div_valid_game.append("<input type='button' name='valid' value='Valider' id='puzzle_validation_btn' />");

        /* Début du code pour les pièces */

        for (let i = 0; i < tabGame[difficulty_valeur]["nbr_grid"]; i++) {
            var div_piece = $("<div class='piece' draggable='true' style='background : center / contain no-repeat url("+tabGame[difficulty_valeur]["files"]+i+".png);'></div>");
            div_puzzle_pieces.append(div_piece);
        }
    
        
        var $el1 = $('.piece');
        var $el2 = $('.puzzle_grid_piece');
        

        var $el6 = null;
        $el1.on('dragstart', function(){
            
            $(this).attr("class", "piece style-piece");

            $el6 = this;

            setTimeout(() => {
                $(this).attr("class", "invisible");
            }, 0)

        });

        $el1.on('dragend', function(){
            $(this).attr("class", 'piece');
        });


        var index = null;
        for (const vide of $el2) {



            $(vide).on('dragover', function(e) {
                e.preventDefault();
            });
            
            $(vide).on('dragenter', function(e) {
                e.preventDefault();
            });
            

            $(vide).on('drop', function() {

                index = ($(vide).index());

                if ($($el2)[index].children.length == 1) {
                    console.log('La pièce est déjà la');
                    return false;
                }
                else {
                    console.log('On ajoute la pièce')
                    this.append($el6);
                }

                console.log($($el2)[0].children.length == 0)

                console.log(index)




            });


        }

        // Listener pour le bouton contenu dans le section d'id game
        $('#puzzle_validation_btn').on('click', function(e){
            // fonction au moment où le bouton est cliqué
            clickVerifValider(e, name_player_value);
            return false;
        });
    }



    function clickVerifValider(e, name_player_value){
        e.preventDefault();

        // /*********************************/
        // appel un element du DOM avec pour id article
        var article = $('#article');

        // supprime l'element du DOM d'id "game" avec la methode remove (soit toute la zone du formulaire de parametrage du jeu)
        $('#game').remove();
        // création de la page de victoire
        init_win(article, name_player_value);

    }

    function init_win(article, name_player_value){
        // creation d'une balise "section" dans le document
        var section_resultat = $("<section id='results'></section>");
        // ajout de cette balise "section" dans l'element article
        article.append(section_resultat);

        /**
         * Les lignes qui suivent font plus ou moins la meme chose que les deux lignes au-dessus.
         * L'objectif est de créer une nouvelle arborescence HTML
         */

        var header_win = $("<header id='header_win'></header>");
        section_resultat.append(header_win);

        header_win.append("<h1>Félicitations " +name_player_value+ " !</h1>");

        var div_container = $("<div class='container'></div>");
        section_resultat.append(div_container);

        //TODO mettre une div pour les tableaux ici

        var div_buttons = $("<div class='buttons'></div>");
        div_container.append(div_buttons);

        var div_retry = $("<div class='retry'></div>");
        div_buttons.append(div_retry);

        div_retry.append("<input type='button' name='retry' value='Rejouer' id='retry_btn' />");

        var div_menu = $("<div class='menu'></div>");
        div_buttons.append(div_menu);

        div_menu.append("<input type='button' name='valid' value='Accueil' id='menu_btn' action='index.php'/>");
    }

    // Listener pour le bouton contenu dans le section d'id results
    $('#results').on('click', function(e){
        // fonction au moment où le formulaire est bouton
        clickVerifRejouer(e);
        return false;
    });

    function clickVerifRejouer(e){
        e.preventDefault();

        // supprime l'element du DOM d'id "results" avec la methode remove (soit toute la zone du formulaire de parametrage du jeu)
        $('#results').remove();

        // création de la page de jeu
        init_game();
        div_valid_game.append("<input type='submit' name='valid' value='Valider' id='puzzle_validation_btn' />");


    }

});
