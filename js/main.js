/* =========================
   BAHULUANG TRIP JS
========================= */

document.addEventListener("DOMContentLoaded", () => {

    /* MOBILE NAVBAR */
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("show");
        const icon = menuToggle.querySelector("i");
        icon.classList.toggle("fa-bars");
        icon.classList.toggle("fa-xmark");
    });

    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("show");
            const icon = menuToggle.querySelector("i");
            icon.classList.add("fa-bars");
            icon.classList.remove("fa-xmark");
        });
    });

    /* ACTIVE NAVBAR */
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-menu > a[href^='#']");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const top = section.offsetTop - 160;
            if (window.scrollY >= top) current = section.id;
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === "#" + current) {
                link.classList.add("active");
            }
        });
    });

    /* =====================================================
   GALLERY LIGHTBOX
===================================================== */

let currentGalleryIndex = 0;

const galleryItems = document.querySelectorAll(".gallery-item");


// Buka gambar
function openLightbox(element){

    // Ambil semua gallery
    const items = Array.from(
        document.querySelectorAll(".gallery-item")
    );

    // Cari posisi gambar yang diklik
    currentGalleryIndex = items.indexOf(element);

    // Ambil gambar dari element
    const image = element.querySelector("img");

    if(!image){
        return;
    }

    // Masukkan URL gambar ke lightbox
    const lightboxImage =
        document.getElementById("lightboxImage");

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

    // Tampilkan lightbox
    document
        .getElementById("lightbox")
        .classList.add("show");

    // Matikan scroll halaman
    document.body.style.overflow = "hidden";
}


// Tutup lightbox
function closeLightbox(){

    const lightbox =
        document.getElementById("lightbox");

    lightbox.classList.remove("show");

    document.body.style.overflow = "";

}


// Next / Previous
function changeImage(direction){

    const items = Array.from(
        document.querySelectorAll(".gallery-item")
    );

    if(items.length === 0){
        return;
    }

    currentGalleryIndex += direction;

    // Jika sudah gambar terakhir
    if(currentGalleryIndex >= items.length){

        currentGalleryIndex = 0;

    }

    // Jika sebelum gambar pertama
    if(currentGalleryIndex < 0){

        currentGalleryIndex = items.length - 1;

    }

    const image =
        items[currentGalleryIndex].querySelector("img");

    if(!image){
        return;
    }

    const lightboxImage =
        document.getElementById("lightboxImage");

    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;

}


// Klik background untuk menutup
document
    .getElementById("lightbox")
    .addEventListener("click", function(event){

        if(event.target === this){

            closeLightbox();

        }

    });


// Keyboard
document.addEventListener("keydown", function(event){

    const lightbox =
        document.getElementById("lightbox");

    if(!lightbox.classList.contains("show")){
        return;
    }


    // ESC
    if(event.key === "Escape"){

        closeLightbox();

    }


    // Panah kiri
    if(event.key === "ArrowLeft"){

        changeImage(-1);

    }


    // Panah kanan
    if(event.key === "ArrowRight"){

        changeImage(1);

    }

});
    /* TESTIMONIAL AUTO SLIDER */
    const track = document.getElementById("testimonialTrack");
    const cards = [...track.querySelectorAll(".testimonial-card")];
    const prevBtn = document.getElementById("prevTesti");
    const nextBtn = document.getElementById("nextTesti");
    const dotsContainer = document.getElementById("testimonialDots");

    let currentSlide = 0;
    let autoSlide;

    function getVisibleCards(){
        if(window.innerWidth <= 560) return 1;
        if(window.innerWidth <= 800) return 2;
        return 3;
    }

    function getMaxSlide(){
        return Math.max(0, cards.length - getVisibleCards());
    }

    function createDots(){
        dotsContainer.innerHTML = "";
        const total = getMaxSlide() + 1;

        for(let i = 0; i < total; i++){
            const dot = document.createElement("button");
            dot.type = "button";
            dot.addEventListener("click", () => {
                currentSlide = i;
                updateSlider();
                restartAutoSlide();
            });
            dotsContainer.appendChild(dot);
        }
    }

    function updateSlider(){
        const visible = getVisibleCards();
        const gap = 20;
        const cardWidth = (track.clientWidth - gap * (visible - 1)) / visible;
        const move = (cardWidth + gap) * currentSlide;

        track.scrollTo({
            left: move,
            behavior: "smooth"
        });

        [...dotsContainer.children].forEach((dot, index) => {
            dot.classList.toggle("active", index === currentSlide);
        });
    }

    function nextSlide(){
        const max = getMaxSlide();
        currentSlide = currentSlide >= max ? 0 : currentSlide + 1;
        updateSlider();
    }

    function prevSlide(){
        const max = getMaxSlide();
        currentSlide = currentSlide <= 0 ? max : currentSlide - 1;
        updateSlider();
    }

    function startAutoSlide(){
        autoSlide = setInterval(nextSlide, 4500);
    }

    function restartAutoSlide(){
        clearInterval(autoSlide);
        startAutoSlide();
    }

    nextBtn.addEventListener("click", () => {
        nextSlide();
        restartAutoSlide();
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
        restartAutoSlide();
    });

    window.addEventListener("resize", () => {
        currentSlide = Math.min(currentSlide, getMaxSlide());
        createDots();
        updateSlider();
    });

    createDots();
    updateSlider();
    startAutoSlide();

    /* PAUSE TESTIMONIAL WHEN HOVER */
    track.addEventListener("mouseenter", () => clearInterval(autoSlide));
    track.addEventListener("mouseleave", startAutoSlide);
});


document.addEventListener("DOMContentLoaded", function () {

    const galleryItems = document.querySelectorAll(".gallery-item");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");

    const closeBtn = document.getElementById("lightboxClose");
    const prevBtn = document.getElementById("lightboxPrev");
    const nextBtn = document.getElementById("lightboxNext");

    let currentIndex = 0;


    /* =========================
       BUKA FOTO
    ========================= */

    function showImage(index) {

        if (!galleryItems.length) return;

        if (index < 0) {
            index = galleryItems.length - 1;
        }

        if (index >= galleryItems.length) {
            index = 0;
        }

        currentIndex = index;

        const img = galleryItems[currentIndex].querySelector("img");

        if (!img) return;

        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;

        lightbox.classList.add("show");

        document.body.style.overflow = "hidden";
    }


    /* =========================
       KLIK FOTO
    ========================= */

    galleryItems.forEach(function (item, index) {

        item.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            showImage(index);

        });

    });


    /* =========================
       TUTUP
    ========================= */

    function closeLightbox() {

        lightbox.classList.remove("show");

        document.body.style.overflow = "";

        setTimeout(function () {
            lightboxImage.src = "";
        }, 200);
    }


    closeBtn.addEventListener("click", function (event) {

        event.stopPropagation();

        closeLightbox();

    });


    /* =========================
       NEXT
    ========================= */

    nextBtn.addEventListener("click", function (event) {

        event.stopPropagation();

        showImage(currentIndex + 1);

    });


    /* =========================
       PREVIOUS
    ========================= */

    prevBtn.addEventListener("click", function (event) {

        event.stopPropagation();

        showImage(currentIndex - 1);

    });


    /* =========================
       KLIK BACKGROUND
    ========================= */

    lightbox.addEventListener("click", function (event) {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });


    /* =========================
       KEYBOARD
    ========================= */

    document.addEventListener("keydown", function (event) {

        if (!lightbox.classList.contains("show")) {
            return;
        }

        if (event.key === "Escape") {

            closeLightbox();

        }

        if (event.key === "ArrowRight") {

            showImage(currentIndex + 1);

        }

        if (event.key === "ArrowLeft") {

            showImage(currentIndex - 1);

        }

    });

});