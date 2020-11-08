import { Component, OnDestroy, OnInit } from "@angular/core";
import { Post } from "../../../models/post-model";
import { CommentPayload } from "../../../models/comment.payload";
import { ActivatedRoute } from "@angular/router";
import { PostService } from "../../../services/post.service";
import { CommentService } from "../../../services/comment.service";
import { SubSink } from 'subsink';

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  public name: string;
  public posts: Post[];
  public comments: CommentPayload[];
  public postLength: number;
  public commentLength: number;

  private subs = new SubSink();

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.name = this.activatedRoute.snapshot.params.name;

    this.subs.sink = this.postService.findByUsername(this.name).subscribe((data) => {
      this.posts = data;
      this.postLength = data.length;
    });

    this.subs.sink = this.commentService.findByUsername(this.name).subscribe((data) => {
      this.comments = data;
      this.commentLength = data.length;
    });
  }

  ngOnDestroy(): void{
    this.subs.unsubscribe();
  }
}
