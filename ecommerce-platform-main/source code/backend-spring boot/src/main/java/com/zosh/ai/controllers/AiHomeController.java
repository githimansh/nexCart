package com.zosh.ai.controllers;

import com.zosh.response.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ai")
public class AiHomeController {

    @GetMapping
    public ResponseEntity<ApiResponse> home() {

        ApiResponse response = new ApiResponse(
                "🤖 NexCart AI Service is Running Successfully",
                true
        );

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(response);
    }

}