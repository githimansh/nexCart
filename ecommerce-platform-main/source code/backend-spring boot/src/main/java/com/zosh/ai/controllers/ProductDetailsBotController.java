package com.zosh.ai.controllers;

import com.zosh.ai.services.ProductDetailsBotService;
import com.zosh.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ai/product")
@RequiredArgsConstructor
public class ProductDetailsBotController {

    private final ProductDetailsBotService productDetailsBotService;

    @PostMapping("/details")
    public ApiResponse productDetails(
            @RequestParam String prompt
    ) {

        String answer =
                productDetailsBotService.productDetailsChatBot(prompt);

        return new ApiResponse(answer, true);
    }
}