package com.derick.redditclone.service;

import com.derick.redditclone.model.entities.Post;
import com.derick.redditclone.model.entities.Subreddit;
import com.derick.redditclone.model.entities.User;
import com.derick.redditclone.repository.PostRepository;
import com.derick.redditclone.service.exceptions.ObjectNotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@AllArgsConstructor
public class PostService {

    private final SubRedditService subRedditService;
    private final PostRepository postRepository;
    private final UserService userService;

    public Post insert(Post post){
        post.setId(null);
        subRedditService.findById(post.getSubreddit().getId());
        return postRepository.save(post);
    }

    public List<Post> findAll() {
        return postRepository.findAll();
    }

    public Post findById(Long id) {
        return postRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Post with id: " + id + " wasn't found"));
    }

    @Transactional(readOnly = true)
    public List<Post> findPostsBySubreddit(Long subredditId){
        Subreddit subreddit = subRedditService.findById(subredditId);
        List<Post> posts = postRepository.findAllBySubreddit(subreddit);
        return posts;
    }

    @Transactional(readOnly = true)
    public List<Post> findPostsByUsername(String username){
        User user = userService.findByUsername(username);
        return postRepository.findByUser(user);
    }

    public Post update(Post newPost) {
        Post post = findById(newPost.getId());
        BeanUtils.copyProperties(newPost, post);
        return postRepository.save(post);
    }

}
