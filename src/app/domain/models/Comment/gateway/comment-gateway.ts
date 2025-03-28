import { Observable } from "rxjs";
import { Comment } from "../comment";

export abstract class CommentGateway {
  abstract addComment(comment: Comment): Observable<Comment>
  abstract getBrokerComments(brokerId: number): Observable<Comment[]>
}
