import { Component, Input } from '@angular/core';
import { Comment } from '../../../domain/models/Comment/comment';
import { CommentGateway } from '../../../domain/models/Comment/gateway/comment-gateway';
import { NgFor } from '@angular/common';
import { GenericFormModule } from '../../../infraestructure/helpers/generic-form-module/generic-form.module';

@Component({
  selector: 'app-comment-box',
  standalone: true,
  imports: [NgFor, GenericFormModule],
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.css'],
})


export class CommentBoxComponent {
  comments: Comment[] = [];
  @Input() brokerId: number = 0;
  currentPage: number = 0;
  commentsPerPage: number = 10;
  newComment: string = '';
  content: string = '';
  selectedRating: number = 0;
  hoverRating: number = 0;

  constructor(private commentGateway: CommentGateway) {
  }

  ngOnInit() {
    this.commentGateway.getBrokerComments(this.brokerId).subscribe(comments => {
      this.comments = comments;
    });
  }
  // Obtener los comentarios de la página actual
  get paginatedComments(): Comment[] {
    const start = this.currentPage * this.commentsPerPage;
    return this.comments.slice(start, start + this.commentsPerPage);
  }

  selectRating(star: number) {
    this.selectedRating = star;
    this.hoverRating = star;
  }

  // Navegar entre páginas
  nextPage() {
    if ((this.currentPage + 1) * this.commentsPerPage < this.comments.length) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  addComment() {
    if (this.newComment.trim() && this.selectedRating > 0) {
      const newComment: Comment = {
        id: 0, // El backend debería asignar el ID
        brokerId: this.brokerId,
        content: this.newComment,
        userId: 1, // Esto debería venir del usuario autenticado
        rating: this.selectedRating,
      };

      // Enviar al backend
      this.commentGateway.addComment(newComment).subscribe({
        next: (savedComment) => {
          this.comments.unshift(savedComment); // Agregar el comentario con el ID del backend
          this.resetForm();
        },
        error: (err) => console.error("Error al enviar comentario:", err),
      });
    }
  }

  // Resetear el formulario después de agregar un comentario
  private resetForm() {
    this.newComment = '';
    this.selectedRating = 0;
    this.hoverRating = 0;
  }


}
