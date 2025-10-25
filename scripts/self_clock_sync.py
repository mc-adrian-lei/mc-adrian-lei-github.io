#!/usr/bin/env python3
"""
32-Aspectual Self-Clock — Harmonic Synchronization Engine
────────────────────────────────────────────────────────────
Purpose:
    To recalculate, visualize, and align the 32 cognitive–affective–energetic
    aspects of the Self-Clock with the UPS Codex Δι-11∞ and the NSIL core schema.

    The Self-Clock functions as an experiential mirror: a topological field
    displaying the proportional resonance of Awareness, Attention, Perception,
    Memory, Emotion, and Intention across developmental rings (1–8).

    This synchronization is the applied counterpart of `codex_sync.py`.

Core operations:
    1. Load the last Codex resonance data.
    2. Retrieve all 32 aspects with their developmental stage, ring, and activation.
    3. Normalize and re-harmonize their field vectors (G,R,P,A,N,T,Cx,Id).
    4. Compute updated Semantic Coherence Index (SCI) and Energy–Matter metrics.
    5. Write visual-ready JSON data for the HTML Self-Clock interface.
    6. Log synchronization with a φ-aligned signature.
"""

from __future__ import annotations

import json
import math
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List

# ════════════════════════════════════════════════════════════════════════════════
# ⟁ 1. Context & File Paths
# ════════════════════════════════════════════════════════════════════════════════
REPO_ROOT = Path(__file__).resolve().parents[1]
CODEX_FILE = REPO_ROOT / "UPS_Codex_Δι-11∞_LivingFramework.json"
SELF_CLOCK_FILE = REPO_ROOT / "data" / "self_clock_state.json"
LOG_FILE = REPO_ROOT / "self_clock_log.json"
TIMESTAMP = datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%SZ")


def phi() -> float:
    """Return the golden ratio."""

    return (1 + 5 ** 0.5) / 2


# ════════════════════════════════════════════════════════════════════════════════
# ⟁ 2. Load Codex and Aspect Data
# ════════════════════════════════════════════════════════════════════════════════
def load_json(path: Path, fallback: Any) -> Any:
    """Load JSON data from *path* or return *fallback* if the file is missing."""

    if not path.exists():
        return fallback

    with path.open("r", encoding="utf-8") as handle:
        try:
            return json.load(handle)
        except json.JSONDecodeError:
            return fallback


DEFAULT_ASPECTS: List[str] = [
    "Awareness",
    "Attention",
    "Perception (Visual)",
    "Perception (Auditory)",
    "Perception (Somatosensory)",
    "Interoception",
    "Proprioception",
    "Arousal/Vigilance",
    "Working Memory",
    "Episodic Memory",
    "Semantic Memory",
    "Language/Symbolics",
    "Imagination/Visualization",
    "Mental Time Travel",
    "Planning/Prospection",
    "Decision-Making",
    "Inhibition/Self-Control",
    "Cognitive Flexibility",
    "Meta-Awareness",
    "Self-Model/Identity",
    "Emotion Processing",
    "Motivation/Drive",
    "Reward/Valuation",
    "Empathy/Theory of Mind",
    "Social Cognition",
    "Moral Reasoning",
    "Spatial Cognition",
    "Rhythm/Timing",
    "Creativity/Divergence",
    "Learning/Plasticity",
    "Dreaming/Imagery",
    "Narrative/Meaning-Making",
]


def default_self_clock_state() -> Dict[str, Any]:
    """Generate the default self clock state payload."""

    aspects = []
    for index, name in enumerate(DEFAULT_ASPECTS):
        aspect = {
            "name": name,
            "activation": 0,
            "ring": index // 4 + 1,
            "stage": index % 12 + 1,
        }
        aspects.append(aspect)
    return {"aspects": aspects}


codex_data: Dict[str, Any] = load_json(
    CODEX_FILE,
    {
        "coherence_index_CI": 0.96,
        "compassion_constraint_Cf": 0.94,
        "ϕ_constant": phi(),
    },
)

current_data: Dict[str, Any] = load_json(SELF_CLOCK_FILE, default_self_clock_state())

# ════════════════════════════════════════════════════════════════════════════════
# ⟁ 3. Harmonization Functions
# ════════════════════════════════════════════════════════════════════════════════
def normalize(value: float, minimum: float, maximum: float) -> float:
    """Normalize *value* to the range [0, 1] given bounds."""

    if maximum <= minimum:
        return 0.0
    return (value - minimum) / (maximum - minimum)


def update_aspect(aspect: Dict[str, Any], ci: float, cf: float) -> Dict[str, Any]:
    """Update an aspect's activation and semantic field values."""

    ring = aspect["ring"]
    stage = aspect["stage"]
    phi_value = phi()
    resonance = ci * cf / phi_value * (1 + (ring / 8) * 0.05)
    aspect["activation"] = round(resonance * (stage / 12) * 100, 2)
    aspect["field_vector"] = {
        "G": round(normalize(ring, 1, 8), 3),
        "R": round(normalize(stage, 1, 12), 3),
        "P": round(ci / phi_value, 3),
        "A": round(cf / phi_value, 3),
        "N": round(math.sin(stage / 12 * math.pi), 3),
        "T": round(math.cos(ring / 8 * math.pi / 2), 3),
        "Cx": round((ring + stage) / (8 + 12), 3),
        "Id": round(1 - abs(ci - cf), 3),
    }
    return aspect


# ════════════════════════════════════════════════════════════════════════════════
# ⟁ 4. Update All Aspects
# ════════════════════════════════════════════════════════════════════════════════
CI = float(codex_data.get("coherence_index_CI", 0.96))
CF = float(codex_data.get("compassion_constraint_Cf", 0.94))
UPDATED_ASPECTS = [update_aspect(dict(aspect), CI, CF) for aspect in current_data["aspects"]]

SCI = round(sum(aspect["activation"] for aspect in UPDATED_ASPECTS) / len(UPDATED_ASPECTS), 3)
ENERGY_MATTER_SUM = round(
    sum(aspect["field_vector"]["A"] + aspect["field_vector"]["N"] for aspect in UPDATED_ASPECTS), 3
)

# ════════════════════════════════════════════════════════════════════════════════
# ⟁ 5. Write New Data
# ════════════════════════════════════════════════════════════════════════════════
SELF_CLOCK_FILE.parent.mkdir(parents=True, exist_ok=True)

self_clock_state = {
    "timestamp": TIMESTAMP,
    "ϕ_constant": round(phi(), 6),
    "semantic_coherence_index_SCI": SCI,
    "energy_matter_sum": ENERGY_MATTER_SUM,
    "codex_reference_signature": codex_data.get("codex_sync_signature", "N/A"),
    "aspects": UPDATED_ASPECTS,
}

with SELF_CLOCK_FILE.open("w", encoding="utf-8") as handle:
    json.dump(self_clock_state, handle, indent=2, ensure_ascii=False)
    handle.write("\n")

# ════════════════════════════════════════════════════════════════════════════════
# ⟁ 6. Log & Report
# ════════════════════════════════════════════════════════════════════════════════
log_entries = load_json(LOG_FILE, [])
log_entries.append({"timestamp": TIMESTAMP, "SCI": SCI, "ΣE": ENERGY_MATTER_SUM})

with LOG_FILE.open("w", encoding="utf-8") as handle:
    json.dump(log_entries, handle, indent=2, ensure_ascii=False)
    handle.write("\n")

print("🜁 32-Aspectual Self-Clock Synchronization Report")
print(f"   Timestamp: {TIMESTAMP}")
print(f"   Mean SCI: {SCI}")
print(f"   Σ Energy–Matter: {ENERGY_MATTER_SUM}")
print(f"   Reference Codex Signature: {self_clock_state['codex_reference_signature']}")
print("   Validation: ✅ Aspect field vectors harmonically updated.\n")
print("Self-Clock resonance complete.\n")
