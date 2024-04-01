# MyBatis references

## Some important references
 - mybatis-spring sample code
   - https://github.com/mybatis/spring/tree/master/src/test/java/org/mybatis/spring/sample
   - Code to know about how to use Spring with a full web application server, https://github.com/mybatis/jpetstore-6
   - How to use connection pool with Spring Boot + Mybatis, https://stackoverflow.com/questions/49833126/how-to-use-connection-pool-with-spring-boot-mybatis
 - **To configure mybatis in Spring boot project**
   - MyBatis-Spring-Boot-Starter requires following versions, https://mybatis.org/spring-boot-starter/mybatis-spring-boot-autoconfigure/
   - Add below dependency in pom.xml
     - ```
        <!-- https://mvnrepository.com/artifact/org.mybatis.spring.boot/mybatis-spring-boot-starter -->
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>2.3.0</version>
        </dependency>
       ```
   -  