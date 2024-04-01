## Tomcat redisson setup (Load balance)- tomcat cluster
- checking https://www.javadevjournal.com/spring/spring-session-with-redis/ approach
- need redis server details and putty connectivity with redis server
- Some useful links
  - https://redisson.org/articles/how-to-install-redis.html
  - https://github.com/redisson/redisson/wiki/2.-Configuration#221-yaml-file-based-configuration
  - https://redisson.org/articles/redis-based-tomcat-session-management.html
  - https://www.baeldung.com/redis-redisson


## How Can Redis Be Used for Tomcat with cluster approach?
- https://dzone.com/articles/redis-based-tomcat-session-management#:~:text=How%20Can%20Redis%20Be%20Used,session%20management%20backed%20by%20Redis
- https://redisson.org/articles/redis-based-tomcat-session-management.html
- https://liferay.dev/blogs/-/blogs/tomcat-session-replication-with-redis-in-7-4
- 


## Redis client add as dependency in Spring Project
- https://www.javadevjournal.com/spring/spring-session-with-redis/
- https://gvnix.medium.com/sticky-sessions-with-spring-session-redis-bdc6f7438cc3


## Host, port, password, and database
 - By default, redis-cli connects to the server at the address 127.0.0.1 with port 6379. You can change the port using several command line options. To specify a different host name or an IP address, use the -h option. In order to set a different port, use -p.
 - ```
   $ redis-cli -h redis15.localnet.org -p 6390 PING
   PONG

   ```
 - https://redis.io/docs/manual/cli/
 - To connect redis server with node js
   - ```
     npm install -g redis-cli
     rdcli -h eadminpreprod.iitd.ac.in -p 6379
     ``` 

## Explore
 - Redis CLI, https://redis.io/docs/manual/cli/ 
 - How to install Redis, https://redisson.org/articles/how-to-install-redis.html
 - How to Install Redis CLI Without Installing Redis Server (Even on Windows), https://redis.com/blog/get-redis-cli-without-installing-redis-server/
 - Redis commands, https://www.tutorialspoint.com/redis/redis_commands.htm
 - Retrieving All Existing Keys, https://chartio.com/resources/tutorials/how-to-get-all-keys-in-redis/

## Apache Load Balancer configuration
 - How to Configure the Apache Load Balancer, 
   - https://techdocs.broadcom.com/us/en/symantec-security-software/identity-security/privileged-identity-manager/12-8-01/implementing/how-to-configure-the-apache-load-balancer.html
   - https://www.inmotionhosting.com/support/server/apache/apache-load-balancer/
   - Can apache load balancer find if one of it's balancer members is down?
     - https://serverfault.com/questions/609550/can-apache-load-balancer-find-if-one-of-its-balancer-members-is-down
   - Apache Module mod_proxy_balancer
     - https://httpd.apache.org/docs/2.4/mod/mod_proxy_balancer.html
   - 