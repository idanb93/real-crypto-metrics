import { action, computed, makeAutoObservable, observable } from 'mobx'

interface NotificationParams {
  message: string
}

// manage the snackbar state
export class NotificationStore {
  @observable
  public isOpen: boolean = false

  @observable
  public message: string = ''

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  @action
  public show(params: NotificationParams) {
    this.message = params.message
    this.isOpen = true
  }

  @action
  public hide(params?: any) {
    this.isOpen = false
  }

  @computed
  public get notificationStatus() {
    return null
  }
}

export const notificationStore = new NotificationStore()
