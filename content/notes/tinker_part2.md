---
author: Akhil Pandey
title: Tinker, smol-RL and QDoRA (Part 2)
date: 2026-02-11
description: Part 2 teaser and setup for smol-RL experiments with Tinker
math: true
ShowBreadCrumbs: true
---

### Part 2 goes live on Feb 20, 2026
This is a short preface to Part 2. The full write-up will be published on Feb 20, 2026. If you want the context from Part 1 first, start here: [Tinker, smol-RL and QDoRA](../tinker/).

### TLDR;
In Part 1, I framed reproducibility as a practical problem in modern LLM work, not just a philosophical ideal. Even with greedy decoding and fixed seeds, determinism can break in subtle ways: GPU type, numerical precision, kernel choices, and non-deterministic log-probs in MoE models all conspire to make "run it again" less reliable than we like to admit. That led to a simple question: do we need a better abstraction layer so that the model ops complexity is hidden but the critical knobs for determinism are explicit and repeatable?

That is where Tinker felt like a useful shift. A scikit-learn style API for post-training models makes it easier to standardize the boring but fragile pieces: reproducibility settings, dataset plumbing, and stable training/inference pipelines. Part 1 closed on a concrete premise: the *Just-RL* paper looks like the right starting point for testing Tinker's RLVR and RLHF setups on a small model before scaling.

Part 2 will use that premise directly: start with a small, practical *Just-RL* style setup and run it through Tinker's RLVR/RLHF abstractions to see what actually stays deterministic and what doesn't. I also plan to connect that to QDoRA in a small, controlled setting so the interaction between low-rank adaptation, precision choices, and stability is visible rather than hand-waved.

If this framing is useful, set a reminder for Feb 20, 2026.
