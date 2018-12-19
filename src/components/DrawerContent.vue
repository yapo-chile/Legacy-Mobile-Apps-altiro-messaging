<template>
  <div>
      <ul ref="yapo-drawer-content" slot="content" >
        <li class="drawer__divisor"></li>
        <li>
          <button @click="redirect(messagingUrl, true, 'messaging')" class="drawer__item drawer__item--selected">
            <div class="drawer__item-container">
              <span class="drawer__item-text">
                {{$t('YAPO_HEADER.MESSAGES')}}
              </span>
              <i class="drawer__item-icon fal fa-envelope"></i>
            </div>
          </button>
        </li>
        <li>
          <button @click="redirect(myAdsUrl, true, 'my-ads')" class="drawer__item">
            <div class="drawer__item-container">
              <span class="drawer__item-text">
                {{$t('YAPO_HEADER.ADS')}}
              </span>  
              <i class="drawer__item-icon fal fa-list-alt"></i>
            </div>
          </button>
        </li>
        <li>
          <button @click="redirect(myFavoritesUrl, true, 'my-favorites')" class="drawer__item">
            <div class="drawer__item-container">
              <span class="drawer__item-text">
                {{$t('YAPO_HEADER.FAVORITES')}}
              </span>
              <i class="drawer__item-icon custom-icon-favoritos"></i>
            </div>
          </button>
        </li>
        <li>
          <button @click="redirect(myAccountUrl, true, 'my-profile')" class="drawer__item">
            <div class="drawer__item-container">
              <span class="drawer__item-text">
                {{$t('YAPO_HEADER.ACCOUNT')}}
              </span>
              <i class="drawer__item-icon custom-icon-user-bar"></i>
            </div>
          </button>
        </li>
        <li>
          <button @click="redirect(yaPesosUrl, true, 'yapesos')" class="drawer__item">
            <div class="drawer__item-container">
              <span class="drawer__item-text">
                {{$t('YAPO_HEADER.YAPESOS')}}
              </span>  
              <i class="drawer__item-icon custom-icon-yapesos"></i>
            </div>
          </button>
        </li>
        <li>
          <button @click="redirect(buyUrl, true, 'buy')" class="drawer__item">
            <div class="drawer__item-container">
              <span class="drawer__item-text">
                {{$t('YAPO_HEADER.BUY')}}
              </span>
              <i class="drawer__item-icon fal fa-shopping-cart"></i>
            </div>
          </button>
        </li>
        <li>
          <button @click="redirect(publishUrl, false, 'publish')" class="drawer__item">
            <div class="drawer__item-container">
              <span class="drawer__item-text">
                {{$t('YAPO_HEADER.PUBLISH')}}
              </span>
              <i class="drawer__item-icon custom-icon-publicar-aviso"></i>
            </div>
          </button>
        </li>
        <li v-if="auth.isLoggedIn">
          <button @click="redirect(logoutUrl, false, 'logout')" class="drawer__item">
            <div class="drawer__item-container">
              <span class="drawer__item-text">
                {{$t('YAPO_HEADER.CLOSE')}}
              </span>
              <i class="drawer__item-icon fal fa-power-off"></i>
            </div>
          </button>
        </li>
        <li class="drawer__divisor"></li>
        <li><button @click="redirect(helpUrl, false, 'help')" class="drawer__item">{{$t('YAPO_HEADER.HELP')}}</button></li>
        <li>
          <button class="drawer__item"></button>
          <button class="drawer__item"></button>
          <button class="drawer__item"></button>
        </li>
      </ul>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { Action, State } from 'vuex-class';
  import { AuthState } from '@/store/modules/auth/types';
  import utils from '@/utils/utils';
  import CustomError from '@/utils/CustomError';

  const namespace: string = 'drawer-content';

  @Component({})
  export default class DrawerContent extends Vue {
    @State('auth')
    public auth!: AuthState;

    @Action('logoutUser', { namespace: 'auth' })
    private logoutUser: any;

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
      this.publishUrl = this.secureUrl + '/ai';
      this.loginUrl = this.secureUrl + '/login';
      this.messagingUrl = '#';
      this.myAdsUrl = this.secureUrl + '/dashboard';
      this.myFavoritesUrl = this.url + '/favoritos';
      this.myAccountUrl = this.secureUrl + '/cuenta/view';
      this.yaPesosUrl = this.secureUrl + '/yapesos';
      this.buyUrl = this.secureUrl + '/pagos/form/';
      this.logoutUrl = this.secureUrl + '/logout?exit=1';
      this.helpUrl = 'https://ayuda.yapo.cl/hc/es';
    }

    private async redirect(url: string, secure: boolean, type: 'string') {
      this.$emit(type + '::clicked');
      this.$el.dispatchEvent(new CustomEvent(type + '::clicked', {}));
      setTimeout(async () => {
        if (!secure || this.auth.isLoggedIn) {
          if (url === this.logoutUrl) {
            await this.logoutUser();
          }
          window.location.assign(url);
        } else {
          window.location.assign(this.loginUrl);
        }
      }, 800);
    }
  }
</script>
<style lang="scss" scoped>
  @import "../styles/DrawerContent";
</style>
