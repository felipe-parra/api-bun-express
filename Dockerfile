FROM oven/bun:1 as base
WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Install with --production (exclude devDependencies)
RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile

# Copy node_modules from temp folder
FROM install AS prerelease
COPY --from=install /temp/dev/node_modules node_modules

# [optional] test & build
# ENV NODE_ENV=production
# RUN bun test
# Run bun run build

# Copy production dependencies and source code
FROM base as release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/index.ts .
COPY --from=prerelease /usr/package.json .

USER bun
EXPOSE 3000/tcp
CMD [ "bun", "run", "dev" ]