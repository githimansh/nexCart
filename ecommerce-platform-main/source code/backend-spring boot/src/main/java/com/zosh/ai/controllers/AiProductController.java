package com.zosh.ai.controllers;

import com.zosh.ai.services.AiProductService;
import com.zosh.request.Prompt;
import com.zosh.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ai")
@RequiredArgsConstructor
public class AiProductController {

    private final AiProductService productService;

    @PostMapping("/chat/demo")
    public ApiResponse generate(
            @RequestParam(
                    value = "message",
                    defaultValue = "Tell me a joke"
            ) String message) {

        String answer = productService.simpleChat(message);

        return new ApiResponse(answer, true);
    }

    @PostMapping("/search-query")
    public ApiResponse searchQuery(@RequestBody Prompt prompt) {

        String keyword = productService.generateSearchKeyword(prompt.getPrompt());

        return new ApiResponse(keyword, true);
    }

}