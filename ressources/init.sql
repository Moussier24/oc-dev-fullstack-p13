-- Création de la base de données si elle n'existe pas
CREATE DATABASE IF NOT EXISTS chat_db;
USE chat_db;
-- Suppression de la table si elle existe déjà
DROP TABLE IF EXISTS messages;
-- Création de la table messages
CREATE TABLE messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    content TEXT NOT NULL,
    sender VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    timestamp VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
-- Insertion de quelques messages de test
INSERT INTO messages (content, sender, type, timestamp)
VALUES (
        'Bienvenue dans le chat !',
        'System',
        'CHAT',
        '2024-01-16T10:00:00.000Z'
    ),
    (
        'Comment puis-je vous aider ?',
        'Support',
        'CHAT',
        '2024-01-16T10:01:00.000Z'
    );
-- Création d'un index sur le timestamp pour optimiser les recherches par date
CREATE INDEX idx_messages_timestamp ON messages(timestamp);
-- Ajout des privilèges nécessaires
GRANT ALL PRIVILEGES ON chat_db.* TO 'root' @'localhost';
FLUSH PRIVILEGES;