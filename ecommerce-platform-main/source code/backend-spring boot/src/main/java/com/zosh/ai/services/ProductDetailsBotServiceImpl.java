package com.zosh.ai.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@RequiredArgsConstructor
public class ProductDetailsBotServiceImpl implements ProductDetailsBotService {

    @Value("${groq.api.key}")
    private String apiKey;

    @Value("${groq.api.url}")
    private String apiUrl;

    @Value("${groq.model}")
    private String model;

    private final RestTemplate restTemplate = new RestTemplate();

    private final ObjectMapper mapper = new ObjectMapper();
    private HttpHeaders getHeaders() {

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_JSON);

        headers.setBearerAuth(apiKey);

        return headers;
    }

    private Map<String,Object> createRequestBody(String prompt){

        Map<String,Object> body=new HashMap<>();

        body.put("model",model);

        List<Map<String,String>> messages=new ArrayList<>();

        messages.add(
                Map.of(
                        "role",
                        "system",
                        "content",
                        """
                        You are NexCart Product Expert.
    
                        Explain products professionally.
    
                        Always answer in this format:
    
                        Product Summary
    
                        Key Features
    
                        Advantages
    
                        Disadvantages
    
                        Best For
    
                        Recommendation
    
                        Keep answers short and professional.
                        """
                )
        );

        messages.add(
                Map.of(
                        "role",
                        "user", "content",
                        prompt
                )
        );

        body.put("messages",messages);

        body.put("temperature",0.5);

        body.put("max_tokens",800);

        return body;
    }
    private String parseResponse(String body) throws Exception{

        JsonNode jsonNode=mapper.readTree(body);

        return jsonNode
                .path("choices")
                .path(0)
                .path("message")
                .path("content")
                .asText("Unable to generate response.");
    }
    @Override
    public String productDetailsChatBot(String prompt) {

        try{

            HttpHeaders headers=getHeaders();

            Map<String,Object> body=createRequestBody(prompt);

            HttpEntity<Map<String,Object>> entity=
                    new HttpEntity<>(body,headers);

            ResponseEntity<String> response=
                    restTemplate.exchange(
                            apiUrl,
                            HttpMethod.POST,
                            entity,
                            String.class
                    );

            return parseResponse(response.getBody());

        }catch (Exception e){

            e.printStackTrace();

            return "Unable to generate AI response.";

        }

    }
}