<script lang="ts">
  import type { PageProps } from '@keycloakify/svelte/account/pages/PageProps';
  import { useState } from '@keycloakify/svelte/tools/useState';
  import { getKcClsx } from 'keycloakify/account/lib/kcClsx';
  import { clsx } from 'keycloakify/tools/clsx';
  import type { KcContext } from '../KcContext';
  import type { I18n } from '../i18n';

  const {
    kcContext,
    i18n,
    doUseDefaultCss,
    Template,
    ...props
  }: PageProps<Extract<KcContext, { pageId: 'password.ftl' }>, I18n> = $props();

  const classes = $derived({
    ...props.classes,
    kcBodyClass: clsx(props.classes?.kcBodyClass, 'password'),
  });

  const { kcClsx } = $derived(
    getKcClsx({
      doUseDefaultCss,
      classes,
    }),
  );
  const { url, password, account, stateChecker } = $derived(kcContext);

  const { msgStr, msg } = $derived($i18n);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [newPasswordConfirmError, setNewPasswordConfirmError] = useState('');
  const [hasNewPasswordBlurred, setHasNewPasswordBlurred] = useState(false);
  const [hasNewPasswordConfirmBlurred, setHasNewPasswordConfirmBlurred] = useState(false);

  const checkNewPassword = (newPassword: string, $currentPassword: string) => {
    if (!password.passwordSet) {
      return;
    }

    if (newPassword === $currentPassword) {
      setNewPasswordError(msgStr('newPasswordSameAsOld'));
    } else {
      setNewPasswordError('');
    }
  };

  const checkNewPasswordConfirm = (newPasswordConfirm: string, $newPassword: string) => {
    if (newPasswordConfirm === '') {
      return;
    }

    if ($newPassword !== newPasswordConfirm) {
      setNewPasswordConfirmError(msgStr('passwordConfirmNotMatch'));
    } else {
      setNewPasswordConfirmError('');
    }
  };

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

<!-- check message reactivity -->
<Template
  kcContext={{
    ...kcContext,
    message: (() => {
      if ($newPasswordError !== '') {
        return {
          type: 'error',
          summary: $newPasswordError,
        };
      }

      if ($newPasswordConfirmError !== '') {
        return {
          type: 'error',
          summary: $newPasswordConfirmError,
        };
      }

      return kcContext.message;
    })(),
  }}
  {i18n}
  {doUseDefaultCss}
  {classes}
  active="password"
>
  <div class="row">
    <div class="col-md-10">
      <h2 class="text-xl my-5">{@render msg('changePasswordHtmlTitle')()}</h2>
    </div>
  </div>

  <a
    class="btn btn-primary"
    href={buildLoginUrl('UPDATE_PASSWORD')}>{@render msg('changePasswordHtmlTitle')()}</a
  >
</Template>
