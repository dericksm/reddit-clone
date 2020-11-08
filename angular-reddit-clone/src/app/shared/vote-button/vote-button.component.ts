import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Post } from '../../models/post-model';
import { Vote } from '../../models/vote-model';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { PostService } from '../../services/post.service';
import { ToastrService } from 'ngx-toastr';
import { VoteType } from '../../models/vote-type';
import { throwError } from 'rxjs';
import { VoteService } from '../../services/vote-service';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-vote-button',
  templateUrl: './vote-button.component.html',
  styleUrls: ['./vote-button.component.css']
})
export class VoteButtonComponent implements OnInit, OnDestroy {

  @Input() post: Post;
  
  private subs = new SubSink();
  public votePayload: Vote;
  public faArrowUp = faArrowUp;
  public faArrowDown = faArrowDown;
  public upvoteColor: string;
  public downvoteColor: string;
  public isLoggedIn: boolean;

  constructor(
    private voteService: VoteService,
    private authService: AuthService,
    private postService: PostService, private toastr: ToastrService)
  {}

  ngOnInit(): void {   
    this.votePayload = {
      voteType: undefined,
      postId: undefined
    }
    this.isLoggedIn = this.authService.isLoggedIn();
    this.updateVoteDetails();
  }  
  
  ngOnDestroy(): void {
    this.subs.unsubscribe()
  }

  upvotePost() {
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
    this.downvoteColor = '';
  }

  downvotePost() {
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
    this.upvoteColor = '';
  }

  private vote() {
    this.votePayload.postId = this.post.id;
    this.subs.sink = this.voteService.vote(this.votePayload).subscribe(() => {
      this.updateVoteDetails();
    }, error => {
      this.toastr.error(error.error.message);
      throwError(error);
    });
  }

  private updateVoteDetails() {
    this.subs.sink = this.postService.findById(this.post.id).subscribe(post => {
      this.post = post;
    });
  }

}
