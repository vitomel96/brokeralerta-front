import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../../domain/models/User/user';

@Component({
  selector: 'app-users-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule
  ],
  templateUrl: './users-dialog.component.html',
  styleUrl: './users-dialog.component.css'
})
export class UserDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User | null
  ) {
    this.form = this.fb.group({
      name: [data?.name || '', Validators.required],
      lastName: [data?.lastName || '', Validators.required],
      email: [data?.email || '', [Validators.required, Validators.email]],
      password: ['', data ? [] : [Validators.required, Validators.minLength(6)]], // solo en creación
      role: [data?.role],
      phoneNumber: [data?.phoneNumber || ''],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const user: User = {
        ...this.data,
        ...this.form.value
      };
      this.dialogRef.close(user);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
