# Application de Chat en Temps Réel

Cette application est composée d'un backend Spring Boot et d'un frontend Angular, permettant aux utilisateurs de communiquer en temps réel via WebSocket.

## Prérequis

- Java 17 ou supérieur
- Node.js et npm
- MySQL 8.0 ou supérieur
- Maven

## Configuration de la Base de Données

1. Assurez-vous que MySQL est installé et en cours d'exécution
2. Créez une base de données nommée `chat_db` :
3. Appliquer le script SQL dans le fichier `resources/init.sql`

3. Configurez les identifiants de la base de données dans `back/src/main/resources/application.properties` :
```properties
spring.datasource.username=root
spring.datasource.password=pwd
```

## Démarrage du Backend (Spring Boot)

1. Naviguez vers le dossier backend :
```bash
cd back
```

2. Compilez et démarrez l'application :
```bash
mvn clean install
mvn spring-boot:run
```

Le serveur backend démarrera sur `http://localhost:8080`

## Démarrage du Frontend (Angular)

1. Naviguez vers le dossier frontend :
```bash
cd front
```

2. Installez les dépendances :
```bash
npm install
```

3. Démarrez l'application :
```bash
ng serve
```

L'application frontend sera accessible sur `http://localhost:4200`

## Utilisation

1. Ouvrez votre navigateur et accédez à `http://localhost:4200`
2. Connectez-vous avec vos identifiants
3. Commencez à chatter !

## Notes Importantes

- Assurez-vous que les ports 8080 (backend) et 4200 (frontend) sont disponibles
- La base de données sera automatiquement mise à jour grâce à la configuration `spring.jpa.hibernate.ddl-auto=update`
- Les WebSockets sont configurés sur le chemin `/ws` 