(function () {
  /* ---- mobile menu ---- */
  var header = document.getElementById('header');
  var btn = document.getElementById('menuBtn');
  var menu = document.getElementById('mobileMenu');

  if (header && btn && menu) {
    var setMenu = function (open) {
      header.classList.toggle('menu-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };

    btn.addEventListener('click', function () {
      setMenu(!header.classList.contains('menu-open'));
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && header.classList.contains('menu-open')) {
        setMenu(false);
        btn.focus();
      }
    });
    var wide = window.matchMedia('(min-width: 1025px)');
    (wide.addEventListener ? wide.addEventListener.bind(wide, 'change') : wide.addListener.bind(wide))(function (e) {
      if (e.matches) setMenu(false);
    });
  }

  /* ---- contact form: sent in the background via the form endpoint (home page only) ---- */
  var form = document.getElementById('enquiry');
  var status = document.getElementById('formStatus');

  if (form && status) {
    var to = form.getAttribute('data-email');
    var submit = form.querySelector('button[type="submit"]');
    var submitLabel = submit.textContent;

    var show = function (kind, nodes) {
      status.className = 'form-status ' + kind;
      status.textContent = '';
      status.append.apply(status, nodes);
    };
    var mailLink = function (subject, body) {
      var a = document.createElement('a');
      a.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      a.textContent = to;
      return a;
    };

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.className = 'form-status';
      status.textContent = '';
      if (!form.reportValidity()) return;

      var get = function (id) { return (document.getElementById(id).value || '').trim(); };
      var name = get('f-name'), company = get('f-company'), email = get('f-email'), msg = get('f-msg');
      var subject = 'Website enquiry from ' + name + (company ? ' — ' + company : '');
      var body = 'Name: ' + name + '\nCompany: ' + company + '\nEmail: ' + email + '\n\n' + msg;

      // Bots fill the hidden field; pretend success and send nothing.
      if (get('f-website')) {
        show('ok', [form.getAttribute('data-success')]);
        form.reset();
        return;
      }

      var endpoint = form.getAttribute('action');
      var key = form.getAttribute('data-key');
      var payload = { name: name, company: company, email: email, message: msg };
      if (key) {                       // Web3Forms
        payload.access_key = key;
        payload.subject = subject;
        payload.from_name = 'Made Original website';
        payload.replyto = email;
      } else {                         // FormSubmit
        payload._subject = subject;
        payload._replyto = email;
        payload._template = 'table';
        payload._captcha = 'false';
      }

      submit.disabled = true;
      submit.textContent = form.getAttribute('data-sending') || submitLabel;

      fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          return res.json().catch(function () { return {}; }).then(function (data) {
            // FormSubmit answers success: "true" (a string), Web3Forms success: true.
            if (!res.ok || String(data.success) !== 'true') throw new Error(data.message || ('HTTP ' + res.status));
          });
        })
        .then(function () {
          show('ok', [form.getAttribute('data-success')]);
          form.reset();
        })
        .catch(function (err) {
          if (window.console) console.warn('Enquiry not sent:', err.message);
          // Keep what they typed, and offer email with the enquiry pre-filled.
          show('err', [form.getAttribute('data-error') + ' Please email us at ', mailLink(subject, body), ' — your message will be filled in for you.']);
        })
        .then(function () {
          submit.disabled = false;
          submit.textContent = submitLabel;
        });
    });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
