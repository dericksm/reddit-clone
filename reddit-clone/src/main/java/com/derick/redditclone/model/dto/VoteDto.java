package com.derick.redditclone.model.dto;

import com.derick.redditclone.model.entities.VoteType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoteDto implements Serializable {
    private VoteType voteType;
    private Long postId;
}
