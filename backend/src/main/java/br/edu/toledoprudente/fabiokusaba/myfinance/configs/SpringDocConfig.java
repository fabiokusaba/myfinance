package br.edu.toledoprudente.fabiokusaba.myfinance.configs;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringDocConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("My Finance")
                        .description("API para gerenciamento de financas pessoais")
                        .version("1.0.0")
                );
    }
}
