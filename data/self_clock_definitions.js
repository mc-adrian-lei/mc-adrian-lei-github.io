export const aspects = [
  {
    name: 'Awareness',
    short: 'Awareness',
    definition: 'Baseline wakeful presence and capacity to register phenomena before labeling them; neurologically supported by thalamocortical loops and ascending reticular activating systems.',
    prompt: 'What sensations announce that you are here, even before you explain them?'
  },
  {
    name: 'Attention',
    short: 'Attention',
    definition: 'The selective spotlight that stabilizes relevant signals and filters distractions, coordinated by fronto-parietal control networks and cholinergic modulation.',
    prompt: 'Where does your attention rest most easily right now?'
  },
  {
    name: 'Perception (Visual)',
    short: 'Visual',
    definition: 'Translation of light into structured imagery through the retina, lateral geniculate nucleus, and ventral/dorsal visual streams, enabling symbolically “seeing” pathways.',
    prompt: 'What in your visual field feels alive with meaning?'
  },
  {
    name: 'Perception (Auditory)',
    short: 'Auditory',
    definition: 'Transformation of vibration into tonal patterns via cochlea, auditory thalamus, and superior temporal cortices, forming the harmonic scaffolding of experience.',
    prompt: 'Which sounds cue safety, curiosity, or caution in you?'
  },
  {
    name: 'Perception (Somatosensory)',
    short: 'Somatic',
    definition: 'Tactile, temperature, and nociceptive awareness relayed from skin and muscle receptors through the dorsal column and spinothalamic systems into somatosensory cortex.',
    prompt: 'How is touch or temperature shaping your present mood?'
  },
  {
    name: 'Interoception',
    short: 'Intero',
    definition: 'Sensing internal organ states—breath, heartbeat, gut rhythm—integrated by the insula and vagal pathways, the felt narrative of the body’s interior.',
    prompt: 'What rhythms inside hint at your current needs?'
  },
  {
    name: 'Proprioception',
    short: 'Proprio',
    definition: 'Body position intelligence from muscle spindles, Golgi tendon organs, and cerebellar models, establishing “where I am” in space before movement begins.',
    prompt: 'How grounded or fluid does your posture feel?'
  },
  {
    name: 'Arousal/Vigilance',
    short: 'Vigilance',
    definition: 'Overall activation tone shaped by locus coeruleus, hypothalamus, and autonomic balance, preparing the system for engagement or restoration.',
    prompt: 'Is your system asking for mobilization or ease?'
  },
  {
    name: 'Working Memory',
    short: 'W. Memory',
    definition: 'Temporary storage-and-update buffer maintained by dorsolateral prefrontal and parietal circuitry, the inner workbench for current tasks.',
    prompt: 'What ideas are you actively juggling?'
  },
  {
    name: 'Episodic Memory',
    short: 'Episodic',
    definition: 'Personal time travel binding events, places, and contexts through hippocampal indexing and medial temporal lobe networks.',
    prompt: 'Which lived moments inform this investigation?'
  },
  {
    name: 'Semantic Memory',
    short: 'Semantic',
    definition: 'Conceptual knowledge webs anchored in temporal, parietal, and inferior frontal cortices, the lexicon of meanings you can state.',
    prompt: 'What definitions or facts feel relevant right now?'
  },
  {
    name: 'Language/Symbolics',
    short: 'Language',
    definition: 'Encoding and decoding of symbols using distributed perisylvian networks, enabling speech, writing, and abstract notation.',
    prompt: 'Which words or symbols best hold what you are sensing?'
  },
  {
    name: 'Imagination/Visualization',
    short: 'Imagery',
    definition: 'Voluntary generation of sensory-like scenes by default mode, occipital, and parietal areas, rehearsing potentials before acting.',
    prompt: 'What scene emerges when you extend your current line of thought?'
  },
  {
    name: 'Mental Time Travel',
    short: 'Time Travel',
    definition: 'Capacity to project self into remembered pasts and simulated futures via hippocampal-prefrontal loops, stitching continuity across time.',
    prompt: 'If you step into tomorrow, what shift do you notice?'
  },
  {
    name: 'Planning/Prospection',
    short: 'Planning',
    definition: 'Structuring sequences of action through dorsolateral prefrontal cortex, basal ganglia, and cerebellum—the architect of intentional change.',
    prompt: 'What is the next intentional move your system suggests?'
  },
  {
    name: 'Decision-Making',
    short: 'Decide',
    definition: 'Evaluating options and selecting commitments through ventromedial prefrontal integration of value, consequence, and emotion.',
    prompt: 'Which choice currently feels most aligned with your inquiry?'
  },
  {
    name: 'Inhibition/Self-Control',
    short: 'Inhibit',
    definition: 'Gating impulses and delaying responses using right inferior frontal gyrus, basal ganglia, and anterior cingulate oversight.',
    prompt: 'What pause could create more freedom here?'
  },
  {
    name: 'Cognitive Flexibility',
    short: 'Flexibility',
    definition: 'Shifting perspectives and rule sets through frontoparietal reconfiguration, enabling adaptive reframing and creative recombination.',
    prompt: 'Where might a new frame reveal hidden options?'
  },
  {
    name: 'Meta-Awareness',
    short: 'Meta',
    definition: 'Recognizing the contents of consciousness themselves, supported by medial prefrontal and anterior insular circuitry—the witness function.',
    prompt: 'Can you notice the quality of noticing itself?'
  },
  {
    name: 'Self-Model/Identity',
    short: 'Self',
    definition: 'Narrative and embodied sense of “I” synthesized by default mode hubs, insula, and temporoparietal junction, the evolving autobiography.',
    prompt: 'Which story about you is most active right now?'
  },
  {
    name: 'Emotion Processing',
    short: 'Emotion',
    definition: 'Generation and regulation of affective patterns through limbic circuitry, especially amygdala, anterior cingulate, and ventral medial prefrontal cortex.',
    prompt: 'What emotional tone is asking to be felt?'
  },
  {
    name: 'Motivation/Drive',
    short: 'Drive',
    definition: 'Initiating action via dopaminergic midbrain pathways, hypothalamic signals, and frontal goal representations—life force into motion.',
    prompt: 'What pulls you forward—and what dims that pull?'
  },
  {
    name: 'Reward/Valuation',
    short: 'Reward',
    definition: 'Assigning significance to outcomes through ventral striatum, orbitofrontal cortex, and neuromodulators, measuring “worth.”',
    prompt: 'How do you know when something is worth sustaining?'
  },
  {
    name: 'Empathy/Theory of Mind',
    short: 'Empathy',
    definition: 'Modeling others’ feelings and perspectives via temporoparietal junction, medial prefrontal cortex, and mirror systems—a bridge to shared experience.',
    prompt: 'Who else’s viewpoint is entering your field?'
  },
  {
    name: 'Social Cognition',
    short: 'Social',
    definition: 'Navigating group norms, roles, and signals through superior temporal sulcus, amygdala, and orbitofrontal circuits.',
    prompt: 'What relational pattern are you rehearsing or revising?'
  },
  {
    name: 'Moral Reasoning',
    short: 'Moral',
    definition: 'Evaluating actions against ethical frameworks, engaging ventromedial prefrontal, temporoparietal, and limbic dialogue—the compass of oughtness.',
    prompt: 'Which values are illuminated by this decision?'
  },
  {
    name: 'Spatial Cognition',
    short: 'Spatial',
    definition: 'Mapping environments and trajectories using hippocampal place cells, entorhinal grid cells, and parietal cortex—geometry lived as memory.',
    prompt: 'How does space—outer or inner—shape your orientation?'
  },
  {
    name: 'Rhythm/Timing',
    short: 'Rhythm',
    definition: 'Coordinating temporal patterns via cerebellum, basal ganglia, and premotor regions, syncing body, speech, and thought to cadence.',
    prompt: 'What tempo is your system keeping right now?'
  },
  {
    name: 'Creativity/Divergence',
    short: 'Creativity',
    definition: 'Generating novel combinations by toggling default mode ideation with executive selection, facilitated by dopaminergic exploration.',
    prompt: 'What unexpected association just surfaced?'
  },
  {
    name: 'Learning/Plasticity',
    short: 'Learning',
    definition: 'Updating neural weights through synaptic plasticity, neurogenesis, and myelination, translating practice into lasting change.',
    prompt: 'What new pattern is your nervous system ready to encode?'
  },
  {
    name: 'Dreaming/Imagery',
    short: 'Dreaming',
    definition: 'Nocturnal and hypnagogic simulation networks, blending limbic emotion with associative cortex to integrate memory and possibility.',
    prompt: 'What dream fragment or daydream is echoing here?'
  },
  {
    name: 'Narrative/Meaning-Making',
    short: 'Narrative',
    definition: 'Sculpting coherent stories that link events to purpose through default mode synthesis, language circuits, and cultural scripts.',
    prompt: 'How does this moment weave into your larger meaning?'
  }
];
