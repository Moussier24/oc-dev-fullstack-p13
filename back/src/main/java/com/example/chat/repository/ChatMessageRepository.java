package com.example.chat.repository;

import com.example.chat.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    // Récupère les 10 derniers messages, triés par timestamp décroissant
    List<ChatMessage> findTop10ByOrderByTimestampDesc();
}