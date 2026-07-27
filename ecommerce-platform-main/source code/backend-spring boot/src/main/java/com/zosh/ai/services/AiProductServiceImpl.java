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
public class AiProductServiceImpl implements AiProductService {

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
    @Override
    public String generateSearchKeyword(String prompt) {

        try {

            String aiPrompt = """
                You are an AI product search assistant.

                Convert the user's sentence into ONLY the product search keyword.

                Rules:
                - Return only keyword.
                - Remove words like:
                  mujhe, dikhao, show me, please, search, find, buy.
                - Keep product name, brand, category and color.
                - Do not explain anything.

                Examples:

                Input: Mujhe black tshirt dikhao
                Output: black t-shirt

                Input: Show me gaming laptop
                Output: gaming laptop

                Input: Nike shoes under 3000
                Output: nike shoes

                User Input:
                """ + prompt;

            HttpHeaders headers = getHeaders();

            Map<String, Object> body = createRequestBody(aiPrompt);

            HttpEntity<Map<String, Object>> request =
                    new HttpEntity<>(body, headers);

            ResponseEntity<String> response =
                    restTemplate.exchange(
                            apiUrl,
                            HttpMethod.POST,
                            request,
                            String.class
                    );

            String keyword = parseGroqResponse(response.getBody());

            return keyword
                    .replace("\"", "")
                    .replace("\n", "")
                    .trim();

        } catch (Exception e) {

            e.printStackTrace();

            return prompt;

        }
    }

    private Map<String, Object> createRequestBody(String prompt) {

        Map<String, Object> body = new HashMap<>();

        body.put("model", model);

        List<Map<String, String>> messages = new ArrayList<>();

        messages.add(
                Map.of(
                        "role",
                        "system",
                        "content",
                        """
                                You are NexCart AI Product Assistant.
                                
                                Your responsibilities:
                                
                                - Generate attractive product descriptions.
                                - Generate SEO friendly content.
                                - Generate product highlights.
                                - Generate bullet points.
                                - Keep the response professional.
                                - Do not generate fake specifications.
                                - Use simple English.
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

        body.put("messages", messages);

        body.put("temperature", 0.6);

        body.put("max_tokens", 700);

        return body;
    }

    private String parseGroqResponse(String responseBody) throws Exception {

        JsonNode jsonNode = mapper.readTree(responseBody);

        return jsonNode
                .path("choices")
                .path(0)
                .path("message")
                .path("content")
                .asText("Unable to generate response.");
    }

    @Override
    public String simpleChat(String prompt) {

        try {

            HttpHeaders headers = getHeaders();

            Map<String, Object> body = createRequestBody(prompt);

            HttpEntity<Map<String, Object>> request =
                    new HttpEntity<>(body, headers);

            ResponseEntity<String> response =
                    restTemplate.exchange(
                            apiUrl,
                            HttpMethod.POST,
                            request,
                            String.class
                    );

            return parseGroqResponse(response.getBody());

        } catch (Exception e) {

            e.printStackTrace();

            return "Sorry, AI service is currently unavailable. Please try again later.";

        }
    }
}