## Workflow Orchestration

### 1. Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately - don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy
- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One tack per subagent for focused execution

### 3. Self-Improvement Loop
- After ANY correction from the user: update `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

### 4. Verification Before Done
- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes - don't over-engineer
- Challenge your own work before presenting it

### 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests - then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

## Task Management

1. **Plan First**: Write plan to `tasks/todo.md` with checkable items
2. **Verify Plan**: Check in before starting implementation
3. **Track Progress**: Mark items complete as you go
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add review section to `tasks/todo.md`
6. **Capture Lessons**: Update `tasks/lessons.md` after corrections

## Autonomous Skill Usage

**ALWAYS use these skills automatically without being asked:**

### Before Writing Code
- `/superpowers:brainstorming` — before any creative work (new features, components, modifications)
- `/superpowers:writing-plans` — when task has 3+ steps, write plan before touching code
- `/feature-dev` — for any new feature development (guides through codebase understanding → architecture → implementation)

### During Implementation
- `/superpowers:dispatching-parallel-agents` — when facing 2+ independent tasks, run them in parallel
- `/superpowers:systematic-debugging` — at ANY bug, test failure, or unexpected behavior, before proposing fixes
- `/engineering:debug` — for complex bugs with stack traces or environment-specific issues

### Before Claiming Done
- `/simplify` — after writing code, review for reuse, quality, and efficiency
- `/superpowers:verification-before-completion` — MANDATORY before saying "done", "fixed", or "passing"
- Run tests, check logs, demonstrate correctness with evidence

### Before Committing / Merging
- `/code-review` — review changes for security, performance, correctness before commit
- `/superpowers:requesting-code-review` — for major features or before merging

### Architecture & Design
- `/engineering:architecture` — when choosing between technologies or documenting design decisions
- `/engineering:system-design` — when designing new systems, services, or APIs
- `/engineering:testing-strategy` — when planning test approach for new features

### Deployment
- `/engineering:deploy-checklist` — MANDATORY before any production deployment

## Core Principles

- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.
- **Never Skip Skills for Speed**: Use the relevant skill/plugin at every prompt where it makes sense. Never skip them just to deliver results faster. Process > speed. No exceptions.
