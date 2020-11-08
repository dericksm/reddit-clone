package com.derick.redditclone.model.dto;

import lombok.*;

import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class SubRedditDto implements Serializable {
    private Long id;
    private String name;
    private String description;
    private Integer numberOfPosts;
}
