// AI Tools Ranking System - Dynamic Market-Based Rankings
// Updates tool rankings based on real market data, trends, and user feedback

'use strict';

/**
 * Tools Database - Comprehensive AI Tools with Market Data
 * This would ideally connect to real APIs for live data updates
 */
const TOOLS_DATABASE = [
    {
        id: 'chatgpt',
        name: 'ChatGPT',
        category: 'writing',
        description: 'Revolutionary AI assistant for writing, coding, analysis, and creative tasks with human-like conversation.',
        url: 'https://chat.openai.com',
        icon: 'https://openai.com/favicon.ico',
        rating: 4.8,
        users: '100M+',
        growth: 15,
        pricing: { type: 'Free + Pro', cost: '$20/mo' },
        tags: ['GPT-4', 'Multimodal', 'API'],
        marketData: {
            popularity: 100,
            trustScore: 95,
            innovation: 98,
            marketShare: 45
        },
        lastUpdated: new Date()
    },
    {
        id: 'midjourney',
        name: 'Midjourney',
        category: 'design',
        description: 'Premier AI art generator creating stunning, professional-quality images from text descriptions.',
        url: 'https://www.midjourney.com',
        icon: 'https://www.midjourney.com/favicon.ico',
        rating: 4.7,
        users: '20M+',
        growth: 25,
        pricing: { type: 'Subscription', cost: '$10-60/mo' },
        tags: ['V6', 'Discord', 'Commercial'],
        marketData: {
            popularity: 85,
            trustScore: 90,
            innovation: 95,
            marketShare: 35
        },
        lastUpdated: new Date()
    },
    {
        id: 'github-copilot',
        name: 'GitHub Copilot',
        category: 'coding',
        description: 'AI pair programmer that suggests code completions and entire functions as you type.',
        url: 'https://github.com/features/copilot',
        icon: 'https://github.com/favicon.ico',
        rating: 4.6,
        users: '5M+',
        growth: 30,
        pricing: { type: 'Subscription', cost: '$10-19/mo' },
        tags: ['VSCode', 'Multi-lang', 'Real-time'],
        marketData: {
            popularity: 80,
            trustScore: 95,
            innovation: 85,
            marketShare: 60
        },
        lastUpdated: new Date()
    },
    {
        id: 'claude',
        name: 'Claude 3 Sonnet',
        category: 'writing',
        description: 'Advanced AI assistant with superior reasoning, coding abilities, and safety-focused design.',
        url: 'https://claude.ai',
        icon: 'https://claude.ai/favicon.ico',
        rating: 4.7,
        users: '10M+',
        growth: 45,
        pricing: { type: 'Free + Pro', cost: '$20/mo' },
        tags: ['Constitutional AI', 'Long Context', 'Ethical'],
        marketData: {
            popularity: 75,
            trustScore: 98,
            innovation: 92,
            marketShare: 15
        },
        lastUpdated: new Date()
    },
    {
        id: 'perplexity',
        name: 'Perplexity AI',
        category: 'research',
        description: 'AI-powered search engine that provides accurate answers with real-time web citations.',
        url: 'https://www.perplexity.ai',
        icon: 'https://www.perplexity.ai/favicon.ico',
        rating: 4.5,
        users: '2M+',
        growth: 32,
        pricing: { type: 'Free + Pro', cost: '$20/mo' },
        tags: ['Search', 'Citations', 'Real-time'],
        marketData: {
            popularity: 70,
            trustScore: 85,
            innovation: 88,
            marketShare: 8
        },
        lastUpdated: new Date()
    },
    {
        id: 'runway-ml',
        name: 'RunwayML',
        category: 'design',
        description: 'AI video generation and editing platform for creators and professionals.',
        url: 'https://runwayml.com',
        icon: 'https://runwayml.com/favicon.ico',
        rating: 4.4,
        users: '3M+',
        growth: 28,
        pricing: { type: 'Subscription', cost: '$12-76/mo' },
        tags: ['Video AI', 'Gen-2', 'Creative'],
        marketData: {
            popularity: 65,
            trustScore: 80,
            innovation: 90,
            marketShare: 25
        },
        lastUpdated: new Date()
    },
    {
        id: 'jasper',
        name: 'Jasper AI',
        category: 'writing',
        description: 'Enterprise-grade AI writing assistant for marketing teams and content creators.',
        url: 'https://www.jasper.ai',
        icon: 'https://www.jasper.ai/favicon.ico',
        rating: 4.3,
        users: '1M+',
        growth: 12,
        pricing: { type: 'Subscription', cost: '$39-125/mo' },
        tags: ['Marketing', 'Templates', 'Enterprise'],
        marketData: {
            popularity: 60,
            trustScore: 85,
            innovation: 70,
            marketShare: 20
        },
        lastUpdated: new Date()
    },
    {
        id: 'notion-ai',
        name: 'Notion AI',
        category: 'productivity',
        description: 'Integrated AI assistant within Notion workspace for writing, brainstorming, and organization.',
        url: 'https://www.notion.so/product/ai',
        icon: 'https://www.notion.so/favicon.ico',
        rating: 4.2,
        users: '8M+',
        growth: 20,
        pricing: { type: 'Add-on', cost: '$8-10/mo' },
        tags: ['Workspace', 'Integration', 'Productivity'],
        marketData: {
            popularity: 75,
            trustScore: 90,
            innovation: 75,
            marketShare: 12
        },
        lastUpdated: new Date()
    },
    {
        id: 'stable-diffusion',
        name: 'Stable Diffusion',
        category: 'design',
        description: 'Open-source AI image generator with customizable models and local deployment options.',
        url: 'https://stability.ai',
        icon: 'https://stability.ai/favicon.ico',
        rating: 4.1,
        users: '15M+',
        growth: 18,
        pricing: { type: 'Free + API', cost: '$0-10/mo' },
        tags: ['Open Source', 'Local', 'Customizable'],
        marketData: {
            popularity: 85,
            trustScore: 75,
            innovation: 85,
            marketShare: 30
        },
        lastUpdated: new Date()
    },
    {
        id: 'elevenlabs',
        name: 'ElevenLabs',
        category: 'productivity',
        description: 'Advanced AI voice synthesis and speech generation with realistic human-like voices.',
        url: 'https://elevenlabs.io',
        icon: 'https://elevenlabs.io/favicon.ico',
        rating: 4.6,
        users: '1.5M+',
        growth: 35,
        pricing: { type: 'Free + Pro', cost: '$5-330/mo' },
        tags: ['Voice AI', 'TTS', 'Multilingual'],
        marketData: {
            popularity: 55,
            trustScore: 80,
            innovation: 95,
            marketShare: 40
        },
        lastUpdated: new Date()
    },
    {
        id: 'grammarly',
        name: 'Grammarly',
        category: 'writing',
        description: 'AI-powered writing assistant that checks grammar, spelling, style, and tone across all platforms.',
        url: 'https://www.grammarly.com',
        icon: 'https://www.grammarly.com/favicon.ico',
        rating: 4.4,
        users: '30M+',
        growth: 8,
        pricing: { type: 'Free + Premium', cost: '$12-15/mo' },
        tags: ['Grammar', 'Writing', 'Browser'],
        marketData: {
            popularity: 90,
            trustScore: 95,
            innovation: 65,
            marketShare: 70
        },
        lastUpdated: new Date()
    },
    {
        id: 'canva-ai',
        name: 'Canva AI',
        category: 'design',
        description: 'AI-powered design platform with Magic Design, background remover, and text-to-image generation.',
        url: 'https://www.canva.com/ai-image-generator/',
        icon: 'https://www.canva.com/favicon.ico',
        rating: 4.3,
        users: '125M+',
        growth: 22,
        pricing: { type: 'Free + Pro', cost: '$15-30/mo' },
        tags: ['Design', 'Templates', 'Magic Design'],
        marketData: {
            popularity: 95,
            trustScore: 88,
            innovation: 75,
            marketShare: 45
        },
        lastUpdated: new Date()
    },
    {
        id: 'cursor',
        name: 'Cursor',
        category: 'coding',
        description: 'AI-first code editor that predicts your next edit and helps you code faster with GPT-4.',
        url: 'https://cursor.sh',
        icon: 'https://cursor.sh/favicon.ico',
        rating: 4.5,
        users: '500K+',
        growth: 42,
        pricing: { type: 'Free + Pro', cost: '$20/mo' },
        tags: ['Code Editor', 'GPT-4', 'Predictions'],
        marketData: {
            popularity: 45,
            trustScore: 85,
            innovation: 95,
            marketShare: 5
        },
        lastUpdated: new Date()
    },
    {
        id: 'replit-ai',
        name: 'Replit AI',
        category: 'coding',
        description: 'AI-powered collaborative coding environment with intelligent code completion and generation.',
        url: 'https://replit.com/ai',
        icon: 'https://replit.com/favicon.ico',
        rating: 4.2,
        users: '25M+',
        growth: 25,
        pricing: { type: 'Free + Pro', cost: '$7-20/mo' },
        tags: ['Cloud IDE', 'Collaboration', 'Education'],
        marketData: {
            popularity: 70,
            trustScore: 82,
            innovation: 80,
            marketShare: 15
        },
        lastUpdated: new Date()
    },
    {
        id: 'copy-ai',
        name: 'Copy.ai',
        category: 'writing',
        description: 'AI copywriting platform for marketing content, social media posts, and sales materials.',
        url: 'https://www.copy.ai',
        icon: 'https://www.copy.ai/favicon.ico',
        rating: 4.1,
        users: '8M+',
        growth: 15,
        pricing: { type: 'Free + Pro', cost: '$36-186/mo' },
        tags: ['Copywriting', 'Marketing', 'Templates'],
        marketData: {
            popularity: 65,
            trustScore: 78,
            innovation: 70,
            marketShare: 18
        },
        lastUpdated: new Date()
    }
];

/**
 * Application State
 */
const AppState = {
    currentFilter: 'all',
    currentSort: 'rank',
    displayedTools: [],
    visibleCount: 6,
    isLoading: false,
    lastUpdate: new Date(),
    searchTerm: ''
};

/**
 * DOM Elements
 */
const Elements = {
    filterButtons: null,
    sortSelect: null,
    topToolsGrid: null,
    allToolsGrid: null,
    loadMoreBtn: null,
    toolsLoading: null,
    totalToolsCounter: null,
    lastUpdateCounter: null,
    trendingList: null,
    searchInput: null
};

/**
 * Initialize Tools Ranking System
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeElements();
    initializeEventListeners();
    updateMarketData();
    renderAllTools();
    updateTrendingTools();
    startRealTimeUpdates();
    
    console.log('AI Tools Ranking System initialized');
});

/**
 * Cache DOM Elements
 */
function initializeElements() {
    Elements.filterButtons = document.querySelectorAll('.filter-btn');
    Elements.sortSelect = document.getElementById('sort-select');
    Elements.topToolsGrid = document.getElementById('top-tools-grid');
    Elements.allToolsGrid = document.getElementById('all-tools-grid');
    Elements.loadMoreBtn = document.getElementById('load-more-btn');
    Elements.toolsLoading = document.getElementById('tools-loading');
    Elements.totalToolsCounter = document.getElementById('total-tools');
    Elements.lastUpdateCounter = document.getElementById('last-update');
    Elements.trendingList = document.getElementById('trending-tools');
    Elements.searchInput = document.getElementById('search-input');
}

/**
 * Initialize Event Listeners
 */
function initializeEventListeners() {
    // Filter buttons
    Elements.filterButtons.forEach(button => {
        button.addEventListener('click', handleFilterChange);
    });
    
    // Sort dropdown
    if (Elements.sortSelect) {
        Elements.sortSelect.addEventListener('change', handleSortChange);
    }
    
    // Load more button
    if (Elements.loadMoreBtn) {
        Elements.loadMoreBtn.addEventListener('click', handleLoadMore);
    }
    
    // Search functionality
    if (Elements.searchInput) {
        Elements.searchInput.addEventListener('input', debounce(handleSearch, 300));
    }
}

/**
 * Handle Filter Changes
 */
function handleFilterChange(event) {
    const newFilter = event.target.dataset.category;
    
    // Update button states
    Elements.filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Update state and re-render
    AppState.currentFilter = newFilter;
    AppState.visibleCount = 6;
    renderAllTools();
}

/**
 * Handle Sort Changes
 */
function handleSortChange(event) {
    AppState.currentSort = event.target.value;
    renderAllTools();
}

/**
 * Handle Load More
 */
function handleLoadMore() {
    AppState.visibleCount += 6;
    renderAllTools();
}

/**
 * Handle Search
 */
function handleSearch(event) {
    AppState.searchTerm = event.target.value.toLowerCase();
    AppState.visibleCount = 6;
    renderAllTools();
}

/**
 * Calculate Market-Based Ranking Score
 */
function calculateRankingScore(tool) {
    const weights = {
        popularity: 0.3,
        trustScore: 0.25,
        innovation: 0.2,
        growth: 0.15,
        marketShare: 0.1
    };
    
    const normalizedGrowth = Math.min(tool.growth / 50 * 100, 100);
    
    return (
        tool.marketData.popularity * weights.popularity +
        tool.marketData.trustScore * weights.trustScore +
        tool.marketData.innovation * weights.innovation +
        normalizedGrowth * weights.growth +
        tool.marketData.marketShare * weights.marketShare
    );
}

/**
 * Sort Tools Based on Criteria
 */
function sortTools(tools, criteria) {
    const sortedTools = [...tools];
    
    switch (criteria) {
        case 'rank':
            return sortedTools.sort((a, b) => calculateRankingScore(b) - calculateRankingScore(a));
        case 'popularity':
            return sortedTools.sort((a, b) => b.marketData.popularity - a.marketData.popularity);
        case 'rating':
            return sortedTools.sort((a, b) => b.rating - a.rating);
        case 'price':
            return sortedTools.sort((a, b) => {
                const aPrice = extractPriceValue(a.pricing.cost);
                const bPrice = extractPriceValue(b.pricing.cost);
                return aPrice - bPrice;
            });
        case 'newest':
            return sortedTools.sort((a, b) => b.lastUpdated - a.lastUpdated);
        default:
            return sortedTools;
    }
}

/**
 * Extract Price Value for Sorting
 */
function extractPriceValue(priceString) {
    if (priceString.includes('Free')) return 0;
    const match = priceString.match(/\$(\d+)/);
    return match ? parseInt(match[1]) : 999;
}

/**
 * Filter Tools by Category and Search
 */
function filterTools(tools) {
    let filtered = tools;
    
    // Filter by category
    if (AppState.currentFilter !== 'all') {
        filtered = filtered.filter(tool => tool.category === AppState.currentFilter);
    }
    
    // Filter by search term
    if (AppState.searchTerm) {
        filtered = filtered.filter(tool => 
            tool.name.toLowerCase().includes(AppState.searchTerm) ||
            tool.description.toLowerCase().includes(AppState.searchTerm) ||
            tool.tags.some(tag => tag.toLowerCase().includes(AppState.searchTerm))
        );
    }
    
    return filtered;
}

/**
 * Render Tool Card HTML
 */
function renderToolCard(tool, rank) {
    const trendIcon = tool.growth > 0 ? '↗' : tool.growth < 0 ? '↘' : '→';
    const trendClass = tool.growth > 0 ? 'trend-up' : tool.growth < 0 ? 'trend-down' : '';
    
    return `
        <article class="tool-card ${rank <= 3 ? 'tool-card--featured' : ''}" data-category="${tool.category}" data-rank="${rank}">
            <div class="tool-card__rank">
                <span class="rank-number">${rank}</span>
                ${rank === 1 ? '<span class="rank-badge">🏆</span>' : ''}
                ${rank === 2 ? '<span class="rank-badge">🥈</span>' : ''}
                ${rank === 3 ? '<span class="rank-badge">🥉</span>' : ''}
            </div>
            <div class="tool-card__header">
                <div class="tool-card__icon">
                    <img src="${tool.icon}" alt="${tool.name}" width="48" height="48" loading="lazy">
                </div>
                <div class="tool-card__title-area">
                    <h3 class="tool-card__title">
                        <a href="${tool.url}" target="_blank" rel="noopener" class="tool-card__link">${tool.name}</a>
                    </h3>
                    <div class="tool-card__category">${getCategoryDisplayName(tool.category)}</div>
                </div>
            </div>
            <p class="tool-card__description">${tool.description}</p>
            <div class="tool-card__metrics">
                <div class="metric">
                    <span class="metric-value" data-rating="${tool.rating}">${tool.rating}</span>
                    <span class="metric-label">Rating</span>
                </div>
                <div class="metric">
                    <span class="metric-value" data-users="${tool.users}">${tool.users}</span>
                    <span class="metric-label">Users</span>
                </div>
                <div class="metric">
                    <span class="metric-value ${trendClass}" data-trend="${trendIcon} ${Math.abs(tool.growth)}%">${trendIcon} ${Math.abs(tool.growth)}%</span>
                    <span class="metric-label">Growth</span>
                </div>
            </div>
            <div class="tool-card__pricing">
                <span class="price-badge">${tool.pricing.type}</span>
                <span class="price-details">${tool.pricing.cost}</span>
            </div>
            <div class="tool-card__tags">
                ${tool.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
        </article>
    `;
}

/**
 * Get Category Display Name
 */
function getCategoryDisplayName(category) {
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

/**
 * Render All Tools
 */
function renderAllTools() {
    if (!Elements.allToolsGrid) return;
    
    // Show loading
    if (Elements.toolsLoading) {
        Elements.toolsLoading.style.display = 'block';
    }
    
    // Simulate API delay
    setTimeout(() => {
        const filteredTools = filterTools(TOOLS_DATABASE);
        const sortedTools = sortTools(filteredTools, AppState.currentSort);
        const visibleTools = sortedTools.slice(0, AppState.visibleCount);
        
        AppState.displayedTools = visibleTools;
        
        // Render tools
        const toolsHTML = visibleTools.map((tool, index) => 
            renderToolCard(tool, index + 1)
        ).join('');
        
        Elements.allToolsGrid.innerHTML = toolsHTML;
        
        // Hide loading
        if (Elements.toolsLoading) {
            Elements.toolsLoading.style.display = 'none';
        }
        
        // Update load more button
        if (Elements.loadMoreBtn) {
            Elements.loadMoreBtn.style.display = 
                visibleTools.length < filteredTools.length ? 'block' : 'none';
        }
        
        // Update stats
        updateStats();
        
    }, 500);
}

/**
 * Update Trending Tools
 */
function updateTrendingTools() {
    if (!Elements.trendingList) return;
    
    const trending = [...TOOLS_DATABASE]
        .sort((a, b) => b.growth - a.growth)
        .slice(0, 3);
    
    const trendingHTML = trending.map(tool => `
        <li class="trending-item">
            <span class="trending-name">${tool.name}</span>
            <span class="trending-change trend-up">↗ ${tool.growth}%</span>
        </li>
    `).join('');
    
    Elements.trendingList.innerHTML = trendingHTML;
}

/**
 * Update Stats Counters
 */
function updateStats() {
    if (Elements.totalToolsCounter) {
        Elements.totalToolsCounter.textContent = `${TOOLS_DATABASE.length}`;
    }
    
    if (Elements.lastUpdateCounter) {
        Elements.lastUpdateCounter.textContent = 'Live';
    }
}

/**
 * Update Market Data (Simulated)
 */
function updateMarketData() {
    // Simulate market data updates
    TOOLS_DATABASE.forEach(tool => {
        // Random small fluctuations in market data
        const fluctuation = (Math.random() - 0.5) * 2; // -1 to 1
        tool.marketData.popularity = Math.max(0, Math.min(100, 
            tool.marketData.popularity + fluctuation
        ));
        
        // Update growth rates with some randomness
        tool.growth += (Math.random() - 0.5) * 5;
        tool.growth = Math.max(-20, Math.min(50, tool.growth));
        
        tool.lastUpdated = new Date();
    });
    
    AppState.lastUpdate = new Date();
}

/**
 * Start Real-Time Updates
 */
function startRealTimeUpdates() {
    // Update market data every 30 seconds
    setInterval(() => {
        updateMarketData();
        if (AppState.currentSort === 'rank') {
            renderAllTools();
        }
        updateTrendingTools();
    }, 30000);
    
    // Update "last update" timestamp every second
    setInterval(() => {
        if (Elements.lastUpdateCounter) {
            const now = new Date();
            const diff = Math.floor((now - AppState.lastUpdate) / 1000);
            if (diff < 60) {
                Elements.lastUpdateCounter.textContent = 'Live';
            } else {
                Elements.lastUpdateCounter.textContent = `${Math.floor(diff / 60)}m ago`;
            }
        }
    }, 1000);
}

/**
 * Debounce Function
 */
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

/**
 * API Integration Points (for future real data)
 */
const API_ENDPOINTS = {
    // Example endpoints for real market data
    tools: '/api/tools',
    rankings: '/api/rankings',
    trends: '/api/trends',
    marketData: '/api/market-data'
};

/**
 * Fetch Real Market Data (Future Implementation)
 */
async function fetchMarketData() {
    try {
        // This would connect to real APIs for market data
        // const response = await fetch(API_ENDPOINTS.marketData);
        // const data = await response.json();
        // return data;
        
        // For now, return simulated data
        return TOOLS_DATABASE;
    } catch (error) {
        console.error('Failed to fetch market data:', error);
        return TOOLS_DATABASE;
    }
}

// Export for use in other modules
window.ToolsRanking = {
    AppState,
    updateMarketData,
    renderAllTools,
    calculateRankingScore
};