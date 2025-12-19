/**
 * @module renderer
 * @description SVG/Canvas rendering engine for the 32-Aspect Self Clock Interactive (SCI)
 * Handles visual representation of aspects, harmonic rings, stages, and connections
 * 
 * @author Adrian Lei Martinez-Conol
 * @project Only When Prompted Research Initiative
 * @framework Kinetic Imperative - Self Clock Interactive
 */

import { ASPECTS, HARMONIC_RINGS, STAGES } from './data.js';
import { getState } from './store.js';

/**
 * SVG namespace for creating SVG elements
 */
const SVG_NS = 'http://www.w3.org/2000/svg';

/**
 * Color mappings for different domains
 */
const DOMAIN_COLORS = {
  mind: '#FFD700',    // Gold for Mind aspects
  body: '#FF6B6B',    // Coral for Body aspects  
  soul: '#9D4EDD'     // Purple for Soul aspects
};

/**
 * Stage colors (matching original gradient)
 */
const STAGE_COLORS = [
  '#4A90E2', // Stage 1 (blue)
  '#5BA3F5', // Stage 2
  '#6CB6FF', // Stage 3
  '#7DC9FF', // Stage 4
  '#8EDCFF', // Stage 5
  '#9FEFFF', // Stage 6
  '#B0F2FF', // Stage 7
  '#C1F5FF'  // Stage 8
];

/**
 * Render the main circular clock structure
 * @param {SVGElement} svg - SVG container element
 * @param {number} width - SVG width
 * @param {number} height - SVG height
 */
export function renderClock(svg, width, height) {
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) * 0.4;
  const state = getState();
  
  // Clear existing content
  svg.innerHTML = '';
  
  // Create main group with transform for rotation
  const mainGroup = createSVGElement('g', {
    transform: `rotate(${state.rotation * 180 / Math.PI} ${cx} ${cy})`
  });
  
  // Render concentric rings if enabled
  if (state.showConcentricRings) {
    renderConcentricRings(mainGroup, cx, cy, radius);
  }
  
  // Render cross-stage connections if enabled
  if (state.showCrossStage) {
    renderCrossStageLinks(mainGroup, cx, cy, radius);
  }
  
  // Render resonance links if enabled
  if (state.showResonance) {
    renderResonanceLinks(mainGroup, cx, cy, radius);
  }
  
  // Render aspect nodes
  renderAspects(mainGroup, cx, cy, radius);
  
  svg.appendChild(mainGroup);
  
  // Render tutorial overlay if active
  if (state.tutorialActive) {
    renderTutorial(svg, width, height);
  }
}

/**
 * Render the 32 aspect nodes around the circle
 */
function renderAspects(group, cx, cy, radius) {
  const state = getState();
  const angleStep = (2 * Math.PI) / 32;
  
  ASPECTS.forEach((aspect, i) => {
    const angle = i * angleStep - Math.PI / 2; // Start at top
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);
    
    // Determine if aspect should be highlighted
    const isHighlighted = state.highlightedElements.includes(i);
    const isSelected = state.currentAspect === i;
    const isFilteredRing = state.currentRing && HARMONIC_RINGS[state.currentRing].aspects.includes(i);
    const isFilteredStage = state.currentStage && STAGES.find(s => s.name === state.currentStage).aspects.includes(i);
    
    // Apply filters
    const isVisible = !state.currentRing || isFilteredRing;
    const isStageVisible = !state.currentStage || isFilteredStage;
    const opacity = (isVisible && isStageVisible) ? 1.0 : 0.2;
    
    // Aspect circle
    const circle = createSVGElement('circle', {
      cx: x,
      cy: y,
      r: isSelected ? 12 : (isHighlighted ? 10 : 8),
      fill: DOMAIN_COLORS[aspect.domain],
      stroke: isSelected ? '#FFFFFF' : (isHighlighted ? '#FFD700' : '#333'),
      'stroke-width': isSelected ? 3 : (isHighlighted ? 2 : 1),
      opacity: opacity,
      'data-aspect-index': i
    });
    
    group.appendChild(circle);
    
    // Aspect label
    const label = createSVGElement('text', {
      x: x,
      y: y + 25,
      'text-anchor': 'middle',
      'font-size': '10px',
      fill: '#FFFFFF',
      opacity: opacity * 0.8,
      'pointer-events': 'none'
    });
    label.textContent = aspect.name;
    
    group.appendChild(label);
  });
}

/**
 * Render concentric rings for harmonic groupings
 */
function renderConcentricRings(group, cx, cy, radius) {
  const ringCount = Object.keys(HARMONIC_RINGS).length;
  const ringStep = radius / (ringCount + 1);
  
  Object.values(HARMONIC_RINGS).forEach((ring, i) => {
    const r = (i + 1) * ringStep;
    const circle = createSVGElement('circle', {
      cx: cx,
      cy: cy,
      r: r,
      fill: 'none',
      stroke: ring.color || '#555',
      'stroke-width': 1,
      'stroke-dasharray': '5,5',
      opacity: 0.3
    });
    group.appendChild(circle);
  });
}

/**
 * Render cross-stage connection lines
 */
function renderCrossStageLinks(group, cx, cy, radius) {
  const state = getState();
  const angleStep = (2 * Math.PI) / 32;
  
  STAGES.forEach((stage, stageIndex) => {
    stage.crossStageLinks.forEach(link => {
      const fromIndex = link.from;
      const toIndex = link.to;
      
      const angle1 = fromIndex * angleStep - Math.PI / 2;
      const angle2 = toIndex * angleStep - Math.PI / 2;
      
      const x1 = cx + radius * Math.cos(angle1);
      const y1 = cy + radius * Math.sin(angle1);
      const x2 = cx + radius * Math.cos(angle2);
      const y2 = cy + radius * Math.sin(angle2);
      
      const line = createSVGElement('line', {
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
        stroke: STAGE_COLORS[stageIndex],
        'stroke-width': 1,
        opacity: 0.2
      });
      
      group.appendChild(line);
    });
  });
}

/**
 * Render resonance links between aspects with similar activation
 */
function renderResonanceLinks(group, cx, cy, radius) {
  const angleStep = (2 * Math.PI) / 32;
  
  // Find all resonance pairs from data
  const resonancePairs = [];
  ASPECTS.forEach((aspect, i) => {
    if (aspect.resonanceLinks) {
      aspect.resonanceLinks.forEach(targetIndex => {
        // Avoid duplicates
        if (i < targetIndex) {
          resonancePairs.push([i, targetIndex]);
        }
      });
    }
  });
  
  resonancePairs.forEach(([from, to]) => {
    const angle1 = from * angleStep - Math.PI / 2;
    const angle2 = to * angleStep - Math.PI / 2;
    
    const x1 = cx + radius * Math.cos(angle1);
    const y1 = cy + radius * Math.sin(angle1);
    const x2 = cx + radius * Math.cos(angle2);
    const y2 = cy + radius * Math.sin(angle2);
    
    const line = createSVGElement('line', {
      x1: x1,
      y1: y1,
      x2: x2,
      y2: y2,
      stroke: '#00FFD4',
      'stroke-width': 1,
      'stroke-dasharray': '2,2',
      opacity: 0.3
    });
    
    group.appendChild(line);
  });
}

/**
 * Render tutorial overlay
 */
function renderTutorial(svg, width, height) {
  const overlay = createSVGElement('rect', {
    x: 0,
    y: 0,
    width: width,
    height: height,
    fill: '#000000',
    opacity: 0.7
  });
  
  const tutorialBox = createSVGElement('rect', {
    x: width * 0.2,
    y: height * 0.3,
    width: width * 0.6,
    height: height * 0.4,
    fill: '#1E1E1E',
    stroke: '#FFD700',
    'stroke-width': 2,
    rx: 10
  });
  
  const tutorialText = createSVGElement('text', {
    x: width * 0.5,
    y: height * 0.4,
    'text-anchor': 'middle',
    'font-size': '16px',
    fill: '#FFFFFF'
  });
  tutorialText.textContent = 'Welcome to the 32-Aspect Self Clock';
  
  svg.appendChild(overlay);
  svg.appendChild(tutorialBox);
  svg.appendChild(tutorialText);
}

/**
 * Create an SVG element with attributes
 * @param {string} tag - SVG element tag name
 * @param {Object} attrs - Attributes to set
 * @returns {SVGElement}
 */
function createSVGElement(tag, attrs = {}) {
  const element = document.createElementNS(SVG_NS, tag);
  Object.entries(attrs).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  return element;
}

/**
 * Get aspect position for external use
 * @param {number} index - Aspect index (0-31)
 * @param {number} cx - Center X
 * @param {number} cy - Center Y  
 * @param {number} radius - Circle radius
 * @returns {Object} Position {x, y}
 */
export function getAspectPosition(index, cx, cy, radius) {
  const angleStep = (2 * Math.PI) / 32;
  const angle = index * angleStep - Math.PI / 2;
  return {
    x: cx + radius * Math.cos(angle),
    y: cy + radius * Math.sin(angle)
  };
}
