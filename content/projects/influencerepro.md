---
author: Akhil Pandey
title: Influence of Reproducibility on Scientific Impact
date: 2024-07-03
description: ICSSI'24 Best Poster Award
math: true
ShowBreadCrumbs: false
cover:
    image: "/img/AC_EA_DARK.png"
    relative: false
    caption: ""
---

# IRSI
Reproducibility is an important feature of science; experiments are retested, and analyses are repeated.we examine a myriad of features in scholarly articles published in computer science conferences and journals and model how they influence scientific impact.

### Reproducibility Spectrum

The author-centric framework focuses on acknowledging availability, accessibility, and quality of the artifact available within scientific document to signal satisfying prerequisites to reproduce a paper. The Author-Centric framework within the spectrum includes, <div>$$A_i = A_{PWA}, A_{PUNX}, A_{PAX}$$</div> Papers without artifacts, Papers with artifacts that aren't permanantly archived, and Papers with artifacts that are permanantly archived.

The external-agent framework that presents the reproducibility evaluation status of a paper. This includes <div>$$E_i = E_{NR}, E_{AR}, E_{{Re}}, E_{R}$$</div>
Paper that cannot be reproduced, Paper Awaiting-Reproducibility, Reproduced paper, and Reproducible paper.

![image](/img/AC_EA_DARK.png)

### Influence on Scientific Impact

The concept of reproducibility echoes diverse sentiments, and from a taxonomy standpoint, the formal definition of reproducibility has evolved as a term and a concept. We align with the National Academy of Sciences in defining \textit{reproducibility} as the process of obtaining consistent computational results using the same input data, computational steps, methods, code, and conditions of analysis. This definition provides an ideal generalizable standard applicable to large sections of scientific research within the sub-domains of computer science. Consensus on this definition can make it easier to recognize procedures and protocols for validating and verifying scientific claims. The relevance and  importance of reproducibility are heightened more than ever, given the current outgrowth of Artificial Intelligence (AI) models into diverse public domains. The modus operandi of scientific workflows in AI has shifted from offering posterior fixes to building a-priori reproducible AI pipelines. Regardless of the complexity, we can observe the push for making models, datasets, and algorithms available in containers, open-source repositories, and webpages. The significance of reproducibility is multifaceted. First, it upholds a standard for sustaining
quality in the results and analysis of scholarly works, ensuring that scientific findings are robust, reliable, and unbiased. Second, it enables researchers to innovate and expand on proven findings quickly. Third, in the context of AI, reproducibility addresses essential safety and trust considerations by ensuring accountability within the systems implementing algorithms that make decisions affecting human lives.

![image](/img/IRSSI_test_val_mdi_feat_imp.png)

> Fig.1.a Important features observed while predicting scholarly impact of reproducible papers in computer science

Preliminary evidence from utilizing diverse feature groups central to
computational sciences in predicting scholarly impact highlight the importance of transparency, reproducibility, clear communication, and practical contributions in enhancing the scholarly impact of academic papers. They reflect broader trends in the scientific community towards open science and reproducibility, which are key to our interest in addressing the **Reproducibility crisis in AI**.

![image](/img/IRSSI_test_val_ytrue_ypred.png)

> Fig.1.b Plotting the true citation counts against the predicted values

### Authors
[Akhil Pandey](https://github.com/akhilpandey95), [Hamed Alhoori](https://github.com/alhoori)

### Acknowledgement
This work is supported in part by NSF Grant No. [2022443](https://www.nsf.gov/awardsearch/showAward?AWD_ID=2022443&HistoricalAwards=false).
