.PHONY: install up down logs

install:
	cd services/user-service && pnpm install

up:
	docker compose up --build -d

down:
	docker compose down

logs:
	docker compose logs -f
