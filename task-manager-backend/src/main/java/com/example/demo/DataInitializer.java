package com.example.demo;

import com.example.demo.Service.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserService userService;

    public DataInitializer(UserService userService) {
        this.userService = userService;
    }

    @Override
    public void run(String... args) throws Exception {

        if (userService.findByEmail("test@example.com").isEmpty()) {
            userService.saveUser("test@example.com", "password123");
            System.out.println("Utilisateur de test créé !");
        }

        if (userService.findByEmail("yagoubi.oumayma20@gmail.com").isEmpty()) {
            userService.saveUser("yagoubi.oumayma20@gmail.com", "Oumayma12");
            System.out.println("Utilisateur de test créé !");
        }
    }
}
