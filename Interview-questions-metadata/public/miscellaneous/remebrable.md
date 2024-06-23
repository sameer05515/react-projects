
## To kill tomcat running on port 8080

```
Microsoft Windows [Version 10.0.19045.2311]
(c) Microsoft Corporation. All rights reserved.

C:\Users\Premendra_kumar>netstat -aon | find /i "listening"
  TCP    0.0.0.0:135            0.0.0.0:0              LISTENING       1272
  TCP    0.0.0.0:445            0.0.0.0:0              LISTENING       4

C:\Users\Premendra_kumar>netstat -aon |find /i "listening" |find "8080"
  TCP    0.0.0.0:8080           0.0.0.0:0              LISTENING       16180
  TCP    [::]:8080              [::]:0                 LISTENING       16180

C:\Users\Premendra_kumar>taskkill /F /PID 16180
SUCCESS: The process with PID 16180 has been terminated.
```

## Links

 - [Encoding, Encryption, Hashing, and Obfuscation in Java](https://www.cesarsotovalero.net/blog/encoding-encryption-hashing-and-obfuscation-in-java.html)
 - [Java Base64 Encoding and Decoding](https://www.baeldung.com/java-base64-encode-and-decode)
 - [AES 256 Encryption in Java](https://www.javatpoint.com/aes-256-encryption-in-java)
 - maven simple java project
   - ```
     mvn archetype:generate -DgroupId=com.test -DartifactId=encryption-decryption -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false
     ```
     

## Ehcache
 - Ehcache is an open source, standards-based cache that boosts performance, offloads your database, and simplifies scalability. It's the most widely-used Java-based cache because it's robust, proven, full-featured, and integrates with other popular libraries and frameworks.

## Mybatis-Spring transaction not rollback
- https://stackoverflow.com/questions/42651318/spring-service-transactional-doesnt-rollback-transaction-mybatis-sqlsession/42729257#42729257
- https://stackoverflow.com/questions/46590696/spring-mybatis-transactional-rollback
- https://stackoverflow.com/questions/50234214/transactions-are-not-getting-rollbacked-with-hikaricp
- https://www.marcobehler.com/guides/spring-transaction-management-transactional-in-depth
- http://mybatis.org/spring/transactions.html

## In MySQL, All table name which contains given word string, in a given schema
```
select table_name FROM information_schema.tables where table_schema='IITD_DEV' and lower(table_name) like '%menu%'
```

## Prometheus
- https://prometheus.io/docs/prometheus/latest/getting_started/
- https://dzone.com/articles/grafana-and-prometheus-integration-with-java-base


## Monitoring
- https://eadminpreprod.iitd.ac.in/IITD-0/monitoring
- http://localhost:8080/IITD/monitoring
- https://eadmin.iitd.ac.in/IITD-0/monitoring?period=jour


## Redis-Based Tomcat Session Management
- https://redisson.org/articles/redis-based-tomcat-session-management.html

## Getting started with
- https://www.ehcache.org/

## How to Encrypt and Decrypt Data In Java Using AES Algorithm
- https://www.quickprogrammingtips.com/java/how-to-encrypt-and-decrypt-data-in-java-using-aes-algorithm.html

## Mybatis
- https://dzone.com/articles/getting-started-ibatis-mybatis-0

## Maven dependency resolution (conflicted)
- https://stackoverflow.com/questions/7175398/maven-dependency-resolution-conflicted