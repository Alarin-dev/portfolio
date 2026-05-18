document.addEventListener("DOMContentLoaded", () => {

    const slides = document.querySelectorAll('.slide');
    const slidesContainer = document.querySelector('.slides');

    let index = 0;

    function showSlide(i) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[i].classList.add('active');

        slidesContainer.style.transform = `translateX(-${i * 100}%)`;
    }

    document.getElementById('next').onclick = () => {
        index = (index + 1) % slides.length;
        showSlide(index);
    };

    document.getElementById('prev').onclick = () => {
        index = (index - 1 + slides.length) % slides.length;
        showSlide(index);
    };

    setInterval(() => {
        index = (index + 1) % slides.length;
        showSlide(index);
    }, 4000);

});





/*onclick*/
const images = document.querySelectorAll('.work-samples img');

const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const closeBtn = document.querySelector('.close');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let currentIndex = 0;

images.forEach(img => {
	img.addEventListener('click', () => {

		modal.style.display = 'flex';
		modalImg.src = img.src;
		currentIndex = Array.from(images).indexOf(img);
    });
});
/*close*/
closeBtn.addEventListener('click', () => {
	modal.style.display = 'none';
});

/*Next*/
nextBtn.addEventListener('click', () => {
	currentIndex++;
	if(currentIndex >= images.length) {
		currentIndex = 0;
	}
	modalImg.src = images[currentIndex].src;

});

/*prev*/
prevBtn.addEventListener('click', () => {
	currentIndex--;
	if(currentIndex < 0) {
		currentIndex = images.length - 1;
	}
	modalImg.src = images[currentIndex].src;
});

/*outsideClose*/
modal.addEventListener('click', (e) => {
	if(e.target === modal) {
		modal.style.display = 'none';
	}
});

/*keyboared*/

document.addEventListener('keydown', (e) => {
	if(modal.style.display === 'flex') {
		if(e.key === 'ArrowRight') {
			nextBtn.click();
		}
		if(e.key === 'ArrowLeft') {
			prevBtn.click();
		}
		if(e.key === 'Escape') {
			modal.style.display = 'none';
		}
	}

});


const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // animate once only
        }
    });
}, {
    threshold: 0.15 // trigger when 15% of element is visible
});

revealElements.forEach(el => observer.observe(el));

/* ── أنيميشن العداد للأرقام ── */
function animateCounter(el, target, prefix = '', suffix = '') {
    const isDecimal = !Number.isInteger(target);
    const duration = 1800;
    const startTime = performance.now();

    function update(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        const display = isDecimal ? value.toFixed(1) : Math.round(value).toLocaleString('ar');
        el.textContent = prefix + display + suffix;
        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

const statsData = [
    { selector: '.stats-container .stat:nth-child(1) h3', target: 130, prefix: '+' },
    { selector: '.stats-container .stat:nth-child(2) h3', target: 1.5,  prefix: '+' },
    { selector: '.stats-container .stat:nth-child(3) h3', target: 45,   prefix: '+' },
];

const statsSection = document.querySelector('.stats-container');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            statsData.forEach(({ selector, target, prefix }) => {
                const el = document.querySelector(selector);
                if (el) animateCounter(el, target, prefix);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

if (statsSection) statsObserver.observe(statsSection);

/* ── navbar blur عند التمرير ── */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, { passive: true });
