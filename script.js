document.addEventListener('DOMContentLoaded', () => {
    
    // 1. HEADER SCROLL EFFECT
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            header.style.padding = '15px 0';
            header.style.backgroundColor = '#ffffff';
        }
    });

    // 2. MOBILE MENU TOGGLE
    const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
    const nav = document.getElementById('nav');

    if (mobileMenuIcon && nav) {
        mobileMenuIcon.addEventListener('click', () => {
            nav.classList.toggle('active');
            // Toggle icon between bars and times
            const icon = mobileMenuIcon.querySelector('i');
            if (icon) {
                if (icon.classList.contains('fa-bars')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
            // Accessibility state
            const expanded = nav.classList.contains('active');
            mobileMenuIcon.setAttribute('aria-expanded', expanded);
        });
    }

    // Mobile nav styles moved to CSS for performance and clarity

    // 3. MENU TABS FILTERING
    const tabs = document.querySelectorAll('.menu-tab');
    const menuItems = [
        {
            category: 'principais',
            title: 'Filé Mignon ao Molho Madeira',
            micro: 'Corte nobre, suculento e macio',
            desc: 'Corte nobre grelhado, acompanhado de arroz piamontese e batatas rústicas artesanais.',
            img: 'images/dish1.jpg',
            featured: true
        },
        {
            category: 'principais',
            title: 'Salmão Grelhado com Ervas',
            micro: 'Leve, com crosta perfumada de ervas',
            desc: 'Filé de salmão fresco com crosta de ervas finas, servido com risoto de limão siciliano.',
            img: 'images/dish2.jpg',
            featured: true
        },
        {
            category: 'principais',
            title: 'Massa Artesanal da Casa',
            micro: 'Caseira e delicada, textura aveludada',
            desc: 'Fettuccine feito à mão com molho de tomates frescos, manjericão e lascas de parmesão.',
            img: 'images/dish3.jpg'
        },
        {
            category: 'entradas',
            title: 'Bruschettas Tradicionais',
            micro: 'Crocrante e fresca, aroma de manjericão',
            desc: 'Pão italiano tostado com tomates cereja, manjericão fresco e azeite extra virgem.',
            img: 'images/dish1.jpg' // Reusing images for demo
        },
        {
            category: 'entradas',
            title: 'Carpaccio de Carne',
            micro: 'Bem temperado, lâminas finas e delicadas',
            desc: 'Lâminas finas de carne bovina, alcaparras, parmesão e molho de mostarda.',
            img: 'images/dish2.jpg'
        },
        {
            category: 'sobremesas',
            title: 'Petit Gâteau de Chocolate',
            micro: 'Quente e derretido, contraste com sorvete',
            desc: 'Bolo quente de chocolate com recheio cremoso, servido com sorvete de baunilha.',
            img: 'images/dish3.jpg'
        },
        {
            category: 'sobremesas',
            title: 'Pudim de Leite Condensado',
            micro: 'Cremoso, doce na medida certa',
            desc: 'Receita tradicional da família com calda de caramelo artesanal.',
            img: 'images/dish1.jpg'
        }
    ];

    const menuGrid = document.getElementById('menu-items');

    function renderMenu(category) {
        // clear
        while (menuGrid.firstChild) menuGrid.removeChild(menuGrid.firstChild);
        const filteredItems = menuItems.filter(item => item.category === category);

        filteredItems.forEach(item => {
            const article = document.createElement('article');
            article.className = 'menu-item' + (item.featured ? ' featured' : '') + ' animate-fade';
            article.setAttribute('data-category', item.category);
            article.setAttribute('aria-label', item.title);

            const imgWrap = document.createElement('div');
            imgWrap.className = 'menu-item-image';

            const picture = document.createElement('picture');
            const stem = item.img.split('/').pop().split('.').shift();
            const source = document.createElement('source');
            source.type = 'image/webp';
            source.srcset = `images/optimized/${stem}-400.webp 400w, images/optimized/${stem}-800.webp 800w`;
            source.sizes = '(max-width:600px) 100vw, 800px';

            const img = document.createElement('img');
            img.src = item.img;
            img.alt = item.title;
            img.loading = 'lazy';

            picture.appendChild(source);
            picture.appendChild(img);
            imgWrap.appendChild(picture);

            if (item.featured) {
                const badge = document.createElement('div');
                badge.className = 'badge';
                badge.textContent = 'Destaque';
                imgWrap.appendChild(badge);
            }

            const info = document.createElement('div');
            info.className = 'menu-item-info';
            const h3 = document.createElement('h3');
            h3.textContent = item.title;
            const micro = document.createElement('p');
            micro.className = 'micro-desc';
            micro.textContent = item.micro || (item.desc ? item.desc.split('.')[0] : '');
            const full = document.createElement('p');
            full.className = 'full-desc';
            full.textContent = item.desc;

            info.appendChild(h3);
            info.appendChild(micro);
            info.appendChild(full);

            article.appendChild(imgWrap);
            article.appendChild(info);
            menuGrid.appendChild(article);
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class and aria-selected
            tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
            // Activate clicked tab
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            // Render items
            renderMenu(tab.getAttribute('data-category'));
        });
    });

    // Keyboard navigation for tabs (Left/Right/Home/End/Enter/Space)
    const tabList = document.querySelector('.menu-categories');
    if (tabList) {
        tabList.addEventListener('keydown', (e) => {
            const key = e.key;
            const current = document.activeElement;
            if (!current || !current.classList.contains('menu-tab')) return;
            let idx = Array.from(tabs).indexOf(current);
            if (key === 'ArrowRight') {
                idx = (idx + 1) % tabs.length;
                tabs[idx].focus();
                e.preventDefault();
            } else if (key === 'ArrowLeft') {
                idx = (idx - 1 + tabs.length) % tabs.length;
                tabs[idx].focus();
                e.preventDefault();
            } else if (key === 'Home') {
                tabs[0].focus();
                e.preventDefault();
            } else if (key === 'End') {
                tabs[tabs.length - 1].focus();
                e.preventDefault();
            } else if (key === 'Enter' || key === ' ') {
                // activate
                current.click();
                e.preventDefault();
            }
        });
    }

    // Render initial category (garante que o cartão padrão apareça corretamente)
    const defaultTab = document.querySelector('.menu-tab.active') || document.querySelector('.menu-tab[data-category="principais"]');
    if (defaultTab) {
        tabs.forEach(t => t.classList.remove('active'));
        defaultTab.classList.add('active');
        renderMenu(defaultTab.getAttribute('data-category'));
    }

    // Animations handled in CSS

    // 4. SMOOTH SCROLLING FOR NAV LINKS
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Close mobile menu if open
                nav.classList.remove('active');
                const icon = mobileMenuIcon.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }

                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });

});
