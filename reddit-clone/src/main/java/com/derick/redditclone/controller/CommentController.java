package com.derick.redditclone.controller;

import com.derick.redditclone.mapper.CommentMapper;
import com.derick.redditclone.model.dto.CommentDto;
import com.derick.redditclone.model.entities.Comment;
import com.derick.redditclone.model.entities.Post;
import com.derick.redditclone.model.entities.User;
import com.derick.redditclone.service.CommentService;
import com.derick.redditclone.service.PostService;
import com.derick.redditclone.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/comments")
@AllArgsConstructor
public class CommentController {

    private final CommentMapper commentMapper;
    private final UserService userService;
    private final PostService postService;
    private final CommentService commentService;

    @PostMapping
    public ResponseEntity<Void> insert(@RequestBody CommentDto commentDto) {
        User currentUser = userService.getCurrentUser();
        Post post = postService.findById(commentDto.getPostId());
        Comment comment = commentMapper.map(commentDto, post, currentUser);
        comment = commentService.insert(comment);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(comment.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @GetMapping("by-post/{postId}")
    public ResponseEntity<List<CommentDto>> findAllPostComments(@PathVariable Long postId) {
        Post post = postService.findById(postId);
        List<Comment> commentList = commentService.findAllPostComments(post);
        List<CommentDto> commentDtoList = commentList.stream().map(comment -> commentMapper.mapToDto(comment)).collect(Collectors.toList());
        return ResponseEntity.ok().body(commentDtoList);
    }

    @GetMapping("by-user/{username}")
    public ResponseEntity<List<CommentDto>> findAllUserComments(@PathVariable String username) {
        User user = userService.findByUsername(username);
        List<Comment> commentList = commentService.findAllUserComments(user);
        List<CommentDto> commentDtoList = commentList.stream().map(comment -> commentMapper.mapToDto(comment)).collect(Collectors.toList());
        return ResponseEntity.ok().body(commentDtoList);
    }

//    @GetMapping
//    public ResponseEntity<List<PostResponse>> findAll() {
//        List<Post> postList = postService.findAll();
//        List<PostResponse> postResponseList = postList.stream().map(post -> postMapper.mapToDto(post)).collect(Collectors.toList());
//        return ResponseEntity.ok().body(postResponseList);
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<PostResponse> findById(@PathVariable Long id) {
//        Post post = postService.findById(id);
//        PostResponse postResponse = postMapper.mapToDto(post);
//        return ResponseEntity.ok().body(postResponse);
//    }
//
//    @GetMapping("by-subreddit/{id}")
//    public ResponseEntity<List<PostResponse>> findPostsBySubreddit(@PathVariable Long id) {
//        List<Post> postList = postService.findPostsBySubreddit(id);
//        List<PostResponse> postResponseList = postList.stream().map(post -> postMapper.mapToDto(post)).collect(Collectors.toList());
//        return ResponseEntity.ok().body(postResponseList);
//    }
//
//    @GetMapping("by-user/{name}")
//    public ResponseEntity<List<PostResponse>> findPostsByUsername(@PathVariable String username) {
//        List<Post> postList = postService.findPostsByUsername(username);
//        List<PostResponse> postResponseList = postList.stream().map(post -> postMapper.mapToDto(post)).collect(Collectors.toList());
//        return ResponseEntity.ok().body(postResponseList);
//    }
}
