# Setting up the Development Environment

```bash
# We use pnpm as our package manager.
npm install -g pnpm
```

```bash
# Install all dependencies.
pnpm install

# Build the project (as "release" mode).
pnpm build

# Update the `dist` folder every time a file in the dependency tree updates.
pnpm watch

# Same as the `watch` script, but also starts an HTTP server at port `1234` for convenience.
pnpm dev
```
