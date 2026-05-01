// mobile-utils.js - Mobile menu and UI helper functions
// These functions are referenced inline in the HTML via onclick attributes

// Stub functions - will be overridden by dashboard-main.js once loaded
window.switchTab = window.switchTab || function(tabId) {
  console.log('switchTab called before main script loaded:', tabId);
};
window.refreshData = window.refreshData || function() {
  console.log('refreshData: waiting for main script...');
};
window.focusMapOnCategory = window.focusMapOnCategory || function() {};
window.toggleFaskesLayer = window.toggleFaskesLayer || function() {};
window.toggleLayer = window.toggleLayer || function() {};
window.togglePolygonLayer = window.togglePolygonLayer || function() {};
window.applyFilter = window.applyFilter || function() {};
window.resetFilters = window.resetFilters || function() {};
window.changePolygonLevel = window.changePolygonLevel || function() {};
window.searchPolygon = window.searchPolygon || function() {};
window.applyCluster6Filter = window.applyCluster6Filter || function() {};
window.changeSektorPage = window.changeSektorPage || function() {};
window.slideOrangHilang = window.slideOrangHilang || function() {};
window.onBantuanFilterChange = window.onBantuanFilterChange || function() {};
window.renderBantuanTable = window.renderBantuanTable || function() {};

function toggleMobileMenu() {
  const overlay = document.getElementById('mobileMenuOverlay');
  const drawer = document.getElementById('mobileMenuDrawer');
  if (!overlay || !drawer) return;
  overlay.classList.toggle('active');
  drawer.classList.toggle('active');
  document.body.style.overflow = drawer.classList.contains('active') ? 'hidden' : '';
}

function switchTabMobile(tabId) {
  document.querySelectorAll('.mobile-menu-item').forEach(function(item) {
    item.classList.remove('active');
  });
  if (event && event.target) {
    var closest = event.target.closest('.mobile-menu-item');
    if (closest) closest.classList.add('active');
  }
  if (typeof switchTab === 'function') {
    switchTab(tabId);
  }
  toggleMobileMenu();
}

function toggleLayerControl() {
  const content = document.getElementById('layer-control-content');
  const icon = document.getElementById('layer-control-icon');
  if (!content || !icon) return;
  if (content.classList.contains('expanded')) {
    content.classList.remove('expanded');
    icon.classList.remove('fa-chevron-up');
    icon.classList.add('fa-chevron-down');
  } else {
    content.classList.add('expanded');
    icon.classList.remove('fa-chevron-down');
    icon.classList.add('fa-chevron-up');
  }
}

// Sync last update to mobile menu
document.addEventListener('DOMContentLoaded', function() {
  const originalLastUpdate = document.getElementById('lastUpdate');
  if (originalLastUpdate) {
    const observer = new MutationObserver(function() {
      const mobileUpdate = document.getElementById('lastUpdateMobile');
      if (mobileUpdate) {
        mobileUpdate.textContent = originalLastUpdate.textContent;
      }
    });
    observer.observe(originalLastUpdate, { childList: true, characterData: true, subtree: true });
  }

  // Close mobile menu on resize to desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 768) {
      const overlay = document.getElementById('mobileMenuOverlay');
      const drawer = document.getElementById('mobileMenuDrawer');
      if (drawer && drawer.classList.contains('active')) {
        overlay.classList.remove('active');
        drawer.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });
});
