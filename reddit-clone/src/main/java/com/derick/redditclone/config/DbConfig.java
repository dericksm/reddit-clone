package com.derick.redditclone.config;

import com.derick.redditclone.model.entities.User;
import com.derick.redditclone.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.Instant;

@Configuration
public class DbConfig implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public void run(String... args) throws Exception {
        User user = new User(null, "derick", bCryptPasswordEncoder.encode("123"), "derick_sm@hotmail.com", Instant.now(), true);
        userRepository.save(user);
    }
}
