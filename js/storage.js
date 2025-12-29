const STORAGE_KEY = 'planejamento_erick_2026_data';

const defaultData = {
    categories: {
        saude: {
            title: 'Saúde',
            icon: '🏋️',
            metas: [
                { id: 's1', text: 'Academia (4x por semana)', completed: false, date: null, obs: [], history: [] },
                { id: 's2', text: 'Consultas Médicas', completed: false, date: null, obs: [], history: [] },
                { id: 's3', text: 'Terapia', completed: false, date: null, obs: [], history: [] },
                { id: 's4', text: 'Dentista', completed: false, date: null, obs: [], history: [] }
            ]
        },
        fe: {
            title: 'Fé',
            icon: '🙏',
            metas: [
                { id: 'f1', text: 'Meta diária: 1 hora', completed: false, date: null, obs: [], history: [] },
                { id: 'f2', text: 'Estudo Bíblico', completed: false, date: null, obs: [], history: [] },
                { id: 'f3', text: 'Culto', completed: false, date: null, obs: [], history: [] }
            ]
        },
        trabalho: {
            title: 'Trabalho',
            icon: '💼',
            metas: [
                { id: 't1', text: 'Promoção para Especialista', completed: false, date: null, obs: [], history: [] },
                { id: 't2', text: 'Certificação Profissional', completed: false, date: null, obs: [], history: [] },
                { id: 't3', text: 'Treinamentos Concluídos', completed: false, date: null, obs: [], history: [] }
            ]
        },
        projetos: {
            title: 'Projetos / Novos Negócios',
            icon: '🚀',
            metas: [
                { id: 'p1', text: 'Network', completed: false, date: null, obs: [], history: [] },
                { id: 'p2', text: 'Estrutura da Empresa', completed: false, date: null, obs: [], history: [] },
                { id: 'p3', text: 'Consolidação de Negócios', completed: false, date: null, obs: [], history: [] }
            ]
        },
        casamento: {
            title: 'Casamento',
            icon: '❤️',
            metas: [
                { id: 'c1', text: 'Tempo de Qualidade', completed: false, date: null, obs: [], history: [] },
                { id: 'c2', text: 'Ações Especiais', completed: false, date: null, obs: [], history: [] }
            ]
        },
        casa: {
            title: 'Casa',
            icon: '🏠',
            metas: [
                { id: 'h1', text: 'Lista de Compras Diárias', completed: false, date: null, obs: [], history: [] },
                { id: 'h2', text: 'Planejamento de Mudança', completed: false, date: null, obs: [], history: [] },
                { id: 'h3', text: 'Planejamento de Compra (Casa/Carro)', completed: false, date: null, obs: [], history: [] }
            ]
        },
        revisoes: {
            title: 'Revisões',
            icon: '📅',
            metas: [
                { id: 'r1', text: 'Revisão Mensal', completed: false, date: null, obs: [], history: [] }
            ]
        },
        metas_estruturadas: {
            title: 'Metas Estruturadas',
            icon: '📈',
            isWeekly: true,
            metas: [
                { id: 'w1', text: 'Meta Semanal 01', completed: false, date: null, history: [] },
                { id: 'w2', text: 'Meta Semanal 02', completed: false, date: null, history: [] },
                { id: 'w3', text: 'Meta Semanal 03', completed: false, date: null, history: [] },
                { id: 'w4', text: 'Meta Semanal 04', completed: false, date: null, history: [] }
            ]
        }
    }
};

const Storage = {
    save(data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    },
    load() {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : defaultData;
    },
    updateMeta(catId, metaId, updates) {
        const data = this.load();
        const meta = data.categories[catId].metas.find(m => m.id === metaId);
        if (meta) {
            Object.assign(meta, updates);
            this.save(data);
        }
    }
};
