import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { UserGateway } from './domain/models/User/gateway/user-gateway';
import { UserService } from './infraestructure/driven-adapter/services/user/user.service';
import { BrokerGateway } from './domain/models/Broker/gateway/broker-gateway';
import { BrokerService } from './infraestructure/driven-adapter/services/broker/broker.service';
import { CommentGateway } from './domain/models/Comment/gateway/comment-gateway';
import { CommentService } from './infraestructure/driven-adapter/services/comment/comment.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
   { provide: UserGateway, useClass: UserService },
   { provide: BrokerGateway, useClass: BrokerService },
   { provide : CommentGateway, useClass: CommentService }, provideAnimationsAsync()

  ]
};
