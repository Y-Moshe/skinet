import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { delay, Observable } from 'rxjs'

import { utilsService } from '@/services'
import { IAddress, ILoginResponse, IUser } from '@/types'
import { environment } from 'src/environments/environment'

const STORAGE_KEY = 'authToken'
const baseUrl = environment.apiUrl + '/account'

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private httpService: HttpClient) {}

  public register(user: IUser): Observable<ILoginResponse> {
    return this.httpService.post<ILoginResponse>(`${baseUrl}/register`, user)
  }

  public login(email: string, password: string): Observable<ILoginResponse> {
    const data = { email, password }
    return this.httpService.post<ILoginResponse>(`${baseUrl}/login`, data)
  }

  public logout(): Observable<any> {
    return new Observable((_) => {
      _.next()
      _.complete()
    }).pipe(delay(1000))
  }

  public isEMailExists(email: string): Observable<boolean> {
    return this.httpService.get<boolean>(`${baseUrl}/exists?email=${email}`)
  }

  public getLoggedInUser(): Observable<IUser> {
    return this.httpService.get<IUser>(baseUrl)
  }

  public getUserAddress(): Observable<IAddress> {
    return this.httpService.get<IAddress>(`${baseUrl}/address`)
  }

  public saveUserAddress(address: IAddress): Observable<IAddress> {
    return this.httpService.put<IAddress>(`${baseUrl}/address`, address)
  }

  public saveAuthToken(token: string): void {
    utilsService.saveToStorage(STORAGE_KEY, token)
  }

  public loadAuthToken(): string | null {
    return utilsService.loadFromStorage<string>(STORAGE_KEY)
  }

  public clearAuthToken(): void {
    localStorage.removeItem(STORAGE_KEY)
  }
}
