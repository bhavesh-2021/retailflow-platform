.PHONY: install up down logs migrate user-migration-generate

install:
	cd services/user-service && pnpm install

up:
	docker compose up --build -d

down:
	docker compose down

logs:
	docker compose logs -f

migrate:
	docker compose exec user-service pnpm run migration:run

user-migration-generate:
	docker compose exec -e NAME=$(NAME) user-service pnpm run migration:generate
