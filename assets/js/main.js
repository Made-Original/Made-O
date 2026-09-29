(function () {
  /* ---- mobile menu ---- */
  var header = document.getElementById('header');
  var btn = document.getElementById('menuBtn');
  var menu = document.getElementById('mobileMenu');

  function setMenu(open) {
    header.classList.toggle('menu-open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

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

  /* ---- contact -> mailto ---- */
  var form = document.getElementById('enquiry');
  var status = document.getElementById('formStatus');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.textContent = '';
    if (!form.reportValidity()) return;

    var get = function (id) { return (document.getElementById(id).value || '').trim(); };
    var name = get('f-name'), company = get('f-company'), email = get('f-email'), msg = get('f-msg');
    var subject = 'Enquiry from ' + name + (company ? ' — ' + company : '');
    var body = 'Name: ' + name + '\nCompany: ' + company + '\nEmail: ' + email + '\n\n' + msg;

    window.location.href = 'mailto:hello@made-o.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    status.innerHTML = 'Your email app should open with the enquiry filled in. If nothing happened, write to <a href="mailto:hello@made-o.com">hello@made-o.com</a> directly.';
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
