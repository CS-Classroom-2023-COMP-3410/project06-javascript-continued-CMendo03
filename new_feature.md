**Attempted Feature: Flappy Bird Game Integration**

What I Tried to Add
I wanted to expand my customizable game hub project by adding Flappy Bird as a playable game alongside the existing Rock Paper Scissors, Blackjack, and Tic Tac Toe (with Minimax AI). The goal was to create a simple, interactive version of Flappy Bird where the player taps a key or clicks to make the bird "flap" and avoid moving obstacles.
Flappy Bird is a classic, minimalist game that’s become a staple in casual gaming. Including it in a frontend game hub adds variety and appeals to users who enjoy quick, skill-based challenges. My game hub would be more rounded with this implementation. 

**How It Was Supposed to Work**
The game would’ve worked like this:

1. The bird starts in the center of the screen and falls due to "gravity."

2. Pressing the spacebar or clicking the screen makes the bird jump upward.

3. Randomly generated obstacles (pipes or barriers) move toward the bird.

4. Collisions with obstacles or the ground end the game.

5. The score increases as the bird survives longer.

I planned to use vanilla JavaScript for the game loop, collision detection, and DOM manipulation, with either HTML5 Canvas or CSS animations for smooth movement.


**Where Things Went Wrong**
Despite multiple attempts, I couldn’t get the Flappy Bird implementation to work. Here’s where ChatGPT’s guidance fell short:

Broken Event Connections
The provided code had event listeners for keyboard inputs and clicks, but they didn’t reliably trigger the bird’s "flap" action. Sometimes the bird wouldn’t respond at all, and other times it would "jump" erratically. I spent hours troubleshooting this, even rewriting the event handlers, but never fixed the inconsistency.

Animation Loop Issues
The game loop (using requestAnimationFrame) didn’t sync properly with obstacle generation. Obstacles either spawned too quickly, causing visual overlaps, or didn’t spawn at all. The screen flickered during updates, making the game unplayable.

Contrast with Other Features
This was frustrating because the other games in the hub (like Tic Tac Toe’s Minimax AI and Rock Paper Scissors customization) worked smoothly after some debugging. For example, the Minimax algorithm in Tic Tac Toe required careful recursion and state management, but once I structured it step-by-step, it clicked. Similarly, adding custom rock/paper/scissors images was straightforward with DOM manipulation.

ChatpGPT failed to implement it correctly and it was not working like the other games in my game hub, I tried and tried again but it was not helping. 