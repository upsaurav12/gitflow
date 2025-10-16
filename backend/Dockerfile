# ---------- Stage 1: Build ----------
FROM golang:1.23-alpine AS builder

RUN apk add --no-cache git

WORKDIR /app

# Copy dependency files first
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the project
COPY . .

# Build binary (compile from cmd/main.go)
RUN go build -o /app/server ./cmd/main.go

# ---------- Stage 2: Runtime ----------
FROM alpine:latest

WORKDIR /app

# Copy built binary from builder
COPY --from=builder /app/server /app/server

RUN chmod +x /app/server

EXPOSE 8000

ENTRYPOINT ["/app/server"]
