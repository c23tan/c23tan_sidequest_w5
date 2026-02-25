## Project Title

Week 5 — Example 5: Side-Scroller Platformer with JSON Levels + Modular Camera

---

## Authors

Edited by Caitlyn Tan | c23tan | 21088383
Karen Cochrane and David Han

---

## Description

This is a side-scrolling platformer where the player controls a smiley face character. The objective is to move through an extended level, jump across platforms, and collect coins that spawn on platforms. Coins automatically respawn at random platform locations when collected, encouraging continued movement and exploration.

---

## Setup and Interaction Instructions

- Move Left/Right: A / D or ← / →
- Jump: Space, W, or ↑
- Respawn Level: R
- Objective: Collect coins while avoiding falling off platforms (falling below the world resets the level).

---

## Learning Goals

Learning Goals:

- Build a side-scrolling platformer using modular game systems
- Load complete level definitions from external JSON (LevelLoader + levels.json)
- Separate responsibilities across classes (Player, Platform, Camera, World)
- Implement gravity, jumping, and collision with platforms
- Use a dedicated Camera2D class for smooth horizontal tracking
- Support multiple levels and easy tuning through data files
- Explore scalable project architecture for larger games

---

## Assets

N/A

---

## Iteration Notes

- Player: Smiley face replaces the previous blob shape.
- Coins: Spawn on platforms and respawn randomly when collected.
- Platforms: Extended world width and additional platforms allow longer forward movement.
- Camera: Smoothly follows the player horizontally.
- Next Steps / Enhancements: Consider adding coin animations (bouncing), sound effects, or hazards for more interactive gameplay.

## GenAI

The code and comments were written by GenAi. Minor errors and bugs were fixed by Caitlyn Tan.

The code was written by Dr. Karen Cochrane and David Han but they used GenAI to write the comments.

---
