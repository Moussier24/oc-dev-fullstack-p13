package com.example.chat.service;

import com.example.chat.model.ChatMessage;
import com.example.chat.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class ChatService {

    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    public void sendPreviousMessages(String username) {
        List<ChatMessage> lastMessages = chatMessageRepository.findTop10ByOrderByTimestampDesc();
        Collections.reverse(lastMessages); // Inverse l'ordre pour avoir du plus ancien au plus récent

        // Envoie tous les messages précédents en une seule fois
        messagingTemplate.convertAndSendToUser(
                username,
                "/queue/history",
                lastMessages);
    }

    public ChatMessage saveMessage(ChatMessage message) {
        return chatMessageRepository.save(message);
    }
}