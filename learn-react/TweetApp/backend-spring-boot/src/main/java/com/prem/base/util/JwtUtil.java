package com.prem.base.util;

import com.prem.user.entity.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.function.Function;

@Component
public class JwtUtil {

    private String SECRET_KEY = "your_secret_key";

    // Extract username (or any field) from token
    public String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // Extract claims
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    // Check if token has expired
    public Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Extract expiration date
    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    // Generate token
    public String generateToken(User user) {
//        return Jwts.builder()
//                .setSubject(userName)
//                .setIssuedAt(new Date(System.currentTimeMillis()))
//                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10-hour validity
//                .signWith(SignatureAlgorithm.HS256, SECRET_KEY)
//                .compact();
        return Jwts.builder()
                .setSubject(user.getUsername())
                .claim("userId", user.getId())
                .claim("userName", user.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) // 10 hours expiration
//                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 1)) // 10 hours expiration
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
    }

    // Validate token
    public Boolean validateToken(String token, String username) {
        final String extractedUserName = extractUserName(token);
        return (extractedUserName.equals(username) && !isTokenExpired(token));
    }
}
