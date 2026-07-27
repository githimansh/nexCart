package com.zosh.ai.controllers;

import com.zosh.ai.services.AiChatBotService;
import com.zosh.model.User;
import com.zosh.request.Prompt;
import com.zosh.response.ApiResponse;
import com.zosh.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/ai/chat")
@CrossOrigin(origins = "*")
public class AiChatBotController {

    private final AiChatBotService aiChatBotService;
    private final UserService userService;

    @PostMapping
    public ResponseEntity<ApiResponse> generate(
            @RequestBody Prompt prompt,
            @RequestParam(required = false) Long productId,
            @RequestHeader(value = "Authorization", required = false) String jwt
    ) throws Exception {

        String message = prompt.getPrompt();

        Long userId = null;

        if (jwt != null && !jwt.isBlank()) {
            User user = userService.findUserProfileByJwt(jwt);
            if (user != null) {
                userId = user.getId();
            }
        }

        ApiResponse response = aiChatBotService.aiChatBot(
                message,
                productId,
                userId
        );

        return ResponseEntity.ok(response);
    }
}