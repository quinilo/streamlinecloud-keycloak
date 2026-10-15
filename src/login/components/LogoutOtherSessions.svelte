<script lang="ts">
  import type { KcClsx } from 'keycloakify/login/lib/kcClsx';
  import type { I18n } from '../i18n';
  import type { Readable } from 'svelte/store';

  const { kcClsx, i18n }: { kcClsx: KcClsx; i18n: Readable<I18n> } = $props();

  const { msg } = $derived($i18n);
</script>

<div
  id="kc-form-options"
  class={kcClsx('kcFormOptionsClass')}
>
  <label class="label my-2">
    <input
      type="checkbox"
      id="logout-sessions"
      name="logout-sessions"
      class="checkbox"
      value="on"
    />
    {@render msg('logoutOtherSessions')()}
  </label>
</div>
