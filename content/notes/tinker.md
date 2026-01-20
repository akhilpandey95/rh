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

```plaintext
----------------------------------
Using cuda to load ./Llama3.2-3B-Instruct/hf/
----------------------------------
Loading checkpoint shards: 100% 2/2 [00:04<00:00,  1.91s/it]
Setting <|finetune_right_pad_id|> token for ./Llama3.2-3B-Instruct/hf/
Model-tokenizer Load Time:, 5.051675796508789 seconds
----------------------------------
----------------------------------
LLM Answer:
('The paper is discussing the results of a study on the performance of machine '
 'learning models in predicting human peer review scores. The systematic '
 'overestimation bias refers to the tendency of the models to consistently '
 'overestimate the actual scores given by human peer reviewers.\n'
 '\n'
 'In this case, the systematic overestimation bias is 3-5')
----------------------------------
```

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
