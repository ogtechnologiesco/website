(function () {
  'use strict';

  if (navigator.webdriver) return;
  if (navigator.doNotTrack === '1' || window.doNotTrack === '1') return;

  var ENDPOINT = '/.netlify/functions/track';
  var VID_KEY = 'ogt_vid';
  var SID_KEY = 'ogt_sid';
  var SID_TS_KEY = 'ogt_sid_ts';
  var QUEUE_KEY = 'ogt_queue';
  var SESSION_TIMEOUT_MS = 30 * 60 * 1000;
  var MAX_QUEUED = 50;

  function consentGranted() {
    try {
      var raw = localStorage.getItem('cookieConsent');
      if (!raw) return false;
      return JSON.parse(raw).analytics === true;
    } catch (e) {
      return false;
    }
  }

  function uuid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0;
      var v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  function getVisitorId() {
    var v = localStorage.getItem(VID_KEY);
    if (!v) {
      v = uuid();
      try { localStorage.setItem(VID_KEY, v); } catch (e) {}
    }
    return v;
  }

  function getSessionId() {
    var now = Date.now();
    var last = parseInt(localStorage.getItem(SID_TS_KEY) || '0', 10);
    var s = localStorage.getItem(SID_KEY);
    if (!s || now - last > SESSION_TIMEOUT_MS) {
      s = uuid();
      try { localStorage.setItem(SID_KEY, s); } catch (e) {}
    }
    try { localStorage.setItem(SID_TS_KEY, String(now)); } catch (e) {}
    return s;
  }

  function externalReferrer() {
    try {
      if (!document.referrer) return '(direct)';
      return new URL(document.referrer).host || '(direct)';
    } catch (e) {
      return '(direct)';
    }
  }

  function getQueue() {
    try {
      var q = JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]');
      return Array.isArray(q) ? q : [];
    } catch (e) {
      return [];
    }
  }

  function saveQueue(q) {
    try { localStorage.setItem(QUEUE_KEY, JSON.stringify(q.slice(-MAX_QUEUED))); } catch (e) {}
  }

  function beacon(payload) {
    try {
      return navigator.sendBeacon(
        ENDPOINT,
        new Blob([JSON.stringify(payload)], { type: 'application/json' })
      );
    } catch (e) {
      return false;
    }
  }

  function enqueue(payload) {
    var q = getQueue();
    q.push(payload);
    saveQueue(q);
  }

  function flushQueue() {
    if (!consentGranted()) return;
    var q = getQueue();
    if (!q.length) return;
    var remaining = [];
    for (var i = 0; i < q.length; i++) {
      if (!beacon(q[i])) remaining.push(q[i]);
    }
    saveQueue(remaining);
  }

  var current = null;
  var lastPath = null;

  function startPage() {
    var previousPath = lastPath;
    lastPath = location.pathname;
    current = {
      id: uuid(),
      p: location.pathname,
      r: previousPath ? 'internal:' + previousPath : externalReferrer(),
      ts: Date.now(),
      engagedMs: 0,
      visibleSince: document.visibilityState === 'visible' ? Date.now() : null,
      done: false
    };
  }

  function sendCurrent(final) {
    if (!current) return;
    if (final && current.done) return;

    if (current.visibleSince != null) {
      current.engagedMs += Date.now() - current.visibleSince;
      current.visibleSince = null;
    }

    if (final) current.done = true;

    if (!consentGranted()) return;

    enqueue({
      id: current.id,
      vid: getVisitorId(),
      sid: getSessionId(),
      p: current.p,
      t: document.title,
      r: current.r,
      ts: current.ts,
      d: current.engagedMs,
      done: final
    });
    flushQueue();
  }

  function onRouteChange() {
    sendCurrent(true);
    startPage();
  }

  ['pushState', 'replaceState'].forEach(function (method) {
    var original = history[method];
    history[method] = function () {
      var prev = location.pathname;
      var result = original.apply(this, arguments);
      if (location.pathname !== prev) onRouteChange();
      return result;
    };
  });

  window.addEventListener('popstate', function () {
    if (current && location.pathname !== current.p) onRouteChange();
  });

  document.addEventListener('visibilitychange', function () {
    if (!current) return;
    if (document.visibilityState === 'hidden') {
      sendCurrent(false);
    } else if (current.visibleSince == null) {
      current.visibleSince = Date.now();
    }
  });

  window.addEventListener('pagehide', function () {
    sendCurrent(true);
  });

  window.addEventListener('pageshow', function (e) {
    if (e.persisted && current && current.done) {
      startPage();
    }
  });

  startPage();
  flushQueue();
})();
