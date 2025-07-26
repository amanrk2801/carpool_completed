package com.carpool.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * API Documentation Configuration
 * 
 * Configures Swagger/OpenAPI documentation for the API endpoints.
 */
@Configuration
public class OpenApiConfig {

    @Value("${server.servlet.context-path:/api}")
    private String contextPath;

    @Bean
    public OpenAPI carpoolOpenAPI() {
        Server devServer = new Server();
        devServer.setUrl("http://localhost:8080" + contextPath);
        devServer.setDescription("Development server");

        Server prodServer = new Server();
        prodServer.setUrl("https://your-production-domain.com" + contextPath);
        prodServer.setDescription("Production server");

        Contact contact = new Contact();
        contact.setEmail("support@carpoolconnect.com");
        contact.setName("CarpoolConnect Support");
        contact.setUrl("https://www.carpoolconnect.com");

        License mitLicense = new License()
                .name("MIT License")
                .url("https://choosealicense.com/licenses/mit/");

        Info info = new Info()
                .title("CarpoolConnect API")
                .version("1.0.0")
                .contact(contact)
                .description("REST API for CarpoolConnect - A comprehensive carpool management system")
                .termsOfService("https://www.carpoolconnect.com/terms")
                .license(mitLicense);

        return new OpenAPI()
                .info(info)
                .servers(List.of(devServer, prodServer));
    }
}
