package com.derick.redditclone.repository;

import com.derick.redditclone.model.entities.Post;
import com.derick.redditclone.model.entities.Subreddit;
import com.derick.redditclone.model.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllBySubreddit(Subreddit subreddit);

    List<Post> findByUser(User user);
}
