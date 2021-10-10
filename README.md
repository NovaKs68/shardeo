# shardeo

## Installation
 
 ### Dev
 
 Pour le développement il faut lancer :  
 `sudo docker-compose -f docker-compose-dev.yml up --build`  
 Suite à ça le back, le front et la BDD vont se lancer.
 
 ### Prod

Pour la production il faut lancer :  
`sudo docker-compose up --build`

## Technologies 

Tout le projet est conteneurisé avec Docker.  
Ces conteneurs sont reliés par Docker-compose.

##### Le Back
Le Backend est fait en NodeJs. Avec comme template Express.

##### Le Front
Le Frontend est en Angular. 

##### La BDD
La base de données en mariadb. Et comme exploiteur graphique, adminer.
