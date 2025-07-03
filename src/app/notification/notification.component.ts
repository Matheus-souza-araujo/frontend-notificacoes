import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NotificationService } from './notification.service';
import { Notification } from './notification.model';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-notification',
  standalone: true,
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class NotificationComponent implements OnDestroy {
  conteudo = '';
  notificacoes: Notification[] = [];
  interval: any;

  constructor(private notificationService: NotificationService) {
    this.interval = setInterval(() => this.atualizarStatuses(), 3000);
    console.log('NotificationComponent carregado!');
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  enviar() {
    const mensagemId = uuidv4();
    const nova: Notification = {
      mensagemId,
      conteudoMensagem: this.conteudo,
      status: 'AGUARDANDO_PROCESSAMENTO',
    };

    this.notificationService.enviar(nova).subscribe(() => {
      this.notificacoes.push(nova);
      this.conteudo = '';
    });
  }

  atualizarStatuses() {
    for (const not of this.notificacoes) {
      if (not.status === 'AGUARDANDO_PROCESSAMENTO') {
        this.notificationService
          .consultarStatus(not.mensagemId)
          .subscribe((resp) => {
            not.status = resp.status;
          });
      }
    }
  }
}
