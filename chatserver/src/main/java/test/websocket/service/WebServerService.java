package test.websocket.service;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import test.websocket.dto.ChatData;
import test.websocket.dto.CompanionChatDTO;

import java.util.List;

@Service
public class WebServerService {
    public Mono<List<ChatData>> getInCompleteNumbers() {
//        String url = "http://localhost:8080/companions/incomplete-numbers";
        String url = "https://955d-59-10-231-15.ngrok-free.app/companions/incomplete-numbers";
        WebClient webClient = WebClient.create();

        return webClient.get()
                .uri(url)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<>() {});
    }
}
