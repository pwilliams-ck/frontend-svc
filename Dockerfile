

WORKDIR /app

# Copy package files
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install

# Copy the rest of the application
COPY . .

# Build the application
RUN bun run build

EXPOSE 3000

# Start the application
CMD ["bun", "run", "dev"]

