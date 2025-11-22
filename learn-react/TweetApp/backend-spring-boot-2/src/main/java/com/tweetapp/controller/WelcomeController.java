package com.tweetapp.controller;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

/**
 * Controller for serving the welcome page
 */
@Controller
public class WelcomeController {
    
    @GetMapping("/")
    @Operation(hidden = true) // Hide from Swagger documentation
    public String welcome() {
        return "welcome";
    }
}

