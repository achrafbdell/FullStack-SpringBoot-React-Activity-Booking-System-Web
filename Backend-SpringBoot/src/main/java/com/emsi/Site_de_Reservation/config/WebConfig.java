package com.emsi.Site_de_Reservation.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000") // Autoriser les requêtes provenant de ce domaine
                .allowedMethods("POST", "GET", "PUT", "DELETE") // Autoriser les méthodes HTTP
                .allowCredentials(true) // Autoriser les cookies, les autorisations, etc.
                .allowedHeaders("*"); // Autoriser tous les en-têtes
    }
}
