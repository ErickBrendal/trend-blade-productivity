const UI = {
    renderDashboard(data) {
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = '<div class="dashboard-grid"></div>';
        const grid = contentArea.querySelector('.dashboard-grid');

        Object.entries(data.categories).forEach(([id, cat]) => {
            const completed = cat.metas.filter(m => m.completed).length;
            const total = cat.metas.length;
            const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

            const card = document.createElement('div');
            card.className = 'category-card';
            card.innerHTML = `
                <div class="card-header">
                    <h3>${cat.icon} ${cat.title}</h3>
                    <span class="percent">${percent}%</span>
                </div>
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${percent}%"></div>
                </div>
                <p>${completed} de ${total} metas concluídas</p>
                <button class="btn-primary" style="margin-top: 1rem; width: 100%" onclick="app.viewCategory('${id}')">Ver Detalhes</button>
            `;
            grid.appendChild(card);
        });
    },

    renderCategory(id, cat) {
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = `
            <div class="category-detail">
                <button class="btn-secondary" onclick="app.viewDashboard()" style="margin-bottom: 1rem; cursor: pointer; border: none; background: none; color: var(--primary); font-weight: 600;">← Voltar ao Dashboard</button>
                <div class="category-card">
                    <div class="card-header">
                        <h3>${cat.icon} ${cat.title}</h3>
                    </div>
                    <ul class="meta-list">
                        ${cat.metas.map(meta => `
                            <li class="meta-item ${meta.completed ? 'completed' : ''}" data-id="${meta.id}">
                                <input type="checkbox" class="meta-checkbox" ${meta.completed ? 'checked' : ''} 
                                    onchange="app.toggleMeta('${id}', '${meta.id}')">
                                <div class="meta-info">
                                    <span>${meta.text}</span>
                                    ${meta.date ? `<span class="meta-date">Concluído em: ${meta.date}</span>` : ''}
                                </div>
                                <button class="btn-obs" onclick="app.openModal('${id}', '${meta.id}')">📝</button>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
        `;
    },

    updateDate() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('current-date').textContent = now.toLocaleDateString('pt-BR', options);
    }
};
