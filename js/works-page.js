/* ============================================
   works-page.js - 施工実績ページ専用
   ============================================ */

/* ── work-data.js の worksData からカードを動的生成 ── */
function renderWorksCards() {
  const grid = document.getElementById('worksCardGrid');
  if (!grid || typeof worksData === 'undefined') return;

  grid.innerHTML = worksData.map(work => {
    // summaryの最初の80文字程度を表示テキストとして使う
    const displayText = work.summary || '';
    return `
      <article class="works-card fade-in-trigger" data-category="${work.category}">
        <a href="work-detail.html?id=${work.id}" class="works-card-img-link">
          <div class="works-card-img">
            <img src="${work.image}" alt="${work.title}" loading="lazy">
            <span class="works-card-cat ${work.category}">${work.categoryLabel}</span>
          </div>
        </a>
        <div class="works-card-body">
          <time class="works-card-date" datetime="${work.date}">${work.dateLabel}</time>
          <h2 class="works-card-ttl">${work.title}</h2>
          <p class="works-card-text">${displayText}</p>
          <p class="works-card-area">📍 ${work.area}</p>
          <a href="work-detail.html?id=${work.id}" class="works-card-detail-btn">詳細を見る →</a>
        </div>
      </article>`;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {

  /* ── カード生成 ── */
  renderWorksCards();

  /* ── ハンバーガーメニュー ── */
  const menuBtn     = document.getElementById('menuBtn');
  const slideMenu   = document.getElementById('slideMenu');
  const menuTrigger = menuBtn ? menuBtn.querySelector('.menu-trigger') : null;

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      const isOpen = slideMenu.classList.toggle('open');
      menuTrigger && menuTrigger.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }
  document.querySelectorAll('.menu-link').forEach(link => {
    link.addEventListener('click', () => {
      slideMenu && slideMenu.classList.remove('open');
      menuTrigger && menuTrigger.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  /* ── カテゴリフィルター ── */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.works-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      cards.forEach(card => {
        if (cat === 'all' || card.dataset.category === cat) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ── フェードイン ── */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in-trigger').forEach((el, i) => {
    el.dataset.delay = i * 80;
    observer.observe(el);
  });

  /* ── ページトップ ── */
  const pageTop = document.querySelector('.page-top');
  if (pageTop) {
    pageTop.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
