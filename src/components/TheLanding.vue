<template>
  <div>
    <yapo-header :style="{display: ((auth.isLoggedIn) ? '' : 'none' )}"
      :publish="$t('YAPO_HEADER.PUBLISH')"
      :home-url="homeUrl"
      :publish-url="publishUrl"
      :login-url="loginUrl"
      :account-url="myAccountUrl"
      :messaging-url="messagingUrl"
      default-avatar="//static.yapo.cl/shared/icons/header/no-img-user.svg"></yapo-header>
    <yapo-drawer
      :greeting="$t('BUILDERS.HELLO') + ', '"
      :welcome="'Bienvenido'"
      :login="'Iniciar sesión'"
      :login-url="loginUrl">
      <ul slot="content">
        <li class="drawer__divisor"></li>
        <li>
          <button class="drawer__item drawer__item--selected">
            <div class="drawer__item-container">
              <span class="drawer__item-text">
                {{$t('YAPO_HEADER.MESSAGES')}}
              </span>
              <i class="drawer__item-icon fal fa-envelope"></i>
            </div>
          </button>
        </li>
        <li>
          <button @click="redirect(myAdsUrl, true)" class="drawer__item">
            <div class="drawer__item-container">
              {{$t('YAPO_HEADER.ADS')}} <i class="drawer__item-icon fal fa-list-alt"></i>
            </div>
          </button>
        </li>
        <li>
          <button @click="redirect(myFavoritesUrl, true)" class="drawer__item">
            <div class="drawer__item-container">
            {{$t('YAPO_HEADER.FAVORITES')}} <i class="drawer__item-icon custom-icon-favoritos"></i>
            </div>
          </button>
        </li>
        <li>
          <button @click="redirect(myAccountUrl, true)" class="drawer__item">
            <div class="drawer__item-container">
              {{$t('YAPO_HEADER.ACCOUNT')}} <i class="drawer__item-icon custom-icon-user-bar"></i>
            </div>
          </button>
        </li>
        <li>
          <button @click="redirect(yaPesosUrl, true)" class="drawer__item">
            <div class="drawer__item-container">
              {{$t('YAPO_HEADER.YAPESOS')}} <i class="drawer__item-icon custom-icon-yapesos"></i>
            </div>
          </button>
        </li>
        <li>
          <button @click="redirect(buyUrl, true)" class="drawer__item">
            <div class="drawer__item-container">
              <span class="drawer__item-text">
                {{$t('YAPO_HEADER.BUY')}}
              </span>
              <i class="drawer__item-icon fal fa-shopping-cart"></i>
            </div>
          </button>
        </li>
        <li>
          <button @click="redirect(publishUrl, false)" class="drawer__item">
            <div class="drawer__item-container">
              {{$t('YAPO_HEADER.PUBLISH')}} <i class="drawer__item-icon custom-icon-publicar-aviso"></i>
            </div>
          </button>
        </li>
        <li v-if="auth.isLoggedIn">
          <button @click="redirect(logoutUrl, false)" class="drawer__item">
            <div class="drawer__item-container">
              {{$t('YAPO_HEADER.CLOSE')}} <i class="drawer__item-icon fal fa-power-off"></i>
            </div>
          </button>
        </li>
        <li class="drawer__divisor"></li>
        <li><button @click="redirect(helpUrl, false)" class="drawer__item">{{$t('YAPO_HEADER.HELP')}}</button></li>
        <li>
          <button class="drawer__item"></button>
          <button class="drawer__item"></button>
          <button class="drawer__item"></button>
        </li>
      </ul>
      </yapo-drawer>
    <MessagingWidget class="landing-messaging" :widgetParams="messaging.config" :faast="messaging.config" /> 
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';
import { MessagingState } from '@/store/modules/messaging/types';
import { config } from '@/assets/messagingConfig';
import { messaging } from '@/store/modules/messaging';
import { MessagingConfig } from '@/domain/entities/MessagingEntity';
import MessagingWidget from './MessagingWidget.vue';
import { AuthState } from '@/store/modules/auth/types';
import tags from '@/utils/Tealium';
import utils from '@/utils/utils';

const namespace: string = 'the-landing';

@Component({
  components: {
    MessagingWidget,
  },
})
export default class TheLanding extends Vue {
  @State('messaging')
  public messaging!: MessagingState;

  @State('auth')
  public auth!: AuthState;

  @Action('setConfig', { namespace: 'messaging' })
  private setConfig: any;

  @Action('logoutUser', { namespace: 'auth' })
  private logoutUser: any;

  private homeUrl: string = '';
  private url: string = '';
  private secureUrl: string = '';
  private publishUrl: string = '';
  private loginUrl: string = '';

  // content variables
  private messagingUrl: string = '';
  private myAdsUrl: string = '';
  private myFavoritesUrl: string = '';
  private myAccountUrl: string = '';
  private yaPesosUrl: string = '';
  private buyUrl: string = '';
  private logoutUrl: string = '';
  private helpUrl: string = '';

  private beforeMount() {
    this.url = utils.getUrl();
    this.secureUrl = utils.getSecureUrl();
    this.homeUrl = this.url;
    this.publishUrl = this.secureUrl + '/ai';
    this.loginUrl = this.secureUrl + '/login';
    this.messagingUrl = this.url + '/messaging/app';
    this.myAdsUrl = this.secureUrl + '/dashboard';
    this.myFavoritesUrl = this.url + '/favoritos';
    this.myAccountUrl = this.secureUrl + '/cuenta/view';
    this.yaPesosUrl = this.secureUrl + '/yapesos';
    this.buyUrl = this.secureUrl + '/pagos/form/';
    this.logoutUrl = this.secureUrl + '/logout?exit=1';
    this.helpUrl = 'https://ayuda.yapo.cl/hc/es';
  }
  private async created() {
    await this.setConfig({ ... config,
      format: {
        messageDate: this.formatMessageDate,
      },
      headers: {
        Authorization: this.auth.accSession,
      },
      translations: {
        status: {
          message: {
            error: Vue.i18n.translate('MESSAGING_CENTER.ERRORS.DELIVERY_FAILURE', {}),
          },
        },
        action: {
          block: Vue.i18n.translate('MESSAGING_CENTER.ACTIONS.BLOCK', {}),
          delete: Vue.i18n.translate('MESSAGING_CENTER.ACTIONS.DELETE', {}),
        },
        info: {
          writeYourMessage: Vue.i18n.translate('MESSAGING_CENTER.INFO.WRITE_YOUR_MESSAGE', {}),
          attachment: {
            sentYou: {
              single: Vue.i18n.translate('MESSAGING_CENTER.INFO.ATTACHMENT.SENT_YOU.SINGLE', {}),
              plural: Vue.i18n.translate('MESSAGING_CENTER.INFO.ATTACHMENT.SENT_YOU.PLURAL',
                {
                  numberAttachments: '%{numberAttachments}',
                }),
            },
            file: Vue.i18n.translate('MESSAGING_CENTER.INFO.ATTACHMENT.FILE', {}),
          },
        },
        error: {
          adNotAvailable: Vue.i18n.translate('MESSAGING_CENTER.ERRORS.AD_NOT_AVALAIBLE', {}),
          uploadFailed: Vue.i18n.translate('MESSAGING_CENTER.ERRORS.UPLOAD_FAILED', {}),
        },
        interaction: {
          confirmDelete:  Vue.i18n.translate('MESSAGING_CENTER.INTERACTION.CONFIRM_DELETE', {}),
        },
      },
      track: (event: string, payload: any): void => {
        utag.link({ event_name: 'messaging_center_app', data: {event, payload}});
      },
    });
  }

  private async redirect(url: string, secure: boolean) {
    if (!secure || this.auth.isLoggedIn) {
      if (url === this.logoutUrl) {
        await this.logoutUser();
      }
      window.location.assign(url);
    } else {
      window.location.assign(this.loginUrl);
    }
  }

  private formatMessageDate(data: any): string {
    let displayedDate;

    if (data.isToday) {
      displayedDate = `<strong>${data.translator('info.today')}</strong>, ${data.format('hh:mm', data.date)}`;
    } else {
      if (data.isYesterday) {
        displayedDate = `<strong>${data.translator('info.yesterday')}</strong>, ${data.format('hh:mm', data.date)}`;
      } else {
        displayedDate = `<strong>${data.format('dd-MM-yyyy', data.date)}</strong>, ${data.format('hh:mm', data.date)}`;
      }
    }
    return displayedDate;
  }

  private clickEvent(type: string) {
    tags.link({
      event_name: 'messaging_center_click',
    });
  }
}
</script>
<style lang="scss" scoped>
  @import "../styles/TheLanding";
</style>
