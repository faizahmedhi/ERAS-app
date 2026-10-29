import {
  AcademicDoubt,
  Assignment,
  Certification,
  DigitalResource,
  FacultyMember,
  LectureRecap,
  ResourceFeedback,
  SkillTrack,
  UserResourceAccess,
} from '../types';

// ==========================================
// 1. DIGITAL LIBRARY (E-Books, Notes, PDFs)
// ==========================================
export const INITIAL_DIGITAL_RESOURCES: DigitalResource[] = [
  {
    id: 'dig-eb-1',
    title: 'Operating System Concepts (10th Edition)',
    authorOrProf: 'Abraham Silberschatz, Peter B. Galvin, Greg Gagne',
    type: 'ebook',
    department: 'Computer Science & Engineering',
    courseCode: 'CS301',
    description:
      'The authoritative text for operating system internals covering process scheduling, memory virtualization, storage structures, synchronization, and security.',
    fileSize: '28.4 MB',
    pageCount: 1042,
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80',
    tags: ['Operating Systems', 'Kernels', 'Virtual Memory', 'Processes', 'Galvin'],
    downloadsCount: 1420,
    readCount: 3840,
    featured: true,
    contentSnippet: `Chapter 3: Processes & CPU Scheduling
Process concept, PCB (Process Control Block), Context Switching, Multiprogramming degree, Shortest Job First (SJF), Round Robin (RR) with dynamic quantum.
Chapter 7: Deadlocks & Banker's Algorithm
Necessary conditions for deadlock: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait. Safe states and resource allocation graph algorithms.`,
    chapters: [
      { title: 'Ch 1: Introduction to Modern OS Architecture', pages: '1 - 54' },
      { title: 'Ch 3: Process Management & Inter-Process Comm', pages: '105 - 162' },
      { title: 'Ch 5: CPU Scheduling Algorithms', pages: '197 - 252' },
      { title: 'Ch 7: Synchronization Tools & Deadlocks', pages: '293 - 350' },
      { title: 'Ch 9: Virtual Memory & Page Replacement', pages: '389 - 448' },
      { title: 'Ch 13: File-System Implementation & Security', pages: '561 - 618' },
    ],
  },
  {
    id: 'dig-eb-2',
    title: 'Introduction to Algorithms (CLRS 4th Edition)',
    authorOrProf: 'Thomas H. Cormen, Charles E. Leiserson, Ronald L. Rivest, Clifford Stein',
    type: 'ebook',
    department: 'Computer Science & Engineering',
    courseCode: 'CS204',
    description:
      'Comprehensive textbook covering modern algorithmic analysis, dynamic programming, graph theory, NP-completeness, and advanced data structures.',
    fileSize: '42.1 MB',
    pageCount: 1312,
    coverImage: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777f?w=400&auto=format&fit=crop&q=80',
    tags: ['Algorithms', 'CLRS', 'Data Structures', 'Dynamic Programming', 'Graph Theory'],
    downloadsCount: 2280,
    readCount: 5120,
    featured: true,
    contentSnippet: `Part III: Data Structures
Red-Black Trees, B-Trees, Fibonacci Heaps, Disjoint Sets with union-by-rank and path compression.
Part IV: Advanced Design and Analysis Techniques
Dynamic Programming: Rod cutting, Matrix-chain multiplication, Longest Common Subsequence (LCS). Greedy Algorithms: Huffman codes, Matroids.`,
    chapters: [
      { title: 'Ch 2: Getting Started & Asymptotic Notation', pages: '16 - 52' },
      { title: 'Ch 6: Heapsort & Priority Queues', pages: '151 - 170' },
      { title: 'Ch 15: Dynamic Programming Paradigms', pages: '359 - 413' },
      { title: 'Ch 22: Elementary Graph Algorithms', pages: '589 - 623' },
      { title: 'Ch 24: Single-Source Shortest Paths (Dijkstra)', pages: '643 - 683' },
    ],
  },
  {
    id: 'dig-eb-3',
    title: 'Deep Learning & Transformer Systems',
    authorOrProf: 'Ian Goodfellow, Yoshua Bengio, Aaron Courville',
    type: 'ebook',
    department: 'AI & Data Science',
    courseCode: 'AI402',
    description:
      'Definitive guide on deep feedforward networks, convolutional architectures, sequence models, self-attention mechanisms, and generative AI foundations.',
    fileSize: '31.5 MB',
    pageCount: 800,
    coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=80',
    tags: ['Deep Learning', 'PyTorch', 'Transformers', 'AI/ML', 'Neural Networks'],
    downloadsCount: 1890,
    readCount: 4210,
    featured: true,
    contentSnippet: `Part II: Deep Networks: Modern Practices
Deep Feedforward Networks, Regularization for Deep Learning, Optimization for Training Deep Models.
Part III: Deep Learning Research
Representation Learning, Generative Adversarial Networks (GANs), Diffusion Models, and Self-Attention Transformers.`,
    chapters: [
      { title: 'Ch 6: Deep Feedforward Networks & Backprop', pages: '164 - 223' },
      { title: 'Ch 9: Convolutional Networks', pages: '326 - 366' },
      { title: 'Ch 10: Sequence Modeling & Recurrent Nets', pages: '367 - 415' },
      { title: 'Ch 14: Autoencoders & Representation Learning', pages: '499 - 552' },
    ],
  },
  {
    id: 'dig-note-1',
    title: 'Dr. Sarah Chen: OS Kernel & Process Scheduling Handout',
    authorOrProf: 'Dr. Sarah Chen (Dept. of CSE)',
    type: 'notes',
    department: 'Computer Science & Engineering',
    courseCode: 'CS301',
    description:
      'Curated lecture notes and visual diagrams explaining thread synchronization, mutex locks, semaphores, and real-time Linux CFS scheduling implementation.',
    fileSize: '4.8 MB',
    pageCount: 48,
    tags: ['Lecture Notes', 'OS Lab', 'Concurrency', 'Exam Prep'],
    downloadsCount: 840,
    readCount: 1980,
    featured: false,
    contentSnippet: `Key Takeaways from Lecture 14:
1. Peterson's Solution guarantees Mutual Exclusion, Progress, and Bounded Waiting.
2. Binary vs Counting Semaphores in Linux kernel.
3. Priority Inversion problem and Priority Inheritance Protocol solutions.`,
    chapters: [
      { title: 'Section 1: Thread Concurrency & Locks', pages: '1 - 15' },
      { title: 'Section 2: Semaphores & Dining Philosophers', pages: '16 - 30' },
      { title: 'Section 3: Memory Virtualization Page Tables', pages: '31 - 48' },
    ],
  },
  {
    id: 'dig-note-2',
    title: 'Mastering DSA: 75 Must-Solve LeetCode Patterns & Proofs',
    authorOrProf: 'Prof. Marcus Vance & Student Competitive Programming Cell',
    type: 'notes',
    department: 'Computer Science & Engineering',
    courseCode: 'CS204',
    description:
      'High-yield compilation of patterns: Sliding Window, Two Pointers, Fast & Slow Pointers, Monotonic Stack, Backtracking, and Topological Sort.',
    fileSize: '7.2 MB',
    pageCount: 82,
    tags: ['DSA', 'LeetCode', 'Interview Prep', 'Cheat Sheet', 'Placements'],
    downloadsCount: 3120,
    readCount: 7890,
    featured: true,
    contentSnippet: `Pattern 4: Sliding Window (Dynamic Window)
Template:
int left = 0;
for (int right = 0; right < n; right++) {
    // Add element to window
    while (windowConditionViolated) {
        // Shrink from left
        left++;
    }
    // Update answer with max/min window size
}
Pattern 9: Top K Frequent Elements using Min-Heap vs QuickSelect (O(n) avg).`,
    chapters: [
      { title: 'Pattern 1-10: Arrays, HashMaps & Two Pointers', pages: '1 - 22' },
      { title: 'Pattern 11-25: Fast Pointers, Linked Lists & Stacks', pages: '23 - 42' },
      { title: 'Pattern 26-50: Binary Search Trees & BFS/DFS', pages: '43 - 64' },
      { title: 'Pattern 51-75: Dynamic Programming 1D/2D Matrix', pages: '65 - 82' },
    ],
  },
  {
    id: 'dig-pdf-1',
    title: 'Computer Networks & TCP/IP Protocol Suite (Syllabus & Lab Manual)',
    authorOrProf: 'Andrew S. Tanenbaum / Univ. Networking Committee',
    type: 'pdf',
    department: 'Computer Science & Engineering',
    courseCode: 'CS305',
    description:
      'Official academic syllabus, Wireshark lab packets, socket programming guides, subnetting cheat sheets, and routing protocol state diagrams.',
    fileSize: '12.6 MB',
    pageCount: 164,
    tags: ['Networking', 'TCP/IP', 'Wireshark', 'Socket Programming', 'PDF'],
    downloadsCount: 1150,
    readCount: 2340,
    featured: false,
    contentSnippet: `Lab 3: Wireshark Packet Inspection of TCP 3-Way Handshake
SYN -> SYN-ACK -> ACK. Sliding window flow control, Congestion window (cwnd) phases: Slow Start, Congestion Avoidance, Fast Retransmit.`,
    chapters: [
      { title: 'Lab 1: Ethernet Frame Capture & Subnet Masks', pages: '1 - 25' },
      { title: 'Lab 2: Socket API (TCP & UDP Echo Server in Python)', pages: '26 - 60' },
      { title: 'Lab 3: Wireshark TCP Congestion Control Analysis', pages: '61 - 105' },
      { title: 'Lab 4: BGP & OSPF Routing Table Configuration', pages: '106 - 164' },
    ],
  },
  {
    id: 'dig-pdf-2',
    title: 'Fullstack Web & React 19 Architecture Reference Manual',
    authorOrProf: 'Central Web & App Engineering Guild',
    type: 'pdf',
    department: 'Information Technology',
    courseCode: 'IT320',
    description:
      'Modern web architecture: React 19 Actions, Server Components, Vite bundling, Tailwind CSS design tokens, state machines, and micro-frontends.',
    fileSize: '8.9 MB',
    pageCount: 120,
    tags: ['Web Dev', 'React 19', 'TypeScript', 'Tailwind', 'Frontend'],
    downloadsCount: 1940,
    readCount: 4620,
    featured: true,
    contentSnippet: `React 19 Fundamentals:
- Server Actions & useActionState
- useOptimistic UI updates for high responsiveness
- Document metadata integration and asset preloading
- Strict zero-pill design systems with accessible contrast ratios.`,
    chapters: [
      { title: 'Unit 1: Modern DOM & React 19 Core Paradigm', pages: '1 - 32' },
      { title: 'Unit 2: State Machines & Global Store Patterns', pages: '33 - 68' },
      { title: 'Unit 3: REST, GraphQL & Server-Side Proxies', pages: '69 - 95' },
      { title: 'Unit 4: Production Deployment & Lighthouse 100', pages: '96 - 120' },
    ],
  },
  {
    id: 'dig-cs-1',
    title: 'Smart India Hackathon (SIH) Hardware & Tech Stack Blueprint',
    authorOrProf: 'Innovation & Incubation Center (IIC)',
    type: 'cheatsheet',
    department: 'Interdisciplinary Engineering',
    courseCode: 'SIH-2026',
    description:
      'Comprehensive quick reference for SIH teams: Projector setup, Edge AI deployment (Raspberry Pi/Jetson), fast prototyping toolchains, and pitch guidelines.',
    fileSize: '3.4 MB',
    pageCount: 24,
    tags: ['SIH', 'Hackathon', 'Hardware', 'Pitching', 'Cheat Sheet'],
    downloadsCount: 2840,
    readCount: 6500,
    featured: true,
    contentSnippet: `SIH Quick Setup Checklist:
1. AV & Projector: 1080p/4K HDMI with dual display extended mode for live demo.
2. Hardware Kit: GPIO pinout reference for RPi 4, I2C sensor bus address matrix.
3. Offline backup server: Run local Docker container with simulated mock APIs.`,
    chapters: [
      { title: 'SIH Pitch Template & Evaluation Matrix', pages: '1 - 6' },
      { title: 'Hardware Integration & Sensor Wiring Guide', pages: '7 - 14' },
      { title: 'Cloud Fallback & Presentation Rehearsal Protocols', pages: '15 - 24' },
    ],
  },
];

// ==========================================
// 2. SKILL DEVELOPMENT TRACKS
// ==========================================
export const INITIAL_SKILL_TRACKS: SkillTrack[] = [
  {
    id: 'skill-dsa',
    title: 'Data Structures & Algorithms (DSA)',
    category: 'DSA',
    description:
      'Master algorithmic intuition, asymptotic time/space complexities, data structure implementations, and competitive coding for tech placements.',
    level: 'Beginner to Advanced',
    totalModules: 6,
    completedModules: 4,
    color: '#eab308', // yellow
    modules: [
      {
        id: 'mod-dsa-1',
        title: 'Arrays, Two Pointers & Sliding Window',
        duration: '4 hours',
        difficulty: 'Beginner',
        completed: true,
        topics: [
          'Memory Layout & Cache Locality',
          'Prefix Sums & Frequency Maps',
          'Two Pointers (Left-Right & Fast-Slow)',
          'Sliding Window (Fixed & Variable Length)',
        ],
        summary:
          'Learn how to solve substring/subarray problems in linear O(N) time without quadratic nested loops using two-pointer & sliding window techniques.',
        practiceProblem: {
          title: 'Maximum Sum Subarray of Size K',
          description:
            'Given an array of integers and a number K, find the maximum sum of any contiguous subarray of size K.',
          sampleInput: 'nums = [2, 1, 5, 1, 3, 2], k = 3',
          sampleOutput: '9 (subarray: [5, 1, 3])',
          starterCode: `function maxSubArraySum(nums: number[], k: number): number {
  let maxSum = 0;
  let windowSum = 0;
  // Initialize first window
  for (let i = 0; i < k; i++) windowSum += nums[i];
  maxSum = windowSum;

  // Slide window across array
  for (let i = k; i < nums.length; i++) {
    windowSum += nums[i] - nums[i - k];
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
}`,
        },
      },
      {
        id: 'mod-dsa-2',
        title: 'Binary Trees, BST & Tree Traversals',
        duration: '6 hours',
        difficulty: 'Intermediate',
        completed: true,
        topics: [
          'Binary Tree Node Anatomy & Representation',
          'DFS Traversals: Preorder, Inorder, Postorder',
          'BFS Level Order Traversal with Queues',
          'Lowest Common Ancestor (LCA) in BST',
        ],
        summary:
          'Master recursive and iterative tree algorithms, tree depth calculations, path sum problems, and balanced search tree mechanics.',
        practiceProblem: {
          title: 'Lowest Common Ancestor in a Binary Tree',
          description:
            'Find the lowest common ancestor node of two given nodes p and q in a binary tree.',
          sampleInput: 'root = [3,5,1,6,2,0,8], p = 5, q = 1',
          sampleOutput: '3',
          starterCode: `function lowestCommonAncestor(root: TreeNode | null, p: TreeNode, q: TreeNode): TreeNode | null {
  if (!root || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  return left ? left : right;
}`,
        },
      },
      {
        id: 'mod-dsa-3',
        title: 'Graphs, BFS/DFS & Shortest Paths',
        duration: '8 hours',
        difficulty: 'Intermediate',
        completed: true,
        topics: [
          'Adjacency List vs Matrix Representations',
          'Breadth-First Search (Shortest unweighted path)',
          'Depth-First Search & Cycle Detection in Directed Graphs',
          "Dijkstra's Algorithm with Priority Queue",
          "Kruskal's & Prim's Minimum Spanning Tree",
        ],
        summary:
          'Navigate complex network graphs, compute optimal routes, detect cycles, and model real-world routing and topological dependency resolution.',
      },
      {
        id: 'mod-dsa-4',
        title: 'Dynamic Programming: 1D & 2D Memoization',
        duration: '10 hours',
        difficulty: 'Advanced',
        completed: true,
        topics: [
          'Optimal Substructure & Overlapping Subproblems',
          'Top-Down Recursion with Memoization vs Bottom-Up Tabulation',
          '0/1 Knapsack & Unbounded Knapsack',
          'Longest Common Subsequence (LCS) & Edit Distance',
        ],
        summary:
          'Demystify dynamic programming by learning state definition, transition equations, base conditions, and memory optimization.',
      },
      {
        id: 'mod-dsa-5',
        title: 'Backtracking & Branch-and-Bound',
        duration: '5 hours',
        difficulty: 'Intermediate',
        completed: false,
        topics: [
          'State-space Tree Exploration',
          'N-Queens & Sudoku Solver',
          'Subsets, Permutations & Combinations',
          'Pruning in Search Trees',
        ],
        summary:
          'Learn how to systematically explore all candidates for constraint satisfaction problems with early pruning.',
      },
      {
        id: 'mod-dsa-6',
        title: 'System Design & High-Concurrency Architecture',
        duration: '7 hours',
        difficulty: 'Advanced',
        completed: false,
        topics: [
          'Horizontal vs Vertical Scaling',
          'Database Sharding & Read Replicas',
          'Redis Caching Strategies & Cache-Aside',
          'Load Balancing & Rate Limiting algorithms',
        ],
        summary:
          'Design distributed systems capable of handling millions of requests with low latency and 99.99% availability.',
      },
    ],
  },
  {
    id: 'skill-web',
    title: 'Fullstack Web Development',
    category: 'Web Development',
    description:
      'Build end-to-end modern web applications with React 19, TypeScript, Tailwind CSS, Express/Node.js, PostgreSQL/Drizzle, and real-time WebSockets.',
    level: 'Industry Ready',
    totalModules: 5,
    completedModules: 3,
    color: '#38bdf8', // sky blue
    modules: [
      {
        id: 'mod-web-1',
        title: 'Modern React 19 & Hooks Mastery',
        duration: '6 hours',
        difficulty: 'Beginner',
        completed: true,
        topics: [
          'Functional Components & Declarative UI',
          'useState, useEffect, useMemo, useCallback patterns',
          'Custom Hooks for Reusable Business Logic',
          'React 19 Actions and optimistic state updates',
        ],
        summary:
          'Deep dive into component lifecycle, immutable state updates, re-render optimization, and ergonomic state management.',
      },
      {
        id: 'mod-web-2',
        title: 'Tailwind CSS Design Systems & Motion',
        duration: '4 hours',
        difficulty: 'Intermediate',
        completed: true,
        topics: [
          'Utility-First Styling & Tailwind CSS v4',
          'Dark Mode Theming & CSS Variable Tokens',
          'Micro-interactions & Smooth Transitions',
          'Responsive Breakpoints & Flexbox/CSS Grid',
        ],
        summary:
          'Craft slick, responsive, high-contrast user interfaces with zero-pill discipline and accessible typographic scales.',
      },
      {
        id: 'mod-web-3',
        title: 'Backend APIs: Express, REST & Middleware',
        duration: '7 hours',
        difficulty: 'Intermediate',
        completed: true,
        topics: [
          'RESTful Resource Routing & Clean Architecture',
          'Middleware Pipelines: Auth, Logging & Rate Limiting',
          'Input Validation with Zod Schema Validation',
          'Error Handling & HTTP Status Code Semantics',
        ],
        summary:
          'Build robust server-side services with production-grade logging, schema validations, and secure session handling.',
      },
      {
        id: 'mod-web-4',
        title: 'Relational DBs, ORM & Transactions',
        duration: '8 hours',
        difficulty: 'Advanced',
        completed: false,
        topics: [
          'PostgreSQL Schema Design & Normalization',
          'Indexing Strategies for High-Volume Queries',
          'ACID Transactions & Row-level Locking',
          'Drizzle ORM Migrations & Relations',
        ],
        summary:
          'Design resilient data layers with strong data consistency guarantees, foreign keys, and performant indexes.',
      },
      {
        id: 'mod-web-5',
        title: 'Real-time WebSockets & Edge Deployment',
        duration: '5 hours',
        difficulty: 'Advanced',
        completed: false,
        topics: [
          'WebSocket Handshake & Full-duplex Channels',
          'Pub/Sub Message Brokers',
          'Docker Containerization & Multi-stage Builds',
          'CI/CD Pipelines & Cloud Run Deployment',
        ],
        summary:
          'Broadcast live state changes across connected clients and deploy production-ready web bundles.',
      },
    ],
  },
  {
    id: 'skill-ai',
    title: 'Artificial Intelligence & Machine Learning (AI/ML)',
    category: 'AI/ML',
    description:
      'From statistical modeling and PyTorch neural networks to Transformer models, Retrieval Augmented Generation (RAG), and agentic workflows.',
    level: 'Intermediate to Advanced',
    totalModules: 5,
    completedModules: 2,
    color: '#a855f7', // purple
    modules: [
      {
        id: 'mod-ai-1',
        title: 'Python for Data Science, NumPy & Pandas',
        duration: '5 hours',
        difficulty: 'Beginner',
        completed: true,
        topics: [
          'Vectorized Operations & Ndarray Broadcasting',
          'Data Cleaning, Filtering & GroupBy Aggregations',
          'Matplotlib & Seaborn Data Visualization',
          'Feature Engineering & Data Preprocessing',
        ],
        summary:
          'Manipulate datasets with speed, compute matrix transformations, and preprocess raw telemetry for machine learning pipelines.',
      },
      {
        id: 'mod-ai-2',
        title: 'Classical Machine Learning with Scikit-Learn',
        duration: '6 hours',
        difficulty: 'Intermediate',
        completed: true,
        topics: [
          'Linear & Logistic Regression with Regularization (L1/L2)',
          'Decision Trees, Random Forests & Gradient Boosting (XGBoost)',
          'K-Means Clustering & PCA Dimensionality Reduction',
          'Model Evaluation: ROC-AUC, F1-Score & Cross Validation',
        ],
        summary:
          'Train, evaluate, and tune classical ML algorithms for classification, regression, and clustering challenges.',
      },
      {
        id: 'mod-ai-3',
        title: 'Deep Learning & PyTorch Tensor Mechanics',
        duration: '8 hours',
        difficulty: 'Advanced',
        completed: false,
        topics: [
          'Autograd Engine & Backpropagation Dynamics',
          'Custom PyTorch Dataset & DataLoader Pipelines',
          'Convolutional Neural Networks (CNNs) for Image Tasks',
          'Loss Functions (CrossEntropy, MSE) & AdamW Optimizer',
        ],
        summary:
          'Construct deep neural networks from first principles using GPU-accelerated PyTorch tensors.',
      },
      {
        id: 'mod-ai-4',
        title: 'Transformers, Self-Attention & LLM Foundations',
        duration: '10 hours',
        difficulty: 'Advanced',
        completed: false,
        topics: [
          'Scaled Dot-Product Attention & Multi-Head Attention',
          'Positional Encodings & LayerNorm',
          'HuggingFace Transformers Library & Tokenizers',
          'LoRA / QLoRA Parameter-Efficient Fine-Tuning',
        ],
        summary:
          'Understand the inner workings of Transformer architectures and customize open-source LLMs for domain-specific tasks.',
      },
      {
        id: 'mod-ai-5',
        title: 'Agentic Workflows & Multi-Modal Gemini Integration',
        duration: '6 hours',
        difficulty: 'Advanced',
        completed: false,
        topics: [
          'Function Calling & Tool Augmented Execution',
          'Vector Databases & Semantic Embeddings for RAG',
          'Structured Output Parsing & JSON Schemas',
          'Vision & Audio Multi-Modal Reasoning',
        ],
        summary:
          'Build intelligent agents that interact with APIs, databases, and multi-modal sensory inputs.',
      },
    ],
  },
  {
    id: 'skill-app',
    title: 'Mobile App Development (React Native & Flutter)',
    category: 'App Development',
    description:
      'Build native iOS and Android mobile apps with cross-platform frameworks, hardware sensor access, offline sync, and app store deployment.',
    level: 'Beginner to Advanced',
    totalModules: 4,
    completedModules: 2,
    color: '#10b981', // emerald
    modules: [
      {
        id: 'mod-app-1',
        title: 'React Native & Expo Architecture',
        duration: '5 hours',
        difficulty: 'Beginner',
        completed: true,
        topics: [
          'Expo Managed Workflow & Fast Refresh',
          'Native Components (View, Text, FlatList, Pressable)',
          'StyleSheet API & Flexbox Layout on Mobile Screens',
          'React Navigation: Stack, Bottom Tabs & Drawer',
        ],
        summary:
          'Develop smooth mobile interfaces with native feel, device safe areas, and bottom tab navigation patterns.',
      },
      {
        id: 'mod-app-2',
        title: 'Device Hardware: Camera, GPS & Local Storage',
        duration: '6 hours',
        difficulty: 'Intermediate',
        completed: true,
        topics: [
          'AsyncStorage & SQLite for Offline Data Persistence',
          'Camera & Image Picker Permissions',
          'Location Tracking & MapKit/Google Maps Native SDK',
          'Biometric Authentication (Fingerprint & FaceID)',
        ],
        summary:
          'Tap into mobile sensors, manage permissions, and store records locally for full offline resilience.',
      },
      {
        id: 'mod-app-3',
        title: 'Flutter & Dart: Reactive Widgets',
        duration: '7 hours',
        difficulty: 'Intermediate',
        completed: false,
        topics: [
          'Dart Language: Null Safety, Mixins & Async/Await',
          'Stateless vs Stateful Widgets Lifecycle',
          'Provider / Riverpod State Management',
          'Custom Canvas Painters & Hero Animations',
        ],
        summary:
          'Build pixel-perfect Flutter apps with high 60fps render pipelines and expressive widget trees.',
      },
      {
        id: 'mod-app-4',
        title: 'Push Notifications, CI/CD & App Store Release',
        duration: '5 hours',
        difficulty: 'Advanced',
        completed: false,
        topics: [
          'Firebase Cloud Messaging (FCM) & APNs Background Push',
          'EAS Build & Fastlane Automation',
          'App Store & Google Play Console Submission Guidelines',
          'Crashlytics & Mobile Telemetry Monitoring',
        ],
        summary:
          'Automate release builds, sign binaries, and configure push notifications for active user engagement.',
      },
    ],
  },
];

// ==========================================
// 3. RESERVABLE SPECIAL RESOURCES (SIH Gear, Books, Projectors)
// ==========================================
export interface SpecialReservableItem {
  id: string;
  name: string;
  code: string;
  type: 'projector_kit' | 'sih_kit' | 'library_book' | 'study_pod';
  categoryLabel: 'Projector & AV Gear' | 'SIH / Group Project Kit' | 'Library Physical Book' | 'Discussion Room';
  location: string;
  description: string;
  availableQuantity: number;
  totalQuantity: number;
  condition: string;
  recommendedFor: string;
  specifications: string[];
}

export const RESERVABLE_SPECIAL_ITEMS: SpecialReservableItem[] = [
  {
    id: 'res-proj-sih-1',
    name: 'Ultra-Short Throw 4K Projector Kit #1 (for SIH & Project Demos)',
    code: 'PROJ-SIH-01',
    type: 'projector_kit',
    categoryLabel: 'Projector & AV Gear',
    location: 'Central AV Pool - Engineering Block Room 104',
    description:
      'High-lumens laser projector ideal for Smart India Hackathon team pitch rehearsals, hackathon live demos, and group sprint presentations.',
    availableQuantity: 3,
    totalQuantity: 5,
    condition: 'Optimal (Cleaned lenses, 4K HDMI cable included)',
    recommendedFor: 'SIH Hackathon Teams, Capstone Project Groups',
    specifications: ['4000 ANSI Lumens Laser', '4K HDR Support', 'Dual HDMI 2.1 & Type-C', 'Portable Carry Bag + Tripod Stand'],
  },
  {
    id: 'res-proj-sih-2',
    name: 'Portable Mini LED Projector & 100" Foldable Screen Kit',
    code: 'PROJ-PORT-02',
    type: 'projector_kit',
    categoryLabel: 'Projector & AV Gear',
    location: 'Central AV Pool - Engineering Block Room 104',
    description:
      'Ultra-compact battery-powered projector with portable anti-crease projection screen. Perfect for hackathon overnight work areas and demo booths.',
    availableQuantity: 4,
    totalQuantity: 6,
    condition: 'Optimal',
    recommendedFor: 'Hackathon Booths, Field Demos, Team Standups',
    specifications: ['Built-in 3hr Battery', '1080p Native', 'Bluetooth Speaker Output', '100" Lightweight Fast-Setup Screen'],
  },
  {
    id: 'res-sih-iot-1',
    name: 'Smart India Hackathon (SIH) Prototyping Hardware Kit #1',
    code: 'KIT-SIH-IOT-01',
    type: 'sih_kit',
    categoryLabel: 'SIH / Group Project Kit',
    location: 'Faraday Embedded Systems Lab (Room 301)',
    description:
      'Complete embedded hardware bundle for SIH IoT, Smart Cities, or Healthcare challenge statements. Includes Raspberry Pi 4 8GB, ESP32 nodes, and 24 sensors.',
    availableQuantity: 2,
    totalQuantity: 4,
    condition: 'Verified by Lab Tech Dr. Rajesh Nair',
    recommendedFor: 'SIH Hardware Teams, IoT Competitions',
    specifications: ['Raspberry Pi 4 (8GB) + 64GB SanDisk', '2x ESP32 NodeMCU boards', 'Sensor Kit (Ultrasonic, Temp, PIR, Soil)', 'Breadboards, Jumper Wires & Power Bank'],
  },
  {
    id: 'res-book-galvin',
    name: 'Operating System Concepts (10th Ed) - Galvin (Physical Hardcover)',
    code: 'LIB-BOOK-OS-10',
    type: 'library_book',
    categoryLabel: 'Library Physical Book',
    location: 'Central Library - CS Section 005.43 SIL Shelf 3B',
    description:
      'Standard reference hardcopy of Operating Systems by Silberschatz & Galvin. Reserve for 7-day borrowing or desk reference in library reading rooms.',
    availableQuantity: 2,
    totalQuantity: 8,
    condition: 'Good Condition (Hardbound)',
    recommendedFor: 'CS301 Students, Systems Specialization',
    specifications: ['10th Edition', 'ISBN: 978-1-119-80036-1', '7-Day Standard Issue', 'Includes Companion Web Exercises'],
  },
  {
    id: 'res-book-clrs',
    name: 'Introduction to Algorithms (4th Ed) - CLRS (Physical Reference Copy)',
    code: 'LIB-BOOK-CLRS-04',
    type: 'library_book',
    categoryLabel: 'Library Physical Book',
    location: 'Central Library - Algorithms Section 005.1 COR Shelf 2A',
    description:
      'Hardbound library physical copy of CLRS Algorithms. Reserve to hold at circulation counter for collection.',
    availableQuantity: 3,
    totalQuantity: 10,
    condition: 'Excellent',
    recommendedFor: 'CS204 Algorithms, Competitive Programming',
    specifications: ['4th Edition MIT Press', 'ISBN: 978-0262046305', '14-Day Student Issue'],
  },
  {
    id: 'res-book-networks',
    name: 'Computer Networks (6th Ed) - Andrew Tanenbaum (Physical Copy)',
    code: 'LIB-BOOK-NET-06',
    type: 'library_book',
    categoryLabel: 'Library Physical Book',
    location: 'Central Library - Networking Shelf 4C',
    description:
      'Foundational networking book for protocol architecture, socket design, and optical fiber principles.',
    availableQuantity: 4,
    totalQuantity: 7,
    condition: 'Fair',
    recommendedFor: 'CS305 Computer Networks',
    specifications: ['6th Pearson Global Edition', '14-Day Issue'],
  },
  {
    id: 'res-pod-sih-s1',
    name: 'SIH & Innovation Collaborative Scrum Pod #A',
    code: 'POD-SIH-A',
    type: 'study_pod',
    categoryLabel: 'Discussion Room',
    location: 'Innovation & Incubation Hub, 2nd Floor',
    description:
      'Acoustically insulated high-speed discussion booth with 65-inch 4K screen, smart whiteboard, and gigabit LAN for hackathon team sprints.',
    availableQuantity: 1,
    totalQuantity: 1,
    condition: 'Available for Booking',
    recommendedFor: 'Hackathon brainstorming, Team sprint review',
    specifications: ['Capacity: 6 People', '65" Touch TV with AirPlay/Miracast', 'Wall-mounted Glass Whiteboard', 'Power Outlets at Table'],
  },
];

// ==========================================
// 4. PERSONAL RESOURCE ACCESS & USAGE LOG
// ("what are the resources you access yet and how much have u used them")
// ==========================================
export const INITIAL_USER_RESOURCE_ACCESS: UserResourceAccess[] = [
  {
    id: 'ura-1',
    userId: 'usr-student-1',
    resourceId: 'res-lab-204',
    resourceName: 'Alan Turing AI & Graphics Lab (LAB-204)',
    resourceType: 'Lab',
    date: '2026-10-08',
    hoursSpent: 3.5,
    purpose: 'Deep Learning Model Training & PyTorch Practicum',
    status: 'Completed',
  },
  {
    id: 'ura-2',
    userId: 'usr-student-1',
    resourceId: 'res-proj-sih-1',
    resourceName: 'Ultra-Short Throw 4K Projector Kit #1',
    resourceType: 'Projector/AV',
    date: '2026-10-06',
    hoursSpent: 2.0,
    purpose: 'SIH Hackathon Problem Statement 142 Pitch Rehearsal',
    status: 'Completed',
  },
  {
    id: 'ura-3',
    userId: 'usr-student-1',
    resourceId: 'dig-eb-1',
    resourceName: 'Operating System Concepts (Galvin 10th Ed)',
    resourceType: 'Digital Library',
    date: '2026-10-07',
    hoursSpent: 4.2,
    purpose: 'Ch 5 CPU Scheduling & Banker Algorithm Study',
    status: 'Completed',
  },
  {
    id: 'ura-4',
    userId: 'usr-student-1',
    resourceId: 'res-cr-305',
    resourceName: 'Ada Lovelace Smart Classroom (CR-305)',
    resourceType: 'Classroom',
    date: '2026-10-05',
    hoursSpent: 2.5,
    purpose: 'ACM Student Chapter Hackathon Mentorship Briefing',
    status: 'Completed',
  },
  {
    id: 'ura-5',
    userId: 'usr-student-1',
    resourceId: 'res-book-clrs',
    resourceName: 'Introduction to Algorithms (CLRS 4th Ed)',
    resourceType: 'Library Book',
    date: '2026-10-02',
    hoursSpent: 8.0,
    purpose: 'Red-Black Tree balance proofs & Dijkstra algorithms',
    status: 'Completed',
  },
  {
    id: 'ura-6',
    userId: 'usr-student-1',
    resourceId: 'res-pod-sih-s1',
    resourceName: 'SIH & Innovation Scrum Pod #A',
    resourceType: 'Classroom',
    date: '2026-10-09',
    hoursSpent: 3.0,
    purpose: 'SIH Final Phase Architecture Blueprint Design',
    status: 'In Use',
  },
  {
    id: 'ura-7',
    userId: 'usr-student-1',
    resourceId: 'dig-note-2',
    resourceName: 'Mastering DSA: 75 Must-Solve LeetCode Patterns',
    resourceType: 'Digital Library',
    date: '2026-10-09',
    hoursSpent: 2.5,
    purpose: 'Sliding Window & Monotonic Stack exercises',
    status: 'Completed',
  },
];

// ==========================================
// 5. RESOURCE FEEDBACK & MISSING RESOURCE REPORTS
// ("Report missing or insufficient resources. Like you need os galvin e-book but it's not available")
// ==========================================
export const INITIAL_RESOURCE_FEEDBACK: ResourceFeedback[] = [
  {
    id: 'fb-101',
    title: 'Operating System Concepts (Galvin 10th Ed) E-Book Access',
    category: 'E-Book / Notes',
    description:
      'We urgently need full digital e-book access for Silberschatz & Galvin 10th edition. Physical copies in Central Library are all checked out for mid-terms, and CS301 lab assignments heavily depend on Chapter 5 & 7 exercises.',
    courseOrProject: 'CS301 - Operating Systems',
    urgency: 'Urgent',
    submittedBy: 'Jordan Patel',
    userRole: 'Student',
    submittedAt: '2026-10-08 14:15',
    rating: 4.9,
    ratingCount: 47,
    userStarRating: 5,
    comments: [
      {
        id: 'cmt-101-1',
        userName: 'Jordan Patel',
        userRole: 'Student',
        text: 'Chapters 5 (CPU Scheduling) and 7 (Deadlocks) are required for Dr. Sarah Chen\'s programming assignment due this week!',
        createdAt: '2026-10-08 14:30',
      },
      {
        id: 'cmt-101-2',
        userName: 'Dr. Sarah Chen',
        userRole: 'Faculty',
        text: 'I have endorsed this requisition with the library procurement committee. In the meantime, check out my handout in Digital Library.',
        createdAt: '2026-10-08 16:00',
      },
      {
        id: 'cmt-101-3',
        userName: 'Aarav Mehta',
        userRole: 'Student',
        text: 'Confirmed! Full institutional e-book copy with chapter navigation is now available in the Digital Library tab.',
        createdAt: '2026-10-09 09:15',
      },
    ],
    status: 'Added to Library / Stock',
    adminNotes:
      'Institutional digital license acquired! Full e-book with chapter reader now active in the ERAS Digital Library module.',
  },
  {
    id: 'fb-102',
    title: 'Shortage of Portable 4K Projectors for SIH Hackathon Teams',
    category: 'Projector & AV Gear',
    description:
      'During SIH hackathon sprint week, over 12 teams need projectors for group presentation practice and live hardware sensor testing. Currently only 2 portable units are available in AV pool.',
    courseOrProject: 'SIH 2026 & Capstone Projects',
    urgency: 'High',
    submittedBy: 'Aarav Mehta (SIH Team Lead)',
    userRole: 'Student',
    submittedAt: '2026-10-07 10:30',
    rating: 4.8,
    ratingCount: 38,
    userStarRating: 5,
    comments: [
      {
        id: 'cmt-102-1',
        userName: 'Aarav Mehta',
        userRole: 'Student',
        text: 'Our team needs to rehearse live sensor output on a 4K display before state-level evaluations next Tuesday.',
        createdAt: '2026-10-07 10:45',
      },
      {
        id: 'cmt-102-2',
        userName: 'Prof. Elena Rostova',
        userRole: 'HOD',
        text: 'Requisition approved from departmental AV budget. 3 new portable laser projector kits arrive Thursday.',
        createdAt: '2026-10-07 14:20',
      },
    ],
    status: 'Procurement Initiated',
    adminNotes:
      'HOD Prof. Rostova approved requisition of 3 additional laser ultra-short throw projector kits from AV maintenance budget.',
  },
  {
    id: 'fb-103',
    title: 'Raspberry Pi 4 & ESP32 Sensor Kits Insufficient in Embedded Lab',
    category: 'Lab Hardware / Kit',
    description:
      'Several GPIO pins on the existing breadboards in LAB-301 are worn out, and SIH teams need camera modules (OV5647) for smart vision projects.',
    courseOrProject: 'EC308 & SIH Teams',
    urgency: 'High',
    submittedBy: 'Dr. Rajesh Nair',
    userRole: 'Faculty',
    submittedAt: '2026-10-06 16:40',
    rating: 4.6,
    ratingCount: 29,
    userStarRating: 4,
    comments: [
      {
        id: 'cmt-103-1',
        userName: 'Dr. Rajesh Nair',
        userRole: 'Faculty',
        text: 'We also need 5x high-speed micro-SD cards (64GB) with Raspberry Pi OS flashed.',
        createdAt: '2026-10-06 17:05',
      },
    ],
    status: 'Under Review',
    adminNotes: 'Procurement quote requested from university hardware vendor.',
  },
  {
    id: 'fb-104',
    title: 'Late Night Discussion Pods for Group Hackathon Prep',
    category: 'Study Space',
    description:
      'Requesting extended access for the 2nd floor Innovation Pods until 22:00 PM leading up to national hackathon finals.',
    courseOrProject: 'Student Innovation Cell',
    urgency: 'Normal',
    submittedBy: 'Priya Sharma',
    userRole: 'Student',
    submittedAt: '2026-10-05 11:20',
    rating: 4.7,
    ratingCount: 54,
    userStarRating: 5,
    comments: [
      {
        id: 'cmt-104-1',
        userName: 'Priya Sharma',
        userRole: 'Student',
        text: 'Will campus security require prior approval slips or can we scan our student ID cards at the door?',
        createdAt: '2026-10-05 12:00',
      },
      {
        id: 'cmt-104-2',
        userName: 'Dr. Arthur Vance',
        userRole: 'Admin',
        text: 'Campus security system has been configured for automated RFID card access until 22:30 PM.',
        createdAt: '2026-10-05 15:30',
      },
    ],
    status: 'Added to Library / Stock',
    adminNotes: 'Security clearance approved. Pods A & B now open until 22:30 with campus ID scan.',
  },
];

// ==========================================
// 6. ASSIGNMENTS & CERTIFICATIONS
// ==========================================
export const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'asg-os-1',
    courseCode: 'CS301',
    courseTitle: 'Operating Systems Internals',
    title: 'Process Scheduler & Deadlock Banker’s Algorithm Implementation',
    professorName: 'Dr. Sarah Chen',
    dueDate: '2026-10-14',
    daysRemaining: 2,
    totalMarks: 50,
    status: 'Pending',
    instructions:
      'Implement Round Robin with dynamic time slice and Banker’s Algorithm for safe state deadlock avoidance in C/C++ or Python. Submit source code and benchmark comparison plot.',
    rubric: [
      'Round Robin CPU Scheduler Logic (15 pts)',
      'Banker’s Algorithm Resource Request & Safety Test (15 pts)',
      'Handling Edge Cases & Thread Synchronization (10 pts)',
      'Benchmark Performance Documentation (10 pts)',
    ],
  },
  {
    id: 'asg-ai-1',
    courseCode: 'AI402',
    courseTitle: 'Deep Learning & Neural Architectures',
    title: 'Multi-Head Attention & Transformer Encoder from Scratch',
    professorName: 'Prof. Marcus Vance',
    dueDate: '2026-10-18',
    daysRemaining: 6,
    totalMarks: 100,
    status: 'Pending',
    instructions:
      'Construct a 4-layer Transformer encoder in PyTorch without using torch.nn.Transformer. Train on a tiny translation or sentiment dataset and log training loss curves.',
    rubric: [
      'Scaled Dot-Product Attention Implementation (25 pts)',
      'Multi-Head Masking & Residual LayerNorm (25 pts)',
      'Feed-Forward Network & Positional Encoding (25 pts)',
      'Evaluation & Ablation Report (25 pts)',
    ],
  },
  {
    id: 'asg-dsa-1',
    courseCode: 'CS204',
    courseTitle: 'Advanced Data Structures & Algorithms',
    title: 'Red-Black Tree Balancing & Shortest Path Routing Benchmark',
    professorName: 'Prof. Elena Rostova',
    dueDate: '2026-10-04',
    daysRemaining: 0,
    totalMarks: 50,
    status: 'Graded',
    obtainedMarks: 48,
    feedbackNotes:
      'Outstanding implementation of left/right tree rotations. Benchmark runtime graphs clearly show O(log N) worst-case bounds.',
    submittedFile: 'jordan_cs204_rbt_assignment.zip',
    submittedAt: '2026-10-03 21:14',
    instructions:
      'Implement Left-Rotate, Right-Rotate, and fix-up operations for Red-Black Tree insertion. Compare lookup latency against AVL trees.',
    rubric: [
      'Tree Rotation & Insertion Fix-up (20 pts)',
      'Path Verification Assertions (15 pts)',
      'Benchmarking against AVL trees (15 pts)',
    ],
  },
  {
    id: 'asg-sih-1',
    courseCode: 'SIH-2026',
    courseTitle: 'Innovation & Smart Campus Challenge',
    title: 'Milestone 2: Hardware-Software Integration Demo & Pitch Deck',
    professorName: 'Dr. Arthur Vance (Dean of Ops)',
    dueDate: '2026-10-20',
    daysRemaining: 8,
    totalMarks: 100,
    status: 'Pending',
    instructions:
      'Submit the preliminary slide deck for the Smart India Hackathon internal review, along with a 3-minute video link demonstrating live sensor reading broadcast to the dashboard.',
    rubric: [
      'Problem Statement Relevance & Innovation (30 pts)',
      'Live Sensor Hardware Integration Demo (30 pts)',
      'System Architecture & Security Plan (20 pts)',
      'Feasibility, Budget & Impact (20 pts)',
    ],
  },
];

export const INITIAL_CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-1',
    title: 'AWS Certified Solutions Architect - Associate',
    issuer: 'Amazon Web Services',
    category: 'Cloud',
    credentialId: 'AWS-PSA-991204',
    issueDate: '2026-06-15',
    expiryDate: '2029-06-15',
    progressPercent: 88,
    status: 'In Progress',
    skillsAcquired: ['VPC Peering', 'IAM Security', 'S3 & RDS High Availability', 'Lambda Serverless', 'ECS / EKS'],
  },
  {
    id: 'cert-2',
    title: 'Meta Professional Front-End Developer',
    issuer: 'Meta / Coursera',
    category: 'Web',
    credentialId: 'META-FE-883192-VERIFIED',
    issueDate: '2026-08-20',
    progressPercent: 100,
    status: 'Completed',
    certificateUrl: 'https://credentials.meta.com/verify/FE-883192',
    skillsAcquired: ['React 19', 'UI/UX Design Systems', 'JavaScript ES6+', 'Accessibility & ARIA', 'Jest Testing'],
  },
  {
    id: 'cert-3',
    title: 'DeepLearning.AI Deep Learning Specialization',
    issuer: 'DeepLearning.AI & Andrew Ng',
    category: 'AI/ML',
    credentialId: 'DLAI-NN-550183-VERIFIED',
    issueDate: '2026-07-10',
    progressPercent: 100,
    status: 'Completed',
    certificateUrl: 'https://coursera.org/verify/specialization/DLAI-550183',
    skillsAcquired: ['Neural Networks', 'Hyperparameter Tuning', 'Convolutional Networks', 'Sequence Models', 'Attention'],
  },
  {
    id: 'cert-4',
    title: 'Google Cloud Associate Cloud Engineer',
    issuer: 'Google Cloud Platform',
    category: 'Cloud',
    credentialId: 'GCP-ACE-PENDING',
    progressPercent: 55,
    status: 'In Progress',
    skillsAcquired: ['Compute Engine', 'Cloud Run', 'Cloud SQL', 'VPC Networks', 'Cloud IAM & Logging'],
  },
  {
    id: 'cert-5',
    title: 'Stanford Algorithms Specialization',
    issuer: 'Stanford Online / Tim Roughgarden',
    category: 'Algorithms',
    credentialId: 'STANFORD-ALGO-2026',
    progressPercent: 72,
    status: 'In Progress',
    skillsAcquired: ['Divide & Conquer', 'Graph Search', 'Greedy Algorithms', 'Dynamic Programming', 'NP-Completeness'],
  },
];

// ==========================================
// 7. FACULTY DIRECTORY & ACADEMIC DOUBTS
// ("Contact faculty members for academic guidance, assignment doubts, and support")
// ==========================================
export const INITIAL_FACULTY_MEMBERS: FacultyMember[] = [
  {
    id: 'fac-1',
    name: 'Dr. Sarah Chen',
    title: 'Associate Professor & Systems Lead',
    department: 'Computer Science & Engineering',
    email: 'sarah.chen@cs.univ.edu',
    phone: '+1 (555) 014-3321',
    officeRoom: 'Turing Computing Center #304',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    officeHours: 'Mon & Wed: 14:00 - 16:30 | Fri: 11:00 - 13:00',
    researchAreas: ['Operating Systems', 'Kernel Concurrency', 'Distributed Storage', 'Cloud Virtualization'],
    acceptingDoubts: true,
    rating: 4.9,
  },
  {
    id: 'fac-2',
    name: 'Prof. Elena Rostova',
    title: 'Head of Department & Professor',
    department: 'Computer Science & Engineering',
    email: 'elena.rostova@cs.univ.edu',
    phone: '+1 (555) 018-9942',
    officeRoom: 'Aryabhata Academic Complex #102',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    officeHours: 'Tue & Thu: 10:00 - 12:00',
    researchAreas: ['Algorithms & Complexity', 'Graph Theory', 'Curriculum & Lab Planning', 'SIH Mentorship'],
    acceptingDoubts: true,
    rating: 4.8,
  },
  {
    id: 'fac-3',
    name: 'Prof. Marcus Vance',
    title: 'Professor of Artificial Intelligence',
    department: 'AI & Data Science',
    email: 'marcus.vance@ai.univ.edu',
    phone: '+1 (555) 019-7711',
    officeRoom: 'Turing Computing Center #410',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    officeHours: 'Mon, Tue, Thu: 15:00 - 17:00',
    researchAreas: ['Deep Learning', 'Generative Transformers', 'Computer Vision', 'GPU High Performance Compute'],
    acceptingDoubts: true,
    rating: 4.9,
  },
  {
    id: 'fac-4',
    name: 'Dr. Rajesh Nair',
    title: 'Assistant Professor & IoT Lab Director',
    department: 'Electrical & Electronics / Embedded Systems',
    email: 'rajesh.nair@ee.univ.edu',
    phone: '+1 (555) 017-4402',
    officeRoom: 'Engineering Block B #218 (Faraday Lab Annex)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    officeHours: 'Wed & Fri: 13:30 - 16:00',
    researchAreas: ['Embedded IoT', 'FPGA & Microcontrollers', 'Hardware Prototyping', 'Robotics Grand Challenge'],
    acceptingDoubts: true,
    rating: 4.7,
  },
];

export const INITIAL_ACADEMIC_DOUBTS: AcademicDoubt[] = [
  {
    id: 'dbt-1',
    studentId: 'usr-student-1',
    studentName: 'Jordan Patel',
    facultyId: 'fac-1',
    facultyName: 'Dr. Sarah Chen',
    subject: 'CS301 - Operating Systems',
    topic: 'Banker’s Algorithm Resource Request Vector Allocation',
    type: 'Assignment Doubts',
    question:
      'In Assignment 1 question 3, if a process requests more resources than currently Available in the system, should the process immediately sleep or return a non-zero error code? Also, how do we verify multi-threaded race conditions?',
    codeOrAttachment: `// My pseudo-check:
if (Request[i] <= Need[i]) {
  if (Request[i] <= Available) {
    Available -= Request[i];
    Allocation[i] += Request[i];
    Need[i] -= Request[i];
    // is safeState(Available, Allocation, Need)?
  }
}`,
    status: 'Resolved',
    submittedAt: '2026-10-07 16:20',
    facultyResponse:
      'Great question Jordan! The process must block (wait on a condition variable) if Request exceeds Available. If Request exceeds Need, raise an illegal state exception. I will discuss the POSIX mutex lock wrapper during Wednesday office hours.',
  },
  {
    id: 'dbt-2',
    studentId: 'usr-student-1',
    studentName: 'Jordan Patel',
    facultyId: 'fac-2',
    facultyName: 'Prof. Elena Rostova',
    subject: 'SIH-2026 Smart Campus Challenge',
    topic: 'Mentorship on Edge AI Real-Time Processing for SIH Finals',
    type: 'SIH / Project Mentorship',
    question:
      'Our SIH team is prototyping on the Raspberry Pi 4 kit borrowed from Faraday Lab. We are experiencing high frame latency with YOLOv8 on CPU. Could we schedule a 15-minute slot to review if quantization or ONNX runtime would meet the competition requirements?',
    status: 'Slot Scheduled',
    submittedAt: '2026-10-08 11:45',
    scheduledSlot: 'Thursday Oct 15, 11:15 AM (Office #102)',
    facultyResponse:
      'Slot confirmed! Bring your laptop with the INT8 quantized ONNX model. We will also test it on the mobile NVIDIA compute node in Turing Lab.',
  },
  {
    id: 'dbt-3',
    studentId: 'usr-student-1',
    studentName: 'Jordan Patel',
    facultyId: 'fac-3',
    facultyName: 'Prof. Marcus Vance',
    subject: 'AI402 - Deep Learning',
    topic: 'Scaled Dot-Product Attention Masking in Decoder Self-Attention',
    type: 'Assignment Doubts',
    question:
      'For causal language modeling, should the upper triangular values in the attention score matrix be set to -inf or a very large negative value (-1e9) before applying softmax?',
    status: 'Awaiting Faculty',
    submittedAt: '2026-10-09 09:30',
  },
];

// ==========================================
// 8. LECTURE RECAPS & RECORDINGS
// ("show what have been taught in the last lecture kind of recording and summary")
// ==========================================
export const INITIAL_LECTURE_RECAPS: LectureRecap[] = [
  {
    id: 'lec-cs301-18',
    courseCode: 'CS301',
    courseName: 'Operating Systems Internals',
    lectureNumber: 18,
    topic: 'Process Scheduling: Multi-Level Feedback Queues & Linux CFS Scheduler',
    professorName: 'Dr. Sarah Chen',
    professorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    roomCode: 'Aryabhata Lecture Theatre (LT-101)',
    dateTaught: 'Yesterday (Oct 25, 2026)',
    timeSlot: '10:30 - 12:00',
    duration: '1h 24m',
    isLatest: true,
    videoThumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
    videoDurationSeconds: 5040,
    summaryOverview:
      'In this lecture, Dr. Sarah Chen concluded the CPU Scheduling module. We explored the fundamental trade-offs between interactive response time and batch throughput, transitioned from basic Round Robin with fixed time quanta to adaptive Multi-Level Feedback Queues (MLFQ), and unpacked how the modern Linux 6.x kernel implements the Completely Fair Scheduler (CFS) using red-black trees and virtual runtime (vruntime).',
    coreConcepts: [
      {
        concept: 'Round Robin Quantum Selection Trade-off',
        description:
          'If time slice q is too large, Round Robin degenerates into FCFS, causing long response times (convoy effect). If q is too small, context switch overhead (typically 1-10 microseconds plus cache thrashing) dominates CPU cycle consumption.',
        formulaOrCode: 'Optimal Rule of Thumb: 80% of CPU bursts should be shorter than time quantum q (typically 10ms - 50ms).',
      },
      {
        concept: 'Multi-Level Feedback Queue (MLFQ) 5 Rules',
        description:
          'Rule 1: Priority(A) > Priority(B) => A runs. Rule 2: Priority(A) == Priority(B) => RR. Rule 3: New processes enter top priority. Rule 4: If process uses its time allotment, priority drops. Rule 5 (Priority Boost): After time period S, move all processes to top queue to prevent starvation.',
        formulaOrCode: 'Priority Boost: Period S reset counter = 1000ms. Prevents CPU hogging and fixes I/O gaming.',
      },
      {
        concept: 'Linux CFS (Completely Fair Scheduler)',
        description:
          'Does not use traditional time slices or queues. Instead, assigns each task a virtual runtime (vruntime). The task with the smallest vruntime (leftmost node in the Red-Black tree) is selected next.',
        formulaOrCode: 'vruntime += delta_exec * (NICE_0_LOAD / task->se.load.weight); // O(log N) insert/delete, O(1) pick',
      },
    ],
    chapters: [
      {
        id: 'ch-1',
        timeSeconds: 0,
        timestamp: '00:00',
        title: 'Recap of Shortest Job First & Convoy Effect',
        keyTakeaway: 'Why non-preemptive SJF is unachievable without runtime predictors.',
      },
      {
        id: 'ch-2',
        timeSeconds: 840,
        timestamp: '14:00',
        title: 'Round Robin: Context Switching vs Response Time',
        keyTakeaway: 'Quantifying TLB flush and register dump overhead during process context switch.',
      },
      {
        id: 'ch-3',
        timeSeconds: 1980,
        timestamp: '33:00',
        title: 'MLFQ Architecture: 5 Invariant Rules & Starvation Prevention',
        keyTakeaway: 'How periodic priority boost guarantees fairness to long-running batch jobs.',
      },
      {
        id: 'ch-4',
        timeSeconds: 3120,
        timestamp: '52:00',
        title: 'Linux CFS Deep Dive: Red-Black Tree & vruntime Math',
        keyTakeaway: 'Nice values (-20 to +19) map exponentially to weight multipliers in CFS.',
      },
      {
        id: 'ch-5',
        timeSeconds: 4320,
        timestamp: '01:12:00',
        title: 'Live Q&A: Jordan Patel’s question on POSIX real-time SCHED_FIFO',
        keyTakeaway: 'Real-time FIFO policies always preempt normal CFS threads regardless of vruntime.',
      },
    ],
    keyTakeaways: [
      'Round Robin provides quick responsiveness for I/O bound interactive jobs, but average turnaround time can be worse than SJF.',
      'Context switch cost is not just CPU cycles: memory cache invalidation and TLB misses constitute the hidden penalty.',
      'MLFQ learns process behavior on-the-fly without requiring ahead-of-time burst length knowledge.',
      'CFS ensures exact proportion of CPU share based on process nice weights using red-black tree ordering.',
      'Next class: Synchronization primitives, Race conditions, and Peterson’s Algorithm (Chapter 6 & 7).',
    ],
    inClassDoubtsAnswered: [
      {
        studentQuestion: 'Jordan Patel: Can an adversarial process trick MLFQ by yielding the CPU right before its quantum expires to stay at priority 0?',
        facultyAnswer: 'Dr. Sarah Chen: Yes! In early MLFQ implementations, gaming was possible by calling sleep(1ms) before time allotment expired. Modern MLFQ solutions accumulate total execution time across bursts to prevent this exploit.',
      },
      {
        studentQuestion: 'Priya Sharma: Why does Linux CFS choose a Red-Black Tree instead of a Min-Heap for storing vruntime?',
        facultyAnswer: 'Dr. Sarah Chen: While Min-Heap offers O(1) peek, updating an active task’s vruntime requires O(N) lookup without auxiliary index. A Red-Black tree maintains strict O(log N) updates and O(1) cached leftmost node retrieval.',
      },
    ],
    whiteboardSnapshots: [
      {
        caption: 'Board 1: MLFQ Priority Queues with Starvation Recovery Loop',
        url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80',
      },
      {
        caption: 'Board 2: CFS Red-Black Tree Traversal & vruntime Calculation',
        url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
      },
    ],
    associatedEBook: {
      title: 'Operating System Concepts (10th Edition) - Silberschatz & Galvin',
      chapterNumber: 'Chapter 5: CPU Scheduling (Pages 197 - 252)',
      digitalResourceId: 'dig-eb-1',
    },
    connectedAssignmentId: 'asg-os-1',
    tags: ['Operating Systems', 'CPU Scheduling', 'MLFQ', 'Linux CFS', 'Dr. Sarah Chen', 'Galvin Ch 5'],
  },
  {
    id: 'lec-ai402-14',
    courseCode: 'AI402',
    courseName: 'Deep Learning & Neural Architectures',
    lectureNumber: 14,
    topic: 'Scaled Dot-Product Attention & Multi-Head Transformer Mechanics',
    professorName: 'Prof. Marcus Vance',
    professorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    roomCode: 'Alan Turing AI & Graphics Lab (LAB-204)',
    dateTaught: '3 Days Ago (Oct 23, 2026)',
    timeSlot: '11:00 - 13:30',
    duration: '2h 10m',
    isLatest: false,
    videoThumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    videoDurationSeconds: 7800,
    summaryOverview:
      'Prof. Marcus Vance broke down the architecture of the Transformer encoder. We covered Query, Key, Value matrix projections, the mathematical necessity of dividing by sqrt(d_k) to prevent vanishing gradients during Softmax, multi-head parallel attention projections, and residual LayerNorm connections.',
    coreConcepts: [
      {
        concept: 'Scaled Dot-Product Equation',
        description:
          'Computes compatibility between all queries and keys, normalized by square root of head dimension d_k to prevent extreme softmax saturation in high dimensions.',
        formulaOrCode: 'Attention(Q, K, V) = softmax( (Q * K^T) / sqrt(d_k) ) * V',
      },
      {
        concept: 'Multi-Head Attention Diversity',
        description:
          'Allows the model to jointly attend to information from different representation subspaces at different positions (e.g., grammatical agreement vs semantic coreference).',
        formulaOrCode: 'MultiHead(Q,K,V) = Concat(head_1, ..., head_h) * W_O',
      },
    ],
    chapters: [
      {
        id: 'ch-ai-1',
        timeSeconds: 0,
        timestamp: '00:00',
        title: 'Limitations of RNNs / LSTMs: Sequential Bottleneck',
        keyTakeaway: 'Why recurrence prevents full GPU tensor parallelism during training.',
      },
      {
        id: 'ch-ai-2',
        timeSeconds: 1200,
        timestamp: '20:00',
        title: 'Q, K, V Projections from First Principles',
        keyTakeaway: 'Understanding attention as a soft differentiable dictionary lookup.',
      },
      {
        id: 'ch-ai-3',
        timeSeconds: 3000,
        timestamp: '50:00',
        title: 'Why Scale by sqrt(d_k)? Gradient Saturation Proof',
        keyTakeaway: 'Large values push softmax into regions with vanishing small gradients.',
      },
      {
        id: 'ch-ai-4',
        timeSeconds: 4800,
        timestamp: '01:20:00',
        title: 'PyTorch Implementation in Turing Lab GPU Workstations',
        keyTakeaway: 'Writing einsum vs bmm tensor contractions for batch head processing.',
      },
    ],
    keyTakeaways: [
      'Self-attention has O(1) sequential operations compared to O(N) in recurrent networks.',
      'Scaling by 1/sqrt(d_k) prevents softmax entropy collapse when dimension size d_k = 64 or 128.',
      'Residual connections (x + Sublayer(x)) preserve identity gradient flow across deep transformer layers.',
      'Next class: Positional Encodings (Sinusoidal vs RoPE) and Decoder Causal Masking.',
    ],
    inClassDoubtsAnswered: [
      {
        studentQuestion: 'Student Doubt: Why do we project into multiple smaller heads instead of one single large attention matrix?',
        facultyAnswer: 'Prof. Vance: A single attention head tends to average out disparate semantic dependencies. Multiple heads allow head 1 to focus on syntactic subject-verb links while head 2 tracks spatial prepositions.',
      },
    ],
    whiteboardSnapshots: [
      {
        caption: 'Turing Lab Screen 1: Attention Matrix Shape Verification in PyTorch',
        url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
      },
    ],
    associatedEBook: {
      title: 'Deep Learning & Transformer Systems - Goodfellow & Bengio',
      chapterNumber: 'Chapter 10 & Attention Supplement',
      digitalResourceId: 'dig-eb-3',
    },
    connectedAssignmentId: 'asg-ai-1',
    tags: ['Transformers', 'PyTorch', 'Attention', 'Deep Learning', 'Prof. Vance', 'AI402'],
  },
  {
    id: 'lec-cs204-22',
    courseCode: 'CS204',
    courseName: 'Advanced Data Structures & Algorithms',
    lectureNumber: 22,
    topic: 'Self-Balancing Red-Black Trees: Rotations & Insertion Color Fix-up',
    professorName: 'Prof. Elena Rostova',
    professorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    roomCode: 'Ada Lovelace Smart Classroom (CR-305)',
    dateTaught: '5 Days Ago (Oct 21, 2026)',
    timeSlot: '09:00 - 10:30',
    duration: '1h 30m',
    isLatest: false,
    videoThumbnail: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=80',
    videoDurationSeconds: 5400,
    summaryOverview:
      'Prof. Elena Rostova demonstrated the 5 Red-Black Tree properties that guarantee worst-case O(log N) search, insertion, and deletion. We analyzed Left-Rotate and Right-Rotate pointer re-linkings and the 3 insertion fix-up cases depending on uncle node color.',
    coreConcepts: [
      {
        concept: 'The 5 Red-Black Properties',
        description:
          '1. Every node is red or black. 2. Root is black. 3. Every leaf (NIL) is black. 4. If a node is red, both children are black. 5. For each node, all simple paths to descendant leaves contain same number of black nodes.',
      },
      {
        concept: 'Uncle Node Color Case Analysis',
        description:
          'Case 1: Uncle is red -> Recoloring only. Case 2: Uncle is black (triangle) -> Rotate child to form line. Case 3: Uncle is black (line) -> Rotate grandparent and recolor.',
      },
    ],
    chapters: [
      {
        id: 'ch-dsa-1',
        timeSeconds: 0,
        timestamp: '00:00',
        title: 'Review of Degenerate BSTs and O(N) Worst Case',
        keyTakeaway: 'Why binary search trees degrade to linked lists without rotation.',
      },
      {
        id: 'ch-dsa-2',
        timeSeconds: 1500,
        timestamp: '25:00',
        title: 'Pointer Mechanics of Left-Rotate and Right-Rotate',
        keyTakeaway: 'Constant O(1) time rotation preserves in-order traversal invariant.',
      },
      {
        id: 'ch-dsa-3',
        timeSeconds: 3300,
        timestamp: '55:00',
        title: 'Walkthrough of Case 1, 2, and 3 Insertion Fixups',
        keyTakeaway: 'At most 2 tree rotations are needed during any insertion.',
      },
    ],
    keyTakeaways: [
      'The height of a red-black tree with N internal nodes is at most 2 * log2(N + 1).',
      'Rotations take O(1) time and modify exactly 3 pointer pairs.',
      'Insertion requires at most 2 tree rotations; deletion requires at most 3 rotations.',
    ],
    inClassDoubtsAnswered: [
      {
        studentQuestion: 'Student Question: Why are Red-Black trees favored in C++ std::map over AVL trees?',
        facultyAnswer: 'Prof. Rostova: AVL trees are more rigidly balanced, making search slightly faster, but insertion and deletion in Red-Black trees require fewer rotations, making them faster for general-purpose associative containers.',
      },
    ],
    associatedEBook: {
      title: 'Introduction to Algorithms (CLRS 4th Edition)',
      chapterNumber: 'Chapter 13: Red-Black Trees (Pages 308 - 338)',
      digitalResourceId: 'dig-eb-2',
    },
    connectedAssignmentId: 'asg-dsa-1',
    tags: ['Algorithms', 'Red-Black Trees', 'CLRS', 'Data Structures', 'Prof. Rostova'],
  },
  {
    id: 'lec-sih-04',
    courseCode: 'SIH-2026',
    courseName: 'Smart India Hackathon Innovation Sprint',
    lectureNumber: 4,
    topic: 'Workshop: Edge AI Deployment on Raspberry Pi 4 & Sensor Bus Calibration',
    professorName: 'Dr. Rajesh Nair',
    professorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    roomCode: 'Faraday Embedded Systems Lab (LAB-301)',
    dateTaught: '1 Week Ago (Oct 19, 2026)',
    timeSlot: '14:00 - 17:00',
    duration: '2h 45m',
    isLatest: false,
    videoThumbnail: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&auto=format&fit=crop&q=80',
    videoDurationSeconds: 9900,
    summaryOverview:
      'Dr. Rajesh Nair held a 3-hour hands-on hardware practicum for SIH 2026 finalists. Teams learned to connect I2C/SPI sensor arrays to Raspberry Pi 4 GPIO pins, calibrate analog-to-digital converters, quantize YOLOv8 models to INT8 ONNX, and stream telemetry over campus Wi-Fi.',
    coreConcepts: [
      {
        concept: 'I2C Bus Addressing & Pull-up Resistors',
        description:
          'SDA and SCL line protocols for communicating with multiple temperature, PIR, and ultrasonic sensors over a shared 2-wire bus.',
      },
      {
        concept: 'Model Quantization (FP32 to INT8)',
        description:
          'Reducing 32-bit floating point neural weights to 8-bit integers to achieve 18fps inference on ARM Cortex-A72 CPU without GPU.',
      },
    ],
    chapters: [
      {
        id: 'ch-sih-1',
        timeSeconds: 0,
        timestamp: '00:00',
        title: 'Raspberry Pi 4 Pinout & Power Supply Precautions',
        keyTakeaway: 'Ensuring 5V 3A USB-C power to avoid CPU throttling under heavy inferencing.',
      },
      {
        id: 'ch-sih-2',
        timeSeconds: 1800,
        timestamp: '30:00',
        title: 'Sensor Calibration in Python using smbus2 & RPi.GPIO',
        keyTakeaway: 'Reading ADC voltage levels and smoothing noise with a rolling average filter.',
      },
      {
        id: 'ch-sih-3',
        timeSeconds: 4200,
        timestamp: '01:10:00',
        title: 'Live Demo: Deploying Quantized Object Detector on Drone Camera',
        keyTakeaway: 'Optimizing inference speed with ONNX Runtime ARM acceleration flags.',
      },
    ],
    keyTakeaways: [
      'Always add 4.7k ohm pull-up resistors on I2C lines when chaining more than 3 sensors.',
      'INT8 quantization reduces model RAM footprint by 75% with less than 1.2% mAP accuracy loss.',
      'SIH teams can reserve portable 4K projectors in the Booking System for booth pitch rehearsals.',
    ],
    inClassDoubtsAnswered: [
      {
        studentQuestion: 'Student: How do we prevent camera frame lag during real-time web dashboard streaming?',
        facultyAnswer: 'Dr. Rajesh Nair: Decouple inference and video streaming into two separate Python multiprocessing threads with a bounded queue size of 2.',
      },
    ],
    associatedEBook: {
      title: 'SIH Hardware & Tech Stack Blueprint',
      chapterNumber: 'Hardware Integration & Sensor Wiring Guide (Pages 7 - 14)',
      digitalResourceId: 'dig-cs-1',
    },
    connectedAssignmentId: 'asg-sih-1',
    tags: ['SIH 2026', 'Raspberry Pi', 'Edge AI', 'IoT Sensors', 'Dr. Rajesh Nair'],
  },
];

