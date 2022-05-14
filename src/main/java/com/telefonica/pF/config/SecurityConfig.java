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
    UserService userService;

    @Bean
    //Este método crea hash codes
    public PasswordEncoder passwordEncoder(){
        PasswordEncoder defaultEncoder = NoOpPasswordEncoder.getInstance();
        
        //noop -> no operation, no tiene hash
        Map<String, PasswordEncoder> encoders = new HashMap<>();
        encoders.put("noop", NoOpPasswordEncoder.getInstance());
        encoders.put("bcrypt", new BCryptPasswordEncoder());

        //Por defecto bcrypt, si no hay nada se guarda en texto plano (noop)
        DelegatingPasswordEncoder passwordEncoder = new DelegatingPasswordEncoder("bcrypt", encoders);
        passwordEncoder.setDefaultPasswordEncoderForMatches(defaultEncoder);

        return passwordEncoder;
    }

    @Override
    public void configure(HttpSecurity http) throws Exception {
        //http es un objeto
        http
            .authorizeRequests()
                .antMatchers("/api/v1/sugerencias", "/api/v1/sugerencias/**").permitAll()
                .anyRequest().authenticated() //otra cosa que no sea lo de arriba necesita autenticación
            .and()
            .logout(logout -> logout //para cerrar sesión, tiene que ser con un método POST
                .logoutUrl("/api/v1/logout")
                .logoutSuccessUrl("/api/v1/users") //me redirige aquí cuando ha hecho logout
                .invalidateHttpSession(true) //invalida sesión http
                .deleteCookies("JSESSIONID") //elimina esa cookie, 
                                                                    //para cerrar sesión y que no se guarden datos
            )
            .httpBasic()
            .and()
            .cors().and().csrf().disable();
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception{
        //Estoy diciendo dónde están los usuarios y sus contraseñas
        
        auth.userDetailsService(userService).passwordEncoder(passwordEncoder());
    }
}
