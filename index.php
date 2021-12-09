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
      <link rel="stylesheet" href="assets/css/style.css">
      <script src="assets/js/script.js"></script>
      <title>Document</title>
  </head>
  <body>
    <main>
        <article>
            <section class="home">
                <header class="puzzle_game_logo">
                    <h1>- Puzzle Game -</h1>
                </header>
                <form class="id_player" action="index.php" method="post">
                    <label for="name_player">Nom du joueur</label>
                    <input id="name_player" type="text" name="name_player" value="" placeholder="Votre nom">

                    <label for="difficulty">Difficulté</label>
                    <select name="difficulty" id="difficulty">
                    <option value="facile" selected="selected">Facile</option>
                    <option value="moyen">Moyen</option>
                    <option value="difficile">Difficile</option>
                    </select>
                    <div class="start">
                    <button type="button" name="jouer">Jouer</button>
                    </div>
                </form>
            </section>

            <section>
                
            </section>

            <section>
                
            </section>
        </article>

        <footer>
            
        </footer>
    </main>

    <aside>

    </aside>

  </body>
</html>
