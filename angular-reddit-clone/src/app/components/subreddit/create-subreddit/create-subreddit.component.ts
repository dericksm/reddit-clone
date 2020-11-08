import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { SubredditModel } from "../../../models/subreddit-model";
import { SubredditService } from "../../../services/subreddit.service";
import { throwError } from 'rxjs';
import { SubSink } from 'subsink';

@Component({
  selector: "app-create-subreddit",
  templateUrl: "./create-subreddit.component.html",
  styleUrls: ["./create-subreddit.component.css"],
})
export class CreateSubredditComponent implements OnInit, OnDestroy {
  public formGroup: FormGroup;
  public subredditModel: SubredditModel;
  private subs = new SubSink();

  constructor(
    private router: Router,
    private subredditService: SubredditService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy(): void{
    this.subs.unsubscribe();
  }

  discard() {
    this.router.navigateByUrl("/");
  }

  createForm(): void {
    this.formGroup = new FormGroup({
      name: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required)
    });
  }

  createSubreddit() {
    const subreddit: SubredditModel = this.formGroup.value;
    this.subredditService.save(subreddit).subscribe(
      (res) => {
        this.router.navigateByUrl("/list-subreddits");
      },
      (error) => {
        throwError(error);
      }
    );
  }
}
