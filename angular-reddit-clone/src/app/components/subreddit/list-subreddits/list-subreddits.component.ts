import { SubredditModel } from "src/app/models/subreddit-model";
import { Component, OnInit } from "@angular/core";
import { SubredditService } from "../../../services/subreddit.service";
import { throwError } from "rxjs";
import { SubSink } from "subsink";

@Component({
  selector: "app-list-subreddits",
  templateUrl: "./list-subreddits.component.html",
  styleUrls: ["./list-subreddits.component.css"],
})
export class ListSubredditsComponent implements OnInit {

  public subreddits: Array<SubredditModel>;
  private subs = new SubSink();
  constructor(private subredditService: SubredditService) {}

  ngOnInit() {
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

  trackByFn(index, item) {
    return index;
  }
}
