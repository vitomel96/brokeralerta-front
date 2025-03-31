import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Broker } from '../../../domain/models/Broker/broker';

@Component({
  selector: 'app-broker-dialog',
  standalone: true,
  imports: [CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatChipsModule,
    MatSlideToggleModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './broker-dialog.component.html',
  styleUrl: './broker-dialog.component.css'
})
export class BrokerDialogComponent {
  newCategory: string = '';
  broker: Broker = {
    id: 0,
    code: '',
    localShortName: '',
    localFullName: '',
    englishShortName: '',
    englishFullName: '',
    registerCountry: '',
    score: '',
    annotation: '',
    color: '',
    flag: '',
    logo: '',
    labels: undefined,
    websites: undefined,
    category: undefined,
    ico: undefined,
    ratingText: undefined,
    isEpc: undefined,
    isVr: undefined,
    offical: undefined,
    categories: undefined
  };

  constructor(
    public dialogRef: MatDialogRef<BrokerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    if (data) {
      this.broker = { ...data };
    }
  }
  ngOnInit(): void {
    if (!this.broker) {
      this.broker = {
        id: 0, // 🔹 Default value for id
        code: '',
        localShortName: '',
        localFullName: '',
        englishShortName: '',
        englishFullName: '',
        registerCountry: '',
        score: '0',
        annotation: '',
        color: '#000000',
        logo: '',
        ico: '',
        flag: '',
        isEpc: false,
        isVr: false,
        offical: false,
        categories: [],
        websites: [],
        labels: [],
        category: undefined,
        ratingText: undefined
      };
      this.broker.categories = this.broker.categories || []; // 🔹 Si es undefined, lo inicializa como []
      this.broker.websites = this.broker.websites || [];
      this.broker.labels = this.broker.labels || [];
    }
  }
  addCategory() {
    if (this.newCategory.trim()) {
      if (!this.broker.categories) {
        this.broker.categories = [];
      }

      this.broker.categories.push({ name: this.newCategory.trim() });
      this.newCategory = ''; // 🔹 Limpiar el input después de agregar
    }
  }

  removeCategory(index: number) {
    this.broker.categories.splice(index, 1);
  }

  addWebsite() {
    if (!this.broker.websites) {
      this.broker.websites = [];
    }
    this.broker.websites.push({ url: '' });
  }

  removeWebsite(index: number) {
    this.broker.websites.splice(index, 1);
  }

  addLabel() {
    if (!this.broker.labels) {
      this.broker.labels = [];
    }
    this.broker.labels.push({ labelName: '' });
  }
  removeLabel(index: number) {
    this.broker.labels.splice(index, 1);
  }

  save() {
    this.dialogRef.close(this.broker);
  }

  close() {
    this.dialogRef.close();
  }
}
