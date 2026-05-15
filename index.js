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
		currentIndex = index;
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
