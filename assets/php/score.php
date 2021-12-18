<?php

    ini_set('display_errors', 'Off');
    ini_set('log_errors', 'On');
    ini_set('error_log', 'log.txt');
	
	// Parametres de connexion
	$serveur  = "localhost:3306";
	$database = "bdd_leaderboard";
	$user     = "bdd_leaderboard";
	$password = "ZsQZqUzxwzV0YXBC";
	
	try {	
		// Connexion a la base de donnees
		// $bdd est un objet correspondant a la connexion a la BDD
		$bdd = new PDO('mysql:host='.$serveur.';charset=utf8;dbname='.$database.'', $user, $password);
		
		/* La ligne ci-dessous permet d'activer les erreurs lors de la connexion a la BDD via PDO.
		Les messages d'erreur lie a des requetes SQL comportant des erreurs seront plus clairs. */
		[PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION];
	}
	catch(Exception $e) {
		// On lance une fonction PHP qui permet de connetre l'erreur renvoyee lors de la connection a la base (en recuperant le message lie a l'exception)
		die('<strong>Erreur détectée !!! </strong> : ' . $e->getMessage());
	}

	// vérification des données envoyées
	if (!empty($_POST)) {

		if (array_key_exists('id_joueur', $_POST) && array_key_exists('meilleur_score', $_POST)) {

			// on décode l'id et le meilleur score du joueur envoyés ici en JSON par la requête AJAX
			$id_joueur = json_decode($_POST['id_joueur']);
			$meilleur_score = json_decode($_POST['meilleur_score']);

			if (is_numeric($id_joueur) && is_numeric($meilleur_score)) {

				$bdd->exec('UPDATE joueur SET meilleur_score = "'.$meilleur_score.'" WHERE id_joueur = "'.$id_joueur.'"');

			} else {

				echo 'L\'ID du joueur et son meilleur score doivent être des nombres';

			}

		} else {

			echo 'Impossible de trouver l\'ID du joueur et/ou son meilleur score dans les données envoyées';

		}

	} else {

		echo 'Aucune donnée n\'a été envoyée';

	}

?>