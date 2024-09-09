import { Notify } from 'quasar';

export default class NotifyUtil {
  public static yesno(message: string, agree: { (): void }) {
    Notify.create({
      icon: 'info',
      message,
      position: 'center',
      classes: 'glossy',
      color: 'md-error',
      textColor: 'md-on-error',
      progress: true,
      actions: [
        {
          label: '아니오',
          color: 'md-on-error',
          handler: () => {
            /* console.log('wooow') */
          },
        },
        {
          label: '예',
          color: 'md-on-error',
          handler: () => {
            agree();
          },
        },
      ],
      timeout: 0,
    });
  }
  public static info(message: string) {
    Notify.create({
      icon: 'info',
      message,
      classes: 'glossy',
      color: 'md-primary',
      textColor: 'md-on-primary',
      progress: true,
      position: 'center',
      timeout: 2000,
    });
  }

  public static error(message: string) {
    Notify.create({
      icon: 'report_problem',
      message,
      classes: 'glossy',
      color: 'md-error',
      textColor: 'md-on-error',
      progress: true,
      position: 'center',
      timeout: 3000,
    });
  }
}
