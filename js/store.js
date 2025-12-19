/**
 * @module store
 * @description Centralized state management for the 32-Aspect Self Clock Interactive (SCI)
 * Implements physics-based transitions with Harmonic Rings and Stages
 * 
 * @author Adrian Lei Martinez-Conol
 * @project Only When Prompted Research Initiative
 * @framework Kinetic Imperative - Self Clock Interactive
 */

import { ASPECTS, HARMONIC_RINGS, STAGES } from './data.js';

/**
 * Application state store
 * Manages current selections and physics state
 */
const store = {
  // Current active selections
  currentAspect: null,          // Currently selected aspect (0-31)
  currentRing: null,            // Currently active harmonic ring
  currentStage: null,           // Currently active developmental stage
  
  // Physics state
  rotation: 0,                  // Current rotation angle (radians)
  targetRotation: 0,            // Target rotation for smooth transitions
  velocity: 0,                  // Angular velocity
  
  // UI state
  tutorialActive: false,        // Tutorial overlay state
  highlightedElements: [],      // Currently highlighted aspects/connections
  
  // Mode toggles
  mode: 'mind',                 // Current view mode: 'mind', 'body', or 'soul'
  showResonance: true,          // Display resonance links
  showCrossStage: true,         // Display cross-stage connections
  showConcentricRings: true,    // Display concentric ring groupings
};

/**
 * State update listeners
 * Functions registered here will be called when state changes
 */
const listeners = [];

/**
 * Register a listener function to be called on state updates
 * @param {Function} callback - Function to call when state changes
 */
export function subscribe(callback) {
  listeners.push(callback);
  return () => {
    const index = listeners.indexOf(callback);
    if (index > -1) listeners.splice(index, 1);
  };
}

/**
 * Notify all listeners of state change
 */
function notify() {
  listeners.forEach(callback => callback(store));
}

/**
 * Get current state (read-only)
 * @returns {Object} Current application state
 */
export function getState() {
  return { ...store };
}

/**
 * Set current aspect and trigger physics-based transition
 * @param {number|null} aspectIndex - Index of aspect to select (0-31) or null to deselect
 */
export function setAspect(aspectIndex) {
  if (aspectIndex !== null && (aspectIndex < 0 || aspectIndex >= 32)) {
    console.warn(`Invalid aspect index: ${aspectIndex}`);
    return;
  }
  
  store.currentAspect = aspectIndex;
  
  // Calculate target rotation for smooth transition
  if (aspectIndex !== null) {
    const anglePerAspect = (2 * Math.PI) / 32;
    store.targetRotation = aspectIndex * anglePerAspect;
  }
  
  notify();
}

/**
 * Set current harmonic ring filter
 * @param {string|null} ringName - Name of harmonic ring or null for all
 */
export function setRing(ringName) {
  if (ringName !== null && !HARMONIC_RINGS[ringName]) {
    console.warn(`Invalid ring name: ${ringName}`);
    return;
  }
  
  store.currentRing = ringName;
  notify();
}

/**
 * Set current developmental stage filter
 * @param {string|null} stageName - Name of stage or null for all
 */
export function setStage(stageName) {
  if (stageName !== null && !STAGES.find(s => s.name === stageName)) {
    console.warn(`Invalid stage name: ${stageName}`);
    return;
  }
  
  store.currentStage = stageName;
  notify();
}

/**
 * Set view mode
 * @param {string} mode - View mode: 'mind', 'body', or 'soul'
 */
export function setMode(mode) {
  const validModes = ['mind', 'body', 'soul'];
  if (!validModes.includes(mode)) {
    console.warn(`Invalid mode: ${mode}`);
    return;
  }
  
  store.mode = mode;
  notify();
}

/**
 * Toggle tutorial overlay
 * @param {boolean} active - Tutorial state
 */
export function setTutorial(active) {
  store.tutorialActive = active;
  notify();
}

/**
 * Toggle display options
 * @param {string} option - Option name
 * @param {boolean} value - Option value
 */
export function toggleDisplay(option, value) {
  const validOptions = ['showResonance', 'showCrossStage', 'showConcentricRings'];
  if (!validOptions.includes(option)) {
    console.warn(`Invalid display option: ${option}`);
    return;
  }
  
  store[option] = value;
  notify();
}

/**
 * Update physics state (called by animation loop)
 * @param {number} deltaTime - Time since last update (seconds)
 */
export function updatePhysics(deltaTime) {
  // Smooth rotation transition using spring physics
  const diff = store.targetRotation - store.rotation;
  const springForce = diff * 5.0; // Spring constant
  const damping = store.velocity * 2.0; // Damping factor
  
  store.velocity += (springForce - damping) * deltaTime;
  store.rotation += store.velocity * deltaTime;
  
  // Normalize rotation to [0, 2π]
  store.rotation = store.rotation % (2 * Math.PI);
  if (store.rotation < 0) store.rotation += 2 * Math.PI;
  
  notify();
}

/**
 * Set highlighted elements for visual feedback
 * @param {Array<number>} elements - Array of aspect indices to highlight
 */
export function setHighlights(elements) {
  store.highlightedElements = elements;
  notify();
}

/**
 * Shuffle to random aspect (for "Shuffle" button)
 */
export function shuffle() {
  const randomIndex = Math.floor(Math.random() * 32);
  setAspect(randomIndex);
}

/**
 * Deactivate all filters and selections
 */
export function deactivateAll() {
  store.currentAspect = null;
  store.currentRing = null;
  store.currentStage = null;
  store.highlightedElements = [];
  notify();
}

/**
 * Export state as JSON (for "Export JSON" feature)
 * @returns {string} JSON representation of current state
 */
export function exportState() {
  const exportData = {
    aspect: store.currentAspect !== null ? ASPECTS[store.currentAspect] : null,
    ring: store.currentRing,
    stage: store.currentStage,
    mode: store.mode,
    timestamp: new Date().toISOString(),
    project: 'Self Clock Interactive - Kinetic Imperative',
    author: 'Adrian Lei Martinez-Conol'
  };
  
  return JSON.stringify(exportData, null, 2);
}
