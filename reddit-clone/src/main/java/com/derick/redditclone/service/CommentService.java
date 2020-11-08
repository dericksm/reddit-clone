package com.derick.redditclone.service;

import com.derick.redditclone.model.entities.Comment;
import com.derick.redditclone.model.entities.NotificationEmail;
import com.derick.redditclone.model.entities.Post;
import com.derick.redditclone.model.entities.User;
import com.derick.redditclone.repository.CommentRepository;
import com.derick.redditclone.service.exceptions.ObjectNotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class CommentService {

    private static final String POST_URL = "";
    private final CommentRepository commentRepository;
    private final MailContentBuilder mailContentBuilder;
    private final MailService mailService;

    public Comment insert(Comment comment) {
        comment.setId(null);
        comment = commentRepository.save(comment);

        String message = mailContentBuilder.build(comment.getUser().getUsername() + " posted a comment on your post." + POST_URL);
        sendCommentNotification(message, comment.getUser());
        return comment;
    }
    public List<Comment> findAll() {
        return commentRepository.findAll();
    }

    public Comment findById(Long id) {
        return commentRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Comment with id: " + id + " wasn't found"));
    }

    private void sendCommentNotification(String message, User user) {
        mailService.sendMail(new NotificationEmail(user.getUsername() + " commented on your post", user.getEmail(), message));
    }

    public List<Comment> findAllPostComments(Post post) {
        return commentRepository.findByPost(post);
    }

    public List<Comment> findAllUserComments(User user) {
        return commentRepository.findAllByUser(user);
    }
}
