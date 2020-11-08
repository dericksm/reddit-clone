package com.derick.redditclone.repository;

import com.derick.redditclone.model.entities.Post;
import com.derick.redditclone.model.entities.User;
import com.derick.redditclone.model.entities.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {
    Optional<Vote> findTopByPostAndUserOrderByIdDesc(Post post, User currentUser);
}
