import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GenericFormModule } from '../../../infraestructure/helpers/generic-form-module/generic-form.module';
import { UserUseCases } from '../../../domain/usecase/userusecase';
import { UserGateway } from '../../../domain/models/User/gateway/user-gateway';
import { UserService } from '../../../infraestructure/driven-adapter/services/user/user.service';
import { User } from '../../../domain/models/User/user';
import { BrokerListComponent } from "../../shared/components/broker-list/broker-list.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GenericFormModule, BrokerListComponent],
    providers: [{ provide: UserGateway, useClass: UserService }],

  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  form: FormGroup;
  users: User[] = [];

  constructor(private readonly fb: FormBuilder, private readonly userUseCase: UserUseCases) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  ngOnInit() {
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Formulario enviado', this.form.value);
    }
  }
}
