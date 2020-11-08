import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { PostService } from "../../../services/post.service";
import { Post } from "../../../models/post-model";
import { CommentService } from "../../../services/comment.service";
import { CommentPayload } from "../../../models/comment.payload";
import { SubSink } from "subsink";
import { throwError } from "rxjs";

@Component({
  selector: "app-view-post",
  templateUrl: "./view-post.component.html",
  styleUrls: ["./view-post.component.css"],
})
export class ViewPostComponent implements OnInit, OnDestroy {
  public postId: number;
  public post: Post;
  public formGroup: FormGroup;
  public comments: Array<CommentPayload>;
  private subs = new SubSink();

  constructor(
    private postService: PostService,
    private activateRoute: ActivatedRoute,
    private commentService: CommentService,
    private router: Router
  ) {}

  createForm(): void {
    this.formGroup = new FormGroup({
      text: new FormControl("", Validators.required),
    });
  }

  ngOnInit(): void {   
    this.postId = this.activateRoute.snapshot.params.id;
    this.createForm();
    this.getPostById();
    this.getCommentsForPost();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  postComment() {
    const newComment = this.formGroup.value;
    this.subs.sink = this.commentService.save(newComment).subscribe(
      (data) => {
        this.formGroup.get("text").setValue("");
        this.getCommentsForPost();
      },
      (error) => {
        throwError(error);
      }
    );
  }

  private getPostById() {
    this.subs.sink = this.postService.findById(this.postId).subscribe(
      (data) => {
        this.post = data;
      },
      (error) => {
        throwError(error);
      }
    );
  }

  private getCommentsForPost() {
    this.subs.sink = this.commentService.findByPostId(this.postId).subscribe(
      (data) => {
        this.comments = data;
      },
      (error) => {
        throwError(error);
      }
    );
  }

  public trackByFn(index, item) {
    return index;
  }
}
