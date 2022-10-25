# Setup node + pnpm
FROM node:16-alpine as base
WORKDIR /project
RUN corepack enable && corepack prepare pnpm@latest --activate

# Setup monorepo for development
FROM base as development
COPY . ./
COPY ./node_modules/.cache ./node_modules/.cache
RUN pnpm install --frozen-lockfile && pnpm build --filter "{./apps/web}..."

# Setup monorepo for production
FROM base as production
COPY --from=development /project ./
RUN pnpx rimraf ./**/node_modules ./apps/[!web]* \
  && pnpm install --prod \
  && rm -rf $(pnpm store path) \
  && rm -rf ./apps/web/.next/cache

# Start the server
WORKDIR /project/apps/web
EXPOSE 3000
CMD ["pnpm", "start"]
