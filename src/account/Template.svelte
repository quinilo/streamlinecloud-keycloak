<script lang="ts">
  import { useInitialize } from '@keycloakify/svelte/account/Template.useInitialize';
  import type { TemplateProps } from '@keycloakify/svelte/account/TemplateProps';
  import { useSetClassName } from '@keycloakify/svelte/tools/useSetClassName';
  import { getKcClsx } from 'keycloakify/account/lib/kcClsx';
  import { clsx } from 'keycloakify/tools/clsx';
  import { onMount, untrack } from 'svelte';
  import type { I18n } from './i18n';
  import type { KcContext } from './KcContext';
  import { kcSanitize } from 'keycloakify/lib/kcSanitize';
  import logoUrl from '../assets/streamlinecloud-logo.png';

  const { kcContext, i18n, doUseDefaultCss, active, classes, children }: TemplateProps<KcContext, I18n> = $props();
  const { kcClsx } = $derived(getKcClsx({ doUseDefaultCss, classes }));

  const { msg, msgStr, currentLanguage, enabledLanguages } = $derived($i18n);

  const { url, features, realm, message, referrer } = $derived(kcContext);

  onMount(() => {
    document.title = msgStr('accountManagementTitle');
  });

  useSetClassName({
    qualifiedName: 'html',
    className: untrack(() => kcClsx('kcHtmlClass')),
  });

  useSetClassName({
    qualifiedName: 'body',
    className: clsx(
      'admin-console',
      'user',
      untrack(() => kcClsx('kcBodyClass')),
    ),
  });

  const { isReadyToRender } = useInitialize({
    kcContext: untrack(() => kcContext),
    doUseDefaultCss: untrack(() => doUseDefaultCss),
  });
</script>

{#if $isReadyToRender}
  <div class="drawer lg:drawer-open">
    <input
      id="my-drawer-4"
      type="checkbox"
      class="drawer-toggle inline"
    />
    <div class="drawer-content">
      <!-- Navbar -->
      <nav class="navbar w-full bg-base-300">
        <label
          for="my-drawer-4"
          aria-label="open sidebar"
          class="btn btn-square btn-ghost drawer-button"
        >
          <!-- Sidebar toggle icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke-linejoin="round"
            stroke-linecap="round"
            stroke-width="2"
            fill="none"
            stroke="currentColor"
            class="my-1.5 inline-block size-4"
            ><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path
              d="M9 4v16"
            ></path><path d="M14 10l2 2l-2 2"></path></svg
          >
        </label>

        <div class="flex justify-between w-full">
          <div class="flex">
            <img
              src={logoUrl}
              alt="StreamlineCloud Logo"
              class="max-w-[40px]"
            />
            <h1 class="my-auto mx-2">Account Dashboard</h1>
          </div>

          <ul class="flex">
            {#if enabledLanguages.length}
              <div class="dropdown dropdown-end my-auto mx-2">
                <div
                  tabindex="0"
                  role="button"
                  class="m-2"
                >
                  {currentLanguage.label}
                </div>
                <ul
                  tabindex="-1"
                  class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                >
                  {#each enabledLanguages as { label, href, languageTag } (languageTag)}
                    <li class="kc-dropdown-item">
                      <a {href}>{label}</a>
                    </li>
                  {/each}
                </ul>
              </div>
            {/if}
            {#if referrer?.url}
              <li>
                <a
                  href={referrer.url}
                  id="referrer"
                >
                  {@render msg('backTo', referrer.name)()}
                </a>
              </li>
            {/if}
            <li>
              <a href={url.getLogoutUrl()} class="btn btn-soft btn-primary">{@render msg('doSignOut')()}</a>
            </li>
          </ul>
        </div>
      </nav>
      {@render children?.()}
    </div>

    <div class="drawer-side is-drawer-close:overflow-visible">
      <label
        for="my-drawer-4"
        aria-label="close sidebar"
        class="drawer-overlay"
      ></label>
      <div class="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
        <!-- Sidebar content here -->
        <ul class="menu w-full grow">
          <!-- List item -->
          <li>
            <button
              class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Homepage"
            >
              <!-- Home icon -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2"
                fill="none"
                stroke="currentColor"
                class="my-1.5 inline-block size-4"
                ><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path><path
                  d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                ></path></svg
              >
              <span class="is-drawer-close:hidden">Homepage</span>
            </button>
          </li>

          <!-- List item -->
          <li>
            <button
              class="is-drawer-close:tooltip is-drawer-close:tooltip-right"
              data-tip="Settings"
            >
              <!-- Settings icon -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke-linejoin="round"
                stroke-linecap="round"
                stroke-width="2"
                fill="none"
                stroke="currentColor"
                class="my-1.5 inline-block size-4"
                ><path d="M20 7h-9"></path><path d="M14 17H5"></path><circle
                  cx="17"
                  cy="17"
                  r="3"
                ></circle><circle
                  cx="7"
                  cy="7"
                  r="3"
                ></circle></svg
              >
              <span class="is-drawer-close:hidden">Settings</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <header class="navbar navbar-default navbar-pf navbar-main header">
    <!-- svelte-ignore a11y_no_redundant_roles -->
    <nav
      class="navbar"
      role="navigation"
    >
      <div class="navbar-header">
        <div class="container">
          <h1 class="navbar-title">Keycloak</h1>
        </div>
      </div>
      <div class="navbar-collapse navbar-collapse-1">
        <div class="container">
          <ul class="nav navbar-nav navbar-utility"></ul>
        </div>
      </div>
    </nav>
  </header>

  <div class="container">
    <div class="bs-sidebar col-sm-3">
      <ul>
        <li class={clsx(active === 'account' && 'active')}>
          <a href={url.accountUrl}>{@render msg('account')()}</a>
        </li>
        {#if features.passwordUpdateSupported}
          <li class={clsx(active === 'password' && 'active')}>
            <a href={url.passwordUrl}>{@render msg('password')()}</a>
          </li>
        {/if}
        <li class={clsx(active === 'totp' && 'active')}>
          <a href={url.totpUrl}>{@render msg('authenticator')()}</a>
        </li>
        {#if features.identityFederation}
          <li class={clsx(active === 'social' && 'active')}>
            <a href={url.socialUrl}>{@render msg('federatedIdentity')()}</a>
          </li>
        {/if}
        <li class={clsx(active === 'sessions' && 'active')}>
          <a href={url.sessionsUrl}>{@render msg('sessions')()}</a>
        </li>
        <li class={clsx(active === 'applications' && 'active')}>
          <a href={url.applicationsUrl}>{@render msg('applications')()}</a>
        </li>
        {#if features.log}
          <li class={clsx(active === 'log' && 'active')}>
            <a href={url.logUrl}>{@render msg('log')()}</a>
          </li>
        {/if}
        {#if realm.userManagedAccessAllowed && features.authorization}
          <li class={clsx(active === 'authorization' && 'active')}>
            <a href={url.resourceUrl}>{@render msg('myResources')()}</a>
          </li>
        {/if}
      </ul>
    </div>

    <div class="col-sm-9 content-area">
      {#if message !== undefined}
        <div class={clsx('alert', `alert-${message.type}`)}>
          {#if message.type === 'success'}<span class="pficon pficon-ok"></span>{/if}
          {#if message.type === 'error'}<span class="pficon pficon-error-circle-o"></span>{/if}
          <span class="kc-feedback-text">{@html kcSanitize(message.summary)}</span>
        </div>
      {/if}
    </div>
  </div>
{/if}
