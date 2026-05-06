import { parseCoords } from './parseCoords';

export class Timeline {
  constructor() {
    this.posts = [];
    this.pendingText = null;

    this.timeline = document.getElementById('timeline');
    this.input = document.getElementById('messageInput');
    this.overlay = document.getElementById('modalOverlay');
    this.coordInput = document.getElementById('coordInput');
    this.modalError = document.getElementById('modalError');
    this.modalOk = document.getElementById('modalOk');
    this.modalCancel = document.getElementById('modalCancel');

    this.bindEvents();
  }

  bindEvents() {
    this.input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const text = this.input.value.trim();
        if (!text) return;
        this.input.value = '';
        this.handleNewMessage(text);
      }
    });

    this.modalOk.addEventListener('click', () => this.handleModalOk());
    this.modalCancel.addEventListener('click', () => this.closeModal());

    this.coordInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.handleModalOk();
      if (e.key === 'Escape') this.closeModal();
    });
  }

  handleNewMessage(text) {
    this.pendingText = text;

    if (!navigator.geolocation) {
      this.showModal();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude: lat, longitude: lng } = position.coords;
        this.addPost(text, { lat, lng });
        this.pendingText = null;
      },
      () => {
        this.showModal();
      },
    );
  }

  handleModalOk() {
    const value = this.coordInput.value;
    try {
      const coords = parseCoords(value);
      this.addPost(this.pendingText, coords);
      this.pendingText = null;
      this.closeModal();
    } catch (e) {
      this.coordInput.classList.add('error');
      this.modalError.textContent = e.message;
    }
  }

  showModal() {
    this.coordInput.value = '';
    this.coordInput.classList.remove('error');
    this.modalError.textContent = '';
    this.overlay.classList.add('active');
    setTimeout(() => this.coordInput.focus(), 50);
  }

  closeModal() {
    this.overlay.classList.remove('active');
    this.pendingText = null;
    this.coordInput.value = '';
    this.coordInput.classList.remove('error');
    this.modalError.textContent = '';
  }

  addPost(text, coords) {
    const now = new Date();
    const post = {
      id: Date.now(),
      text,
      coords,
      time: this.formatTime(now),
    };
    this.posts.unshift(post);
    this.renderPost(post, true);
  }

  formatTime(date) {
    const d = String(date.getDate()).padStart(2, '0');
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const y = String(date.getFullYear()).slice(2);
    const h = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    return `${d}.${m}.${y} ${h}:${min}`;
  }

  renderPost(post, prepend = false) {
    const item = document.createElement('div');
    item.className = 'timeline-item';
    item.dataset.id = post.id;

    item.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-card">
        <div class="timeline-card-header">
          <span class="timeline-card-text">${this.escapeHtml(post.text)}</span>
          <span class="timeline-card-time">${post.time}</span>
        </div>
        <div class="timeline-card-coords">
          [${post.coords.lat}, ${post.coords.lng}] 👁
        </div>
      </div>
    `;

    if (prepend) {
      this.timeline.insertBefore(item, this.timeline.firstChild);
    } else {
      this.timeline.appendChild(item);
    }
  }

  escapeHtml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
}
