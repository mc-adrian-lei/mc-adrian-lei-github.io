// === /js/core.js ===
// Mnemosphere | Self-Clock Core Module
// Primary state container, initialization logic, and module coordination

export class SelfClockCore {
  constructor() {
    this.state = {
      lens: 'mind', // Current viewing lens: mind | body | soul
      aspects: [], // 32 aspects generated dynamically
      stages: [], // 12 developmental stages
      resonanceMatrix: [], // aspect-to-aspect harmonics
      activeStage: null, // Current focus stage
      metrics: {
        coherenceIndex: 0,
        compassionConstraint: 0,
        goldenRatioAlignment: 1.618,
      },
    };

    this.subscribers = new Set();
  }

  // === State Management ===
  subscribe(callback) {
    this.subscribers.add(callback);
    return () => this.subscribers.delete(callback);
  }

  notify() {
    this.subscribers.forEach((cb) => cb(this.state));
  }

  // === Initialization ===
  initialize({ faculties, stages }) {
    this.state.aspects = faculties.map((f, index) => ({
      id: index,
      name: f.name,
      field: f.field,
      activation: Math.random(), // Placeholder dynamic value
      resonance: [],
      color: this._generateColor(index),
    }));

    this.state.stages = stages;
    this.state.activeStage = stages[0];
    this._computeResonanceMatrix();
    this.notify();
  }

  // === Internal Computation ===
  _computeResonanceMatrix() {
    const { aspects } = this.state;
    const matrix = [];
    for (let i = 0; i < aspects.length; i++) {
      matrix[i] = [];
      for (let j = 0; j < aspects.length; j++) {
        const diff = Math.abs(aspects[i].activation - aspects[j].activation);
        matrix[i][j] = 1 - diff; // simple resonance model
      }
    }
    this.state.resonanceMatrix = matrix;
  }

  _generateColor(index) {
    const hue = (index * 360) / 32;
    return `hsl(${hue}, 70%, 60%)`;
  }

  // === State Mutations ===
  setLens(newLens) {
    this.state.lens = newLens;
    this.notify();
  }

  setActiveStage(stageId) {
    this.state.activeStage = this.state.stages.find((s) => s.id === stageId);
    this.notify();
  }

  randomizeActivations() {
    this.state.aspects.forEach((a) => (a.activation = Math.random()));
    this._computeResonanceMatrix();
    this.notify();
  }

  // === Export ===
  exportJSON() {
    return JSON.stringify(this.state, null, 2);
  }
}

// Singleton instance
default export const core = new SelfClockCore();
