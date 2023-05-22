# Web Accessibility in JavaScript Apps

_The web is awesome and everyone should be able to enjoy it._

Hi there! I'm [Sandrina Pereira](https://twitter.com/a_sandrina_p) and I believe that making the web accessible is our duty as web creators.

---

## Pre-Workshop requirements

To get the most out of the workshop, please do the following things in advance.

- **Install Chrome or Firefox.** I'll be using Chrome most of the time.
- **Setup the project** prior to the workshop to avoid unexpected installation issues.
- **Install the browser extensions** that we will use during the workshop.
- **Familiarize yourself with the basics of a SR (screen reader)**. Read below for further practical guidance.
- **Bring ear/headphones** to use the Screen Reader in the workshop room.

The better prepared you are for the workshop, the more you will learn from it!

## Feedback

💭 At the end of the workshop, I highly appreacite your [anonymous feedback](https://forms.gle/eYjSyYCLSuh5Qzyn7).

---

## Setup the workshop

### Locally

Install [Git](https://git-scm.com/) and [NodeJS](https://nodejs.org/en/).

```bash
# Clone the repository
git clone https://github.com/sandrina-p/workshop-a11y-jsdaycanarias

# Go to workshop folder
cd workshop-a11y-react-jsdaycanarias

# Install the dependencies
npm install

# Run the project
npm run dev
```

Open [localhost:3005](http://localhost:3005/).

If you have any problem, reach me directly at a.sandrina.p@gmail.com

### Keyboard adjustments

On Macbooks, by default pressing `Tab` to navigate a webpage might not work on Safari and Firefox. Here's the fix:

- Safari: Open Safari Settings, go to "Advanced" and check "Press Tab to Highlight each item on a webpage". ([_source_](https://www.scottohara.me/blog/2014/10/03/link-tabbing-firefox-osx.html))
- Firefox: Open Mac "System Preferences" > "Keyboard" > "Shorcuts" > Check at the bottom "All controls" or "Use keyboard navigation to move focus between controls" ([_source_](https://stackoverflow.com/a/11713537))

---

## Browser extensions

We'll explore some browser extensions:

The ones below we'll use frequently:

- [Accessibility Insights for Web](https://accessibilityinsights.io/en/downloads/) - Chrome only
- [Axe Developer Tools](https://www.deque.com/axe/browser-extensions/) - Chrome or Firefox. This is the alternative, but the extension above is more complete.

At some point, we'll might also use the following:

- [Web Developer](https://chrispederick.com/work/web-developer/)
- [Colour contrast checker](https://colourcontrast.cc/) - Chrome only
- [HeadingsMap](https://rumoroso.bitbucket.io/) - Chrome or Firefox

## Screen Readers

We'll explore SR (Screen Reader), however during a workshop it's not practical to teach everyone how to use a SR. Here's some friendly video tutorials for you to practice ahead of time:

- Mac: You'll use VO (Voice Over) [Watch VO introduction](https://www.youtube.com/watch?v=5R-6WvAihms&t=198s).
- Windows: Install [NVDA](https://www.nvaccess.org/) and [watch NVDA introduction](https://www.youtube.com/watch?v=Jao3s_CwdRU).
- Linux: Install [Orca](https://wiki.gnome.org/Projects/Orca) and [watch Orca introduction](https://www.youtube.com/watch?v=8OWSztc3AtY).

My favorite cheatsheet of keyboard shortcuts:

- [VO and NVDA cheatsheet](https://dequeuniversity.com/screenreaders/survival-guide)
- [Orca cheatsheet](https://help.gnome.org/users/orca/stable/commands_controlling_orca.html.en).

I **highly encourage** you to [practice with this simple webpage](https://sgwvk.csb.app/).

**Tip:** While the SR is speaking, press `Control` key to force it to stop reading it. This might help you to reduce the annoying/frustration feeling while exploring it.

**MacOS Tip:** Go to Settings > Accessibility > Voice Over Utility > Web > General. Uncheck "Automatically speak the webpage".

Good luck 🤞

## Workshop Dynamics

This project uses [NextJS](https://nextjs.org/) with React 18.

The workshop will consist of a set of challenges.  
Each one introduces a new topic, followed by a code exercise for you to apply the concepts learned.
After each exercise, we'll go through the solution together and clarify any question you might have.

```bash
exercises/
  *.exercise.jsx # Where you'll be coding
  *.solution.jsx # The solutions with explanations
* # You can ignore everything else.
```

### Expectations

- **Time value:** I don't expect you to complete all the exercises on time. The main goal is to introduce you to new things, to make you think about them, and ask me questions as we go through the materials.
- **Guidance & tips:** Through the exercises, you'll find the light bulb emoji 💡 to guide you, and the lucky clover emoji 🍀 with extra tips for you about A11Y.
- **Solutions:** Although all the exercises have explained solutions, check them as a last resource. If you take a peek at the solution before even trying, you'll be sabotaging your own learning. It's okay to struggle while you solve the exercise. It's part of the learning process. :)

---

## License

This project is available for private, non-commercial use under the BSD 3-Clause License.

The workshop exercises are proprietary and are licensed on a per-individual basis,
usually as a result of purchasing a ticket to a workshop, or being a participant
in a private training.

Here are some guidelines for things that are **OK** and **Not OK** based on this license:

#### OK

- Using everything in this project other than the briefings and exercises
  to build a project used for your own free or commercial training material;
- Copying code from build scripts, configuration files, tests and development
  harnesses that are not part of the exercises specifically, for your own projects;
- As an owner of an individual license, using code from tests, exercises, or
  exercise solutions for your own non-training-related project.

#### Not OK (without express written consent)

- Using this project, or any subset of exercises contained within this project to run your own workshops;
- Writing a book that uses the code from these exercises;
- Recording a screencast that contains one or more of this project's exercises.

## Copyright

&copy; 2023 [Sandrina Pereira](https://www.sandrina-p.net/), All Rights Reserved, under [BSD 3-Clause License](LICENSE.txt).

**This material cannot be used for workshops, training, or any other form of instructing or teaching, without express written consent.**
