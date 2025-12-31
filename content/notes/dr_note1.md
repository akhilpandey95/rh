---
author: Akhil Pandey
title: What is it about these Deep research models lately ?
date: 2025-11-24
description: Understanding deep research agents/models/queries/tasks | Part 1 
math: true
ShowBreadCrumbs: true
---

Lately there is an surge in explosion of models, recipes and software libraries that are capable of doing deep research. The nature of what constitutes as a *deep-research* task would really depend on the person you're asking but its undeniable that any *deep-research* query is i.) **agentic**, ii..) **long-horizon**, iii.) large scale **information seeking** and iv.) **information consumption** workflow.

*Deep-research* agents can be used for various search directives, but they scour the information at a considerably high depth, gather the context of all of the crawled information into a final answer that hopefully gives valuable insights.[[1]](https://allenai.org/blog/dr-tulu). Inherently, this is a huge time and effort saving exercise if the report generated in the end is of high quality.

### Specialized models
The training behind *DR Tulu* is quite interesting because it is the first open-weight model that is post-trained using a new rubrics framework, or RLER as they describe it in their Github repo. To be very honest, the repository, blog and README in *DR Tulu* huggingface provide extensive information about the model and evaluation that its not worth it for me repeat the same information. Although, I personally feel the demo mentioned [here](https://dr-tulu.github.io/) gives you a sneak peek into final document quality. One of the cooler things you get to see in the demo page is the answers under section "SimpleQA", because typically people expect deep research agents to have incredibly verbose answers when the purpose can sometimes be channeled towards rolling out terse answers but searching *deeply*.
<figure>
    <a href="/img/dr_model_list.png" target="_blank">
        <img src="/img/dr_model_list.png" />
    </a>
    <figcaption>
        <p>Fig 1. Open deep research model list observed from DR Tulu web annoucement page. <a href="https://allenai.org/blog/dr-tulu" target="_blank">Learn more</a></p>
    </figcaption>
</figure>

For those interested in quickly training a deep-research model that is similar to *DR Tulu*, the instructions [here](https://github.com/rlresearch/dr-tulu/tree/main/rl/open-instruct) highlight that testing the setup using **Qwen-3 0.6B** on a single (assuming H100) gpu is possible.

*Tongyi DeepResearch* takes a different approach to the deep research problem. It's built on a Mixture-of-Experts (MoE) architecture with 30.5B total parameters but only 3.3B activated per token [[5]](https://arxiv.org/abs/2510.24701). The training pipeline is elaborate: three distinct stages (Agentic CPT, SFT, RL) with a data synthesis framework called AgentFounder that generates training data from knowledge graphs. What stands out in their benchmarks is the performance on GAIA and AssistantBench--tasks that require multi-step reasoning across multiple sources. At inference time, you can switch between a lightweight ReAct mode for quick queries and IterResearch mode for thorough investigation, which feels like a practical acknowledgment that not every question needs the same depth.

<figure>
    <a href="/img/dr_tongyi_results.png" target="_blank">
        <img src="/img/dr_tongyi_results.png" />
    </a>
    <figcaption>
        <p>Fig 2. Tongyi DeepResearch agentic model benchmark results on several search benchmarks. <a href="https://tongyi-agent.github.io/blog/introducing-tongyi-deep-research/" target="_blank">More available</a></p>
    </figcaption>
</figure>

*Kosmos* from Edison Scientific is architecturally the most distinctive of the three. Rather than betting on larger context windows or more sophisticated prompting, they built what they call a "structured world model"--a persistent, queryable database of entities, relationships, and open questions that survives across runs[[6]](https://arxiv.org/abs/2511.02824). The system coordinates a data analysis agent and a literature search agent that share information through this store. The scale of operation is striking: a single research run can execute 42,000 lines of code and read 1,500 full papers. Their eval claims that one 20-cycle run was equivalent to 6 months of a human collaborator's research time[[3]](https://edisonscientific.com/articles/announcing-kosmos). Perhaps more provocatively, they claim four novel contributions to scientific literature emerged from Kosmos runs--if that holds up under scrutiny, it's a meaningful shift from aggregation to generation.

<figure>
    <a href="/img/kosmos.png" target="_blank">
        <img src="/img/kosmos.png" />
    </a>
    <figcaption>
        <p>Fig 3. Input to output pipeline for a scientific world model involved in sophisticated autonomous discovery. More about Kosmos (https://edisonscientific.com/articles/announcing-kosmos)
    </figcaption>
</figure>

### Structurally, are they different tho ?
The appeal of a *deep-research* system comes down to how well it juggles searching, reading, and synthesizing. Looking at these three systems side by side, the philosophical divergences become clear.

The core tradeoff is between *implicit knowledge* (baked into weights via training) vs *explicit knowledge* (stored in external structures). DR Tulu bets heavily on training methodology--its architecture is deliberately minimal (just Qwen3-8B with protocol tokens like `think`, `call_tool`, `cite`, `answer`)[[4]](https://arxiv.org/abs/2511.19399). The RLER approach keeps evolving rubrics during training, dropping ones that hit near-zero reward variance. The bet: you don't need architectural complexity if your training signal is good enough.

Tongyi takes the opposite stance--scale *is* the answer, but make it efficient. The MoE architecture is fundamentally about having access to more parameters without paying for all of them at inference. The three-stage training pipeline (Agentic CPT → SFT → RL) suggests they view deep research capability as something that needs to be layered in progressively rather than emerging from a single training objective.

Kosmos sidesteps the question entirely. Instead of asking "how do we fit more knowledge into the model?", they ask "why does knowledge need to live in the model at all?" The structured world model is essentially an admission that context windows are a fundamentally limited abstraction for research tasks. When you're synthesizing across hundreds of papers, you need something that persists and can be queried structurally--not just a longer string of tokens.

What's interesting is how these bets align with different use cases. DR Tulu's lightweight approach makes it accessible (trainable on a single GPU). Tongyi's inference modes let you match depth to task complexity. Kosmos is overkill for simple queries but potentially necessary for actual scientific discovery. There's no clear winner--just different points on the tradeoff surface.

### Personally, I feel
As a researcher, the biggest cognitive boost I can receive is by having a reliable co-scientist capable of understanding my workflows for consumption (web), knowledge updates (memory), and selective recall of consumed information (skills) at frequent/infrequent intervals such that I can play a productive role in *directing* research rather than drowning in its logistics.

What excites me about the current landscape isn't any single model--its the patterns emerging across all of them. The Kosmos eval where a single 20-cycle run was equivalent to 6 months of a collaborator's research time[[6]](https://arxiv.org/abs/2511.02824) is cool, but *how* it gets there is cooler: a structured world model that just doesn't forget. This hits at what I think is my biggest bottleneck--the cognitive overhead of re-establishing context every time I pick up a thread.

To be honest, I spend a non-trivial amount of time re-reading papers I've already read, re-deriving conclusions I've already drawn, rediscovering connections I already made. A system with persistent, queryable memory feels less like a tool and more like an extension of my episodic memory that doesn't decay.

That said, I'm wary of systems where I can't trace where claims come from. DR Tulu's explicit `cite` token and Tongyi's emphasis on faithful citations matter more to me than benchmark numbers. A convincingly-written but wrong paragraph is arguably worse than no output--its epistemic debt that compounds quietly.

The ideal co-scientist for me would probably blend Kosmos's structured memory with DR Tulu's citation-first approach and Tongyi's inference flexibility (switching between quick ReAct responses and thorough IterResearch mode). We're not there yet, but all three being open-weight means the community can iterate toward that.

What I'm watching: whether these systems can move from *aggregation* to *hypothesis generation* that actually surprises domain experts. Kosmos claims four novel contributions to scientific literature[[3]](https://edisonscientific.com/articles/announcing-kosmos)--if that holds up, we're seeing the early stages of something qualitatively different from search-and-summarize.

### The idea of "deep" is evolving
One thing worth noting is that *deep-research* as a concept is getting productized and abstracted in interesting ways. Google's [Gemini Deep Research](https://ai.google.dev/gemini-api/docs/deep-research)[[7]](https://ai.google.dev/gemini-api/docs/deep-research) exposes this as an API--an autonomous agent powered by Gemini 3 Pro that runs asynchronously through cycles of `Plan -> Search -> Read -> Iterate -> Output`. Tasks can take several minutes and run in the background, which is a fundamentally different UX from chat. They're positioning it for "market analysis, due diligence, literature reviews, competitive landscaping"--basically anything where depth matters more than latency.

On the framework side, LangChain released [Deep Agents](https://docs.langchain.com/oss/python/deepagents/overview)[[8]](https://docs.langchain.com/oss/python/deepagents/overview)--a library inspired by tools like Claude Code and deep research systems. The interesting bits: built-in todo tracking for task decomposition, file system tools for offloading context to disk (preventing context window overflow), and the ability to spawn specialized subagents for specific tasks. Its basically a recognition that *deep* work requires different primitives than chat--planning, persistence, delegation.

The pattern I see emerging: *deep-research* is less about any single model architecture and more about an *interaction paradigm*. Long-running async execution, explicit planning phases, external memory stores, spawnable sub-agents. The models themselves (whether its DR Tulu, Tongyi, Gemini, or whatever powers a LangChain deep agent) are becoming somewhat interchangeable--what matters is the scaffolding around them. That scaffolding is what turns a capable LLM into something that can actually do research rather than just answer questions about research. 


### References
1. https://allenai.org/blog/dr-tulu
2. https://tongyi-agent.github.io/blog/introducing-tongyi-deep-research/
3. https://edisonscientific.com/articles/announcing-kosmos
4. https://arxiv.org/abs/2511.19399
5. https://arxiv.org/abs/2510.24701
6. https://arxiv.org/abs/2511.02824
7. https://ai.google.dev/gemini-api/docs/deep-research
8. https://docs.langchain.com/oss/python/deepagents/overview
