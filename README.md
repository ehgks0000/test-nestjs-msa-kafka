# nestjs monorepo msa with kafka

# how to run

```bash
docker compose up --build -d
nx run api-gateway:serve
nx run auth-microservice:serve
nx run payments-microservice:serve
```

# check kafka

access `localhost:8080`
