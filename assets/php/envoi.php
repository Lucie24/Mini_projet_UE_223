<?php

    ini_set('display_errors', 'Off');
    ini_set('log_errors', 'On');
    ini_set('error_log', dirname(__file__).'log.txt');
	
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

	// on décode le nom du joueur envoyé ici en JSON par la requête AJAX
	$name = json_decode($_POST['name']);

	// on crée un nouveau joueur avec ce nom et un meilleur score de 0 dans la BDD
	$bdd->exec('INSERT INTO joueur (nom_joueur, meilleur_score) VALUES ("'.$name.'", "0")');

	// TODO : faire les vérifs nécessaires pour ne pas le créer dans la BDD dans les cas suivants
	// - si le joueur a saisi de la merde = erreur
	// - si le nom existe déjà en BDD = partons du principe que c'est lui et récupérer ses infos par 
	// 		SQL (surtout pour exploiter son meilleur score existant par la suite)
	// sinon bah effectivement le créer avec un meilleur score de 0 comme ce qui est déjà en place

	// TODO : SQL pour remplacer le meilleur score du joueur dans la BDD par son nouveau score 
	// seulement s'il est plus élevé
	// (et donc une autre requête ajax dans le script, déclenchée par un événement à la fin du jeu
	// pour récupérer le nouveau score)

?>