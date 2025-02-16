---
author: Akhil Pandey
title: Experimenting budget forcing and test-time scaling [WIP]
date: 2025-02-10
description: Testing the empirical effectiveness of "s1-Simple test-time scaling"
math: true
ShowBreadCrumbs: false
---

> [IMPORTANT]: Actively working on the blog.

**From the paper: https://arxiv.org/pdf/2501.19393 <br/>**

>Figure 3. Budget forcing with s1-32B. The model tries to stop
after “...is 2.”, but we suppress the end-of-thinking token delimiter
instead appending “Wait” leading s1-32B to self-correct its answer.

![image](/img/s1_1.png)

**Interesting nuggets from s1 paper (methodology)**

1. They collected a dataset of 1k examples with reasoning traces from Google Gemini model and performed SFT (supervised fine tuning).
2. They fix response lengths by adding "wait" tokens in certain cases to get models to generate longer CoT's, verify, and correct itself, or halt token generation by introducing an EOT (end of thinking) token delimiter and the authors call this phenomenon as "budget forcing."

**Budget Forcing**
Not to be picky or pedantic but `budget forcing (BF)` is still not a parallel inference scaling technique (as seen in o-1 or by Gemini Thinking). As the authors point out, we can think of `BF` as a sequential inference scaling technique. Despite the `<wait>` and `<think` tokens at appropriate steps, the model is still generating one token at a time, the only difference being in total number of tokens.

These two charts highlight the limitations, but they are still salient contributions from the `s1` paper:
<br/>
![image](/img/s1_2.png)
<br/>
![image](/img/s1_3.png)
</br>
The important contribution here is `BF` method seems to be effective than other resource hungry inference-scaling techniques. A good test on how useful `BF` here could be is by testing a good instruct model (Claude or open weight models like Qwen 2.5) using CoT prompting and observe the quality of responses supplied by models trained with `BF` vs regular models with CoT prompts.

**Compute optimal parallel inference scaling**
Although `BF` is compared against majority voting, and they found it to work well there are better compute optimal strategies
to perform inference scaling. For more check paper: https://arxiv.org/pdf/2408.03314v1, especially section **5.2**. Key strategies that should be compared against `BF` are:
<br/>
![image](/img/s1_4.png)

### What is scaling at test time ?
Given a question `Q` to a model `LM` you get a response `R`. This process is pretty familiar and is called inference, but the key takeaway here is until `o1`, there was a semi-fixed resource consumption and also an assumption that the compute required to answer `Q`. After the advent of `o1` compute on inference or test-time compute (TTC) dynamically increase their reasoning time during inference leading to more time thinking about `Q`, improving accuracy of `R` but at the cost of higher compute usage.

### Isn't Deepseek-R1's scaling inference time ?
**Short answer**: Nope

**Long answer**:
DeepSeek stated that their main goal was to achieve strong reasoning capabilities by leveraging the principle of deep, step-by-step thinking. DeepSeek-R1 got nearly SoTA results on most reasoning datasets simply by leveraging pure RL (GRPO), good data quality mix, and an incredibly strong base model (DeepSeek-V3). So, they built a reasoning model that mimicks o-1, but the phenomenon of scaling at inference time is somewhat not disclosed in the paper. Also, page-1 from s1's paper: https://arxiv.org/pdf/2501.19393 <br/>
>However, despite the large number of o1 replication attempts, none have openly replicated
a clear test-time scaling behavior. Thus, we ask: what is
the simplest approach to achieve both test-time scaling and
strong reasoning performance?

### Experiments

```plaintext
TBA
```

### References
1. https://arxiv.org/pdf/2501.19393
2. https://arxiv.org/html/2408.03314v1