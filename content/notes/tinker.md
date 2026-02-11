---
author: Akhil Pandey
title: Tinker, smol-RL and QDoRA
date: 2026-01-02
description: Observations from Tinker RL training API abstractions for post-training models
math: true
ShowBreadCrumbs: true
---

### Reproducibility is a bedrock of scientific progress
An underlying principle that governed my doctoral research [1] in applying
representational learning to understand *reproducibilty*, was the idea that
"*Reproducibility is a bedrock of scientific progress*" [2]. Naturally, seeing
**[Thinky](https://thinkingmachines.ai/)** talk about non-determinism and 
reframing the discussion around reproducibility in large language models made 
me realize, that *reproducibility* has become an ideal that fewer and fewer 
researchers, engineers, hobbyists alike believed truly across any scientific project.

A while ago when I created a lecture mini-series with interactive notebooks showing 
how to use LLMs for computational social science research [3], I've used the following
code which was part of a helper function for loading the model and generating the outputs
and the code disables sampling and does a greedy search to return similar model outputs 
to portray a deterministic behaviour. Code (taken from [3]) for this abstraction would be:

```python
# @title 2.2 Testing the functions on a simple prompt

# model
model_id = 'llama3.2-3b'

# acceleration
device = 'cuda'

# init model-tokenizer
model, tokenizer = None, None

# sample input prompt
text = """What is the systematic overestimation bias in the paper below ? 

--------
ABSTRACT:
Our results show that all models exhibit weak correlation with 
human peer reviewers (0.15), with systematic overestimation 
bias of 3-5 points and uniformly high confidence scores 
(8.0-9.0/10) despite prediction errors.
-----
"""

# get the model tokenizer pair
model, tokenizer = load_model(model_id, device=device)

# null outpput
outputs, new_tokens = None, None

# seed for reproducibility
set_seed(2025)

# set top_p and temperature to none
model.generation_config.temperature=None
model.generation_config.top_p=None

# get attention mask and input ids
input_encoded = tokenizer(text, padding=True, return_tensors="pt")
input_encoded_ids = input_encoded.input_ids.to(device)
input_encoded_attn_mask = input_encoded.attention_mask.to(device)
input_shape = input_encoded_ids.shape[1]

# model.generate()
with torch.no_grad():
    # routine model.generate()
    outputs = model.generate(
        input_ids=input_encoded_ids,
        attention_mask=input_encoded_attn_mask,
        max_new_tokens=64,
        do_sample=False,
        num_beams=1,
        pad_token_id=tokenizer.pad_token_id,
        eos_token_id=tokenizer.eos_token_id
    )

# decode model.generate() output
response = tokenizer.decode(outputs[0][input_shape:], skip_special_tokens=True)
print("----------------------------------")
print("LLM Answer:")
pprint.pp(response, depth=2, indent=4, compact=True)
print("----------------------------------")

# empty cuda cache
torch.cuda.empty_cache()

# gc
del model, tokenizer
gc.collect()
```

and the the above would give the following output (no matter how many times one runs it):

```shell
----------------------------------
Using cuda to load ./Llama3.2-3B-Instruct/hf/
----------------------------------
Loading checkpoint shards: 100% 2/2 [00:04<00:00,  1.92s/it]
The module name  (originally ) is not a valid Python identifier. 
Please rename the original module to avoid import issues.

Setting <|finetune_right_pad_id|> token for ./Llama3.2-3B-Instruct/hf/
Model-tokenizer Load Time:, 5.02825140953064 seconds
----------------------------------
----------------------------------
LLM Answer:
('The systematic overestimation bias refers to the tendency of models to '
 'overestimate the quality of their own predictions, which is a common '
 'phenomenon in machine learning. In this case, the bias is described as '
 '"systematic" because it is not just a random fluctuation, but rather a '
 'consistent pattern of overestimation.\n'
 '\n')
----------------------------------
```

If you're me, you woud obviously take this statement "no matter how many times one runs it"
a little too seriously because there are several variables here that could
affect the reproducibility and determinism of the outputs, one of them is the
precision at which the weights are loaded. `fp8`, `bf16` can influence the final
`LLM Answer`. I'd say, I would leave it to you to figure it out. More broadly speaking,
there could be more reasons one could investigate, but precision is intuitively
the most obvious choice that could break the determinism in outputs.

### Need for $tinker$
Personally, I've never done experiments or ablations pertaining to changing the
model type, adjusting `dtype` to notice downstream differences in the output
response. While its obvious that changing numerical precision (`fp16`, `bf16`, `fp32`, `fp8`, etc)
will induce changes to the final output, I've always conviniently used `bf16`
and simply assumed deterministic generation for scientific hypothesis generation,
and information extraction tasks meant using `seed`, and transparent workflow parameters
combined with *sampling* methods and `temperature` to achieve determinism. While
this is a naive assumption, it still was practically useful for my experiments.

It was my understanding that deterministic generation was possible assuming you
perform *greedy sampling* and more often than not, it comes at a cost (annecdotally speaking)
and that cost often revolves around creativity. The references to the challenges
outlined in [2] at the beginning were fair given how numerical instability can affect
MoE models causing non-deterministic log probabilities. I personally never encountered
this issue because I stored the log-probs and never used them for analysis, and additionally
I used dense models frequently for all of my experiments. That said, figuring out all of these 
smaller ticks and tips for determinism can be a slight inconvenience for training(more inconvenient) 
and inference alike.  Naturally, remembering all of these parameters makes the art of training models,
iterating through variations a smaller hassle.

Tinker's announcement [4] was definitely a refreshing validation to my desire of having a scikit-learn
like API that can perform the heavy-lifting from a machine ops standpoint and I can deal with the data,
parameters, and learning paradigm.

### Just-RL, $tinker$ and hello world !!
The recent paper *Just-RL* [5] on training a small language model (relatively) on various
tasks just might be the right starting point to test tinker's RLVR, and RLHF setups.

The premise of *Just-RL* is striking in its simplicity: you can skip supervised
fine-tuning (SFT) entirely and go straight from a pretrained base model to RL
post-training using *Group Relative Policy Optimization* (GRPO). The paper shows
that for tasks with verifiable rewards (math, code, logical reasoning) RLVR
alone can match or exceed the performance of SFT+RL pipelines, even at relatively
small model scales. This was a meaningful insight because the conventional wisdom
in post-training has been that SFT provides the "scaffolding" for RL to then
refine. *Just-RL* argues that for tasks where you can define a clear reward signal
(i.e., you know what the right answer looks like), the scaffolding is unnecessary.

This naturally raises the question: *what constitutes a verifiable reward for
scientific evaluation tasks?* Metrics like the disruption index ($CD_5$) [8] or
novelty and conventionality scores are computable from citation data. They are
not subjective. The $CD$ index is derived from the overlap between a paper's
forward citations and its backward references. A paper is *disruptive* when its
citations do not also cite its references ($CD > 0.1$), *consolidating* when they
do ($CD < -0.1$), and *neutral* otherwise. Similarly, novelty in the style of
Uzzi et al. (2013) measures atypicality of journal reference combinations. These
are, by definition, verifiable rewards. They can be computed, they have ground
truth labels, and they can supervise an RL training loop without any human
annotation.

#### The setup

Tinker [4] provides the abstractions needed to wire this up. At its core, Tinker
follows a pattern that felt immediately familiar (`Env`, `StepResult`,
`StopCondition`) reminiscent of OpenAI Gym but designed for language model
post-training rather than Atari. The key difference is that the "actions" are
token sequences (model generations), and the "observations" are prompts. The
training loop handles GRPO updates, KL penalties, and reward normalization under
the hood, so all I need to define is the environment.

I built an adversarial environment loosely following Tinker's
[Twenty Questions](https://github.com/thinking-machines-lab/tinker-cookbook/blob/main/tinker_cookbook/recipes/multiplayer_rl/twenty_questions)
recipe. The setup involves two agents:

- **Agent A (trainable)**: reads a paper's title, abstract, and metadata, then
  predicts whether the paper is *disruptive*, *consolidating*, or *neutral*
  and whether it is *novel*, *conventional*, or *balanced*.
- **Agent B (fixed)**: challenges Agent A's prediction with a counterargument.

Agent A then has the option to revise or defend its prediction. This
multi-turn structure is interesting because it incentivizes the model to produce
*reasoned* predictions rather than pattern-matched labels. The reward function
reflects this:

$$R = R_{\text{correctness}} + R_{\text{reasoning}} + R_{\text{adaptation}}$$

where $R_{\text{correctness}} \in \{-1.0, +1.0\}$ is the binary label match,
$R_{\text{reasoning}} \in [0, 0.3]$ rewards the quality of the argumentation, and
$R_{\text{adaptation}} \in [0, 0.2]$ rewards appropriate revision (or firm
defense) after the adversary's challenge.

#### Hello world

The environment definition in Tinker is concise enough that I can include it
here without trimming:

```python
from tinker_disruption_env import Paper, AdversarialDisruptionEnv
import asyncio

paper = Paper(
    openalex_id="W2741809807",
    title="Attention Is All You Need",
    abstract="We propose a new simple network architecture, the Transformer...",
    publication_year=2017,
    cited_by_count=50000,
    cd_index=0.65,
    novelty_score=0.82,
    conventionality_score=0.35,
    disruption_label="disruptive",
    novelty_label="novel",
    primary_field="Computer Science"
)

async def run():
    env = AdversarialDisruptionEnv(paper)
    obs, stop = await env.initial_observation()
    # agent generates a prediction with reasoning
    result = await env.step(action_tokens)
    print(f"Reward: {result.reward}")

asyncio.run(run())
```

The `Paper` dataclass holds the ground truth derived from OpenAlex citation data.
The environment formats a prompt from the paper metadata, the model generates a
prediction, and the reward function checks it against the known $CD$ index and
novelty labels.

#### Why this matters (to me)

This connects directly to my doctoral work on reproducibility [1]. The LMRSD
framework I developed was fundamentally about whether language models could
reliably evaluate scientific artifacts. Disruption and novelty prediction is a
natural extension of that. Can we train a small model via RL to be better
calibrated on *scientific impact*? The adversarial setup is deliberately designed
to push beyond surface-level pattern matching. A model that can predict
disruption, defend its reasoning against a challenger, and revise when the
challenge is valid, is doing something closer to scientific judgment than
simple classification.

The dataset can be constructed from OpenAlex (no API key required, just an email),
or synthetically for quick iteration. In the longer term, this connects to
SciSciNet-v2 and the broader science-of-science infrastructure that makes these
kinds of experiments possible at scale.

Whether RLVR alone is sufficient for this task, or whether it needs SFT
scaffolding first, is precisely the question *Just-RL* frames, and the one
I intend to answer with this setup.

Before running the full Tinker RLVR pipeline though, I want a proper baseline.
QDoRA [6] (quantized weight-decomposed low-rank adaptation) combined with FSDP
gives us a way to do parameter-efficient fine-tuning at scale [7], and running
a QDoRA SFT baseline on the same disruption and novelty prediction tasks would
tell us exactly what RL is buying on top. If QDoRA SFT already saturates
performance on these verifiable labels, the RL story becomes less compelling. If
it does not, then the adversarial environment and reward shaping in Tinker have
room to push further. In the next post, I will break down the dataset construction
from OpenAlex, walk through the training runs, compare QDoRA SFT against
Tinker RLVR, and share what the reward curves and evaluation metrics actually
look like.

### References
```markdown
1. https://huskiecommons.lib.niu.edu/allgraduate-thesesdissertations/7947/
2. https://thinkingmachines.ai/blog/defeating-nondeterminism-in-llm-inference/
3. https://github.com/akhilpandey95/LLMSciSci
4. https://thinkingmachines.ai/blog/tinker-general-availability/
5. https://arxiv.org/pdf/2512.16649
6. https://www.answer.ai/posts/2024-04-26-fsdp-qdora-llama3.html
7. https://thinkingmachines.ai/blog/lora/
8. https://arxiv.org/pdf/2512.07783v1
9. https://allenai.org/blog/olmo3
10. https://huggingface.co/collections/nvidia/nvidia-nemotron-v3
```

### Cite
```bibtex
@misc{akhil2025notesdrnote1,
  author       = {Akella, Akhil Pandey},
  title        = {Tinker, smol-RL and QDoRA},
  year         = {2026},
  month        = {January},
  url          = {https://akhilpandey95.github.io/notes/tinker/},
  note         = {Accessed: }
}
```
