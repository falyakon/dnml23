class SlideStories {
    constructor(id) {
      this.init(id);
    }
  
    activeSlide(index) {
      this.active = index;
  
      if (this.items && this.thumbItems) {
        // Hide all items
        this.items.forEach((item) => item.classList.remove("active"));
  
        // Show the active item
        this.items[index].classList.add("active");
  
        // Pause all audio elements
        this.pauseAllAudio();
  
        // Play the audio associated with the active item
        const activeAudio = this.items[index].querySelector(".slide-audio");
        if (activeAudio) {
          activeAudio.play();
        }
  
        // Update thumb items
        this.updateThumbItems();
  
        // Reset auto slide timer
        this.autoSlide();
      }
    }
  
    // Pause all audio elements
    pauseAllAudio() {
      const allAudio = document.querySelectorAll(".slide-audio");
      allAudio.forEach((audio) => audio.pause());
    }
  
    prev() {
      this.activeSlide(this.active > 0 ? this.active - 1 : this.items.length - 1);
    }
  
    next() {
      this.activeSlide(this.active < this.items.length - 1 ? this.active + 1 : 0);
    }
  
    addNavigation() {
      const nextBtn = this.slide.querySelector(".slide-next");
      const prevBtn = this.slide.querySelector(".slide-prev");
  
      if (nextBtn && prevBtn) {
        // Use arrow functions to ensure the correct 'this' context
        nextBtn.addEventListener("click", () => this.next());
        prevBtn.addEventListener("click", () => this.prev());
      }
    }
  
    addThumbItems() {
      if (this.items && this.thumb) {
        // Create span elements for each item
        this.thumb.innerHTML = this.items
          .map(() => '<span class="thumb-item"></span>')
          .join("");
  
        // Store thumb items in an array
        this.thumbItems = Array.from(this.thumb.children);
  
        // Set the active class for the first thumb item
        if (this.thumbItems.length > 0) {
          this.thumbItems[0].classList.add("active");
        }
      }
    }
  
    updateThumbItems() {
      if (this.thumbItems) {
        // Remove the active class from all thumb items
        this.thumbItems.forEach((item) => item.classList.remove("active"));
  
        // Add the active class to the current thumb item
        this.thumbItems[this.active].classList.add("active");
      }
    }
  
    autoSlide() {
      clearTimeout(this.timeout);
  
      // Use arrow function to preserve 'this' context
      this.timeout = setTimeout(() => this.next(), 10000);
    }
  
    init(id) {
      document.addEventListener('DOMContentLoaded', () => {
        // Bind methods to the current instance
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
  
        this.slide = document.querySelector(`[data-slide=${id}]`);
  
        if (!this.slide) {
          console.error(`Element with data-slide=${id} not found.`);
          return;
        }
  
        this.items = Array.from(this.slide.querySelectorAll(".slide-items > *"));
        this.thumb = this.slide.querySelector(".slide-thumb");
  
        if (!this.items || !this.thumb) {
          console.error("Required elements not found.");
          return;
        }
  
        this.addThumbItems();
        this.activeSlide(0);
        this.addNavigation();
      });
    }
  }
  
  new SlideStories("slide");
  