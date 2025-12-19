/**
 * @module main
 * @description Application entry point for the 32-Aspect Self Clock Interactive (SCI)
 * Initializes the visualization, sets up event handlers, and manages the animation loop
 * 
 * @author Adrian Lei Martinez-Conol
 * @project Only When Prompted Research Initiative
 * @framework Kinetic Imperative - Self Clock Interactive
 */

import { renderClock } from './renderer.js';
import {
  subscribe,
  setAspect,
  setMode,
  setRing,
  setStage,
  setTutorial,
  toggleDisplay,
  updatePhysics,
  shuffle,
  deactivateAll,
  exportState
} from './store.js';

/**
 * Application configuration
 */
const config = {
  svgId: 'selfClockSVG',
  width: 800,
  height: 800,
  targetFPS: 60
};

/**
 * Initialize the application
 */
export function init() {
  console.log('Initializing 32-Aspect Self Clock Interactive...');
  console.log('Author: Adrian Lei Martinez-Conol');
  console.log('Project: Only When Prompted Research Initiative');
  
  // Get SVG element
  const svg = document.getElementById(config.svgId);
  if (!svg) {
    console.error(`SVG element with id '${config.svgId}' not found`);
    return;
  }
  
  // Set SVG dimensions
  svg.setAttribute('width', config.width);
  svg.setAttribute('height', config.height);
  svg.setAttribute('viewBox', `0 0 ${config.width} ${config.height}`);
  
  // Subscribe to state changes
  subscribe((state) => {
    renderClock(svg, config.width, config.height);
  });
  
  // Initial render
  renderClock(svg, config.width, config.height);
  
  // Set up event handlers
  setupEventHandlers(svg);
  
  // Start animation loop
  startAnimationLoop();
  
  console.log('Self Clock Interactive initialized successfully');
}

/**
 * Set up event handlers for user interaction
 */
function setupEventHandlers(svg) {
  // Click on aspect nodes
  svg.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'circle' && target.hasAttribute('data-aspect-index')) {
      const index = parseInt(target.getAttribute('data-aspect-index'));
      setAspect(index);
    }
  });
  
  // Mode buttons
  const mindBtn = document.getElementById('mindBtn');
  const bodyBtn = document.getElementById('bodyBtn');
  const soulBtn = document.getElementById('soulBtn');
  
  if (mindBtn) mindBtn.addEventListener('click', () => setMode('mind'));
  if (bodyBtn) bodyBtn.addEventListener('click', () => setMode('body'));
  if (soulBtn) soulBtn.addEventListener('click', () => setMode('soul'));
  
  // Tutorial button
  const tutorialBtn = document.getElementById('tutorialBtn');
  if (tutorialBtn) {
    tutorialBtn.addEventListener('click', () => {
      setTutorial(true);
    });
  }
  
  // Shuffle button
  const shuffleBtn = document.getElementById('shuffleBtn');
  if (shuffleBtn) {
    shuffleBtn.addEventListener('click', () => {
      shuffle();
    });
  }
  
  // Deactivate All button
  const deactivateBtn = document.getElementById('deactivateBtn');
  if (deactivateBtn) {
    deactivateBtn.addEventListener('click', () => {
      deactivateAll();
    });
  }
  
  // Export JSON button
  const exportBtn = document.getElementById('exportBtn');
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const json = exportState();
      downloadJSON(json, 'self-clock-state.json');
    });
  }
  
  // Harmonic Ring filter buttons
  const ringButtons = document.querySelectorAll('[data-ring]');
  ringButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const ringName = btn.getAttribute('data-ring');
      setRing(ringName);
    });
  });
  
  // Stage filter buttons
  const stageButtons = document.querySelectorAll('[data-stage]');
  stageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const stageName = btn.getAttribute('data-stage');
      setStage(stageName);
    });
  });
  
  // Display toggle checkboxes
  const resonanceCheckbox = document.getElementById('showResonance');
  const crossStageCheckbox = document.getElementById('showCrossStage');
  const concentricCheckbox = document.getElementById('showConcentricRings');
  
  if (resonanceCheckbox) {
    resonanceCheckbox.addEventListener('change', (e) => {
      toggleDisplay('showResonance', e.target.checked);
    });
  }
  
  if (crossStageCheckbox) {
    crossStageCheckbox.addEventListener('change', (e) => {
      toggleDisplay('showCrossStage', e.target.checked);
    });
  }
  
  if (concentricCheckbox) {
    concentricCheckbox.addEventListener('change', (e) => {
      toggleDisplay('showConcentricRings', e.target.checked);
    });
  }
}

/**
 * Animation loop for smooth physics-based transitions
 */
let lastTime = performance.now();

function startAnimationLoop() {
  function animate(currentTime) {
    const deltaTime = (currentTime - lastTime) / 1000; // Convert to seconds
    lastTime = currentTime;
    
    // Update physics
    updatePhysics(deltaTime);
    
    // Continue loop
    requestAnimationFrame(animate);
  }
  
  requestAnimationFrame(animate);
}

/**
 * Download JSON data as a file
 * @param {string} jsonData - JSON string to download
 * @param {string} filename - Name of the file
 */
function downloadJSON(jsonData, filename) {
  const blob = new Blob([jsonData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Auto-initialize when DOM is ready
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
