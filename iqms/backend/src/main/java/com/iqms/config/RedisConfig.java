package com.iqms.config;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.jsontype.impl.LaissezFaireSubTypeValidator;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.StringRedisSerializer;

import java.time.Duration;

/**
 * Configures Redis-backed caching for lookup-heavy, low-churn data
 * (technologies, categories, companies, tags, dashboard aggregates).
 *
 * <p>Uses a Jackson-based serializer with type information embedded so
 * cached payloads round-trip correctly regardless of the concrete DTO type,
 * and registers {@link JavaTimeModule} so {@code LocalDateTime} fields
 * serialize without requiring a custom converter per entity.</p>
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
@Configuration
@EnableCaching
public class RedisConfig {

    private static final Duration DEFAULT_TTL = Duration.ofMinutes(10);

    /**
     * Builds the Jackson {@link ObjectMapper} used exclusively for Redis
     * value serialization, with polymorphic type handling enabled so
     * cached collections deserialize back to their original element types.
     *
     * @return a preconfigured {@link ObjectMapper}
     */
    private ObjectMapper redisObjectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        mapper.activateDefaultTyping(
                LaissezFaireSubTypeValidator.instance,
                ObjectMapper.DefaultTyping.NON_FINAL,
                JsonTypeInfo.As.PROPERTY);
        return mapper;
    }

    /**
     * Registers the {@link CacheManager} backed by Redis, applying a default
     * 10-minute TTL to every cache region unless overridden per-cache.
     *
     * @param connectionFactory the Redis connection factory auto-configured from
     *                          {@code spring.data.redis.*}
     * @return the configured {@link RedisCacheManager}
     */
    @Bean
    public CacheManager cacheManager(RedisConnectionFactory connectionFactory) {
        GenericJackson2JsonRedisSerializer jsonSerializer =
                new GenericJackson2JsonRedisSerializer(redisObjectMapper());

        RedisCacheConfiguration cacheConfiguration = RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(DEFAULT_TTL)
                .disableCachingNullValues()
                .serializeKeysWith(RedisSerializationContext.SerializationPair
                        .fromSerializer(new StringRedisSerializer()))
                .serializeValuesWith(RedisSerializationContext.SerializationPair
                        .fromSerializer(jsonSerializer));

        return RedisCacheManager.builder(connectionFactory)
                .cacheDefaults(cacheConfiguration)
                .build();
    }
}
