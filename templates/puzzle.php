<?php
    session_start();

    // fait à l'arrache, il manque les vérifs 
    $joueur = $_POST["name_player"];
    $niveau = $_POST["difficulty"];

    $display_1;
    $display_2;
    $display_3;

    // en gérant l'affichage des grilles avec display visible/none, on peut quand même toutes les voir dans le code...
    // on pourrait plutôt utiliser des "echo" avec cette structure conditionnelle et la coller directement dans la
    // section "puzzle" plus bas pour éviter ça, mais bon... à voir si quelqu'un a une autre idée !
    if ($niveau === "facile") {
        $display_1 = "visible";
        $display_2 = "none";
        $display_3 = "none";
    } else if ($niveau === "moyen") {
        $display_1 = "none";
        $display_2 = "visible";
        $display_3 = "none";
    } else if ($niveau === "difficile") {
        $display_1 = "none";
        $display_2 = "none";
        $display_3 = "visible";
    }
?>

<!DOCTYPE html>
<html lang="fr">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <!-- les auteurs de la page -->
      <meta name="author" content="Jean Baradat, Salomé Cliquennois, Lucie Dumas, Adélaïde Machon">
      <!-- Une petite description du site -->
      <meta name="description" content="Mini-jeu de puzzle">
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="../assets/css/style.css">
      <script src="../assets/js/script.js"></script>
      <title>Puzzle Game</title>
  </head>
  <body>
    <main>
        <article class="article">
            <section class="game">
                <header class="puzzle_game_logo">
                    <h1>Bonne chance <?php echo $joueur ?> !</h1>
                </header>
                <section class="puzzle">
                    <section class="puzzle_grid puzzle_grid_1" style="display: <?php echo $display_1; ?>">
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                    </section>
                    <section class="puzzle_grid puzzle_grid_2" style="display: <?php echo $display_2; ?>">
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                    </section>
                    <section class="puzzle_grid puzzle_grid_3" style="display: <?php echo $display_3; ?>">
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                        <div class="puzzle_grid_piece"></div>
                    </section>
                    <div class="valid">
                      <input type="submit" name="valid" value="Valider" class="puzzle_validation_btn">
                    </div>
                </section>
            </section>

            <section class="results">

            </section>
        </article>

        <footer>

        </footer>
    </main>

    <aside>

    </aside>

  </body>
</html>
