package com.zosh.ai.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.zosh.exception.ProductException;
import com.zosh.mapper.OrderMapper;
import com.zosh.mapper.ProductMapper;
import com.zosh.model.Cart;
import com.zosh.model.Order;
import com.zosh.model.Product;
import com.zosh.model.User;
import com.zosh.repository.CartRepository;
import com.zosh.repository.OrderRepository;
import com.zosh.repository.ProductRepository;
import com.zosh.repository.UserRepository;
import com.zosh.response.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AiChatBotServiceImpl implements AiChatBotService {

    @Value("${groq.api.key}")
    private String apiKey;

    @Value("${groq.api.url}")
    private String apiUrl;

    @Value("${groq.model}")
    private String model;

    private final CartRepository cartRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper mapper = new ObjectMapper();


    private String buildPrompt(String userPrompt, Long productId, Long userId)
            throws ProductException {

        StringBuilder prompt = new StringBuilder();

        prompt.append("""
                You are NexCart AI Shopping Assistant.
                
                Your responsibilities:
                - Help customers choose products.
                - Recommend better alternatives.
                - Explain product specifications.
                - Help with orders.
                - Help with cart.
                - Reply in short and professional language.
                - Never generate fake product information.
                """);

        if (userId != null) {

            User user = userRepository.findById(userId).orElse(null);

            if (user != null) {

                prompt.append("\n\nCustomer Details\n");
                prompt.append("Customer Name : ")
                        .append(user.getFullName())
                        .append("\n");

                Cart cart = cartRepository.findByUserId(userId);

                if (cart != null) {
                    prompt.append("Cart Information : ")
                            .append(cart.toString())
                            .append("\n");
                }

                List<Order> orders = orderRepository.findByUserId(userId);

                if (orders != null && !orders.isEmpty()) {

                    prompt.append("Previous Orders :\n");
                    prompt.append(OrderMapper.toOrderHistory(orders, user));

                }

            }

        }

        if (productId != null) {

            Product product = productRepository.findById(productId)
                    .orElseThrow(() ->
                            new ProductException("Product Not Found"));

            prompt.append("\n\nCurrent Product\n");
            prompt.append(ProductMapper.toProductDto(product));

        }

        prompt.append("\n\nCustomer Question : ");
        prompt.append(userPrompt);

        return prompt.toString();
    }

    private String extractErrorMessage(Exception exception) {

        String message = exception.getMessage();

        if (message == null || message.isBlank()) {
            return "Something went wrong while communicating with AI.";
        }

        return message;
    }

    private HttpHeaders getHeaders() {

        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_JSON);

        headers.setBearerAuth(apiKey);

        return headers;
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
                                You are NexCart AI Shopping Assistant.
                                
                                Rules:
                                - Reply in short.
                                - Be professional.
                                - Recommend products only if relevant.
                                - Never invent prices.
                                - Never invent order status.
                                - Use provided product and order information only.
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

        body.put("max_tokens", 800);

        return body;
    }

    private String parseGroqResponse(String responseBody) throws Exception {

        JsonNode jsonNode = mapper.readTree(responseBody);

        return jsonNode
                .path("choices")
                .path(0)
                .path("message")
                .path("content")
                .asText("Sorry, I couldn't generate a response.");
    }

    @Override
    public ApiResponse aiChatBot(String prompt,
                                 Long productId,
                                 Long userId) throws ProductException {

        try {

            String finalPrompt = buildPrompt(prompt, productId, userId);

            HttpHeaders headers = getHeaders();

            Map<String, Object> body = createRequestBody(finalPrompt);

            HttpEntity<Map<String, Object>> request =
                    new HttpEntity<>(body, headers);

            ResponseEntity<String> response =
                    restTemplate.exchange(
                            apiUrl,
                            HttpMethod.POST,
                            request,
                            String.class
                    );

            String answer = parseGroqResponse(response.getBody());

            return new ApiResponse(answer, true);

        } catch (Exception e) {

            e.printStackTrace();

            return new ApiResponse(
                    extractErrorMessage(e),
                    false
            );
        }
    }
}