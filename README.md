# Rock, Paper, Scissors, Lizard, Spock 🖖🪨📄✂️🦎

An interactive, responsive, and highly polished web implementation of **Rock, Paper, Scissors, Lizard, Spock**—the famous expansion of the classic hand game. Originally invented by Sam Kass and Karen Bryla to reduce ties, this variant became a global pop culture phenomenon thanks to Sheldon Cooper in *The Big Bang Theory*.

This browser-based application is built entirely with clean, semantic markup, modular CSS sections, and modern Vanilla JavaScript, featuring complete game-state tracking, custom rule conditions, and rich pop-culture visual rewards.

---

## 🚀 Main Features

* **Complete 5-Symbol Ruleset**: Full logical implementation of the classic interactions:
  * 🪨 **Sasso (Rock)**: Crushes Lizard & Scissors | Lost to Paper & Spock.
  * 📄 **Carta (Paper)**: Covers Rock & Disproves Spock | Lost to Scissors & Lizard.
  * ✂️ **Forbici (Scissors)**: Cuts Paper & Decapitates Lizard | Lost to Rock & Spock.
  * 🦎 **Lizard**: Eats Paper & Poisons Spock | Lost to Rock & Scissors.
  * 🖖 **Spock**: Vaporizes Rock & Smashes Scissors | Lost to Paper & Lizard.
* **Custom Series Limit ("Al meglio di...")**: Choose your target game ceiling (e.g., first to 10, 15, or 20 wins). The input dynamically updates the win condition on the fly.
* **Live Gameplay Timer**: An integrated session stopwatch tracks exact match durations, automatically starting on your first move and pausing instantly when a final victor is crowned.
* **State Persistence**: Integrates browser `localStorage` to save live scores (Wins, Losses, Ties) and game parameters. Refreshing or accidentally closing the page won't wipe your active tournament.
* **Dynamic Sidebar & Card Animations**: Visually highlights the winner of each round in orange, rendering the chosen moves side-by-side with localized graphics.
* **Thematic Game-Over Screens & Random Quotes**: 
  * **Win (Bazinga!)**: Shows Captain Kirk with randomized witty space travel/science quotes.
  * **Loss (Fascinating)**: Displays Spock with customized philosophical and logic-based quotes.
  * **Tie**: Features Kirk & Spock alongside iconic quotes from *The Big Bang Theory*.
* **Full Game Reset**: A dedicated reset mechanism that clears scores, resets timers, sweeps `localStorage`, and updates the DOM cleanly.

---

## 🛠️ Technologies Used

* **HTML5**: Structured with clean semantic elements (`<section>`, `<ul>`, `<button>`) to construct a logical web hierarchy.
* **CSS3**: Separated into modular, reusable stylesheets containing:
  * **CSS Grid Layouts** for aligning game rules and choice selections.
  * **CSS Flexbox** for flexible, centered dashboard counters and responsive, flowing component groups.
  * Fully responsive media queries tailored for mobile, tablet, and desktop viewports.
* **Vanilla JavaScript (ES6)**: 
  * Robust state management (local storage and structural object scopes).
  * Real-time DOM manipulation and dynamic class toggles for CSS animations.
  * Precise time-tracking math using asynchronous intervals (`setInterval`).
  * Randomized array indexing for contextual end-game quotes.

---

## 📂 Project Structure

```text
├── rock-paper-scissors-lizard-spock.html   # Main game HTML interface
├── scripts/
│   └── rock-paper-scissors-spock.js        # Core game mechanics, timer, & state logic
├── styles/
│   ├── choice-section.css                  # Move-selection button styles
│   ├── generic-elements.css                # Base typography and body defaults
│   ├── input-section.css                   # Best-of matches input customization
│   ├── intro-section.css                   # Header, titles, and historical context style
│   ├── quote-section.css                   # Popups and randomized quote boxes
│   ├── result-section.css                  # Side-by-side VS comparison round results
│   ├── rules-section.css                   # Grid system for explaining game rules
│   ├── score-section.css                   # Dashboard counters (You, CPU, Ties)
│   └── time-section.css                    # Game stopwatch style (Back to the Future themed)
└── images/                                 # Visual assets organized by module
    ├── final-result-card-view/             # Win/Lose overlay screens
    ├── generic/                            # Main game rule layout vector chart
    ├── moves-card-view/                    # Move banners (Sasso, Carta, Forbici, Lizard, Spock)
    ├── score-card-view/                    # Reset icons, historic and franchise portraits
    └── time-icon/                          # Retro timer-related graphics
