// Quick Fix for Tools Display Issue
// This ensures tools show up properly in ranking order

'use strict';

// Force initialization when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Tools Fix: Starting initialization...');
    
    // Wait a bit for other scripts to load
    setTimeout(initializeToolsFix, 500);
});

function initializeToolsFix() {
    // Check if we're on tools page
    const isToolsPage = window.location.pathname.includes('tools.html') || 
                       window.location.pathname.includes('/tools/');
    
    if (!isToolsPage) {
        console.log('ℹ️ Not on tools page, skipping fix');
        return;
    }
    
    console.log('🔧 Applying tools fix...');
    
    // Find the dynamic grid
    let toolsGrid = document.getElementById('dynamic-tools-grid');
    
    if (!toolsGrid) {
        console.error('❌ Dynamic tools grid not found');
        return;
    }
    
    // Check if main dynamic system is already working
    if (window.DynamicToolsApp && window.DynamicToolsApp.state.allTools.length > 0) {
        console.log('ℹ️ Main dynamic system is working, skipping fix');
        return;
    }
    
    // Clear any existing content
    toolsGrid.innerHTML = '';
    
    // Check if database is available
    if (!window.AI_TOOLS_DATABASE || !Array.isArray(window.AI_TOOLS_DATABASE)) {
        console.error('❌ AI_TOOLS_DATABASE not available');
        showFallbackTools(toolsGrid);
        hideLoadingSpinner();
        setupFilterButtonsBackup();
        return;
    }
    
    console.log(`📊 Found ${window.AI_TOOLS_DATABASE.length} tools in database`);
    
    // Calculate rankings and display top 15
    const rankedTools = calculateAndRankTools(window.AI_TOOLS_DATABASE);
    const top15Tools = rankedTools.slice(0, 15);
    
    console.log(`🏆 Displaying top ${top15Tools.length} tools`);
    
    // Render tools
    renderToolsDirectly(toolsGrid, top15Tools);
    
    // Update UI counters
    updateToolsCounter(top15Tools.length, rankedTools.length);
    
    // Hide loading spinner
    hideLoadingSpinner();
    
    // Setup filter buttons for this fix
    setupFilterButtonsBackup();
    
    console.log('✅ Tools fix applied successfully');
}

function calculateAndRankTools(tools, sortBy = 'rank') {
    return tools
        .map(tool => ({
            ...tool,
            rankingScore: calculateRankingScore(tool)
        }))
        .sort((a, b) => b.rankingScore - a.rankingScore);
}

function calculateRankingScore(tool) {
    const weights = {
        popularity: 0.25,
        trustScore: 0.20,
        innovation: 0.18,
        growth: 0.12,
        trendingScore: 0.15,
        marketShare: 0.10
    };
    
    const normalizedGrowth = Math.min(tool.growth / 50 * 100, 100);
    
    const baseScore = (
        tool.marketData.popularity * weights.popularity +
        tool.marketData.trustScore * weights.trustScore +
        tool.marketData.innovation * weights.innovation +
        normalizedGrowth * weights.growth +
        tool.marketData.trendingScore * weights.trendingScore +
        tool.marketData.marketShare * weights.marketShare
    );
    
    // Apply bonuses
    const premiumBonus = tool.isPremium ? 5 : 0;
    const sponsoredBonus = tool.isSponsored ? 3 : 0;
    
    return baseScore + premiumBonus + sponsoredBonus;
}

function renderToolsDirectly(container, tools) {
    const toolsHTML = tools.map((tool, index) => {
        const rank = index + 1;
        const trendIcon = tool.marketData.lastWeekChange > 0 ? '↗' : 
                         tool.marketData.lastWeekChange < 0 ? '↘' : '→';
        const trendClass = tool.marketData.lastWeekChange > 0 ? 'trend-up' : 
                          tool.marketData.lastWeekChange < 0 ? 'trend-down' : '';
        const isTopTier = rank <= 3;
        const isPremiumFeatured = tool.isPremium && rank <= 5;
        
        return `
            <article class="tool-card ${isTopTier ? 'tool-card--featured' : ''} ${tool.isSponsored ? 'tool-card--sponsored' : ''}" 
                     data-tool-id="${tool.id}" 
                     data-category="${tool.category}" 
                     data-rank="${rank}"
                     tabindex="0" 
                     role="button">
                
                ${tool.isSponsored ? '<div class="sponsored-badge">Sponsored</div>' : ''}
                ${isPremiumFeatured ? '<div class="premium-badge">Premium Pick</div>' : ''}
                
                <div class="tool-card__rank">
                    <span class="rank-number">${rank}</span>
                    ${rank === 1 ? '<span class="rank-badge">🏆</span>' : ''}
                    ${rank === 2 ? '<span class="rank-badge">🥈</span>' : ''}
                    ${rank === 3 ? '<span class="rank-badge">🥉</span>' : ''}
                    ${rank <= 10 && !isTopTier ? '<span class="rank-badge">⭐</span>' : ''}
                </div>
                
                <div class="tool-card__header">
                    <div class="tool-card__icon">
                        <img src="${tool.icon}" 
                             alt="${tool.name} icon" 
                             width="48" 
                             height="48" 
                             loading="lazy"
                             onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'48\\' height=\\'48\\' viewBox=\\'0 0 48 48\\'%3E%3Crect width=\\'48\\' height=\\'48\\' fill=\\'%23f0f0f0\\'/%3E%3Ctext x=\\'50%25\\' y=\\'50%25\\' text-anchor=\\'middle\\' dominant-baseline=\\'middle\\' font-size=\\'16\\' fill=\\'%23666\\'%3E🤖%3C/text%3E%3C/svg%3E'">
                    </div>
                    <div class="tool-card__title-area">
                        <h3 class="tool-card__title">
                            <a href="${tool.url}" 
                               target="_blank" 
                               rel="noopener"
                               class="tool-card__link">
                                ${tool.name}
                            </a>
                        </h3>
                        <div class="tool-card__category">${getCategoryName(tool.category)}</div>
                        <div class="tool-card__company">by ${tool.company}</div>
                    </div>
                </div>
                
                <p class="tool-card__description">${tool.description}</p>
                
                <div class="tool-card__metrics">
                    <div class="metric">
                        <span class="metric-value">${tool.rating}</span>
                        <span class="metric-label">Rating</span>
                    </div>
                    <div class="metric">
                        <span class="metric-value">${tool.users}</span>
                        <span class="metric-label">Users</span>
                    </div>
                    <div class="metric">
                        <span class="metric-value ${trendClass}">
                            ${trendIcon} ${Math.abs(tool.marketData.lastWeekChange).toFixed(1)}%
                        </span>
                        <span class="metric-label">7-day Change</span>
                    </div>
                </div>
                
                <div class="tool-card__pricing">
                    <span class="price-badge ${tool.pricing.range[0] === 0 ? 'price-badge--free' : ''}">
                        ${tool.pricing.type}
                    </span>
                    <span class="price-details">${tool.pricing.cost}</span>
                </div>
                
                <div class="tool-card__tags">
                    ${tool.tags.slice(0, 4).map(tag => `<span class="tag">${tag}</span>`).join('')}
                    ${tool.tags.length > 4 ? `<span class="tag tag--more">+${tool.tags.length - 4}</span>` : ''}
                </div>
                
                <div class="tool-card__footer">
                    <div class="tool-card__stats">
                        <span class="stat-item">
                            <span class="stat-label">Score:</span>
                            <span class="stat-value">${tool.rankingScore.toFixed(1)}</span>
                        </span>
                        <span class="stat-item">
                            <span class="stat-label">Updated:</span>
                            <span class="stat-value">Just now</span>
                        </span>
                    </div>
                    <button class="tool-card__favorite" 
                            onclick="console.log('Favorited: ${tool.name}')" 
                            aria-label="Add ${tool.name} to favorites">
                        <span class="favorite-icon">♡</span>
                    </button>
                </div>
            </article>
        `;
    }).join('');
    
    container.innerHTML = toolsHTML;
    
    // Add click handlers for cards
    container.querySelectorAll('.tool-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.closest('a, button')) {
                const link = this.querySelector('.tool-card__link');
                if (link) {
                    window.open(link.href, '_blank', 'noopener');
                }
            }
        });
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const link = this.querySelector('.tool-card__link');
                if (link) {
                    window.open(link.href, '_blank', 'noopener');
                }
            }
        });
    });
}

function getCategoryName(category) {
    const categories = {
        writing: 'Writing & Content',
        coding: 'Coding & Development',
        design: 'Design & Creative',
        business: 'Business & Analytics',
        research: 'Research & Analysis',
        productivity: 'Productivity'
    };
    return categories[category] || category;
}

function updateToolsCounter(displayed, total) {
    const visibleCount = document.getElementById('visible-count');
    const totalCount = document.getElementById('total-count');
    const lastUpdate = document.getElementById('last-update-time');
    
    if (visibleCount) visibleCount.textContent = displayed;
    if (totalCount) totalCount.textContent = total;
    if (lastUpdate) lastUpdate.textContent = 'Just now';
}

function hideLoadingSpinner() {
    const loadingSpinner = document.getElementById('tools-loading');
    if (loadingSpinner) {
        loadingSpinner.style.display = 'none';
    }
}

function showFallbackTools(container) {
    console.log('📦 Showing fallback tools...');
    
    const fallbackTools = [
        { name: 'ChatGPT', company: 'OpenAI', category: 'writing', url: 'https://chat.openai.com', rating: 4.8 },
        { name: 'Midjourney', company: 'Midjourney', category: 'design', url: 'https://www.midjourney.com', rating: 4.7 },
        { name: 'GitHub Copilot', company: 'GitHub', category: 'coding', url: 'https://github.com/features/copilot', rating: 4.6 },
        { name: 'Claude 3', company: 'Anthropic', category: 'writing', url: 'https://claude.ai', rating: 4.7 },
        { name: 'Perplexity AI', company: 'Perplexity', category: 'research', url: 'https://www.perplexity.ai', rating: 4.5 }
    ];
    
    const fallbackHTML = fallbackTools.map((tool, index) => `
        <div class="tool-card" style="padding: 1rem; border: 1px solid #e5e7eb; border-radius: 12px; margin-bottom: 1rem;">
            <h3>${index + 1}. ${tool.name}</h3>
            <p>by ${tool.company} | ${getCategoryName(tool.category)} | Rating: ${tool.rating}</p>
            <a href="${tool.url}" target="_blank" rel="noopener">Visit Tool →</a>
        </div>
    `).join('');
    
    container.innerHTML = fallbackHTML;
}

// Backup filter functionality when main dynamic system fails
function setupFilterButtonsBackup() {
    console.log('🔧 Setting up backup filter buttons...');
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sort-select');
    const searchInput = document.getElementById('search-input');
    
    if (filterButtons.length === 0) {
        console.warn('⚠️ No filter buttons found');
        return;
    }
    
    // Remove existing listeners and add new ones
    filterButtons.forEach(button => {
        // Clone button to remove all existing event listeners
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        // Add click handler
        newButton.addEventListener('click', function(e) {
            handleCategoryFilterBackup(e.target.dataset.category);
        });
        
        // Add keyboard handler
        newButton.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCategoryFilterBackup(e.target.dataset.category);
            }
        });
    });
    
    // Setup sort handler
    if (sortSelect) {
        const newSortSelect = sortSelect.cloneNode(true);
        sortSelect.parentNode.replaceChild(newSortSelect, sortSelect);
        newSortSelect.addEventListener('change', function(e) {
            handleSortChangeBackup(e.target.value);
        });
    }
    
    // Setup search handler
    if (searchInput) {
        const newSearchInput = searchInput.cloneNode(true);
        searchInput.parentNode.replaceChild(newSearchInput, searchInput);
        newSearchInput.addEventListener('input', debounce(function(e) {
            handleSearchBackup(e.target.value);
        }, 300));
    }
    
    console.log('✅ Backup filter buttons setup complete');
}

let currentFilters = {
    category: 'all',
    sort: 'rank',
    search: ''
};

function handleCategoryFilterBackup(category) {
    console.log(`🔧 Backup filter: ${category}`);
    
    // Update button states
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
    });
    
    const activeButton = document.querySelector(`[data-category="${category}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
        activeButton.setAttribute('aria-pressed', 'true');
    }
    
    // Update filters and re-render
    currentFilters.category = category;
    applyFiltersBackup();
}

function handleSortChangeBackup(sortBy) {
    console.log(`🔧 Backup sort: ${sortBy}`);
    currentFilters.sort = sortBy;
    applyFiltersBackup();
}

function handleSearchBackup(query) {
    console.log(`🔧 Backup search: ${query}`);
    currentFilters.search = query.toLowerCase().trim();
    applyFiltersBackup();
}

function applyFiltersBackup() {
    if (!window.AI_TOOLS_DATABASE || !Array.isArray(window.AI_TOOLS_DATABASE)) {
        console.error('❌ Database not available for filtering');
        return;
    }
    
    let filteredTools = [...window.AI_TOOLS_DATABASE];
    
    // Apply category filter
    if (currentFilters.category !== 'all') {
        filteredTools = filteredTools.filter(tool => 
            tool.category === currentFilters.category
        );
    }
    
    // Apply search filter
    if (currentFilters.search) {
        const query = currentFilters.search;
        filteredTools = filteredTools.filter(tool => 
            tool.name.toLowerCase().includes(query) ||
            tool.description.toLowerCase().includes(query) ||
            tool.company.toLowerCase().includes(query) ||
            tool.tags.some(tag => tag.toLowerCase().includes(query))
        );
    }
    
    // Apply sorting
    const rankedTools = calculateAndRankTools(filteredTools, currentFilters.sort);
    const top15Tools = rankedTools.slice(0, 15);
    
    // Re-render
    const toolsGrid = document.getElementById('dynamic-tools-grid');
    if (toolsGrid) {
        if (top15Tools.length === 0) {
            toolsGrid.innerHTML = `
                <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 3rem;">
                    <div class="empty-state-icon" style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
                    <h3>No tools found</h3>
                    <p>Try adjusting your filters or search terms</p>
                    <button class="btn btn-primary" onclick="clearFiltersBackup()">Clear Filters</button>
                </div>
            `;
        } else {
            renderToolsDirectly(toolsGrid, top15Tools);
        }
    }
    
    // Update counters
    updateToolsCounter(top15Tools.length, rankedTools.length);
    
    console.log(`✅ Backup filter applied: showing ${top15Tools.length} of ${rankedTools.length} tools`);
}

function clearFiltersBackup() {
    currentFilters = {
        category: 'all',
        sort: 'rank',
        search: ''
    };
    
    // Reset UI
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === 'all') {
            btn.classList.add('active');
        }
    });
    
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) sortSelect.value = 'rank';
    
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = '';
    
    applyFiltersBackup();
}

function calculateAndRankTools(tools, sortBy = 'rank') {
    let sorted = tools.map(tool => ({
        ...tool,
        rankingScore: calculateRankingScore(tool)
    }));
    
    switch (sortBy) {
        case 'rank':
            return sorted.sort((a, b) => b.rankingScore - a.rankingScore);
        case 'popularity':
            return sorted.sort((a, b) => b.marketData.popularity - a.marketData.popularity);
        case 'rating':
            return sorted.sort((a, b) => b.rating - a.rating);
        case 'growth':
            return sorted.sort((a, b) => b.growth - a.growth);
        case 'trending':
            return sorted.sort((a, b) => b.marketData.trendingScore - a.marketData.trendingScore);
        case 'price':
            return sorted.sort((a, b) => a.pricing.range[0] - b.pricing.range[0]);
        case 'alphabetical':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        default:
            return sorted.sort((a, b) => b.rankingScore - a.rankingScore);
    }
}

// Simple debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export for debugging
window.initializeToolsFix = initializeToolsFix;
window.clearFiltersBackup = clearFiltersBackup;
window.setupFilterButtonsBackup = setupFilterButtonsBackup;