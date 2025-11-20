# Multi-stage build for Next.js production deployment
# Based on Next.js official Docker example with optimizations

# Stage 1: Dependencies
FROM node:20-alpine AS deps
# Install build dependencies (Python, make, g++) for native modules
RUN apk add --no-cache \
    libc6-compat \
    python3 \
    make \
    g++ \
    gcc \
    linux-headers \
    openssl-dev \
    eudev-dev \
    libusb-dev

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.9.0 --activate

# Copy package files
COPY package.json pnpm-lock.yaml* ./
COPY src/prisma ./src/prisma

# Install dependencies
RUN pnpm install --frozen-lockfile

# Generate Prisma Client
RUN pnpm prisma:generate

# Stage 2: Builder
FROM node:20-alpine AS builder
# Install build dependencies for native modules
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    openssl-dev

WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9.9.0 --activate

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/src/prisma ./src/prisma

# Copy application source
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build Next.js application
RUN pnpm run build

# Stage 3: Runner (Production)
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/src/prisma ./src/prisma

# Set correct permissions
RUN chown -R nextjs:nodejs /app

# Switch to non-root user
USER nextjs

# Expose port 3000
EXPOSE 3000

# Set port environment variable
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" || exit 1

# Start the application
CMD ["node", "server.js"]