(function (global) {
  'use strict';

  var SERVICE_ORIGIN = 'https://4802b2fca850.ngrok-free.app/';
  var IFRAME_URL = SERVICE_ORIGIN + 'service';

  function createIframe(container) {
    var iframe = document.createElement('iframe');
    iframe.src = IFRAME_URL;
    iframe.style.width = '100%';
    iframe.style.height = '600px';
    iframe.style.border = 'none';

    if (!container) {
      // Если контейнер не передан → вставляем в body
      document.body.appendChild(iframe);
    } else if (typeof container === 'string') {
      var target = document.querySelector(container);
      if (!target) {
        throw new Error('Container element not found: ' + container);
      }
      target.appendChild(iframe);
    } else if (container instanceof HTMLElement) {
      container.appendChild(iframe);
    } else {
      throw new Error('Container must be a selector, DOM element or undefined');
    }

    return iframe;
  }

  function init(config) {
    if (!config || typeof config !== 'object') {
      throw new Error('Config is required');
    }
    var apiKey = config.apiKey;
    var user = config.user;
    var container = config.container || null; // можно не указывать
    var onReady = config.onReady;

    if (!apiKey) {
      throw new Error('apiKey is required');
    }
    if (!user || !user.externalId) {
      throw new Error('user.externalId is required');
    }

    var iframe = createIframe(container);

    window.addEventListener('message', function (event) {
      if (event.origin !== SERVICE_ORIGIN) return;
      if (!event.data || typeof event.data.type !== 'string') return;

      if (event.data.type === 'ready') {
        if (typeof onReady === 'function') {
          onReady(event.data.payload && event.data.payload.access_token);
        }
      }
    });

    iframe.addEventListener('load', function () {
      iframe.contentWindow.postMessage(
        {
          type: 'init',
          payload: {
            apiKey: apiKey,
            user: user
          }
        },
        SERVICE_ORIGIN
      );
    });
  }

  global.MyEmbed = { init: init };
})(window);
