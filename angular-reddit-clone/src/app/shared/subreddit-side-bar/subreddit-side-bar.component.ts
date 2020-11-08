import { Component, OnDestroy, OnInit } from "@angular/core";
import { SubredditModel } from "src/app/models/subreddit-model";
import { SubSink } from "subsink";
import { SubredditService } from "../../services/subreddit.service";

@Component({
  selector: "app-subreddit-side-bar",
  templateUrl: "./subreddit-side-bar.component.html",
  styleUrls: ["./subreddit-side-bar.component.css"],
})
export class SubredditSideBarComponent implements OnInit, OnDestroy {
  public subreddits: Array<SubredditModel> = [];
  public displayViewAll: boolean;
  private subs = new SubSink();

  constructor(private subredditService: SubredditService) {}

  ngOnInit(): void {
    this.subs.sink = this.subredditService.findAll().subscribe((data) => {
      if (data.length > 3) {
        this.subreddits = data.splice(0, 3);
        this.displayViewAll = true;
      } else {
        this.subreddits = data;
      }
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  trackByFn(index, item) {
    return index;
  }
}
