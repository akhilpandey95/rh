---
author: Akhil Pandey
title: Pre-review to Peer review | Pitfalls of Automating Reviews using Large Language Models
date: 2025-08-05
description: Systematically assessing scholarly works to identify novel, generalizable, and reproducible science
math: true
ShowBreadCrumbs: false
cover:
    image: "/img/LMRSD.png"
    relative: false
    caption: ""
---

### Abstract
Large Language Models are versatile general-task solvers and their capabilities can truly assist people with scholarly peer review as $\textit{pre-review}$ agents if not fully autonomous $\textit{peer-review}$ agents. While incredibly beneficial automating academic peer-review as a concept raises concerns surrounding safety, research integrity and validity of the academic peer-review process. Majority of the studies performing a systematic evaluation of frontier LLMs generating reviews across science disciplines miss the mark on addressing the alignment/misalignment question and never place emphasis on assessing the utility of LLM generated reviews when compared against publication outcomes such as $\textbf{Citations}$, $\textbf{hit-papers}$, $\textbf{Novelty}$, and $\textbf{Disruption}$. This paper presents an experimental study gathering ground-truth reviewer rating scores from OpenReview and utilizing various frontier open-weight dense LLMs (**Gemma-3 27b, Qwen-3 32b, Nemotron-49b-1.5, TuluV3-70b, Llama 3.3 70b**) and reasoning LLMs (**Distill R1-llama-70b, Qwen3-Next-80B-A3B-Thinking, GPT-OSS-20b, GPT-OSS-120b**) to generate reviews of the manuscript to gauge the safety and reliability of involving languages models in the scientific review pipeline. These findings demonstrate the utility of frontier open-weight LLMs as pre-review screening agents despite highlighting fundamental misalignment risks when deployed as autonomous reviewers. The results show all models exhibit weak correlation with human peer reviewers (0.15), with all models showing systematic overestimation bias of 3-5 points and uniformly high confidence scores (8.0-9.0/10) despite prediction errors. However, we can also observe that LLM reviews correlate more strongly with post-publication citation impact ($r=0.21$ for gpt-oss-120b) than with human scores, suggesting potential utility as pre-review screening tools. The effort to connect the safety and reliability of using LLMs in academic peer-review with publication outcomes makes it easier to highlight the potential and assuage the pitfalls of automating peer-reviews using language models. The dataset $D_{LMRSD}$ is open-sourced to help the research community expand the safety-framework of automating scientific reviews.

> Authors: **Akhil Pandey Akella**, Shaurya Rohtagi

> Paper: Coming Soon !!

> Code: https://github.com/akhilpandey95/LMRSD (private, will be public soon !!)

> HuggingFace: https://huggingface.co/datasets/akhilpandey95/LMRSD

### Acknowledgement
The computing resources for this work is supported in part by the Google Cloud Research Credits Grant **331845891**, and Lambda Labs Credits through the support program **D1: CSC-SUPPORT-CDFF-2025-3-31**.
<figure style="text-align: center;">
  <img src="https://lambda.ai/hubfs/lambda%20logo%202.svg" width="150" height="auto" alt="Lambda logo">
  <img src="https://www.gstatic.com/devrel-devsite/prod/v0e0f589edd85502a40d78d7d0825db8ea5ef3b99ab4070381ee86977c9168730/cloud/images/cloud-logo.svg" width="150" height="auto" alt="GCP">
</figure>
