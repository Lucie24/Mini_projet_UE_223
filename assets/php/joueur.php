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

	// tableaux contenant les données de la BDD
	$_ids = array();
	$_noms_joueurs = array();
	$_meilleurs_scores = array();

	// parcourir la BDD pour remplir ces tableaux
	while ($data = $requete->fetch()) {

		if (!$data) {

			echo 'La liste des joueurs n\'existe pas ou est vide';
			break;

		} else {

			array_push($_ids, $data['id_joueur']);
			array_push($_noms_joueurs, $data['nom_joueur']);
			array_push($_meilleurs_scores, $data['meilleur_score']);

		}

	}

	// vérification des données saisies
	if (!empty($_POST)) {

		if (array_key_exists('name', $_POST)) {

			// on décode le nom du joueur envoyé ici en JSON par la requête AJAX
			$name = json_decode($_POST['name']);

			if (is_string($name)) {

				$i = 0;
				$existe = false;

				// vérification que le nom du joueur n'est pas déjà existant en BDD
				while ($i < count($_noms_joueurs) && $existe === false) {

					if ($_noms_joueurs[$i] === $name) {

						// s'il existe déjà on définit ses données (pour un futur affichage, etc)
						$existe = true;
						$id_joueur = $_ids[$i];
						$nom_joueur = $_noms_joueurs[$i];
						$meilleur_score = $_meilleurs_scores[$i];

					}

					$i++;

				}

				if ($existe === false) {

					// on crée un nouveau joueur avec ce nom et un meilleur score de 0 dans la BDD
					// on définit ses données aussi
					$bdd->exec('INSERT INTO joueur (nom_joueur, meilleur_score) VALUES ("'.$name.'", "0")');
					$id_joueur = $bdd->query('SELECT LAST_INSERT_ID()')->fetchColumn();
					$nom_joueur = $name;
					$meilleur_score = 0;

				}

			} else {

				echo 'Le nom n\'est pas une chaîne de caractères';

			}

		} else {

			echo 'Le nom est introuvable dans les données envoyées';

		}

	} else {

		echo 'Aucune donnée n\'a été envoyée';

	}

	// les données de la réponse AJAX
	$donnees_joueur = array(
		"id_joueur" => $id_joueur,
		"nom_joueur" => $nom_joueur,
		"meilleur_score" => $meilleur_score
	);

	echo json_encode($donnees_joueur);

?>