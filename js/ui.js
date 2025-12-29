const UI = {
    renderDashboard(data) {
        const contentArea = document.getElementById('content-area');
        
        // Calcular totais para o resumo
        let totalMetas = 0;
        let totalConcluidas = 0;
        Object.values(data.categories).forEach(cat => {
            totalMetas += cat.metas.length;
            totalConcluidas += cat.metas.filter(m => m.completed).length;
        });
        const totalPercent = totalMetas > 0 ? Math.round((totalConcluidas / totalMetas) * 100) : 0;
        
        const now = new Date();
        const currentWeek = app.getWeekNumber(now);
        const currentMonthName = now.toLocaleDateString('pt-BR', { month: 'long' });
        
        // Calcular metas da semana atual
        let weeklyCompleted = 0;
        Object.values(data.categories).forEach(cat => {
            weeklyCompleted += cat.metas.filter(m => m.completed && m.week === currentWeek).length;
        });

        contentArea.innerHTML = `
            <div class="stats-summary" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                <div class="category-card" style="text-align: center;">
                    <h4>Progresso Anual</h4>
                    <div style="font-size: 2rem; font-weight: 700; color: var(--primary);">${totalPercent}%</div>
                </div>
                <div class="category-card" style="text-align: center;">
                    <h4>Fechamento Semanal</h4>
                    <div style="font-size: 2rem; font-weight: 700; color: var(--warning);">Semana ${currentWeek}</div>
                    <div style="color: var(--text-muted);">${weeklyCompleted} metas concluídas</div>
                </div>
                <div class="category-card" style="text-align: center;">
                    <h4>Status Mensal</h4>
                    <div style="font-size: 1.2rem; font-weight: 600; text-transform: capitalize;">${currentMonthName}</div>
                    <div style="color: var(--text-muted);">Acompanhamento Ativo</div>
                </div>
            </div>
            <div class="dashboard-grid"></div>
        `;
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
                                    ${meta.date ? `<span class="meta-date">Concluído em: ${meta.date} (Semana ${meta.week})</span>` : ''}
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
