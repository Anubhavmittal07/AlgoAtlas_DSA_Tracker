import React from 'react';
import { allCategories } from './Algo_List.jsx';

const Sidebar = ({ activeCategory, setActiveCategory }) => {
    return (
        <aside
            className="h-screen sticky top-0 flex flex-col pt-6 pb-10 px-3 gap-1 border-r"
            style={{
                width: '200px',
                minWidth: '200px',
                background: 'var(--navbar-bg)',
                borderColor: 'var(--sidebar-border, rgba(255,255,255,0.08))',
            }}
        >
            {/* Section label */}
            <p
                className="text-xs font-semibold uppercase tracking-widest mb-3 px-2"
                style={{ color: 'var(--card-text-color)', opacity: 0.45 }}
            >
                Categories
            </p>

            {/* All button */}
            <button
                onClick={() => setActiveCategory('all')}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 text-left"
                style={{
                    background: activeCategory === 'all' ? 'var(--sidebar-active-bg, rgba(255,255,255,0.12))' : 'transparent',
                    color: activeCategory === 'all' ? 'var(--card-text-color)' : 'var(--card-text-color)',
                    opacity: activeCategory === 'all' ? 1 : 0.65,
                    border: activeCategory === 'all' ? '1px solid var(--sidebar-active-border, rgba(255,255,255,0.18))' : '1px solid transparent',
                }}
            >
                <span style={{ fontSize: '16px' }}>⊕</span>
                <span>All</span>
            </button>

            {/* Category buttons */}
            {allCategories.map((cat) => (
                <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 text-left"
                    style={{
                        background: activeCategory === cat.key ? 'var(--sidebar-active-bg, rgba(255,255,255,0.12))' : 'transparent',
                        color: 'var(--card-text-color)',
                        opacity: activeCategory === cat.key ? 1 : 0.65,
                        border: activeCategory === cat.key ? '1px solid var(--sidebar-active-border, rgba(255,255,255,0.18))' : '1px solid transparent',
                    }}
                >
                    <span style={{ fontSize: '16px' }}>{cat.icon}</span>
                    <span>{cat.label}</span>
                </button>
            ))}
        </aside>
    );
};

export default Sidebar;
