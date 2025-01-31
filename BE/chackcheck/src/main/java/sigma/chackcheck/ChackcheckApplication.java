package sigma.chackcheck;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class ChackcheckApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChackcheckApplication.class, args);
	}

}
