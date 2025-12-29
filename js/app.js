const app = {
    data: null,
    currentMeta: null,

    getWeekNumber(d) {
        d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        return weekNo;
    },

    init() {
        this.data = Storage.load();
        UI.updateDate();
        this.viewDashboard();
        this.setupEventListeners();
    },

    setupEventListeners() {
        document.querySelectorAll('.nav-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const cat = e.currentTarget.dataset.category;
                document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
                e.currentTarget.classList.add('active');
                
                if (cat === 'dashboard') {
                    this.viewDashboard();
                } else {
                    this.viewCategory(cat);
                }
            });
        });

        document.querySelector('.close-modal').onclick = () => this.closeModal();
        document.getElementById('save-obs').onclick = () => this.saveObs();
        
        window.onclick = (event) => {
            const modal = document.getElementById('modal-obs');
            if (event.target == modal) this.closeModal();
        };
    },

    viewDashboard() {
        document.getElementById('current-view-title').textContent = 'Dashboard Geral';
        UI.renderDashboard(this.data);
    },

    viewCategory(id) {
        const cat = this.data.categories[id];
        document.getElementById('current-view-title').textContent = cat.title;
        UI.renderCategory(id, cat);
    },

    toggleMeta(catId, metaId) {
        const meta = this.data.categories[catId].metas.find(m => m.id === metaId);
        const now = new Date();
        
        meta.completed = !meta.completed;
        if (meta.completed) {
            meta.date = now.toLocaleDateString('pt-BR');
            meta.week = this.getWeekNumber(now);
            meta.month = now.getMonth() + 1;
            meta.year = now.getFullYear();
        } else {
            meta.date = null;
            meta.week = null;
            meta.month = null;
            meta.year = null;
        }
        
        Storage.save(this.data);
        this.viewCategory(catId);
    },

    openModal(catId, metaId) {
        const meta = this.data.categories[catId].metas.find(m => m.id === metaId);
        this.currentMeta = { catId, metaId };
        
        const modal = document.getElementById('modal-obs');
        const textarea = document.getElementById('obs-text');
        const historyList = document.getElementById('obs-history');
        
        textarea.value = '';
        historyList.innerHTML = (meta.history || []).map(h => `<li><strong>${h.date}:</strong> ${h.text}</li>`).join('');
        
        modal.style.display = 'flex';
    },

    closeModal() {
        document.getElementById('modal-obs').style.display = 'none';
    },

    saveObs() {
        const text = document.getElementById('obs-text').value;
        if (!text.trim()) return;

        const { catId, metaId } = this.currentMeta;
        const meta = this.data.categories[catId].metas.find(m => m.id === metaId);
        
        if (!meta.history) meta.history = [];
        meta.history.unshift({
            date: new Date().toLocaleString('pt-BR'),
            text: text
        });

        Storage.save(this.data);
        this.closeModal();
        this.viewCategory(catId);
    }
};

document.addEventListener('DOMContentLoaded', () => app.init());
