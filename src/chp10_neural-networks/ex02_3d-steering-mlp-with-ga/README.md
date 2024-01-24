# 3D Steering MLP with GA

An example of steering behaviours in 3D driven by a multi-layer perceptron (MLP) trained via a genetic algorithm (GA). 

## Genetic neural networks

The combination of neural networks and GAs allows the definition of genetic neural networks (GNNs), i.e., neural networks that are trained through the evolutionary cycle of a GA, rather than through backpropagation. Both approaches have their own merits, but backpropagation via (some form of) gradient descent (GD) is often preferred due to its stronger mathematical properties, granted sufficient hardware equiment (i.e., GPUs). Indeed, GNNs are not guaranteed to converge in a short amount of time, as the selection-reproduction cycles can introduce a lot of variability in the network weights, which is not necessarily for the better. Still, they represent a solid alternative to standard MLPs when 1) a problem is highly non-convex, 2) there are strong memory constraints to be respected, or 3) the fitness is a good proxy of the reward in model-free reinforcement learning (RL) settings. Here, the fitness function mimics the loss function of standard MLPs in determing the goodness of the current state of the network. In particular, only genetically fit networks will undergo a crossover-mutation cycle. The probability of mutation dictates the exploration-exploitation trade-off of the network, as it can allow further exploration of uncharted territory, at the cost of possibly losing an effective path to convergence of the weights. This is why GNNs have no strong convergence guarantees, yet it may prove useful in a scenario like 1), where there isn't a clear path that GD should seek.

The biggest paradigm shift from standard MLPs to GNNs is the lack of backpropagation. Practically, GNNs have much lower memory requirements, as they do not have to store the gradients flowing through the layers, nor they require the construction of a backward computational graph keeping track of all the connections between units in reverse; hence, they scale with the depth and the width of the networks, allowing for faster cycles of forward passes. This is why they may prove useful in a scenario like 2). Conversely, the size of the population is a tricky hyperparameter, as GAs reach convergence if enough variation has been seen in genes expression. The larger the population, the larger the number of network weights to keep in memory at the same time. Careful tuning is key.

If the evolution of GNNs is accompanied by some underlying simulation environment, the formulation of the fitness function may derive only from collecting information about the environment via interaction. A proper fitness function allows the most genetically gifted networks to surf through the environment, while cutting short on the lives of the networks whose weights are not suitable to solve the task at hand. This is why further guidance by the environment could lead to faster training of GNNs; hence, they may prove useful in a scenario like 3).

## Problem formulation

In this example, a fleet of 3D agents are trained to avoid obstacles in their surroundings. For ease of discussion, the agents are allowed to move only along the X-axis, while the obstacles only along the Y-axis, de-facto reducing the dimensionality of the problem from 3D to 2D. Nonetheless, all computations are made against a fully 3D enviroment, thus making any extension of the problem really easy to formulate. The behaviour of each agent is driven by a 3-layer MLP trained via a GA whose fitness function is defined as the # of timesteps since the agent was born. The minimum population size is set to 20, which means that at least 20 different weights representations of a given MLP configuration will be kept in memory at any given time. This means that the evolutionary clock is not synchronized, as not all the offsprings will see birth at the same time, leaving room to an entanglement of generations. In a parallelism with standard MLPs, this may be as useful as skip connections have been for all modern MLP architectures.

Each GNN outputs a 3 by 1 vector, i.e., the 3D acceleration to apply to its agent.

We want to study how much the weights differ from generation to generation leading to the solution. This opens up the possibility of interesting discussions not only about the interpretability of the MLP network, but also about which areas of the network were most significant to reach the solution. In doing so, we vary the minimum population size between 5 and 50, studying its effect on the training time and on the memory footprint of the model.

Along the way, we build a small MLP library with autograd in JS.

Note that the repulsive behaviour that the GNNs learn is not suitable for true physics experiments. Indeed, the physics of the 3D environment is evolved via Euler integration, i.e., assuming very large timesteps between measureaments that neglect finer details and allow to sum any 3D vector into its integral (e.g., the 3D acceleration into the 3D velocity). Yet, the problem is well-formed; hence, the use of any 3D physics engine would enable such considerations.

## Resources

### Genetic algorithms

- https://github.com/shiffman/Tensorflow-JS-Examples/tree/master/05_neuro_evolution_steering_2
- https://medium.com/swlh/genetic-algorithm-in-artificial-neural-network-5f5b9c9467d0

### p5.js

- https://p5js.org/reference/

### MLPs from scratch

- https://medium.com/@steveoni/brief-intro-to-autograd-in-javascript-a667ee55ab36
- https://towardsdatascience.com/building-neural-network-from-scratch-9c88535bf8e9
