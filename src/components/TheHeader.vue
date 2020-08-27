<template>
  <div>
    <div class="header">
      <yapo-header :style="{display: ((isLoggedIn) ? '' : 'none' )}"
        default-avatar="//static.yapo.cl/shared/icons/header/no-img-user.svg"
        :publish="$t('YAPO_HEADER.PUBLISH')"
        :home-url="homeUrl"
        :publish-url="publishUrl"
        :login-url="loginUrl"
        :account-url="myAccountUrl"
        :messaging-url="messagingUrl"
        :mc-active="mcActive"
        :user-name="userName"
        :is-logged="isLoggedIn"
        :avatar="avatar"></yapo-header>
      <yapo-drawer
        :greeting="$t('BUILDERS.HELLO') + ', '"
        :welcome="'Bienvenido'"
        :login="'Iniciar sesión'"
        :mc-active="mcActive" 
        :login-url="loginUrl"
        :base-url="url"
        :secure-url="secureUrl"
        :user-name="userName"
        :is-logged="isLoggedIn"
        :selected-menu="'messaging'">
      </yapo-drawer>
    </div>
    <div class="legacy-header">
      <header-container
        :logged="isLoggedIn"
        :user-name="userName"
        :secure-url="secureUrl"
        :user-image="avatar"
        :show-rewards="canAccessRewards && showRewardsFlag"
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
        @click-messages="handleHeaderMessagingClick"
        @click-rewards="handleHeaderRewardsClick"
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
  import { Action, Getter, State } from 'vuex-class';
  import { HeaderContainer } from '@yapo/altiro-components';
  import { AuthState } from '@/store/modules/auth/types';
  import utag from '@/utils/Tealium';
  import utils from '@/utils/utils';

  const namespace: string = 'the-landheadering';

  @Component({
    components: {
      HeaderContainer,
    },
  })
  export default class TheHeader extends Vue {
    @Getter('userName', { namespace: 'auth' })
    private userName: any;

    @Getter('avatar', { namespace: 'auth' })
    private avatar: any;

    @Getter('isLoggedIn', { namespace: 'auth' })
    private isLoggedIn: any;

    @Getter('canAccessRewards', { namespace: 'auth' })
    private canAccessRewards: any;

    @Getter('isProFor', { namespace: 'auth' })
    private isProFor: any;

    @Getter('isProForMainCategories', { namespace: 'auth' })
    private isProForMainCategories: any;

    @Action('logoutUser', { namespace: 'auth' })
    private logoutUser: any;

    private homeUrl: string = '';
    private url: string = '';
    private secureUrl: string = '';
    private publishUrl: string = '';
    private loginUrl: string = '';
    private mcActive: string = 'true';
    private showRewardsFlag = true;

    // content variables
    private messagingUrl: string = '';
    private rewardsUrl: string = '';
    private myAccountUrl: string = '';

    private beforeMount() {
      this.url = utils.getUrl(window);
      this.secureUrl = utils.getSecureUrl(window);
      this.homeUrl = this.url;
      this.publishUrl = this.secureUrl + '/ai';
      this.loginUrl = this.secureUrl + '/login';
      this.messagingUrl = '#';
      this.rewardsUrl = `${this.url}/yapremios/app`;
      this.myAccountUrl = this.secureUrl + '/cuenta/view';
    }

    private handleLogout(payload: any) {
      return this.logoutUser().then(() => {
        window.location.assign(payload.value);
      });
    }

    private handleHeaderClick(payload: any) {
      window.location.assign(payload.value);
    }

    private handleHeaderRewardsClick(payload: any) {
      try {
        utag.link({
          event_name: 'yapremios_landing_button_to_display',
          data: {
            category_level1_id: this.isProForMainCategories,
            category_level2_id: this.isProFor,
          },
        });
      } catch (e) {
        // tslint:disable-next-line:no-console
        console.error(e);
      } finally {
        setTimeout(() => {
          window.location.assign(this.rewardsUrl);
        }, 800);
      }
    }

    private handleHeaderMessagingClick(payload: any) {
      window.location.assign(this.messagingUrl);
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
