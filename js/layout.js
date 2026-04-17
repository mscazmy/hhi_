// Inject shared header and footer
function renderHeader(activePage) {
  const pages = [
    { href: 'index.html',       key: 'nav_home' },
    { href: 'departments.html', key: 'nav_departments' },
    { href: 'news.html',        key: 'nav_news' },
    { href: 'theses.html',      key: 'nav_theses' },
    { href: 'about.html',       key: 'nav_about' },
    { href: 'contact.html',     key: 'nav_contact' },
  ];
  const links = pages.map(p =>
    `<li><a href="${p.href}"${p.href === activePage ? ' class="active"' : ''}>${t(p.key)}</a></li>`
  ).join('');

  document.getElementById('site-header').innerHTML = `
    <div class="header-inner">
      <a href="index.html" class="logo-wrap" style="text-decoration:none">
        <img src="images/logo.jpg" alt="HHI Wasit Logo"
             style="width:44px;height:44px;border-radius:8px;object-fit:cover;flex-shrink:0;">
        <div class="logo-text">
          ${LANG === 'ar' ? 'المعهد الصحي العالي' : 'Higher Health Institution'}
          <span>${LANG === 'ar' ? 'واسط · العراق' : 'Wasit · Iraq'}</span>
        </div>
      </a>
      <div style="display:flex;align-items:center;gap:1rem">
        <div class="lang-toggle">
          <button class="lang-btn${LANG==='ar'?' active':''}" data-lang="ar" onclick="setLang('ar')">ع</button>
          <button class="lang-btn${LANG==='en'?' active':''}" data-lang="en" onclick="setLang('en')">EN</button>
        </div>
        <button class="mobile-btn" id="mobileBtn"><i class="fas fa-bars"></i></button>
      </div>
      <nav id="mainNav">
        <ul>${links}</ul>
      </nav>
    </div>`;

  const btn = document.getElementById('mobileBtn');
  const nav = document.getElementById('mainNav');
  if (btn && nav) {
    btn.addEventListener('click', () => {
      nav.classList.toggle('open');
      const icon = btn.querySelector('i');
      icon.className = nav.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
    });
  }
}

function renderFooter() {
  const mr = LANG==='ar' ? 'margin-left' : 'margin-right';
  document.getElementById('site-footer').innerHTML = `
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <div style="display:flex;align-items:center;gap:.7rem;margin-bottom:1rem">
            <img src="images/logo.jpg" alt="HHI Wasit Logo"
                 style="width:44px;height:44px;border-radius:8px;object-fit:cover;flex-shrink:0;">
            <div style="color:#fff;font-weight:700;line-height:1.2">
              ${LANG==='ar'?'المعهد الصحي العالي':'Higher Health Institution'}<br>
              <span style="font-size:.75rem;font-weight:400;color:#9ca3af">${LANG==='ar'?'واسط، العراق':'Wasit, Iraq'}</span>
            </div>
          </div>
          <p>${t('footer_tagline')}</p>
          <div class="social-row">
            <a href="#" class="social-btn"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social-btn"><i class="fab fa-twitter"></i></a>
            <a href="mailto:info@hhi-wasit.edu.iq" class="social-btn"><i class="fas fa-envelope"></i></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>${t('quick_links')}</h4>
          <ul>
            <li><a href="index.html">${t('nav_home')}</a></li>
            <li><a href="departments.html">${t('nav_departments')}</a></li>
            <li><a href="news.html">${t('nav_news')}</a></li>
            <li><a href="theses.html">${t('nav_theses')}</a></li>
            <li><a href="about.html">${t('nav_about')}</a></li>
            <li><a href="contact.html">${t('nav_contact')}</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>${t('departments_lbl')}</h4>
          <ul>
            <li><a href="departments.html#nursing">${LANG==='ar'?'التمريض':'Nursing'}</a></li>
            <li><a href="departments.html#emergency">${LANG==='ar'?'طب الطوارئ':'Emergency Medicine'}</a></li>
            <li><a href="departments.html#midwifery">${LANG==='ar'?'القبالة':'Midwifery'}</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>${t('contact_us')}</h4>
          <p><i class="fas fa-map-marker-alt" style="color:var(--teal-light);${mr}:.5rem"></i>${LANG==='ar'?'الكوت، محافظة واسط، العراق':'Al-Kut, Wasit Governorate, Iraq'}</p>
          <p><i class="fas fa-phone" style="color:var(--teal-light);${mr}:.5rem"></i>+964 23 123 4567</p>
          <p><i class="fas fa-envelope" style="color:var(--teal-light);${mr}:.5rem"></i><a href="mailto:info@hhi-wasit.edu.iq">info@hhi-wasit.edu.iq</a></p>
          <p style="margin-top:1rem"><a href="admin.html" style="color:#9ca3af;font-size:.8rem"><i class="fas fa-lock" style="${mr}:.3rem"></i>${t('admin_portal')}</a></p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} ${t('copyright')}</p>
      </div>
    </div>`;
}
