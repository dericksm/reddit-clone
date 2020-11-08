package com.derick.redditclone.service;

import com.derick.redditclone.exceptions.SpringRedditException;
import com.derick.redditclone.model.dto.VoteDto;
import com.derick.redditclone.model.entities.*;
import com.derick.redditclone.repository.PostRepository;
import com.derick.redditclone.repository.VoteRepository;
import com.derick.redditclone.service.exceptions.ObjectNotFoundException;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@AllArgsConstructor
public class VoteService {

    private final PostService postService;
    private final VoteRepository voteRepository;
    private final UserService userService;

    public Vote insert(Vote vote){
        vote.setId(null);
        Optional<Vote> currentVote = voteRepository.findTopByPostAndUserOrderByIdDesc(vote.getPost(), vote.getUser());
        Post post = postService.findById(vote.getPost().getId());
        if(currentVote.isPresent() && currentVote.get().getVoteType().equals(vote.getVoteType())) {
            throw new SpringRedditException("Yuo already " + vote.getVoteType() + "'d for this post");
        }
        if(VoteType.UPVOTE.equals(vote.getVoteType())){
            post.setVoteCount(post.getVoteCount() + 1);
        } else {
            post.setVoteCount(post.getVoteCount() - 1);
        }
        postService.update(post);
        return voteRepository.save(vote);
    }

    public Vote fromDto(VoteDto voteDto){
        Post post = postService.findById(voteDto.getPostId());
        User user = userService.getCurrentUser();
        Vote vote = new Vote(null, voteDto.getVoteType(), post, user);
        return vote;
    }

}
