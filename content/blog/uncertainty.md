---
author: “Akhil Pandey”
date: 2020-08-07
title: How do we quantify uncertainty in deep learning models ?
best: true
---

### Neural Networks Everywhere

The genesis of Deep Learning began primarily in 2012 when researchers were able to capture the information present in millions of images and accurately predict class labels. This breakthrough was a culmination of multiple scientific developments. Quintessentially, Neural networks are universal functional approximators and this innate quality allows them to applied on diverse problem spaces. This is the fundamental reason behind the pervasive nature of Neural Networks.

Bayesian Neural Networks as the name suggests is a Bayesian variant of Neural Network. The fundamental difference lies in training process of the Bayesian model and this difference allows these models to estimate the error on the predictions. This change in the operational philosophy gives credence to the predictions made by the Bayesian Neural Network because it is capable of saying, _"I don't know"_ towards uncertain predictions or border cases. Unlike a traditional Neural Network, Bayesian Neural Networks do not coerce the models to make a prediction when the probability of the prediction is close to another prediction. This potentially allows Bayesian Neural Networks to be a force for good when used in sensitive areas such as Healthcare, Retail and Finance, and Self-driving cars.

### Do we really know what is a Neural Network ?

Traditionally Neural networks (NN's) are these models whose goal is to approximate some function _f_. These networks define a mapping, _Y_ = _f_ (_x_, θ) and learn the values of the parameters θ and the result is the best function approximation. Optimization is the process of finding the appropriate parameters for the network that reduce some cost function. Cost function is an objective function that we expect the model to reduce so that it improves some performance measure _P_.

Before we have a primordial understanding of a Bayesian Neural Network, there is a necessity to re-calibrate how we observe the functionality of Neural Networks. We must understand that at its core a neural network is just a probabilistic model _P_ (_y_ | __X__, _w_) gathering point estimates of the outputs for a given input and the trained weights. If the outputs are a set of classes then, the probabilistic model _P_ (_y_ | __X__, _w_) is a categorical distribution. If the outputs are continuous in nature, then the probabilistic model _P_ (_y_ | __X__, _w_) is a Gaussian distribution.

### What do we mean when we say Uncertainty or Uncertainty Quantification ?

Uncertainty quantification or UQ is the process of quantifying the uncertainties in the prediction process of a model. Often NNs are regarded as being unreliable black box models for their lack of interpretability. Fundamentally, UQ as a concept promotes trust, reliability, and robustness in the models by helping us understand where the model is not certain. This makes sense if you imagine a situation having a NN predicting toxicity in drugs and having UQ in that model can potentially change the life altering dynamics associated here. This motivation can be extended to forecasting, predicting stock prices, self driving cars and many other areas that fall under the umbrella of Applied AI.

There are two types of uncertainties, called \textit{aleatoric} uncertainty, and \textit{epistemic} uncertainty. The plot Fig. \ref{fig:uncertainty} \footnote{https://www.inovex.de/blog/uncertainty-quantification-deep-learning/} succinctly shows depiction of both the uncertainties in a noisy toy data set. The red line is some deterministic mean function and the generated noisy inputs closer to the line account for the vertical spread, i.e aleatory uncertainty. And, the absence of samples on the input domain account for the horizontal spread, i.e the epistemic uncertainty.

### What are Bayesian Neural Networks ?

Bayesian neural networks have a conceptual difference from fully connected neural networks. As mentioned in the introduction, fully connected neural networks are just piping out a point estimate for a prediction and the final weights that are obtained after the training process has concluded are just single values. In a Bayesian Neural Network the weights are assigned as probability distributions and instead of having a point estimate we now have a distribution of values. Extending the definition These probability distributions describe the uncertainty in weights and can be used to estimate uncertainty in predictions. Training a Bayesian neural network via variational inference learns the parameters of these distributions instead of the weights directly.

### How do these models perform ?

We can observe the performance of the models from Figure \ref{fig:uncertainty}. Figure \ref{fig:data} shows the data set that was used for evaluating the performance was Sine, consisting of 1500 samples in the range of $[-5, 5]$. The Aleatoric uncertainty that is inherent to the noise in the generated Sine Data can be observed in Figure \ref{fig:bnn_aleatoric}. The point that is ought to be noted is that the blue area encapsulates the noise inherent to the Sine Data. The Epistemic uncertainty from the predictions of the model can be observed in Figure \ref{fig:bnn_epistemic}. We can notice that the area that doesn't consist of samples shows a highlighted area indicating that the epistemic uncertainty is localized to the region where there aren't enough samples. This implies that the model is uncertain when trying to make a prediction on inputs that it hasn't seen before. This very behaviour enables Bayesian Neural Networks to stand out from deterministic models because the stochastic nature of the predictions is addressed and the standard error is plotted. Therefore, we are aware of the uncertainties in the predictions.

The aforementioned benefits are not available when you use a deterministic model. The apparent observation from Figure \ref{fig:fcn} is the predictive mean of the model aligning with the true line, although the model performs a good job there is no7. The observations made on the performance of the models when using the Sine Data set is not limited in scope. We can extend these intuitions to other problems in the machine learning as well.

<img src="https://render.githubusercontent.com/render/math?math=e^{i +\pi} =x+1">

Eq. 1 outlines the posterior predictive distribution of the inputs and it highlights how the model has to learn over the entire distribution of values instead of point estimates when gathering the weights of the network. Eq. 1 is not analytically tractable and hence, the cost function that we use to train the Bayesian Neural Network has to learn over the variational distribution $q (\textbf{w} | \theta)$ of the  parameters. This problem is solved using KL divergence shown in Eq. 2 where the divergence of the true posterior distribution $p(\textbf{w} | D )$ and the variational distribution $q (\textbf{w} | \theta)$ is measured and the cost is calculated for every iteration.

When we expand the KL terms in Eq. 2, we observe the equation split into three parts, and the Expectation of the first two just capture the divergence between the distributions and the last term captures the negative log-likelihood of the predictions. Eq. 4 simplifies the expression in Eq. 3 to approximate the cost of the predictions.

## Takeaways ?

The efficacy of these models translates into a multitude of beneficial factors. Firstly, having uncertainty in sectors like Finance, Healthcare would allow people
