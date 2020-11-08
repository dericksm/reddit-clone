import { Component, OnDestroy, OnInit } from "@angular/core";
import { SubSink } from "subsink";
import { Post } from "../../models/post-model";
import { PostService } from "../../services/post.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  
  public posts: Array<Post> = [];  
  private subs = new SubSink();

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.subs.sink = this.postService.findAll().subscribe(res => {
      this.posts = res;
    })
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
