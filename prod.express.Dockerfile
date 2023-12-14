FROM node:18-alpine AS base

# Step 1. Rebuild the source code only when needed
FROM base AS builder

WORKDIR /

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
# Omit --production flag for TypeScript devDependencies
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  # Allow install without lockfile, so example works even without Node.js installed locally
  else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
  fi

COPY express-server ./express-server/

# Build express-server based on the preferred package manager
RUN \
  if [ -f yarn.lock ]; then yarn build-express-server; \
  elif [ -f package-lock.json ]; then npm run build-express-server; \
  elif [ -f pnpm-lock.yaml ]; then pnpm build-express-server; \
  else yarn build-express-server; \
  fi

# Note: It is not necessary to add an intermediate step that does a full copy of `node_modules` here

# Step 2. Production image, copy all the files and run next
FROM base AS runner

WORKDIR /
COPY --from=builder node_modules ./node_modules/
COPY --from=builder express-server/dist ./express-server/

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs

# Note: Don't expose ports here, Compose will handle that for us

CMD ["node", "./express-server/index.js"]
