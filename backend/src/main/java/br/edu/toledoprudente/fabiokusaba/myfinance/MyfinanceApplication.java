package br.edu.toledoprudente.fabiokusaba.myfinance;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class MyfinanceApplication {

	public static void main(String[] args) {
		SpringApplication.run(MyfinanceApplication.class, args);
	}

}
