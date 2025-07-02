import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notification } from './notification.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private api = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  enviar(notification: {
    mensagemId: string;
    conteudoMensagem: string;
  }): Observable<any> {
    return this.http.post(`${this.api}/notificar`, notification);
  }

  consultarStatus(
    mensagemId: string
  ): Observable<{ mensagemId: string; status: string }> {
    return this.http.get<{ mensagemId: string; status: string }>(
      `${this.api}/notificacao/status/${mensagemId}`
    );
  }
}
