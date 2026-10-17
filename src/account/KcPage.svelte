<script lang="ts">
  import Template from './Template.svelte';
  import type { KcContext } from 'keycloakify/account/KcContext';
  import type { ClassKey } from 'keycloakify/account/lib/kcClsx';
  import { untrack, type Component } from 'svelte';
  import { useI18n } from './i18n';
  import '../app.css';

  const { kcContext }: { kcContext: KcContext } = $props();

  const { i18n } = useI18n({
    kcContext: untrack(() => kcContext),
  });

  const classes = {} satisfies { [key in ClassKey]?: string };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const page = async (): Promise<{ default?: Component<any> }> => {
    switch (kcContext.pageId) {
      case 'password.ftl':
        return import('./pages/Password.svelte');
      case 'account.ftl':
        return import('./pages/Account.svelte');
      case 'sessions.ftl':
        return import('./pages/Sessions.svelte');
      case 'totp.ftl':
        return import('./pages/Totp.svelte');
      case 'applications.ftl':
        return import('./pages/Applications.svelte');
      case 'log.ftl':
        return import('./pages/Log.svelte');
      case 'federatedIdentity.ftl':
        return import('./pages/FederatedIdentity.svelte');

      default:
        return import('@keycloakify/svelte/account/DefaultPage.svelte');
    }
  };
</script>

{#await page() then { default: Page }}
  <Page
    {kcContext}
    {i18n}
    {classes}
    {Template}
    doUseDefaultCss={false}
  ></Page>
{/await}
