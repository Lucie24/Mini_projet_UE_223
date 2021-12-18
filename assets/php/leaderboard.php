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

	$requete = $bdd->query('SELECT * FROM joueur');

	// tableau contenant les données de la BDD
	$_joueurs = array();

	// parcourir la BDD pour remplir ce tableau
	while ($data = $requete->fetch()) {

		if (!$data) {

			echo 'La liste des joueurs n\'existe pas ou est vide';
			break;

		} else {

			$_joueur = array(
				'id_joueur' => $data['id_joueur'],
				'nom_joueur' => $data['nom_joueur'],
				'meilleur_score' => $data['meilleur_score']
			);

			array_push($_joueurs, $_joueur);

		}

	}

	// définit les colonnes du tableau
	$id_joueur  = array_column($_joueurs, 'id_joueur');
	$nom_joueur = array_column($_joueurs, 'nom_joueur');
	$meilleur_score = array_column($_joueurs, 'meilleur_score');

	// trie les données par meilleur score décroissant, id croissant
	array_multisort($meilleur_score, SORT_DESC, $id_joueur, SORT_ASC, $_joueurs);

	// tableau du leaderboard final
	$_leaderboard = array();

	// remplir ce tableau avec les données des 3 meilleurs joueurs
	for ($i = 0; $i < 3; $i++) {
		array_push($_leaderboard, $_joueurs[$i]);
	}

	// la réponse JSON de la requête AJAX est le leaderboard
	echo json_encode($_leaderboard);

?>