# Stage 1: Build the app
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the built app
FROM node:22-alpine

WORKDIR /app

# Install 'serve' to serve the static files
RUN npm install -g serve

# Copy the built output from the previous stage
COPY --from=builder /app/dist .

EXPOSE 3000

CMD ["serve", "-s", ".", "-l", "3000"]

