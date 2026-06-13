# SimplyApp

A starter project for building modern web applications with:

* **simplyview** — declarative UI rendering and data binding
* **simplyflow** — reactive state, routing, actions, and application flow
* **@muze-nl/metro** — API clients and data access
* **@muze-nl/theds** — design system and UI components

This repository provides a working application skeleton so you can focus on building features instead of setting up infrastructure.

## What is SimplyApp?

SimplyApp is intended as the quickest way to start a new web application using the Simply ecosystem.

The framework stack follows a simple philosophy:

| Library        | Responsibility                                    |
| -------------- | ------------------------------------------------- |
| simplyflow     | Application state, Binding state to HTML          |
| simplyview     | Application framework, routing, actions, commands |
| @muze-nl/metro | Communicating with APIs                           |
| @muze-nl/theds | Styling and reusable UI components                |

Together they provide an alternative to larger frameworks while keeping application code understandable and close to standard HTML, CSS, and JavaScript.

## Prerequisites

You should be comfortable with:

* HTML
* CSS
* Modern JavaScript (ES Modules)
* Basic npm usage

No previous experience with Simply libraries is required.

---

# Getting Started

## 1. Create your own project

Use this repository as a template or clone it:

```bash
git clone https://github.com/poef/simplyapp.git my-app
cd my-app
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run watch
```

Open the URL shown in your terminal.

You should now see the starter application running locally.

---

# Understanding the Architecture

A Simply application consists of four main parts:

```text
┌─────────────┐
│    HTML     │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ simplyview  │
│ App framew. │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│ simplyflow  │
│ State       │
│ Databinding │
│ Render      │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Metro     │
│ API Access  │
└─────────────┘
```

Most application logic lives inside a single app definition.

A typical Simply application contains:

```javascript
const app = simply.app({
    state: ...,
    routes: ...,
    actions: ...,
    commands: ...,
    api: ...
});
```

---

# Core Concepts

## State

State contains the data your application works with.

```javascript
state: simply.state.signal({
    count: 0
})
```

Whenever state changes, the UI updates automatically.

For example:

```javascript
this.state.count++;
```

causes any bound UI elements to refresh.

---

## Data Binding

HTML is connected to application state using data attributes.

### Display a value

```html
<span data-flow-field="count"></span>
```

When:

```javascript
this.state.count = 42;
```

the page automatically shows:

```text
42
```

No manual DOM manipulation is required.

---

## Lists

Displaying collections is done using `data-flow-list`.

```html
<ul data-flow-list="items">
    <template>
        <li>
            <span data-flow-field="title"></span>
        </li>
    </template>
</ul>
```

Given:

```javascript
this.state.items = [
    { title: "First item" },
    { title: "Second item" }
];
```

the list is rendered automatically.

---

## Commands

Commands are functions triggered directly from the UI.

```javascript
commands: {
    increment() {
        this.state.count++;
    }
}
```

Bind them in HTML:

```html
<button data-simply-command="increment">
    Add
</button>
```

When the button is clicked, the command runs.

---

## Actions

Actions contain application logic.

```javascript
actions: {
    async loadUsers() {
        this.state.users = await this.api.users.list();
    }
}
```

Actions can:

* call APIs
* update state
* trigger other actions

Think of actions as your application's use cases.

---

## Routes

Routes connect URLs to application behavior.

```javascript
routes: {
    "/": function() {
        this.actions.loadDashboard();
    },

    "/users": function() {
        this.actions.loadUsers();
    }
}
```

Navigating to a URL automatically executes the corresponding route.

---

# Working with APIs

Metro simplifies API communication.

## Define an API client

```javascript
api: metro.jsonApi(
    "https://api.example.com/",
    {
        users() {
            return this.get("users");
        }
    }
)
```

## Use it from an action

```javascript
actions: {
    async loadUsers() {
        this.state.users = await this.api.users();
    }
}
```

The action fetches data and stores it in application state.

The UI updates automatically.

---

# Styling with THEDS

`@muze-nl/theds` provides a design system and reusable interface components.

Use it for:

* page layouts
* typography
* forms
* buttons
* navigation
* consistent styling

When building new screens, prefer existing THEDS components over creating custom UI from scratch. This keeps applications visually consistent and accessible.

---

# A Complete Example

A minimal counter application:

## HTML

```html
<h1>Counter</h1>

<p>
    Count:
    <span data-flow-field="count"></span>
</p>

<button data-simply-command="increment">
    Add One
</button>

<button data-simply-command="reset">
    Reset
</button>
```

## JavaScript

```javascript
const app = simply.app({
    state: simply.state.signal({
        count: 0
    }),

    commands: {
        increment() {
            this.state.count++;
        },

        reset() {
            this.state.count = 0;
        }
    }
});

simply.bind({
    root: app.state,
    attribute: "data-flow"
});
```

This demonstrates the core Simply workflow:

1. User clicks a button.
2. A command executes.
3. State changes.
4. The UI updates automatically.

---

# Recommended Development Workflow

When building a new feature:

### 1. Define state

```javascript
state: {
    users: []
}
```

### 2. Create an action

```javascript
loadUsers()
```

### 3. Connect an API

```javascript
api.users()
```

### 4. Render the data

```html
<ul data-flow-list="users">
```

### 5. Add commands for user interaction

```javascript
commands: {
    refreshUsers()
}
```

This pattern scales well from small applications to larger projects.

---

# Project Structure

A typical SimplyApp project looks like:

```text
src/
├── app/
│   ├── actions/
│   ├── routes/
│   ├── commands/
│   └── state/
├── pages/
├── components/
├── styles/
└── main.js
```

The exact structure is flexible. Organize code in the way that best supports your application.

---

# Learning More

If you're new to the ecosystem, focus on learning the libraries in this order:

1. [simplyflow](https://github.com/SimplyEdit/simplyflow)

   * state
   * bindings
   * lists
   * templates

2. [simplyview](https://github.com/SimplyEdit/simplyview/)

   * application framework
   * actions
   * commands
   * routing

3. [@muze-nl/metro](https://github.com/muze-nl/metro)

   * API clients
   * remote data

4. [@muze-nl/the-DS](https://github.com/muze-nl/the-ds/)

   * components
   * design system

Most applications can be built by mastering these concepts.

---

# Philosophy

SimplyApp embraces a few core ideas:

* Keep HTML readable.
* Keep state explicit.
* Keep application logic in actions.
* Keep UI reactive.
* Prefer composition over framework magic.

If you understand HTML, JavaScript, and application state, you can build powerful applications without a large framework learning curve.

---

# License

[MIT license](LICENSE)
