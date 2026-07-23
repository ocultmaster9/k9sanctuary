/* K9 Sanctuary — language menu, mobile nav, copy-to-clipboard, year */
document.addEventListener('DOMContentLoaded', function () {
  // language dropdown
  const lb = document.getElementById('lang-btn');
  const lm = document.getElementById('lang-menu');
  if (lb && lm) {
    lb.addEventListener('click', function (e) { e.stopPropagation(); lm.classList.toggle('open'); });
    document.addEventListener('click', function () { lm.classList.remove('open'); });
  }
  // mobile menu
  const mt = document.getElementById('menu-toggle');
  const nl = document.getElementById('nav-links');
  if (mt && nl) mt.addEventListener('click', function () { nl.classList.toggle('open'); });

  // copy-to-clipboard (IBAN etc.)
  document.querySelectorAll('.copy').forEach(function (b) {
    b.addEventListener('click', function () {
      const text = b.getAttribute('data-copy') || '';
      const done = function () {
        const orig = b.textContent;
        b.textContent = '✓';
        b.classList.add('done');
        setTimeout(function () { b.textContent = orig; b.classList.remove('done'); }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function(){});
      } else {
        const ta = document.createElement('textarea');
        ta.value = text; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); done(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
  });

  // year
  const y = document.getElementById('yr');
  if (y) y.textContent = new Date().getFullYear();
});
