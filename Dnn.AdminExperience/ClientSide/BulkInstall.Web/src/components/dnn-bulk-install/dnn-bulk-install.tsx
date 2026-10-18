// START persian-dnnsoftware
import { Component, Element, Host, h } from '@stencil/core';
// END persian-dnnsoftware
import store from '../../stores/store';
import { LocalizationClient } from '../../clients/localization-client';

@Component({
  tag: 'dnn-bulk-install',
  styleUrl: 'dnn-bulk-install.scss',
  shadow: false,
})
export class DnnBulkInstall {
  // START persian-dnnsoftware
  @Element() hostElement: HTMLElement;
  // END persian-dnnsoftware

  private localizationClient: LocalizationClient;

  constructor() {
    this.localizationClient = new LocalizationClient();
  }

  async componentWillLoad() {
    try {
      store.resx = this.localizationClient.getResources();
      const header = document.querySelector('#dnnBulkInstallHeader h3');
      if (header) {
        header.textContent = store.resx.nav_BulkInstall;
      }
    } catch (error) {
      console.error(error);
    }
  }

  // START persian-dnnsoftware
  /**
   * dnn-tabs renders its title buttons inside a shadow root without exposing
   * a CSS part. Add one scoped rule so this module's font variable can cross
   * that encapsulation boundary.
   * کامپوننت dnn-tabs دکمه‌های عنوان خود را داخل Shadow Root و بدون ارائه CSS Part
   * رندر می‌کند. یک قانون محدود اضافه می‌شود تا متغیر فونت این ماژول بتواند از
   * مرز کپسوله‌سازی عبور کند.
   */
  componentDidLoad() {
    const tabs = this.hostElement.querySelector('dnn-tabs');
    const shadowRoot = tabs?.shadowRoot;
    if (!shadowRoot || shadowRoot.querySelector('[data-bulk-install-font]')) {
      return;
    }

    const style = document.createElement('style');
    style.setAttribute('data-bulk-install-font', '');
    style.textContent =
      '.tabTitles button { font-family: var(--bulk-install-tabs-font-family, inherit); }';
    shadowRoot.appendChild(style);
    requestAnimationFrame(() => this.applyButtonFontStyles(this.hostElement));
  }

  /**
   * Native buttons do not reliably inherit font-family from their custom
   * element host. Walk only this module's open shadow roots and add a scoped,
   * idempotent rule to every dnn-button instance.
   * دکمه‌های بومی مرورگر همیشه font-family را به‌درستی از میزبان Custom Element
   * به ارث نمی‌برند. فقط Shadow Rootهای باز این ماژول پیمایش می‌شوند و برای هر
   * نمونه dnn-button یک قانون محدود و تکرارپذیر اضافه می‌شود.
   */
  private applyButtonFontStyles(root: ParentNode) {
    root.querySelectorAll('*').forEach((element: HTMLElement) => {
      const elementShadowRoot = element.shadowRoot;
      if (!elementShadowRoot) {
        return;
      }

      if (
        element.tagName.toLowerCase() === 'dnn-button' &&
        !elementShadowRoot.querySelector('[data-bulk-install-button-font]')
      ) {
        const buttonStyle = document.createElement('style');
        buttonStyle.setAttribute('data-bulk-install-button-font', '');
        buttonStyle.textContent =
          'button { font-family: var(--bulk-install-font-family, inherit); }';
        elementShadowRoot.appendChild(buttonStyle);
      }

      this.applyButtonFontStyles(elementShadowRoot);
    });
  }
  // END persian-dnnsoftware

  render() {
    return (
      <Host>
        <div class="container">
          <dnn-tabs>
            <dnn-tab tabTitle={store.resx.Install}>
              <div class="tab-content">
                <dnn-bi-install></dnn-bi-install>
              </div>
            </dnn-tab>
            <dnn-tab tabTitle={store.resx.Events}>
              <div class="tab-content">
                <dnn-bi-logs></dnn-bi-logs>
              </div>
            </dnn-tab>
            <dnn-tab tabTitle={store.resx.ApiUsers}>
              <div class="tab-content">
                <dnn-bi-api-users></dnn-bi-api-users>
              </div>
            </dnn-tab>
            <dnn-tab tabTitle={store.resx.IPSafeList}>
              <div class="tab-content">
                <dnn-bi-ip-safelist></dnn-bi-ip-safelist>
              </div>
            </dnn-tab>
          </dnn-tabs>
        </div>
      </Host>
    );
  }
}
