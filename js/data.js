/**
 * DATA & ONTOLOGY MODULE
 * Single Source of Truth for the 32-Aspect Developmental Self Clock
 * 
 * This module defines the 8 Harmonic Rings and 12 Developmental Stages,
 * providing the foundational data structure for kinetic field resonance
 * and harmonic breathing visualization.
 * 
 * @author Adrian Lei Martinez-Conol
 * @organization Only When Prompted Research Initiative
 * @version 2.0.0
 */

/**
 * RINGS: The 8 Harmonic Fields
 * Each ring represents a developmental domain with a characteristic frequency.
 * Frequencies determine the harmonic breathing rate (pulse oscillation).
 */
export const RINGS = [
    { 
        level: 1, 
        name: "Imprinting", 
        freq: 0.5, 
        aspects: ["Safety", "Trust", "Belonging", "Worth"],
        description: "Foundation layer: Core survival imprints and attachment schemas"
    },
    { 
        level: 2, 
        name: "Autonomy", 
        freq: 0.7, 
        aspects: ["Independence", "Initiative", "Creativity", "Responsibility"],
        description: "Self-agency layer: Emergence of will and self-direction"
    },
    { 
        level: 3, 
        name: "Competence", 
        freq: 1.2, 
        aspects: ["Learning", "Skill", "Performance", "Recognition"],
        description: "Capability layer: Mastery and efficacy development"
    },
    { 
        level: 4, 
        name: "Identity", 
        freq: 1.8, 
        aspects: ["Self-Awareness", "Self-Expression", "Role-Clarity", "Authenticity"],
        description: "Self-concept layer: Consolidation of personal identity"
    },
    { 
        level: 5, 
        name: "Intimacy", 
        freq: 2.4, 
        aspects: ["Emotional Intelligence", "Vulnerability", "Empathy", "Mutuality"],
        description: "Relational layer: Deep connection and emotional attunement"
    },
    { 
        level: 6, 
        name: "Generativity", 
        freq: 3.1, 
        aspects: ["Productivity", "Creativity", "Mentorship", "Impact"],
        description: "Contribution layer: Creating value beyond self"
    },
    { 
        level: 7, 
        name: "Integration", 
        freq: 4.2, 
        aspects: ["Perspective", "Acceptance", "Balance", "Compassion"],
        description: "Wisdom layer: Synthesis and meta-awareness"
    },
    { 
        level: 8, 
        name: "Transcendence", 
        freq: 6.8, 
        aspects: ["Unity", "Service", "Love", "Wisdom"],
        description: "Universal layer: Self-transcendence and cosmic connection"
    }
];

/**
 * STAGE_NAMES: The 12-Phase Developmental Cycle
 * Represents the temporal progression through the lifespan.
 * Each stage corresponds to a sector on the clock face (30° each).
 */
export const STAGE_NAMES = [
    'Imprinting',      // Stage 0: Birth-18 months
    'Autogenic',       // Stage 1: 18 months-3 years
    'Intentional',     // Stage 2: 3-5 years
    'Competence',      // Stage 3: 5-7 years
    'Mirror',          // Stage 4: 7-12 years
    'Bonding',         // Stage 5: 12-18 years
    'Generative',      // Stage 6: 18-25 years
    'Integration',     // Stage 7: 25-35 years
    'Reflection',      // Stage 8: 35-50 years
    'Transcendence',   // Stage 9: 50-65 years
    'Unity',           // Stage 10: 65-80 years
    'Return'           // Stage 11: 80+ years
];

/**
 * generateAspects()
 * Creates the 32-node dataset with kinetic properties.
 * 
 * Each node contains:
 * - Identity data (id, name, ring, stage)
 * - Physics properties (frequency, hue, targetValue)
 * - Semantic metadata (description)
 * 
 * @returns {Array<Object>} Array of 32 aspect objects
 */
export function generateAspects() {
    const nodes = [];
    let idCounter = 0;
    
    RINGS.forEach((ring, rIndex) => {
        ring.aspects.forEach((name) => {
            nodes.push({
                // Identity
                id: idCounter,
                name: name,
                ringIndex: rIndex,          // 0-7 (inner to outer)
                ringName: ring.name,
                
                // Physics
                frequency: ring.freq,        // Hz for harmonic breathing
                hue: (idCounter * 360 / 32) % 360,  // Even color distribution
                
                // Stage Association (circular distribution)
                stageAssoc: idCounter % 12,  // 0-11 (12-hour clock face)
                
                // Activation State
                value: 0,                    // Current rendered value (smoothed)
                targetValue: Math.random() * 20,  // Target value (user/system set)
                
                // Metadata
                description: `Resonant node for ${name} within the ${ring.name} field. This aspect oscillates at ${ring.freq} Hz and belongs to developmental ring ${rIndex + 1}.`
            });
            idCounter++;
        });
    });
    
    return nodes;
}

/**
 * CONSTANTS: Visualization parameters
 */
export const VIS_CONFIG = {
    RING_COUNT: 8,
    ASPECT_COUNT: 32,
    STAGE_COUNT: 12,
    MIN_RADIUS_RATIO: 0.2,    // Inner ring starts at 20% of max radius
    RING_SPACING: 0.11,        // 11% spacing between rings
    PULSE_AMPLITUDE: 3,        // Pixel amplitude of harmonic breathing
    VALUE_EXPANSION: 0.12,     // Pixel expansion per activation unit
    RESONANCE_THRESHOLD: 15,   // Value difference for resonance links
    LERP_SPEED: 0.08          // Physics smoothing factor (0-1)
};
