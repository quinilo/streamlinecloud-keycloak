<script lang="ts">
  import type { PageProps } from '@keycloakify/svelte/account/pages/PageProps';
  import { getKcClsx } from 'keycloakify/account/lib/kcClsx';
  import { clsx } from 'keycloakify/tools/clsx';
  import type { I18n } from '../i18n';
  import type { KcContext } from '../KcContext';

  const {
    kcContext,
    i18n,
    doUseDefaultCss,
    Template,
    ...props
  }: PageProps<Extract<KcContext, { pageId: 'account.ftl' }>, I18n> = $props();

  const classes = $derived({
    ...props.classes,
    kcBodyClass: clsx(props.classes?.kcBodyClass, 'user'),
  });

  const { kcClsx } = $derived(
    getKcClsx({
      doUseDefaultCss,
      classes,
    }),
  );

  const { url, realm, messagesPerField, stateChecker, account, referrer } = $derived(kcContext);

  const { msg } = $derived($i18n);

  function buildLoginUrl(action: string) {
    const realm = kcContext.realm.name;
    const accountUrl: string = kcContext.url.accountUrl;
    const base = accountUrl.split(`/realms/${realm}`)[0];

    const params = new URLSearchParams({
      client_id: 'account',
      redirect_uri: accountUrl,
      response_type: 'code',
      scope: 'openid',
      kc_action: action,
    });

    return `${base}/realms/${realm}/protocol/openid-connect/auth?${params}`;
  }
</script>

<Template
  {kcContext}
  {i18n}
  {doUseDefaultCss}
  {classes}
  active="account"
>
  <div class="max-w-[600px]">
    <div class="row">
      <div class="col-md-10">
        <h2 class="text-xl my-5">{@render msg('editAccountHtmlTitle')()}</h2>
      </div>
    </div>

    <m
      action={url.accountUrl}
      class="form-horizontal"
      method="post"
    >
      <input
        type="hidden"
        id="stateChecker"
        name="stateChecker"
        value={stateChecker}
      />

      <label
        for="username"
        class="control-label"
      >
        {@render msg('username')()}
      </label>
      <input
        type="text"
        class="input w-full"
        id="username"
        name="username"
        disabled
        value={account.username ?? ''}
      />

      <div class={clsx('form-group', messagesPerField.printIfExists('email', 'has-error'))}>
        <div class="col-sm-2 col-md-2">
          <label
            for="email"
            class="control-label"
          >
            {@render msg('email')()}
          </label>&nbsp;
          <span class="required">*</span>
        </div>

        <div class="col-sm-10 col-md-10">
          <!-- svelte-ignore a11y_autofocus -->
          <input
            type="text"
            class="input w-full"
            disabled
            id="email"
            name="email"
            autofocus
            value={account.email ?? ''}
          />
        </div>
      </div>
    </m>

    <div class="mt-2">
      <a
        href={buildLoginUrl('UPDATE_PROFILE')}
        class="btn btn-primary"
      >
        {@render msg('editAccountHtmlTitle')()}
      </a>
      <a
        class="btn btn-primary"
        href={buildLoginUrl('UPDATE_PASSWORD')}>{@render msg('changePasswordHtmlTitle')()}</a
      >
      <a
        href={buildLoginUrl('delete_account')}
        class="btn btn-error btn-soft"
      >
        Delete Account
      </a>
    </div>
  </div>
</Template>
