import { Injectable } from '@angular/core'
import { Message, MessageService } from 'primeng/api'

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private msgService: MessageService) {}

  notifyAtTopMiddle(message: Message) {
    this.msgService.add({ ...message, key: 'tm' })
  }

  notifyAtBottomMiddle(message: Message) {
    this.msgService.add({ ...message, key: 'bm' })
  }

  notifyAtTopRight(message: Message) {
    this.msgService.add({ ...message, key: 'tr' })
  }

  registerError(message: string) {
    this.notifyAtTopMiddle({
      severity: 'error',
      summary: 'Register failed',
      detail: message,
    })
  }

  registerSuccess() {
    this.notifyAtTopRight({
      severity: 'success',
      summary: 'Register success',
      detail: 'Account successfully registered!',
    })
  }

  loginError(message: string) {
    this.notifyAtTopMiddle({
      severity: 'error',
      summary: 'Login failed',
      detail: message,
    })
  }

  loginSuccess() {
    this.notifyAtBottomMiddle({
      severity: 'success',
      summary: 'Login Success',
      detail: 'Successfully logged in!',
    })
  }

  logoutSuccess() {
    this.notifyAtTopRight({
      severity: 'success',
      summary: 'Logout Success',
      detail: 'Successfully logged out!',
    })
  }

  requireLogin() {
    this.notifyAtTopRight({
      severity: 'info',
      summary: 'Login',
      detail: 'Log-in is required!',
    })
  }
}
