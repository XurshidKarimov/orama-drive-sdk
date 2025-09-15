(function (global) {
  'use strict';

  var SERVICE_ORIGIN = 'https://drive.orama.uz';
  var IFRAME_URL = SERVICE_ORIGIN + '/service';

  function createIframe(container) {
    var iframe = document.createElement('iframe');
    iframe.src = IFRAME_URL;
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';

    if (!container) {
      document.body.appendChild(iframe);
    } else if (typeof container === 'string') {
      var target = document.querySelector(container);
      if (!target) throw new Error('Container not found: ' + container);
      target.appendChild(iframe);
    } else if (container instanceof HTMLElement) {
      container.appendChild(iframe);
    }

    return iframe;
  }

  function init(config) {
    if (!config || typeof config !== 'object') throw new Error('Config is required');
    var { apiKey, user, container = null, onReady } = config;
    if (!apiKey) throw new Error('apiKey is required');
    if (!user || !user.externalId) throw new Error('user.externalId is required');

    var iframe = createIframe(container);

    window.addEventListener('message', function (event) {
      if (event.origin !== SERVICE_ORIGIN) return;
      if (!event.data || typeof event.data.type !== 'string') return;

      if (event.data.type === 'ready') {
        if (typeof onReady === 'function') {
          onReady(event.data.payload?.access_token);
        }
      }
    });

    iframe.addEventListener('load', function () {
      iframe.contentWindow.postMessage(
        {
          type: 'init',
          payload: { apiKey, user }
        },
        SERVICE_ORIGIN
      );
    });
  }

  global.MyEmbed = { init };
})(window);
