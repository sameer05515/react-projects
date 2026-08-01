package com.iqms.controller;

import com.iqms.dto.common.ApiResponse;
import com.iqms.dto.request.ThemePreferenceRequest;
import com.iqms.dto.response.UserSummaryResponse;
import com.iqms.security.JwtPrincipal;
import com.iqms.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Endpoints for the authenticated user's own profile. All routes require a
 * valid access token (see {@code SecurityConfig}); the caller's identity is
 * taken from the JWT, never from a client-supplied id.
 *
 * @author IQMS Engineering
 * @since 1.0.0
 */
@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "Users", description = "The authenticated user's own profile")
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    @Operation(summary = "Get the authenticated user's profile")
    public ApiResponse<UserSummaryResponse> getCurrentUser(@AuthenticationPrincipal JwtPrincipal principal) {
        return ApiResponse.success(userService.getCurrentUser(principal.id()));
    }

    @PatchMapping("/me/theme")
    @Operation(summary = "Update the authenticated user's light/dark theme preference")
    public ApiResponse<UserSummaryResponse> updateTheme(
            @AuthenticationPrincipal JwtPrincipal principal,
            @Valid @RequestBody ThemePreferenceRequest request) {
        return ApiResponse.success(
                userService.updateThemePreference(principal.id(), request.theme()),
                "Theme preference updated");
    }
}
