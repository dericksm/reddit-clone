package com.derick.redditclone.controller;

import com.derick.redditclone.model.dto.AuthenticationResponse;
import com.derick.redditclone.model.dto.LoginRequest;
import com.derick.redditclone.model.dto.RefreshTokenRequest;
import com.derick.redditclone.model.dto.RegisterRequest;
import com.derick.redditclone.model.entities.RefreshToken;
import com.derick.redditclone.model.entities.User;
import com.derick.redditclone.service.RefreshTokenService;
import com.derick.redditclone.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping(value = "/api/users")
@AllArgsConstructor
public class UserController {

    private final UserService userService;
    private final RefreshTokenService refreshTokenService;

    @PostMapping("/signup")
    public ResponseEntity<Void> signUp(@RequestBody RegisterRequest registerRequest) {
        User user = userService.insert(registerRequest);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(user.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("/accountVerification/{token}")
    public ResponseEntity<String> verifyAccount(@PathVariable String token) {
        userService.verifyAccount(token);
        return ResponseEntity.ok().body("Account activated successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginRequest request) {
        AuthenticationResponse authenticationResponse = userService.login(request);
        return ResponseEntity.ok().body(authenticationResponse);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AuthenticationResponse> login(@Valid @RequestBody RefreshTokenRequest refreshTokenRequest) {
        AuthenticationResponse authenticationResponse = userService.refreshToken(refreshTokenRequest);
        return ResponseEntity.ok().body(authenticationResponse);
    }


    @PostMapping("/logout")
    public ResponseEntity<String> logout(@Valid @RequestBody RefreshTokenRequest refreshTokenRequest) {
        refreshTokenService.deleteByToken(refreshTokenRequest.getRefreshToken());
        return ResponseEntity.ok().body("Refresh token deleted successfully!");
    }


}
