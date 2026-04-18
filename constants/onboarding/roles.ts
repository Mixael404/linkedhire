export interface RoleOption {
  value: string;
  label: string;
  group: string;
}

export const ROLES: RoleOption[] = [
  // Frontend
  { value: "frontend", label: "Frontend Developer", group: "Фронтенд" },
  { value: "react_dev", label: "React Developer", group: "Фронтенд" },
  { value: "vue_dev", label: "Vue.js Developer", group: "Фронтенд" },
  { value: "angular_dev", label: "Angular Developer", group: "Фронтенд" },
  { value: "nextjs_dev", label: "Next.js Developer", group: "Фронтенд" },
  { value: "svelte_dev", label: "Svelte Developer", group: "Фронтенд" },

  // Backend
  { value: "backend", label: "Backend Developer", group: "Бэкенд" },
  { value: "nodejs_dev", label: "Node.js Developer", group: "Бэкенд" },
  { value: "python_dev", label: "Python Developer", group: "Бэкенд" },
  { value: "java_dev", label: "Java Developer", group: "Бэкенд" },
  { value: "go_dev", label: "Go Developer", group: "Бэкенд" },
  { value: "rust_dev", label: "Rust Developer", group: "Бэкенд" },
  { value: "php_dev", label: "PHP Developer", group: "Бэкенд" },
  { value: "dotnet_dev", label: ".NET / C# Developer", group: "Бэкенд" },
  { value: "ruby_dev", label: "Ruby / Rails Developer", group: "Бэкенд" },
  { value: "kotlin_dev", label: "Kotlin Developer", group: "Бэкенд" },
  { value: "scala_dev", label: "Scala Developer", group: "Бэкенд" },
  { value: "elixir_dev", label: "Elixir Developer", group: "Бэкенд" },

  // Fullstack
  { value: "fullstack", label: "Fullstack Developer", group: "Фулстек" },
  { value: "fullstack_react_node", label: "Fullstack (React + Node)", group: "Фулстек" },
  { value: "fullstack_python", label: "Fullstack (Python)", group: "Фулстек" },
  { value: "fullstack_java", label: "Fullstack (Java)", group: "Фулстек" },

  // Mobile
  { value: "mobile", label: "Mobile Developer", group: "Мобильная" },
  { value: "ios_dev", label: "iOS Developer (Swift)", group: "Мобильная" },
  { value: "android_dev", label: "Android Developer (Kotlin)", group: "Мобильная" },
  { value: "rn_dev", label: "React Native Developer", group: "Мобильная" },
  { value: "flutter_dev", label: "Flutter Developer", group: "Мобильная" },
  { value: "cross_platform", label: "Cross-platform Developer", group: "Мобильная" },

  // DevOps / Cloud
  { value: "devops", label: "DevOps Engineer", group: "DevOps / Cloud" },
  { value: "sre", label: "SRE (Site Reliability Engineer)", group: "DevOps / Cloud" },
  { value: "platform_eng", label: "Platform Engineer", group: "DevOps / Cloud" },
  { value: "cloud_eng", label: "Cloud Engineer", group: "DevOps / Cloud" },
  { value: "infra_eng", label: "Infrastructure Engineer", group: "DevOps / Cloud" },
  { value: "k8s_eng", label: "Kubernetes / Container Engineer", group: "DevOps / Cloud" },

  // Data / AI / ML
  { value: "data_engineer", label: "Data Engineer", group: "Данные и AI" },
  { value: "data_analyst", label: "Data Analyst", group: "Данные и AI" },
  { value: "data_scientist", label: "Data Scientist", group: "Данные и AI" },
  { value: "ml_engineer", label: "ML Engineer", group: "Данные и AI" },
  { value: "ai_engineer", label: "AI Engineer (LLM / Agents)", group: "Данные и AI" },
  { value: "cv_engineer", label: "Computer Vision Engineer", group: "Данные и AI" },
  { value: "nlp_engineer", label: "NLP Engineer", group: "Данные и AI" },
  { value: "bi_analyst", label: "BI Analyst / Analytics Engineer", group: "Данные и AI" },

  // QA
  { value: "qa_manual", label: "QA Engineer (Manual)", group: "Тестирование" },
  { value: "qa_auto", label: "QA Automation Engineer", group: "Тестирование" },
  { value: "qa_lead", label: "QA Lead", group: "Тестирование" },
  { value: "sdet", label: "SDET (Software Dev in Test)", group: "Тестирование" },
  { value: "perf_tester", label: "Performance / Load Tester", group: "Тестирование" },

  // Security
  { value: "security_eng", label: "Security Engineer", group: "Безопасность" },
  { value: "appsec", label: "Application Security Engineer", group: "Безопасность" },
  { value: "pentest", label: "Penetration Tester", group: "Безопасность" },
  { value: "devsecops", label: "DevSecOps Engineer", group: "Безопасность" },

  // Leadership
  { value: "tech_lead", label: "Tech Lead / Team Lead", group: "Лидерство" },
  { value: "architect", label: "Software Architect", group: "Лидерство" },
  { value: "eng_manager", label: "Engineering Manager", group: "Лидерство" },
  { value: "cto", label: "CTO / VP of Engineering", group: "Лидерство" },
  { value: "staff_eng", label: "Staff / Principal Engineer", group: "Лидерство" },

  // Other
  { value: "blockchain_dev", label: "Blockchain / Web3 Developer", group: "Другое" },
  { value: "gamedev", label: "Game Developer (Unity / Unreal)", group: "Другое" },
  { value: "embedded", label: "Embedded Systems Developer", group: "Другое" },
  { value: "systems_dev", label: "Systems Developer (C / C++)", group: "Другое" },
  { value: "firmware", label: "Firmware Engineer", group: "Другое" },
  { value: "other", label: "Другая специальность", group: "Другое" },
];

export const ROLE_GROUPS = [...new Set(ROLES.map((r) => r.group))];
