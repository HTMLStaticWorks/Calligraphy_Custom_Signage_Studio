/* 
 * Calligraphy & Custom Signage Studio - Premium Template 
 * Dashboard Specific Features
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sidebar Toggle
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.getElementById('sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', (e) => {
            e.preventDefault();
            sidebar.classList.toggle('active');
        });
    }

    // 2. Charts Placeholder (Simple UI only)
    const ctx = document.getElementById('statsChart');
    if (ctx) {
        // UI Only - simulate chart structure
        const chartMarkup = `
            <div class="chart-container" style="position: relative; height:300px; width:100%; display: flex; align-items: flex-end; gap: 10px; padding: 20px;">
                ${[40, 60, 80, 50, 90, 70, 100].map(h => `
                    <div style="flex: 1; height: ${h}%; background: var(--secondary-color); border-radius: 4px 4px 0 0; transition: height 1s ease;"></div>
                `).join('')}
            </div>
            <div style="display: flex; justify-content: space-around; font-size: 12px; margin-top: 10px; color: var(--text-muted);">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
        `;
        ctx.innerHTML = chartMarkup;
    }

    // 3. Simple Table Search/Filter (UI Only)
    const searchInput = document.getElementById('table-search');
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            const value = e.target.value.toLowerCase();
            const rows = document.querySelectorAll('tbody tr');
            rows.forEach(row => {
                row.style.display = row.innerText.toLowerCase().includes(value) ? '' : 'none';
            });
        });
    }
});
