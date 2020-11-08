package com.derick.redditclone.service;

import com.derick.redditclone.exceptions.SpringRedditException;
import com.derick.redditclone.model.entities.RefreshToken;
import com.derick.redditclone.repository.RefreshTokenRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
@AllArgsConstructor
public class RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;

    public RefreshToken generateRefreshToken() {
        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setToken(UUID.randomUUID().toString());
        refreshToken.setCreatedDate(Instant.now());
        return refreshTokenRepository.save(refreshToken);
    }

    public void validateRefreshToken(String refreshToken) {
        refreshTokenRepository.findByToken(refreshToken).orElseThrow(() -> new SpringRedditException("Invalid refresh token"));
    }

    public void deleteByToken(String token){
        refreshTokenRepository.deleteByToken(token);
    }

}
