#!/bin/bash

# Init new app 

# Create directories
mkdir -p src/{controllers,models,services,routes,middleware,views,db}
mkdir -p tests/{controllers,models,services}

# Create files
touch src/controllers/index.ts
touch src/models/index.ts
touch src/services/index.ts
touch src/views/index.html
touch src/routes/index.ts
touch src/middleware/logger.ts
touch src/app.ts

touch tests/controllers/controller.test.ts
touch tests/models/model.test.ts
touch tests/services/service.test.ts

# Create configuration and documentation files
touch deno.json README.md

# Output structure for confirmation
echo "Project structure initialized:"
find . -type d -or -type f
