export interface TechGroup {
  group: string;
  items: string[];
}

export const TECH_GROUPS: TechGroup[] = [
  {
    group: "Frontend",
    items: [
      "React", "Vue.js", "Angular", "Next.js", "Nuxt.js", "Svelte", "SvelteKit",
      "Astro", "Remix", "Gatsby", "TypeScript", "JavaScript", "HTML / CSS",
      "Tailwind CSS", "SASS / SCSS", "styled-components", "CSS Modules",
      "Redux", "Zustand", "MobX", "Recoil", "Jotai", "React Query", "SWR",
      "Webpack", "Vite", "esbuild", "Rollup", "Three.js", "WebGL", "D3.js",
      "Framer Motion", "GSAP",
    ],
  },
  {
    group: "Backend",
    items: [
      "Node.js", "Express.js", "NestJS", "Fastify", "Koa",
      "Python", "Django", "FastAPI", "Flask", "Tornado", "Celery",
      "Java", "Spring Boot", "Spring MVC", "Quarkus", "Micronaut",
      "Kotlin", "Ktor",
      "Go", "Gin", "Echo", "Fiber",
      "Rust", "Axum", "Actix-web", "Tokio",
      "C#", "ASP.NET Core", ".NET",
      "PHP", "Laravel", "Symfony",
      "Ruby", "Ruby on Rails",
      "Scala", "Play Framework", "Akka",
      "Elixir", "Phoenix",
    ],
  },
  {
    group: "Базы данных",
    items: [
      "PostgreSQL", "MySQL", "MariaDB", "SQLite", "MS SQL Server",
      "MongoDB", "CouchDB", "DynamoDB", "Firestore", "Cosmos DB",
      "Redis", "Memcached",
      "Elasticsearch", "OpenSearch",
      "ClickHouse", "DuckDB",
      "Cassandra", "ScyllaDB",
      "Neo4j",
      "Supabase", "PlanetScale", "CockroachDB", "Neon",
      "TimescaleDB", "InfluxDB",
    ],
  },
  {
    group: "Mobile",
    items: [
      "React Native", "Expo", "Flutter", "Dart",
      "Swift", "SwiftUI", "Objective-C",
      "Kotlin", "Jetpack Compose", "Android SDK",
      "Ionic", "Capacitor", "Xamarin", ".NET MAUI",
    ],
  },
  {
    group: "DevOps / Cloud",
    items: [
      "Docker", "Docker Compose", "Kubernetes", "Helm",
      "AWS", "GCP", "Azure", "DigitalOcean", "Hetzner", "Yandex Cloud",
      "Terraform", "Pulumi", "Ansible", "Puppet",
      "Jenkins", "GitHub Actions", "GitLab CI", "CircleCI", "TeamCity",
      "ArgoCD", "FluxCD",
      "Nginx", "HAProxy", "Traefik", "Envoy", "Istio",
      "Linux", "Bash / Shell",
      "Prometheus", "Grafana", "Loki",
      "Datadog", "New Relic", "Sentry",
      "ELK Stack", "OpenTelemetry",
      "Vault (HashiCorp)", "Consul",
    ],
  },
  {
    group: "Data / ML / AI",
    items: [
      "TensorFlow", "PyTorch", "Keras", "JAX",
      "Scikit-learn", "XGBoost", "LightGBM", "CatBoost",
      "Pandas", "NumPy", "SciPy", "Polars",
      "Spark", "PySpark", "Flink",
      "Airflow", "Prefect", "Dagster",
      "dbt", "Fivetran", "Airbyte",
      "Kafka", "Pulsar", "RabbitMQ",
      "Hadoop", "Hive", "Delta Lake",
      "MLflow", "Kubeflow",
      "Hugging Face", "LangChain", "LlamaIndex", "OpenAI API", "Anthropic API",
      "Jupyter", "Streamlit", "Gradio",
      "Tableau", "Power BI", "Metabase",
    ],
  },
  {
    group: "Тестирование",
    items: [
      "Jest", "Vitest", "Mocha",
      "Cypress", "Playwright", "Puppeteer", "Selenium", "WebdriverIO",
      "Testing Library",
      "JUnit", "TestNG", "Mockito",
      "pytest", "unittest",
      "NUnit", "xUnit",
      "Postman", "Insomnia",
      "k6", "Gatling", "Artillery", "JMeter",
    ],
  },
  {
    group: "Прочее",
    items: [
      "Git", "GitHub", "GitLab", "Bitbucket",
      "REST API", "GraphQL", "gRPC", "WebSockets", "tRPC",
      "RabbitMQ", "Kafka", "NATS", "SQS / SNS",
      "Microservices", "Event Sourcing", "CQRS", "DDD", "Clean Architecture",
      "TDD", "BDD", "SOLID", "Design Patterns",
      "CI/CD", "GitOps", "Agile / Scrum", "Kanban",
      "Figma", "Storybook",
      "Jira", "Confluence", "Linear", "Notion",
    ],
  },
];

export const ALL_TECHS: string[] = TECH_GROUPS.flatMap((g) => g.items);
