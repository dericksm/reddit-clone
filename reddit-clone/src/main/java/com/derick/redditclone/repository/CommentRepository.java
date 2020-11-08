package com.derick.redditclone.repository;

import com.derick.redditclone.model.entities.Comment;
import com.derick.redditclone.model.entities.Post;
import com.derick.redditclone.model.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByPost(Post post);

    List<Comment> findAllByUser(User user);
}
