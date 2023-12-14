// import Alpine from "alpinejs";

// import Splide from "@splidejs/splide";
// import "@splidejs/splide/css";

// window.Alpine = Alpine;

// Alpine.start();

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('#header').classList.add('show');

    let oldScroll = 20;
    window.addEventListener('scroll',function (e) {
        let header = document.querySelector('header')
    
        if(window.scrollY > 300){
            if (window.scrollY>oldScroll){
                header.classList.remove('show');
            } else if (window.scrollY<oldScroll){
                header.classList.add('show');
            }
            oldScroll = window.scrollY;
        }

        if(window.scrollY > 200){
            document.querySelector('.automobile').classList.add('back')
        }else{
            document.querySelector('.automobile').classList.remove('back')
        }

    });

    
    let promotionBtn = document.querySelectorAll('.promotion_btn');
    let promotionMenu = document.querySelector('.promotion')
    let promotionCloseBtn = document.querySelectorAll('.close_btn');
    let overlay = document.querySelector('.promotion .overlay');
    promotionBtn.forEach(promotionBtn => {
        promotionBtn.addEventListener('click' ,function(e){
            e.preventDefault();
            document.querySelector('#promotion').classList.add('show')
            document.body.style.overflow = 'hidden';
            document.querySelector('header').classList.add('promotion_opened')
        });
    })
    promotionCloseBtn.forEach(promotionCloseBtn => {
        promotionCloseBtn.addEventListener('click', function(e){
            e.preventDefault();
            promotionMenu.classList.remove('show');
            document.body.style.overflow = 'inherit';
            document.querySelector('header').classList.remove('promotion_opened')
        })
    })
    if(overlay)
    overlay.addEventListener('click', function(e){
        promotionMenu.classList.remove('show')
        document.body.style.overflow = 'inherit';
    })

    // SERVICES TAB
    let tabBtn = document.querySelectorAll('.tab_button')
    tabBtn.forEach(tabBtn => {
        tabBtn.addEventListener('click', function(e){
            e.preventDefault();
            if (this.classList.contains('active')) {
                this.classList.remove('active');
            } else {
                this.classList.add('active');
            }
            this.classList.remove('active');
            let parentElement = this.parentElement;

            document.querySelectorAll('.item').forEach(item => {
                if (item !== parentElement) {
                    item.classList.remove('open');
                    item.querySelector('.tab_content').classList.remove('show');
                }
            });

            parentElement.classList.toggle('open', !parentElement.classList.contains('open'));

            parentElement.children[1].classList.toggle('show', !parentElement.children[1].classList.contains('show'));
        })
    })

    document.getElementById('menuToggle').addEventListener('click', function() {
        this.classList.toggle('active');
        document.querySelector('.section_menu').classList.toggle('show')
        document.body.classList.toggle('stop_scroll')
        document.querySelector('header').classList.toggle('menu_opened')
    });
    
    document.querySelector('.section_menu .overlay').addEventListener('click', function(){
        document.querySelector('.section_menu').classList.remove('show')
        document.body.classList.remove('stop_scroll')
        document.querySelector('header').classList.remove('menu_opened')
    })

    var hero_slide = new Splide( '#hero_slide', {
        gap: 20,
        type   : 'loop',
        perPage: 3,
        pagination: false,
        autoplay: true,
        interval: 3000,
        clickable: true,
    });
    hero_slide.mount()

    var hero_mobile = new Splide( '#hero_slide_mobile', {
        gap: 10,
        type   : 'loop',
        perPage: "2",
        pagination: false,
    });
    hero_mobile.mount()

    var about_splide = new Splide( '#about_splide',{
        type: 'loop',
        pagination: false,
        width: '65%',
        gap: 20,
        breakpoints: {
            640: {
              pagination: true
        
            },
            768: {
              pagination: true,
              arrows: false
            },
            1024: {
            arrows: true,
              pagination: false,
            },
            1440: {
              pagination: false,
            },
        },
    } );
    about_splide.mount();

    var cards = new Splide( '#cards' ,{
        // type   : 'loop',
        gap: 20,
        perPage: 3,
        pagination: false,
        interval: 3000,
        breakpoints: {
            375: {
                perPage: 2,
                arrows: false,
                pagination: true
            },
            768: {
              perPage: 1,
              pagination: true,
              arrows: false
            },
            1024: {
              perPage: 2,
              pagination: false,
            },
            1440: {
              perPage: 2,
              pagination: false,
            },
            1700: {
                perPage: 2,
                pagination: false,
            },
            300: {
                perPage: 3,
                pagination: false,
            },
        },
    }).mount();

    var callback_form = new Splide( '#callback_form' ,{
        type   : 'loop',
        gap: 20,
        perPage: 1,
        pagination: false,
        interval: 3000,
        breakpoints: {
            640: {
              perPage: 1,
              pagination: true
        
            },
            768: {
              perPage: 1,
              pagination: true,
            },
            1024: {
              perPage: 1,
              pagination: false,
            },
            1440: {
              perPage: 1,
              pagination: false,
            },
        },
    }).mount();
    
    var special_offers = new Splide( '#special_offers' ,{
        type   : 'loop',
        gap: 20,
        perPage: 2,
        pagination: false,
        interval: 3000,
    }).mount();

    // Получаем все элементы .title_item и .splide__slide
    const titleItems = document.querySelectorAll('#services .swiper_titles .title_item');
    const slides = document.querySelectorAll('#services .splide__slide');

    // Инициализируем Splide
    var services = new Splide('#services', {
        // type   : 'loop',
        direction: 'ttb',
        height: '520px',
        wheel: true,
        arrows: false,
        perPage: 1,
        gap: 33,
        pagination: false,
    });
    
    // Слушаем событие изменения слайда
    services.on('moved', function (newIndex) {
        // Убираем активный класс у всех title_item
        titleItems.forEach(item => item.classList.remove('active'));

        // Добавляем активный класс текущему title_item
        titleItems[newIndex].classList.add('active');
    });

    // Добавляем обработчики событий для title_items
    titleItems.forEach((item, index) => {
        item.addEventListener('click', function () {
            // Получаем значение data-id
            const dataId = item.dataset.id;

            // Находим соответствующий слайд по id
            const targetSlide = document.querySelector(`#services .splide__slide[id="${dataId}"]`);

            // Если слайд найден, перемещаем Splide к нему
            if (targetSlide) {
                const targetIndex = Array.from(slides).indexOf(targetSlide);
                services.go(targetIndex);
            }
        });
    });

    // Монтируем Splide
    services.mount();

    console.clear() 
});