package com.derick.redditclone.service;

import com.derick.redditclone.mapper.SubredditMapper;
import com.derick.redditclone.model.dto.SubRedditDto;
import com.derick.redditclone.model.entities.Subreddit;
import com.derick.redditclone.repository.SubredditRepository;
import com.derick.redditclone.service.exceptions.ObjectNotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class SubRedditService {

    private final SubredditRepository subredditRepository;

    public Subreddit insert(Subreddit subreddit) {
        subreddit.setId(null);
        return subredditRepository.save(subreddit);
    }

    public List<Subreddit> findAll() {
        return subredditRepository.findAll();
    }

    public Subreddit findById(Long id) {
        return subredditRepository.findById(id).orElseThrow(() -> new ObjectNotFoundException("Subreddit with id: " + id + " wasn't found"));
    }

    public Subreddit findByName(String name) {
        return subredditRepository.findByName(name).orElseThrow(() -> new ObjectNotFoundException("Subreddit with name: " + name + " wasn't found"));
    }
}
