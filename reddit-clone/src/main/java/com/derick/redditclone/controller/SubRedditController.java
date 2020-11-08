package com.derick.redditclone.controller;

import com.derick.redditclone.mapper.SubredditMapper;
import com.derick.redditclone.model.dto.SubRedditDto;
import com.derick.redditclone.model.entities.Subreddit;
import com.derick.redditclone.service.SubRedditService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/subreddit")
@AllArgsConstructor
@Slf4j
public class SubRedditController {

    private final SubRedditService subRedditService;
    private final SubredditMapper subredditMapper;

    @PostMapping
    public ResponseEntity<Void> insert(@RequestBody SubRedditDto subRedditDto){
        Subreddit subreddit = subredditMapper.mapDtoToSubreddit(subRedditDto);
        subRedditService.insert(subreddit);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(subreddit.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @GetMapping
    public ResponseEntity<List<SubRedditDto>> findAll(){
        List<Subreddit> subredditList = subRedditService.findAll();
        List<SubRedditDto> subRedditDtos = subredditList.stream().map(subreddit -> subredditMapper.mapSubredditToDto(subreddit)).collect(Collectors.toList());
        return ResponseEntity.ok().body(subRedditDtos);
    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<SubRedditDto> findById(@PathVariable Long id){
        Subreddit subreddit = subRedditService.findById(id);
        SubRedditDto subRedditDto = subredditMapper.mapSubredditToDto(subreddit);
        return ResponseEntity.ok().body(subRedditDto);
    }
}
