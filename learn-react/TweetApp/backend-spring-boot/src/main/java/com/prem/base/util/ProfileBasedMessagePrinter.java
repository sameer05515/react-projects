package com.prem.base.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
public class ProfileBasedMessagePrinter {

    @Autowired
    private Environment environment;

    @EventListener(ApplicationReadyEvent.class)
    public void onApplicationEvent() {
        String[] activeProfiles = environment.getActiveProfiles();
        System.out.println("======================================\n\n\n\n");
        
        if (activeProfiles.length == 0) {
            System.out.println("No active profile set, running with default configuration.");
        } else {
            for (String profile : activeProfiles) {
                switch (profile) {
                    case "version1.0.0":
                        System.out.println("Application started with profile: version 1.0.0 - Initial Release");
                        break;
                    case "version1.0.1":
                        System.out.println("Application started with profile: version 1.0.1 - Minor updates");
                        break;
                    case "testing":
                        System.out.println("Application started with profile: testing - Testing in progress");
                        break;
                    case "uat":
                        System.out.println("Application started with profile: uat - User Acceptance Testing");
                        break;
                    case "prod":
                        System.out.println("Application started with profile: prod - Production environment");
                        break;
                    default:
                        System.out.println("Application started with profile: " + profile + " - Custom profile");
                }
            }
        }

        System.out.println("\n\n\n\n======================================");
    }
}
