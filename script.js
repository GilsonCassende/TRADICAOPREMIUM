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
    
    mobileMenuIcon.addEventListener('click', () => {
        nav.classList.toggle('active');
        // Toggle icon between bars and times
        const icon = mobileMenuIcon.querySelector('i');
        if (icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
        // Accessibility state
        const expanded = nav.classList.contains('active');
        mobileMenuIcon.setAttribute('aria-expanded', expanded);
    });

    // Mobile nav styles moved to CSS for performance and clarity

    // 3. MENU TABS FILTERING
    const tabs = document.querySelectorAll('.menu-tab');
    const menuItems = [
        {
            category: 'principais',
            title: 'Filé Mignon ao Molho Madeira',
            desc: 'Corte nobre grelhado, acompanhado de arroz piamontese e batatas rústicas artesanais.',
            img: 'images/dish1.jpg'
        },
        {
            category: 'principais',
            title: 'Salmão Grelhado com Ervas',
            desc: 'Filé de salmão fresco com crosta de ervas finas, servido com risoto de limão siciliano.',
            img: 'images/dish2.jpg'
        },
        {
            category: 'principais',
            title: 'Massa Artesanal da Casa',
            desc: 'Fettuccine feito à mão com molho de tomates frescos, manjericão e lascas de parmesão.',
            img: 'images/dish3.jpg'
        },
        // featured examples
        {
            category: 'principais',
            title: 'Filé Mignon ao Molho Madeira',
            desc: 'Corte nobre grelhado, acompanhado de arroz piamontese e batatas rústicas artesanais.',
            img: 'images/dish1.jpg',
            featured: true
        },
        {
            category: 'principais',
            title: 'Salmão Grelhado com Ervas',
            desc: 'Filé de salmão fresco com crosta de ervas finas, servido com risoto de limão siciliano.',
            img: 'images/dish2.jpg',
            featured: true
        },
        {
            category: 'entradas',
            title: 'Bruschettas Tradicionais',
            desc: 'Pão italiano tostado com tomates cereja, manjericão fresco e azeite extra virgem.',
            img: 'images/dish1.jpg' // Reusing images for demo
        },
        {
            category: 'entradas',
            title: 'Carpaccio de Carne',
            desc: 'Lâminas finas de carne bovina, alcaparras, parmesão e molho de mostarda.',
            img: 'images/dish2.jpg'
        },
        {
            category: 'sobremesas',
            title: 'Petit Gâteau de Chocolate',
            desc: 'Bolo quente de chocolate com recheio cremoso, servido com sorvete de baunilha.',
            img: 'images/dish3.jpg'
        },
        {
            category: 'sobremesas',
            title: 'Pudim de Leite Condensado',
            desc: 'Receita tradicional da família com calda de caramelo artesanal.',
            img: 'images/dish1.jpg'
        }
    ];

    const menuGrid = document.getElementById('menu-items');

    function renderMenu(category) {
        menuGrid.innerHTML = '';
        const filteredItems = menuItems.filter(item => item.category === category);

        filteredItems.forEach(item => {
            const featuredClass = item.featured ? 'featured' : '';
            const badge = item.featured ? '<div class="badge">Destaque</div>' : '';
            const micro = item.micro || (item.desc ? item.desc.split('.')[0] : '');
            const itemHTML = `
                <div class="menu-item ${featuredClass}" style="animation: fadeIn 0.45s ease forwards">
                    <div class="menu-item-image">
                        <img src="${item.img}" alt="${item.title}">
                        ${badge}
                    </div>
                    <div class="menu-item-info">
                        <h3>${item.title}</h3>
                        <p class="micro-desc">${micro}</p>
                        <p class="full-desc">${item.desc}</p>
                    </div>
                </div>
            `;
            menuGrid.innerHTML += itemHTML;
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            // Render items
            renderMenu(tab.getAttribute('data-category'));
        });
    });

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
