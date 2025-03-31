import { Injectable } from '@angular/core';
import { Comment } from '../../../../domain/models/Comment/comment';
import { CommentGateway } from '../../../../domain/models/Comment/gateway/comment-gateway';
import { environment } from '../../../../../environments/environment';
import { GenericService } from '../../../helpers/generic.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService extends CommentGateway{
  private _url = environment.backendURL;

  constructor(private genericService: GenericService) {
    super();
  }

  addComment(comment: Comment): Observable<Comment> {
    return this.genericService.post<Comment>(this._url, "comments", comment)
  }

   getBrokerComments(brokerId: number): Observable<Comment[]> {
    return this.genericService.get<Comment>(this._url, `comments/${brokerId}`);
  }

}
