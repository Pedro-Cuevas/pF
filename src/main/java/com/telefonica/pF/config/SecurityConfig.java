package com.telefonica.pF.config;

import java.util.HashMap;
import java.util.Map;

import com.telefonica.pF.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.DelegatingPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private UserService userService;

    // MD5
    // SHA256, SHA512
    @Bean
    public PasswordEncoder passwordEncoder() {
        //¿están hasheadas las contraseñas?
        // Si no hay corchetes se asume texto plano
        PasswordEncoder defaultEncoder = NoOpPasswordEncoder.getInstance();
        
        Map<String, PasswordEncoder> encoders = new HashMap<>();
        //para que el programa pueda diferenciar y trabajar con noop y bcrypt
        encoders.put("noop", NoOpPasswordEncoder.getInstance());
        encoders.put("bcrypt", new BCryptPasswordEncoder());

        DelegatingPasswordEncoder passwordEncoder = new DelegatingPasswordEncoder("bcrypt", encoders);
        passwordEncoder.setDefaultPasswordEncoderForMatches(defaultEncoder);

        return passwordEncoder;
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .authorizeRequests()
                //.antMatchers("/api/v1/documents", "/api/v1/documents/**").permitAll()
                .antMatchers("/", "/index.html", "/news.html", "/bolsa.html", "/assets/js/**", "/assets/img/**", "/assets/css/**", "/assets/vendor/**").permitAll()
                .anyRequest().authenticated()
            .and()
            .formLogin()
                .loginPage("/auth/login").permitAll()
				.defaultSuccessUrl("/index.html")
            .and()
            .logout(logout -> logout
                .logoutUrl("/api/v1/logout")
                .logoutSuccessUrl("/index.html")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
            );
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(passwordEncoder());
        //Donde están mis usuarios y qué contraseña tienen
    }
}