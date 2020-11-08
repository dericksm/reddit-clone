import { SubredditModel } from "src/app/models/subreddit-model";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PostService } from "../../../services/post.service";
import { SubredditService } from "../../../services/subreddit.service";
import { SubSink } from "subsink";
import { throwError } from "rxjs";
import { CreatePostPayload } from '../../../models/create-post.payload';

@Component({
  selector: "app-create-post",
  templateUrl: "./create-post.component.html",
  styleUrls: ["./create-post.component.css"],
})
export class CreatePostComponent implements OnInit {
  public formGroup: FormGroup;
  public subreddits: Array<SubredditModel>;
  private subs = new SubSink();

  constructor(
    private router: Router,
    private postService: PostService,
    private subredditService: SubredditService
  ) {}

  ngOnInit() {
    this.formGroup = new FormGroup({
      postName: new FormControl("", Validators.required),
      subredditName: new FormControl("", Validators.required),
      url: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
    });  
  
    this.subs.sink = this.subredditService.findAll().subscribe(
      (data) => {
        this.subreddits = data;
      },
      (error) => {
        throwError(error);
      }
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  createPost() {
    const newPost: CreatePostPayload = this.formGroup.value

    this.subs.sink = this.postService.save(newPost).subscribe(
      (data) => {
        this.router.navigateByUrl("/");
      },
      (error) => {
        throwError(error);
      }
    );
  }

  discardPost() {
    this.router.navigateByUrl("/");
  }
}
