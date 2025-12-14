package com.codemetrics;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class CodeMetricsApplication {
    public static void main(String[] args) {
        SpringApplication.run(CodeMetricsApplication.class, args);
    }
}
