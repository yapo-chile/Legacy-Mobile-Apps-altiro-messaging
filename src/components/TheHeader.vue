<template>
  <div>
    <div class="header">
      <yapo-header :style="{display: ((auth.isLoggedIn) ? '' : 'none' )}"
        :publish="$t('YAPO_HEADER.PUBLISH')"
        :home-url="homeUrl"
        :publish-url="publishUrl"
        :login-url="loginUrl"
        :account-url="myAccountUrl"
        :messaging-url="messagingUrl"
        :mc-active="mcActive"
        default-avatar="//static.yapo.cl/shared/icons/header/no-img-user.svg"></yapo-header>
      <yapo-drawer
        :greeting="$t('BUILDERS.HELLO') + ', '"
        :welcome="'Bienvenido'"
        :login="'Iniciar sesión'"
        :mc-active="mcActive" 
        :login-url="loginUrl"
        :base-url="url"
        :secure-url="secureUrl">
      </yapo-drawer>
    </div>
    <div class="legacy-header">
      <header-container
        :logged="auth.isLoggedIn"
        :user-name="auth.userName"
        :secure-url="secureUrl"
        :user-image="facebook.userImage"
        @user-logout="handleLogout"
        @click-home="handleHeaderClick"
        @click-logo-home="handleHeaderClick"
        @click-login="handleHeaderClick"
        @click-account="handleHeaderClick"
        @click-my-ads="handleHeaderClick"
        @click-publish="handleHeaderClick"
        @click-help="handleHeaderClick"
        @click-search="handleHeaderClick"
        @click-fav="handleHeaderClick"
        @click-messages="handleHeaderClick"
        @click-shop="handleHeaderClick"
        @click-mobile-fav="handleHeaderClick"
        @click-mobile-yapesos="handleHeaderClick"
        @click-mobile-profile="handleHeaderClick"
        @click-mobile-subscribe="handleHeaderClick"
      />
    </div>
  </div>
</template>
<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  import { Action, State } from 'vuex-class';
  import { HeaderContainer } from '@Yapo/altiro-components';
  import { AuthState } from '@/store/modules/auth/types';
  import tags from '@/utils/Tealium';
  import utils from '@/utils/utils';
  import { FacebookDataState } from '@/store/modules/facebook/types';

  const namespace: string = 'the-landheadering';

  @Component({
    components: {
      HeaderContainer,
    },
  })
  export default class TheHeader extends Vue {
    @State('auth')
    public auth!: AuthState;

    @State('facebookData')
    public facebook!: FacebookDataState;

    @Action('logoutUser', { namespace: 'auth' })
    private logoutUser: any;

    @Action('setUserImage', { namespace: 'facebookData' })
    private setUserImage: any;

    private homeUrl: string = '';
    private url: string = '';
    private secureUrl: string = '';
    private publishUrl: string = '';
    private loginUrl: string = '';
    private mcActive: string = 'true';

    // content variables
    private messagingUrl: string = '';
    private myAccountUrl: string = '';

    private beforeMount() {
      this.url = utils.getUrl(window);
      this.secureUrl = utils.getSecureUrl(window);
      this.homeUrl = this.url;
      this.publishUrl = this.secureUrl + '/ai';
      this.loginUrl = this.secureUrl + '/login';
      this.messagingUrl = '#';
      this.myAccountUrl = this.secureUrl + '/cuenta/view';
    }
    private async created() {
      this.setUserImage();
    }

    private handleLogout(payload: any) {
      return this.logoutUser().then(() => {
        window.location.assign(payload.value);
      });
    }

    private handleHeaderClick(payload: any) {
      window.location.assign(payload.value);
    }
  }
</script>
<style lang="scss" scoped>
  .legacy-header {
    display: none;
  }
  .header {
    display: block;
  }
  @media only screen and (min-width : 768px) {
    .legacy-header {
      display: block;
      height: 103px;
    }
    .header {
      display: none;
    }
  }
</style>
