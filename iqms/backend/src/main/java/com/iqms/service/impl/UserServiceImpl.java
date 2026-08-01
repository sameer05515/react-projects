package com.iqms.service.impl;

import com.iqms.dto.response.UserSummaryResponse;
import com.iqms.entity.User;
import com.iqms.exception.ResourceNotFoundException;
import com.iqms.mapper.UserMapper;
import com.iqms.repository.UserRepository;
import com.iqms.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

/**
 * {@link UserService} implementation.
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    @Override
    @Transactional(readOnly = true)
    public UserSummaryResponse getCurrentUser(UUID userId) {
        User user = findActiveUser(userId);
        return userMapper.toSummary(user);
    }

    @Override
    @Transactional
    public UserSummaryResponse updateThemePreference(UUID userId, String theme) {
        User user = findActiveUser(userId);
        user.setThemePreference(theme);
        return userMapper.toSummary(userRepository.save(user));
    }

    private User findActiveUser(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        if (user.isDeleted()) {
            throw new ResourceNotFoundException("User", "id", userId);
        }
        return user;
    }
}
