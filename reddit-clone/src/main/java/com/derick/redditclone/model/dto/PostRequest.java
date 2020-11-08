package com.derick.redditclone.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostRequest implements Serializable {
    private Long id;
    private String subredditName;
    private String postName;
    private String url;
    private String description;
}
