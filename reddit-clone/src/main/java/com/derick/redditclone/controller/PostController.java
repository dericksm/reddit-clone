package com.derick.redditclone.controller;

import com.derick.redditclone.mapper.PostMapper;
import com.derick.redditclone.model.dto.PostRequest;
import com.derick.redditclone.model.dto.PostResponse;
import com.derick.redditclone.model.entities.Post;
import com.derick.redditclone.model.entities.Subreddit;
import com.derick.redditclone.model.entities.User;
import com.derick.redditclone.service.PostService;
import com.derick.redditclone.service.SubRedditService;
import com.derick.redditclone.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/posts")
@AllArgsConstructor
public class PostController {

    private final PostService postService;
    private final SubRedditService subRedditService;
    private final UserService userService;
    private final PostMapper postMapper;

    @PostMapping
    public ResponseEntity<Void> insert(@RequestBody PostRequest postRequest) {
        Subreddit subreddit = subRedditService.findByName(postRequest.getSubredditName());
        User currentUser = userService.getCurrentUser();
        Post post = postMapper.map(postRequest, subreddit, currentUser);
        post = postService.insert(post);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(post.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @GetMapping
    public ResponseEntity<List<PostResponse>> findAll() {
        List<Post> postList = postService.findAll();
        List<PostResponse> postResponseList = postList.stream().map(post -> postMapper.mapToDto(post)).collect(Collectors.toList());
        return ResponseEntity.ok().body(postResponseList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostResponse> findById(@PathVariable Long id) {
        Post post = postService.findById(id);
        PostResponse postResponse = postMapper.mapToDto(post);
        return ResponseEntity.ok().body(postResponse);
    }

    @GetMapping("by-subreddit/{id}")
    public ResponseEntity<List<PostResponse>> findPostsBySubreddit(@PathVariable Long id) {
        List<Post> postList = postService.findPostsBySubreddit(id);
        List<PostResponse> postResponseList = postList.stream().map(post -> postMapper.mapToDto(post)).collect(Collectors.toList());
        return ResponseEntity.ok().body(postResponseList);
    }

    @GetMapping("by-user/{name}")
    public ResponseEntity<List<PostResponse>> findPostsByUsername(@PathVariable String username) {
        List<Post> postList = postService.findPostsByUsername(username);
        List<PostResponse> postResponseList = postList.stream().map(post -> postMapper.mapToDto(post)).collect(Collectors.toList());
        return ResponseEntity.ok().body(postResponseList);
    }
}
