# Spring Security 6 Zero to Master along with JWT,OAUTH2
Udemy course  
Started on : 21-May-2023  
Completed on:  
link: https://www.udemy.com/course/spring-security-zero-to-master/learn/lecture/22132390#overview


## learning steps
- Spring application having REST endpoints, without security
- Spring application having REST endpoints, with basic security. only below dependency added. Password get generated each time when application is restarted.   
    
```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

- with static credentials. Add below properties in application.properties

```
spring.security.user.name = eazybytes
spring.security.user.password = 12345
```

In this approach, a session id is created and cookie created in browser. this is default behaviour of spring security framework.

- AuthenticationProvider is the interface which we need to implement to define the logic on how a user should be authenticated.

- ```org.springframework.boot.autoconfigure.security.servlet.SpringBootWebSecurityConfiguration```. in this class, below is the code. By this code all routes are made secured by spring security.
```
@Configuration(proxyBeanMethods = false)
	@ConditionalOnDefaultWebSecurity
	static class SecurityFilterChainConfiguration {

		@Bean
		@Order(SecurityProperties.BASIC_AUTH_ORDER)
		SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
			http.authorizeHttpRequests((requests) -> requests.anyRequest().authenticated());
			http.formLogin(withDefaults());
			http.httpBasic(withDefaults());
			return http.build();
		}

	}
```

- different ways to create UserDetails
    - InmemoryUser
    - jdbc tables provided by spring security
    - custom tables



## Section 2
- Non-functional requirements will have requirements defined around Security, Performance, Scalability, Availability etc.
- The motivation to implement Security inside a web application is to protect it's data, business logic & save it from the security breaches, attacks etc.
- Security should be considered right from development phase itself along with business logic. So that there is no re-work.
- For Security, we need to add 'spring-boot-starter-security' into our application maven configurations.
- By default Spring Security generates JSESSIONID cookie during authentication process.
- AuthenticationProvider is the interface which we need to implement to define the logic on how a user should be authenticated.
- ```UsernamePasswordAuthenticationFilter``` Spring Security filter extracts the username, password of the enduser and attempts Authentication



## Section 3
- SecurityFilterChain is the bean that we need to create to define our custom security requirements inside a web application
- following is the correct code to create the bean of SecurityFilterChain to define custom security configurations
```
@Bean
SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception
{
}
```
- the default behaviour or configurations that Spring Security follows for our application endpoints is ```authenticated()```


## Section 4
- Encoding is defined as the process of converting data from one form to another with out any secret involved and has nothing to do with cryptography.
- Encoding guarantees none of the 3 cryptographic properties of confidentiality, integrity and authenticity because it involves no secrete and is completely reversible.