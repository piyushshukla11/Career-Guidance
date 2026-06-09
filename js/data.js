const CAREER_DATA = {
  skills: [
    // Programming
    { id: "python", name: "Python", category: "Programming" },
    { id: "cpp", name: "C++", category: "Programming" },
    { id: "c", name: "C/C++", category: "Programming" },
    { id: "sql", name: "SQL", category: "Programming" },
    { id: "matlab", name: "MATLAB", category: "Programming" },
    { id: "javascript", name: "JavaScript", category: "Programming" },
    
    // AI / ML & Data Science
    { id: "ml", name: "Machine Learning", category: "AI / ML & NLP" },
    { id: "dl", name: "Deep Learning", category: "AI / ML & NLP" },
    { id: "tensorflow", name: "TensorFlow", category: "AI / ML & NLP" },
    { id: "pytorch", name: "PyTorch", category: "AI / ML & NLP" },
    { id: "scikit", name: "Scikit-learn", category: "AI / ML & NLP" },
    { id: "stats", name: "Statistics", category: "AI / ML & NLP" },
    { id: "numpy", name: "NumPy", category: "AI / ML & NLP" },
    { id: "pandas", name: "Pandas", category: "AI / ML & NLP" },
    { id: "power_bi", name: "Power BI", category: "Design & Analytics" },
    { id: "huggingface", name: "Hugging Face", category: "AI / ML & NLP" },
    { id: "transformers", name: "Transformers", category: "AI / ML & NLP" },
    { id: "opencv", name: "OpenCV", category: "AI / ML & NLP" },
    { id: "image_processing", name: "Image Processing", category: "AI / ML & NLP" },
    { id: "llms", name: "LLMs", category: "AI / ML & NLP" },
    { id: "langchain", name: "LangChain", category: "AI / ML & NLP" },
    { id: "rag", name: "RAG", category: "AI / ML & NLP" },
    { id: "prompt", name: "Prompt Engineering", category: "AI / ML & NLP" },
    { id: "tinyml", name: "TinyML", category: "AI / ML & NLP" },
    
    // Hardware & Robotics & Automation
    { id: "ros", name: "ROS", category: "Robotics & Hardware" },
    { id: "arduino", name: "Arduino", category: "Robotics & Hardware" },
    { id: "raspi", name: "Raspberry Pi", category: "Robotics & Hardware" },
    { id: "plc", name: "PLC", category: "Robotics & Hardware" },
    { id: "scada", name: "SCADA", category: "Robotics & Hardware" },
    { id: "sensors", name: "Sensors", category: "Robotics & Hardware" },
    { id: "slam", name: "SLAM", category: "Robotics & Hardware" },
    { id: "motion_planning", name: "Motion Planning", category: "Robotics & Hardware" },
    { id: "embedded", name: "Embedded Systems", category: "Robotics & Hardware" },
    { id: "iot", name: "IoT", category: "Robotics & Hardware" },
    { id: "cad", name: "CAD", category: "Design & Analytics" },
    { id: "robotics", name: "Robotics", category: "Robotics & Hardware" },
    
    // Design & UI
    { id: "designing", name: "Designing", category: "Design & Analytics" },
    { id: "figma", name: "Figma", category: "Design & Analytics" },
    { id: "css", name: "CSS", category: "Design & Analytics" },
    { id: "html", name: "HTML", category: "Design & Analytics" }
  ],
  
  interests: [
    { id: "ai_ml", name: "AI / ML", icon: "fas fa-brain" },
    { id: "robotics", name: "Robotics", icon: "fas fa-robot" },
    { id: "data_sci", name: "Data Science", icon: "fas fa-chart-line" },
    { id: "software", name: "Software Dev", icon: "fas fa-code" },
    { id: "cloud", name: "Cloud / DevOps", icon: "fas fa-cloud" },
    { id: "vision", name: "Computer Vision", icon: "fas fa-eye" },
    { id: "nlp", name: "NLP", icon: "fas fa-comments" },
    { id: "automation", name: "Automation", icon: "fas fa-gears" }
  ],

  jobs: [
    // --- ARTIFICIAL INTELLIGENCE (AI) ---
    {
      id: "ai_engineer",
      name: "AI Engineer",
      domain: "Artificial Intelligence (AI)",
      requiredSkills: ["python", "ml", "dl"],
      niceSkills: ["tensorflow", "pytorch", "sql"],
      averageSalary: "₹14.0 LPA",
      description: "Builds, tests, and deploys scalable AI models and integration scripts, automating reasoning workflows for enterprise systems.",
      companies: [
        { name: "TCS Research", role: "AI Engineer", salary: "₹12 LPA", details: "Integrating deep learning models into client supply chain workflows in Chennai." },
        { name: "Tech Mahindra", role: "AI Systems Associate", salary: "₹11 LPA", details: "Deploying automated data ingestion and neural predictions loops." }
      ],
      roadmap: [
        { phase: "Phase 1", description: "Establish proficiency in Python, core ML theory (supervision, regression), and SQL databases." },
        { phase: "Phase 2", description: "Learn neural networks paradigms, TensorFlow/PyTorch, and backpropagation optimization parameters." },
        { phase: "Phase 3", description: "Practice deploying models as API endpoints using Flask/FastAPI and study basic cloud hosting." }
      ],
      resources: [
        { name: "AI Engineer Certification by Microsoft", link: "https://learn.microsoft.com/en-us/credentials/certifications/azure-ai-engineer/" },
        { name: "Introduction to Artificial Intelligence (Elements of AI)", link: "https://www.elementsofai.com/" }
      ]
    },
    {
      id: "ai_research_engineer",
      name: "AI Research Engineer",
      domain: "Artificial Intelligence (AI)",
      requiredSkills: ["python", "ml", "dl", "pytorch"],
      niceSkills: ["tensorflow", "stats", "numpy"],
      averageSalary: "₹18.0 LPA",
      description: "Explores state-of-the-art algorithmic models, reviews research publications, and implements custom mathematical neural architectures.",
      companies: [
        { name: "Infosys India Labs", role: "AI Research Scientist", salary: "₹17 LPA", details: "Researching novel neural layers configurations for enterprise NLP workloads." },
        { name: "Google R&D India", role: "Research Associate", salary: "₹24 LPA", details: "Investigating localized dialects multi-modal model tokenizations in Bengaluru." }
      ],
      roadmap: [
        { phase: "Phase 1", description: "Study advanced statistics, probability distributions, matrix calculus, and Python ML foundations." },
        { phase: "Phase 2", description: "Master PyTorch or TensorFlow, and learn to re-implement research papers from arXiv." },
        { phase: "Phase 3", description: "Publish open-source benchmark suites, write customized CUDA kernels, and study distributed training." }
      ],
      resources: [
        { name: "Deep Learning Specialization by deeplearning.ai", link: "https://www.coursera.org/specializations/deep-learning" },
        { name: "Stanford CS231n: Deep Learning for Computer Vision", link: "http://cs231n.stanford.edu/" }
      ]
    },
    {
      id: "ai_architect",
      name: "AI Solutions Architect",
      domain: "Artificial Intelligence (AI)",
      requiredSkills: ["python", "ml", "dl", "tensorflow", "pytorch"],
      niceSkills: ["sql", "embedded", "stats"],
      averageSalary: "₹22.0 LPA",
      description: "Designs, structures, and deploys scalable production-grade AI solutions. Acts as the bridging expert between enterprise architecture and complex deep learning stacks.",
      companies: [
        { name: "Infosys India", role: "Principal AI Architect", salary: "₹22 LPA", details: "Architecting NLP and forecasting pipelines for international finance clients in Bengaluru." },
        { name: "Wipro", role: "AI Solutions Consultant", salary: "₹19 LPA", details: "Leading enterprise Generative AI integrations on cloud systems in Pune." }
      ],
      roadmap: [
        { phase: "Phase 1", description: "Master Python programming, enterprise patterns, and cloud platforms integrations (AWS/Azure)." },
        { phase: "Phase 2", description: "Gain extensive experience in Deep Learning structures (TensorFlow/PyTorch) and distributed cluster training." },
        { phase: "Phase 3", description: "Design scalable API serving layers, GPU optimization models, and study Vector Databases." }
      ],
      resources: [
        { name: "Google Cloud Professional Machine Learning Engineer", link: "https://cloud.google.com/learn/certification/machine-learning-engineer" },
        { name: "Fast.ai Practical Deep Learning for Coders", link: "https://course.fast.ai/" }
      ]
    },

    // --- MACHINE LEARNING ---
    {
      id: "ml_engineer",
      name: "ML Engineer",
      domain: "Machine Learning",
      requiredSkills: ["python", "scikit", "tensorflow", "stats", "numpy"],
      niceSkills: ["pandas", "sql", "pytorch"],
      averageSalary: "₹15.0 LPA",
      description: "Builds, deploys, and optimizes algorithms that enable machines to learn from data patterns. Bridges data science research models with robust software engineering.",
      companies: [
        { name: "NVIDIA India", role: "Applied Machine Learning Engineer", salary: "₹18 LPA", details: "Fine-tuning hardware-optimized ML models for embedded chips inside Bengaluru R&D labs." },
        { name: "Swiggy", role: "Data ML Engineer", salary: "₹15 LPA", details: "Designing real-time dispatch matching and delivery time predictive algorithms." }
      ],
      roadmap: [
        { phase: "Phase 1", description: "Establish sound mathematical foundations in Linear Algebra, Vector Calculus, Probability, and Statistics." },
        { phase: "Phase 2", description: "Code standard classifiers (SVMs, Decision Trees) from scratch and master Scikit-learn." },
        { phase: "Phase 3", description: "Implement MLOps protocols, containerized deployments with Docker, and data pipeline versioning with DVC." }
      ],
      resources: [
        { name: "Machine Learning Course by Andrew Ng", link: "https://www.coursera.org/specializations/machine-learning-introduction" },
        { name: "Kaggle Machine Learning Track", link: "https://www.kaggle.com/learn" }
      ]
    },
    {
      id: "applied_ml_engineer",
      name: "Applied ML Engineer",
      domain: "Machine Learning",
      requiredSkills: ["python", "ml", "scikit", "numpy"],
      niceSkills: ["pandas", "tensorflow", "pytorch"],
      averageSalary: "₹13.5 LPA",
      description: "Applies established ML architectures to practical products, optimizes database feature stores, and maintains training and inference pipelines.",
      companies: [
        { name: "Ola Cab", role: "Predictive Analytics Developer", salary: "₹12 LPA", details: "Optimizing dynamic pricing and passenger demand allocation models in Bengaluru." },
        { name: "InMobi", role: "ML Product Dev", salary: "₹14 LPA", details: "Deploying user CTR forecasting classifiers to production pipelines." }
      ],
      roadmap: [
        { phase: "Phase 1", description: "Learn data preprocessing, cleansing, missing values strategies, and pandas/numpy scripts." },
        { phase: "Phase 2", description: "Study classifier tuning methods, cross validation configurations, and utilize Scikit-learn." },
        { phase: "Phase 3", description: "Focus on API model packaging, pipeline scheduling (Airflow), and inference logs parsing." }
      ],
      resources: [
        { name: "Machine Learning Engineering for Production (MLOps)", link: "https://www.coursera.org/specializations/machine-learning-engineering-for-production-mlops" },
        { name: "Applied Machine Learning Course (Google Cloud)", link: "https://grow.google/intl/en_in/applied-ml-course/" }
      ]
    },
    {
      id: "ml_researcher",
      name: "ML Researcher",
      domain: "Machine Learning",
      requiredSkills: ["python", "ml", "dl", "stats"],
      niceSkills: ["pytorch", "numpy", "scikit"],
      averageSalary: "₹17.0 LPA",
      description: "Formulates new statistical methodologies, optimizations, and deep neural layer abstractions to push mathematical ML boundaries.",
      companies: [
        { name: "Microsoft Research India", role: "ML Researcher", salary: "₹22 LPA", details: "Researching algorithmic efficiency and generalization bounds in Bengaluru." },
        { name: "IIT Madras Research Park", role: "Senior Scholar - ML", salary: "₹12 LPA", details: "Co-developing mathematical optimizations layers for decentralized ML." }
      ],
      roadmap: [
        { phase: "Phase 1", description: "Master advanced statistics, hypothesis tests, distributions theory, and linear algebra matrices." },
        { phase: "Phase 2", description: "Study neural network convergence proofs, optimization algorithms (Adam, SGD solvers), and write PyTorch scripts." },
        { phase: "Phase 3", description: "Publish theoretical research papers and present proof-of-concepts at top ML conferences (NeurIPS/ICML)." }
      ],
      resources: [
        { name: "Mathematics for Machine Learning (Imperial College)", link: "https://www.coursera.org/specializations/mathematics-machine-learning" },
        { name: "Deep Learning Book by Ian Goodfellow", link: "https://www.deeplearningbook.org/" }
      ]
    },

    // --- DATA SCIENCE & ANALYTICS ---
    {
      id: "data_scientist",
      name: "Data Scientist",
      domain: "Data Science & Analytics",
      requiredSkills: ["python", "sql", "pandas", "power_bi", "stats"],
      niceSkills: ["numpy", "scikit", "ml"],
      averageSalary: "₹12.0 LPA",
      description: "Analyzes vast datasets to discover strategic insights, compiles BI dashboards, and creates regression and predictive modeling tools.",
      companies: [
        { name: "Google India", role: "Senior Analyst / Data Scientist", salary: "₹20 LPA", details: "Running telemetry analyses and user behavior segmentation models for Google Pay India." },
        { name: "Fractal Analytics", role: "Consultant - Data Science", salary: "₹11 LPA", details: "Creating churn forecasting models and supply chain optimizations for global clients." }
      ],
      roadmap: [
        { phase: "Phase 1", description: "Learn database querying with SQL (joins, subqueries, partitions) and basic scripting in Python." },
        { phase: "Phase 2", description: "Deep dive into Exploratory Data Analysis (EDA) using Pandas, Seaborn, and build Power BI visualizations." },
        { phase: "Phase 3", description: "Build regressions, statistical tests (A/B testing), and deliver actionable presentations." }
      ],
      resources: [
        { name: "Google Data Analytics Certificate", link: "https://www.coursera.org/professional-certificates/google-data-analytics" },
        { name: "SQL for Data Science by UC Davis", link: "https://www.coursera.org/learn/sql-for-data-science" }
      ]
    },
    {
      id: "data_analyst",
      name: "Data Analyst",
      domain: "Data Science & Analytics",
      requiredSkills: ["python", "sql", "pandas"],
      niceSkills: ["power_bi", "stats", "numpy"],
      averageSalary: "₹7.5 LPA",
      description: "Performs diagnostic analytics, cleans and structures business records, and maintains corporate SQL reporting databases.",
      companies: [
        { name: "TCS", role: "Systems Analyst", salary: "₹6 LPA", details: "Writing custom queries to structure client reporting databases in Mumbai." },
        { name: "Cognizant India", role: "Business Data Analyst", salary: "₹7 LPA", details: "Cleaning transactional sales records and deploying BI reports." }
      ],
      roadmap: [
        { phase: "Phase 1", description: "Establish solid spreadsheet analytics skills (Excel VLOOKUP, Pivots) and learn SQL basics." },
        { phase: "Phase 2", description: "Master Python pandas scripts to automate tabular data processing and cleanup." },
        { phase: "Phase 3", description: "Develop standard interactive dashboards in Power BI or Tableau for business reporting." }
      ],
      resources: [
        { name: "IBM Data Analyst Professional Certificate", link: "https://www.coursera.org/professional-certificates/ibm-data-analyst" },
        { name: "Data Analysis with Python (freeCodeCamp)", link: "https://www.freecodecamp.org/learn/data-analysis-with-python/" }
      ]
    },
    {
      id: "bi_analyst",
      name: "Business Intelligence Analyst",
      domain: "Data Science & Analytics",
      requiredSkills: ["sql", "power_bi", "stats"],
      niceSkills: ["pandas", "python", "javascript"],
      averageSalary: "₹8.5 LPA",
      description: "Structures data warehousing schemas, designs metrics tracking dashboards, and compiles executive business summaries.",
      companies: [
        { name: "Mu Sigma", role: "Decision Scientist", salary: "₹9 LPA", details: "Leveraging Power BI dashboards and regression tables to formulate corporate strategies." },
        { name: "Wipro Technologies", role: "BI Consultant", salary: "₹8 LPA", details: "Developing automated operational ETL queries and metrics tracking dashboards." }
      ],
      roadmap: [
        { phase: "Phase 1", description: "Learn relational database design, schema architectures (Star/Snowflake), and advanced SQL." },
        { phase: "Phase 2", description: "Deep dive into DAX scripting for Power BI to model complex business variables." },
        { phase: "Phase 3", description: "Establish automated data pipelines (ETL schedules) and practice presenting data insights." }
      ],
      resources: [
        { name: "Microsoft Certified: Power BI Data Analyst Associate", link: "https://learn.microsoft.com/en-us/credentials/certifications/power-bi-data-analyst-associate/" },
        { name: "Data Warehousing for Business Intelligence (University of Colorado)", link: "https://www.coursera.org/specializations/data-warehousing" }
      ]
    },

    // --- NATURAL LANGUAGE PROCESSING (NLP) ---
    {
      id: "nlp_engineer",
      name: "NLP Engineer",
      domain: "Natural Language Processing (NLP)",
      requiredSkills: ["python", "huggingface", "transformers"],
      niceSkills: ["pytorch", "tensorflow", "stats"],
      averageSalary: "₹13.0 LPA",
      description: "Builds NLP systems, structures sentiment analysis blocks, fine-tunes custom encoders, and integrates speech-to-text nodes.",
      companies: [
        { name: "Zoho Corporation", role: "NLP Developer", salary: "₹14 LPA", details: "Developing virtual help desk chatbots and contextual text auto-replies in Chennai." },
        { name: "Wadhwani AI", role: "Applied NLP Developer", salary: "₹12 LPA", details: "Building localized translation tools for agricultural and medical diagnostics in rural India." }
      ],
      roadmap: [
        { phase: "Phase 1", description: "Learn text processing, Regex patterns, tokenizations, and TF-IDF/Word2Vec vector representations." },
        { phase: "Phase 2", description: "Master Recurrent Neural Networks (LSTMs, GRUs) and sequence models." },
        { phase: "Phase 3", description: "Implement transformer classification models using Hugging Face datasets and PyTorch." }
      ],
      resources: [
        { name: "Natural Language Processing Specialization by deeplearning.ai", link: "https://www.coursera.org/specializations/natural-language-processing" },
        { name: "Hugging Face NLP Course", link: "https://huggingface.co/learn/nlp-course" }
      ]
    },
    {
      id: "conversational_ai_engineer",
      name: "Conversational AI Engineer",
      domain: "Natural Language Processing (NLP)",
      requiredSkills: ["python", "huggingface", "llms", "javascript"],
      niceSkills: ["transformers", "prompt", "langchain"],
      averageSalary: "₹12.0 LPA",
      description: "Designs, programs, and deploys contextual interactive speech agents, interactive voice responses, and chatbot widgets.",
      companies: [
        { name: "HCLTech", role: "Conversational AI Dev", salary: "₹11 LPA", details: "Deploying banking voice bots and customer service intent classifiers." },
        { name: "Cognizant", role: "Virtual Agent Lead", salary: "₹13 LPA", details: "Integrating customer support dialog flows with messaging platforms." }
      ],
      roadmap: [
        { phase: "Phase 1", description: "Learn script writing, state machine loops, webhook actions, and basic JavaScript client interfaces." },
        { phase: "Phase 2", description: "Study dialog design principles, slot filling, and intent training metrics." },
        { phase: "Phase 3", description: "Build production-grade virtual systems using frameworks like Rasa or Google Dialogflow." }
      ],
      resources: [
        { name: "Rasa Certification & Developer Course", link: "https://rasa.com/showcase/" },
        { name: "Google Cloud Dialogflow Developer Tutorial", link: "https://cloud.google.com/dialogflow/docs/tutorials" }
      ]
    },
    {
      id: "llm_engineer",
      name: "LLM Engineer",
      domain: "Natural Language Processing (NLP)",
      requiredSkills: ["python", "huggingface", "transformers", "tensorflow", "pytorch"],
      niceSkills: ["llms", "prompt", "langchain"],
      averageSalary: "₹16.0 LPA",
      description: "Designs conversational AI applications, fine-tunes BERT and Transformer architectures, and builds natural language indexing engines.",
      companies: [
        { name: "Microsoft Research India", role: "Research Engineer - NLP", salary: "₹25 LPA", details: "Conducting research in multilingual transcription and localized speech models in Bengaluru." },
        { name: "Zoho Corporation", role: "NLP Software Dev", salary: "₹14 LPA", details: "Developing virtual help desk chatbots and contextual text auto-replies." }
      ],
      roadmap: [
        { phase: "Phase 1", description: "Master Regex, Tokenizers, Word Embeddings (Word2Vec, GloVe), and standard Recurrent Neural Networks." },
        { phase: "Phase 2", description: "Utilize PyTorch and Hugging Face to load and fine-tune Transformer blocks (BERT, RoBERTa)." },
        { phase: "Phase 3", description: "Optimize inference models using quantization methods and build speech-to-text translators." }
      ],
      resources: [
        { name: "Stanford CS224N: Natural Language Processing with Deep Learning", link: "https://web.stanford.edu/class/cs224n/" },
        { name: "Hugging Face NLP Course", link: "https://huggingface.co/learn/nlp-course" }
      ]
    },

    // --- COMPUTER VISION ---
    {
      id: "computer_vision_engineer",
      name: "Computer Vision Engineer",
      domain: "Computer Vision",
      requiredSkills: ["python", "opencv", "tensorflow", "pytorch", "image_processing"],
      niceSkills: ["c", "slam", "numpy"],
      averageSalary: "₹13.0 LPA",
      description: "Processes digital imagery to recognize patterns. Works on facial recognition, object detection pipelines, and medical scans segmentations.",
      companies: [
        { name: "Razorpay", role: "Applied Vision Engineer", salary: "₹15 LPA", details: "Optimizing AI-based digital KYC document validation and face match algorithms." },
        { name: "TCS Research", role: "Image Processing Scientist", salary: "₹9 LPA", details: "Researching visual anomalies detection systems for high-speed factories quality checks." }
      ],
      roadmap: [
        { phase: "Phase 1", description: "Understand digital image structures, spatial filters, color channels, and core OpenCV algorithms." },
        { phase: "Phase 2", description: "Implement Convolutional Neural Networks (CNNs) and study object detection algorithms like YOLO." },
        { phase: "Phase 3", description: "Deploy deep vision models on edge compute devices using OpenVINO or ONNX runtimes." }
      ],
      resources: [
        { name: "OpenCV Basics by OpenCV.org", link: "https://opencv.org/university/free-opencv-courses/" },
        { name: "Introduction to Computer Vision by Georgia Tech", link: "https://www.udacity.com/course/introduction-to-computer-vision--ud810" }
      ]
    },
    {
      id: "image_processing_engineer",
      name: "Image Processing Engineer",
      domain: "Computer Vision",
      requiredSkills: ["python", "opencv", "image_processing", "matlab"],
      niceSkills: ["c", "numpy", "stats"],
      averageSalary: "₹10.0 LPA",
      description: "Focuses on mathematical image filtering, restoration, edge detection, and transform techniques to clean up noise from sensor streams.",
      companies: [
        { name: "TCS Research", role: "Image Processing Scientist", salary: "₹9 LPA", details: "Developing visual anomalies detection systems for high-speed factories in Pune." },
        { name: "L&T Defense", role: "Optics Software Developer", salary: "₹11 LPA", details: "Implementing real-time noise reduction algorithms for infrared cameras in Mumbai." }
      ],
      roadmap: [
        { phase: "Phase 1", description: "Study spatial transforms (Fourier, Wavelet), histograms, contrast stretching, and pixel arithmetic." },
        { phase: "Phase 2", description: "Write Python OpenCV scripts for thresholding, morphological transformations, and contours." },
        { phase: "Phase 3", description: "Model filters profiles in MATLAB/Simulink and optimize image convolution operations." }
      ],
      resources: [
        { name: "Digital Image Processing by NPTEL India", link: "https://nptel.ac.in/" },
        { name: "Image Processing with Python (DataCamp)", link: "https://www.datacamp.com/courses/image-processing-with-python" }
      ]
    },
    {
      id: "vision_ai_developer",
      name: "Vision AI Developer",
      domain: "Computer Vision",
      requiredSkills: ["python", "opencv", "tensorflow", "pytorch"],
      niceSkills: ["image_processing", "c", "embedded"],
      averageSalary: "₹12.5 LPA",
      description: "Builds object detection web interfaces, real-time tracking scripts, and integrates smart camera models into software systems.",
      companies: [
        { name: "Infosys", role: "CV Developer", salary: "₹8 LPA", details: "Building vehicle license plate recognition software for smart cities parking zones." },
        { name: "Ola Electric R&D", role: "Vision Node Dev", salary: "₹14 LPA", details: "Deploying real-time camera visual telemetry nodes for electric scooter dashboards." }
      ],
      roadmap: [
        { phase: "Phase 1", description: "Learn to build basic Python scripts, load cameras feeds, and draw boundary annotations." },
        { phase: "Phase 2", description: "Master pretrained deep networks (ResNet, YOLO) and run image classifications." },
        { phase: "Phase 3", description: "Deploy deep vision models onto Web endpoints using WebRTC streaming layers." }
      ],
      resources: [
        { name: "PyTorch for Computer Vision (Deep Learning)", link: "https://pytorch.org/tutorials/beginner/deep_learning_20min_tutorial.html" },
        { name: "Learn Computer Vision (Kaggle Course)", link: "https://www.kaggle.com/learn/computer-vision" }
      ]
    },

    // --- GENERATIVE AI ---
    {
      id: "gen_ai_engineer",
      name: "Generative AI Engineer",
      domain: "Generative AI",
      requiredSkills: ["python", "llms", "langchain", "rag", "prompt"],
      niceSkills: ["pytorch", "huggingface", "transformers"],
      averageSalary: "₹18.0 LPA",
      description: "Constructs next-gen tools using Large Language Models (LLMs). Specializes in Retrieval-Augmented Generation (RAG) and workflow orchestration.",
      companies: [
        { name: "HCLTech Labs", role: "GenAI Solutions Developer", salary: "₹12 LPA", details: "Building custom document retrieval systems and AI copilots for global clients." },
        { name: "Cognizant India", role: "Applied GenAI Architect", salary: "₹15 LPA", details: "Integrating LangChain pipelines with enterprise customer relational databases." }
      ],
      roadmap: [
        { phase: "Phase 1", description: "Learn API patterns for OpenAI/Anthropic, Prompt engineering structures, and context windows constraints." },
        { phase: "Phase 2", description: "Build RAG search systems using Vector Databases (ChromaDB, Pinecone, Milvus) and document loaders." },
        { phase: "Phase 3", description: "Implement agentic behaviors, tool-use loops with LangGraph, and deploy secure guardrails." }
      ],
      resources: [
        { name: "Generative AI with Large Language Models (DeepLearning.AI)", link: "https://www.coursera.org/learn/generative-ai-with-llms" },
        { name: "LangChain Academy", link: "https://academy.langchain.com/" }
      ]
    },
    {
      id: "ai_product_developer",
      name: "AI Product Developer",
      domain: "Generative AI",
      requiredSkills: ["python", "llms", "prompt", "javascript"],
      niceSkills: ["langchain", "rag", "figma"],
      averageSalary: "₹14.0 LPA",
      description: "Bridges Generative AI APIs with frontend interfaces, designs contextual chatbots templates, and builds user-facing AI applications.",
      companies: [
        { name: "Flipkart Labs", role: "AI Frontend Engineer", salary: "₹15 LPA", details: "Co-developing conversational search bars and personal shopping assistants." },
        { name: "Zoho Corporation", role: "AI Product Associate", salary: "₹13 LPA", details: "Integrating writing assistants templates into document processing suites." }
      ],
      roadmap: [
        { phase: "Phase 1", description: "Master modern JavaScript, Python web APIs (FastAPI/Flask), and HTML/CSS UI structures." },
        { phase: "Phase 2", description: "Integrate LLM API calls with asynchronous JavaScript rendering loops." },
        { phase: "Phase 3", description: "Study user experience design for AI products, chat history sessions, and model latency adjustments." }
      ],
      resources: [
        { name: "ChatGPT Prompt Engineering for Developers", link: "https://www.deeplearning.ai/short-courses/chatgpt-prompt-engineering-for-developers/" },
        { name: "Build AI Apps with LangChain (Scrimba)", link: "https://scrimba.com/" }
      ]
    },
    {
      id: "llm_developer",
      name: "LLM Developer",
      domain: "Generative AI",
      requiredSkills: ["python", "llms", "langchain", "pytorch"],
      niceSkills: ["rag", "prompt", "transformers"],
      averageSalary: "₹16.5 LPA",
      description: "Fine-tunes open-source LLMs (Llama, Mistral) on domain-specific datasets, structures vector database schemas, and deploys model hubs.",
      companies: [
        { name: "Wipro AI Labs", role: "LLM Fine-tuning Engineer", salary: "₹16 LPA", details: "Fine-tuning open-source LLMs on proprietary healthcare telemetry databases." },
        { name: "Microsoft R&D", role: "LLM Systems Engineer", salary: "₹22 LPA", details: "Scaling retrieval pipelines and vector index search parameters." }
      ],
      roadmap: [
        { phase: "Phase 1", description: "Learn to load, prompt, and evaluate standard LLMs in Python notebooks." },
        { phase: "Phase 2", description: "Study fine-tuning methods (LoRA, QLoRA) and use Hugging Face Autotrain tool suites." },
        { phase: "Phase 3", description: "Optimize context windows search models and deploy localized LLM servers (Ollama/vLLM)." }
      ],
      resources: [
        { name: "LangChain Academy: Active Agent Chains", link: "https://academy.langchain.com/" },
        { name: "Fine-Tuning Large Language Models (Coursera)", link: "https://www.coursera.org/" }
      ]
    },

    // --- ROBOTICS ENGINEERING ---
    {
      id: "robotics_engineer",
      name: "Robotics Engineer",
      domain: "Robotics Engineering",
      requiredSkills: ["ros", "python", "cpp", "robotics"],
      niceSkills: ["arduino", "raspi", "sensors"],
      averageSalary: "₹11.5 LPA",
      description: "Coordinates mechanical arm dynamics, drafts robotic kinematic equations, and establishes telemetry interfaces.",
      companies: [
        { name: "GreyOrange Robotics", role: "Robotics Integration Lead", salary: "₹13 LPA", details: "Integrating manipulator arms dynamics inside warehouse dispatch centers in Gurugram." },
        { name: "Cynlr Labs", role: "Systems Kinematics Engineer", salary: "₹12 LPA", details: "Configuring joint kinematics and multi-precision robotic pick operations." }
      ],
      roadmap: [
        { phase: "Phase 1", description: "Establish sound kinematics geometry foundation (matrices, rotation transforms) and study Python/C++." },
        { phase: "Phase 2", description: "Learn to write ROS 2 packages and build simple publisher subscriber simulation nodes." },
        { phase: "Phase 3", description: "Integrate motor control loops, configure encoder coordinates, and calibrate robotic limbs." }
      ],
      resources: [
        { name: "Robotics Specialization by University of Pennsylvania", link: "https://www.coursera.org/specializations/robotics" },
        { name: "ROS 2 Basics (C++ / Python) Course", link: "https://www.constructsim.com/" }
      ]
    },
    {
      id: "robotics_developer",
      name: "Robotics Developer",
      domain: "Robotics Engineering",
      requiredSkills: ["ros", "python", "arduino", "raspi"],
      niceSkills: ["cpp", "sensors", "embedded"],
      averageSalary: "₹9.5 LPA",
      description: "Programs microcontroller logic, configures Raspberry Pi telemetry nodes, and links sensors to ROS publisher pipelines.",
      companies: [
        { name: "GreyOrange Robotics", role: "Embedded Controller Dev", salary: "₹10 LPA", details: "Programming sensor polling loops on warehouse rovers boards in Gurugram." },
        { name: "Systemantics", role: "Robotics Software Associate", salary: "₹9 LPA", details: "Writing sensor calibration scripts and setting up ROS communication bridges." }
      ],
      roadmap: [
        { phase: "Phase 1", description: "Learn circuit design basics, C programming, and program Arduino boards." },
        { phase: "Phase 2", description: "Set up Linux systems on Raspberry Pi, learn python socket scripting, and install ROS." },
        { phase: "Phase 3", description: "Write publisher-subscriber scripts mapping raw hardware pins readings to standard ROS messages." }
      ],
      resources: [
        { name: "Arduino Robotics Course (Udemy)", link: "https://www.udemy.com/course/arduino-robotics/" },
        { name: "Raspberry Pi Integration Tutorials", link: "https://www.raspberrypi.com/documentation/computers/getting-started.html" }
      ]
    },
    {
      id: "robotics_designer",
      name: "Robotics Designer",
      domain: "Robotics Engineering",
      requiredSkills: ["python", "designing", "cad", "arduino"],
      niceSkills: ["ros", "raspi", "robotics"],
      averageSalary: "₹10.5 LPA",
      description: "Bridges mechanical kinematics and design aesthetics. Models robotic arms, humanoid shells, and automated storage grids.",
      companies: [
        { name: "GreyOrange", role: "Industrial Robotics Designer", salary: "₹12 LPA", details: "Shaping the structural ergonomics and shell mechanics of automated guided warehouse robots in Gurugram." },
        { name: "Cynlr", role: "Robotics Shell Designer", salary: "₹10 LPA", details: "Modeling micro-precision visual picking robotic arms and dynamic joints in Bengaluru." }
      ],
      roadmap: [
        { phase: "Phase 1", description: "Learn 3D CAD modeling (SolidWorks, Fusion 360) and structural mechanics/materials selector." },
        { phase: "Phase 2", description: "Write Python scripts to automate coordinates computation and run kinematics scripts." },
        { phase: "Phase 3", description: "Learn basic circuit controls with Arduino and test structural prototypes using 3D printers." }
      ],
      resources: [
        { name: "Autodesk Fusion 360 Certification", link: "https://www.autodesk.com/certification/learning-pathways/fusion-360-mechanical-design" },
        { name: "Robotics Specialization by University of Pennsylvania", link: "https://www.coursera.org/specializations/robotics" }
      ]
    },

    // --- INDUSTRIAL AUTOMATION ---
    {
      id: "automation_engineer",
      name: "Automation Engineer",
      domain: "Industrial Automation",
      requiredSkills: ["plc", "scada", "matlab", "python", "sensors"],
      niceSkills: ["arduino", "raspi", "iot"],
      averageSalary: "₹8.0 LPA",
      description: "Programs assembly line logic, SCADA tracking hubs, and configures automated sensor grids for factories.",
      companies: [
        { name: "Siemens India", role: "Systems Automation Engineer", salary: "₹8.5 LPA", details: "Programming PLC loops for automotive assembly plants in Chennai." },
        { name: "ABB India", role: "Control Systems Lead", salary: "₹8.0 LPA", details: "Configuring SCADA telemetry and smart sensor interfaces for steel manufacturing." }
      ],
      roadmap: [
        { phase: "Phase 1", description: "Understand electrical schematics, ladder logic programming, and PLC microcontrollers wiring." },
        { phase: "Phase 2", description: "Configure SCADA operator dashboards and network communication rules (Modbus/Profibus)." },
        { phase: "Phase 3", description: "Run system dynamics modeling in MATLAB/Simulink and calibrate sensors arrays." }
      ],
      resources: [
        { name: "PLC Programming Basics (Udemy)", link: "https://www.udemy.com/course/plc-programming-basics-for-beginners/" },
        { name: "Control Systems Specialization by NPTEL India", link: "https://nptel.ac.in/" }
      ]
    },
    {
      id: "control_systems_engineer",
      name: "Control Systems Engineer",
      domain: "Industrial Automation",
      requiredSkills: ["matlab", "sensors", "plc", "c"],
      niceSkills: ["scada", "python", "arduino"],
      averageSalary: "₹8.5 LPA",
      description: "Designs feedback loops, optimizes PID parameters inside controllers, and tunes transient response parameters.",
      companies: [
        { name: "ABB India", role: "Control Systems Lead", salary: "₹8.0 LPA", details: "Tuning thermal control system loops parameters in Bengaluru." },
        { name: "Rockwell Automation", role: "Control Tuning Engineer", salary: "₹9.0 LPA", details: "Tuning PID parameters for fluid control valves in Noida." }
      ],
      roadmap: [
        { phase: "Phase 1", description: "Master system theory (Laplace transforms, Bode plots, transfer functions) and study MATLAB." },
        { phase: "Phase 2", description: "Configure feedback controllers, write basic firmware in C, and program PLC units." },
        { phase: "Phase 3", description: "Implement digital filtering, noise removal algorithms, and model systems dynamics." }
      ],
      resources: [
        { name: "Control Systems Engineering by NPTEL India", link: "https://nptel.ac.in/" },
        { name: "Modern Control Systems Theory (Coursera)", link: "https://www.coursera.org/learn/modern-control-systems" }
      ]
    },
    {
      id: "plc_programmer",
      name: "PLC Programmer",
      domain: "Industrial Automation",
      requiredSkills: ["plc", "scada", "sensors"],
      niceSkills: ["arduino", "raspi", "iot"],
      averageSalary: "₹7.0 LPA",
      description: "Programs ladder logic, configures SCADA telemetry relays, and calibrates industrial input/output modules.",
      companies: [
        { name: "Schneider Electric", role: "Field Service Programmer", salary: "₹7.5 LPA", details: "Programming PLC and SCADA interfaces for sugar packaging plants in Noida." },
        { name: "L&T Engineering", role: "Automation Associate", salary: "₹6.8 LPA", details: "Drafting ladder logic diagrams and verifying circuit interlocks." }
      ],
      roadmap: [
        { phase: "Phase 1", description: "Learn ladder logic syntax, function block diagrams, and study industrial sensors wiring." },
        { phase: "Phase 2", description: "Master SCADA dashboard configurations, tags routing, and alarm flags handling." },
        { phase: "Phase 3", description: "Verify safety interlock loops, network interfaces, and commission field devices." }
      ],
      resources: [
        { name: "Ladder Logic Programming (Udemy)", link: "https://www.udemy.com/course/learn-plc-programming-ladder-logic/" },
        { name: "Industrial Automation Course (Siemens Training)", link: "https://sitrain.siemens.com/" }
      ]
    },

    // --- AUTONOMOUS SYSTEMS ---
    {
      id: "autonomous_engineer",
      name: "Autonomous Vehicle Engineer",
      domain: "Autonomous Systems",
      requiredSkills: ["ros", "slam", "opencv", "motion_planning", "cpp"],
      niceSkills: ["python", "sensors", "image_processing"],
      averageSalary: "₹14.0 LPA",
      description: "Develops navigation algorithms, sensor-fusion nodes, and pathfinders for self-driving vehicles and autonomous rovers.",
      companies: [
        { name: "Ola Electric R&D", role: "Autonomous Vehicle Programmer", salary: "₹14 LPA", details: "Writing path planning and LIDAR obstacle detection loops for future electric transport vehicles in Bengaluru." },
        { name: "Tata Motors", role: "ADAS Software Developer", salary: "₹11 LPA", details: "Programming lane detection and emergency braking algorithms in Pune." }
      ],
      roadmap: [
        { phase: "Phase 1", description: "Become proficient in modern C++ and Python, focusing on memory management and high-speed data types." },
        { phase: "Phase 2", description: "Implement Publisher-Subscriber architectures in ROS 2, and handle sensor inputs (LiDAR/Camera)." },
        { phase: "Phase 3", description: "Code SLAM map generation, obstacle classifiers, and pathfinders (A*, Dynamic Window Approach)." }
      ],
      resources: [
        { name: "Self-Driving Cars Specialization by University of Toronto", link: "https://www.coursera.org/specializations/self-driving-cars" },
        { name: "ROS 2 Navigation (Nav2) Tutorials", link: "https://navigation.ros.org/" }
      ]
    },
    {
      id: "navigation_engineer",
      name: "Navigation Engineer",
      domain: "Autonomous Systems",
      requiredSkills: ["ros", "slam", "motion_planning", "cpp"],
      niceSkills: ["python", "sensors", "matlab"],
      averageSalary: "₹12.5 LPA",
      description: "Specializes in spatial coordinate estimations, mapping algorithms, and paths optimization scripts.",
      companies: [
        { name: "Mahindra & Mahindra R&D", role: "Localization Engineer", salary: "₹12 LPA", details: "Optimizing localization indexes for autonomous tractors algorithms in Pune." },
        { name: "GreyOrange", role: "Navigation Engineer", salary: "₹13 LPA", details: "Writing SLAM algorithms for warehouse AGV fleets navigation." }
      ],
      roadmap: [
        { phase: "Phase 1", description: "Master coordinate geometry, coordinate frames transformations, and basic C++ structures." },
        { phase: "Phase 2", description: "Study Kalman filters, sensor fusion mechanisms (GPS/LIDAR/IMU), and write ROS nodes." },
        { phase: "Phase 3", description: "Deploy Cartographer or RTAB-Map SLAM packages and write navigation routines." }
      ],
      resources: [
        { name: "SLAM Course: Lectures on autonomous navigation", link: "https://www.udemy.com/course/slam-course-lectures/" },
        { name: "Introduction to Robot Navigation (NPTEL)", link: "https://nptel.ac.in/" }
      ]
    },
    {
      id: "robotics_software_engineer",
      name: "Robotics Software Engineer",
      domain: "Autonomous Systems",
      requiredSkills: ["ros", "python", "cpp", "sensors"],
      niceSkills: ["slam", "opencv", "motion_planning"],
      averageSalary: "₹13.0 LPA",
      description: "Structures ROS 2 systems architectures, builds custom messaging loops, and integrates core software components.",
      companies: [
        { name: "Ola Electric R&D", role: "ADAS Software Dev", salary: "₹14 LPA", details: "Refining ADAS camera data acquisition processes in Bengaluru." },
        { name: "Cognizant India", role: "Robotic Process Architect", salary: "₹10 LPA", details: "Integrating software control interfaces with hardware rovers." }
      ],
      roadmap: [
        { phase: "Phase 1", description: "Learn Linux systems administration, git repositories usage, and Python/C++ skills." },
        { phase: "Phase 2", description: "Write publishers, subscribers, service loops, and build custom ROS interfaces." },
        { phase: "Phase 3", description: "Implement obstacle avoidance, write sensor filtering nodes, and deploy algorithms to physical rovers." }
      ],
      resources: [
        { name: "ROS 2 Basics by ConstructSim", link: "https://www.constructsim.com/" },
        { name: "Robotic Software Engineering Specialization (Coursera)", link: "https://www.coursera.org/" }
      ]
    },

    // --- EMBEDDED AI & EDGE COMPUTING ---
    {
      id: "embedded_ai_engineer",
      name: "Embedded AI Engineer",
      domain: "Embedded AI & Edge Computing",
      requiredSkills: ["c", "python", "embedded", "tinyml"],
      niceSkills: ["iot", "sensors", "raspi"],
      averageSalary: "₹15.0 LPA",
      description: "Programs embedded microcontrollers, optimizes neural weights, and deploys local inference scripts directly onto chips.",
      companies: [
        { name: "Intel India", role: "Edge Dev", salary: "₹18 LPA", details: "Porting neural models onto Intel edge chips in Bengaluru." },
        { name: "Qualcomm", role: "NPU Compiler Dev", salary: "₹17 LPA", details: "Optimizing neural processing unit firmware templates." }
      ],
      roadmap: [
        { phase: "Phase 1", description: "Master C programming, bitwise operations, memory allocation rules, and hardware registers." },
        { phase: "Phase 2", description: "Learn standard ML model structures in Python and use TensorFlow Lite compilation tools." },
        { phase: "Phase 3", description: "Deploys TinyML classifiers onto microcontrollers (STM32, ESP32) using C compiler blocks." }
      ],
      resources: [
        { name: "TinyML Specialization by Harvard University", link: "https://www.edx.org/learn/machine-learning/harvard-university-introduction-to-tinyml" },
        { name: "Embedded Systems Course (NPTEL)", link: "https://nptel.ac.in/" }
      ]
    },
    {
      id: "edge_ai_engineer",
      name: "Edge AI Engineer",
      domain: "Embedded AI & Edge Computing",
      requiredSkills: ["c", "python", "embedded", "tinyml", "iot"],
      niceSkills: ["sensors", "raspi", "cpp"],
      averageSalary: "₹16.0 LPA",
      description: "Deploys machine learning models onto resource-constrained embedded systems and microcontrollers using TinyML.",
      companies: [
        { name: "Intel India", role: "Edge AI Software Developer", salary: "₹18 LPA", details: "Porting optimized deep learning models onto Intel Movidius neural stick processors." },
        { name: "MediaTek Bangalore", role: "IoT Firmware Dev", salary: "₹14 LPA", details: "Implementing localized voice recognition and wake-word neural nodes on smart home chips." }
      ],
      roadmap: [
        { phase: "Phase 1", description: "Master Embedded C programming, registers, clock gates, timers, and interrupts." },
        { phase: "Phase 2", description: "Study TensorFlow Lite for Microcontrollers and quantize neural weights from float32 to int8." },
        { phase: "Phase 3", description: "Deploy TinyML models onto Cortex-M microcontrollers to classify sensor inputs on-device." }
      ],
      resources: [
        { name: "Introduction to TinyML by Harvard University", link: "https://www.edx.org/learn/machine-learning/harvard-university-introduction-to-tinyml" },
        { name: "Embedded Systems Specialization by NPTEL", link: "https://nptel.ac.in/" }
      ]
    },
    {
      id: "iot_ai_developer",
      name: "IoT AI Developer",
      domain: "Embedded AI & Edge Computing",
      requiredSkills: ["python", "embedded", "iot", "sensors"],
      niceSkills: ["c", "tinyml", "raspi"],
      averageSalary: "₹12.0 LPA",
      description: "Develops sensor reading scripts, routes hardware records to cloud servers, and builds local analytics nodes.",
      companies: [
        { name: "Bharat Electronics Limited (BEL)", role: "IoT Systems Analyst", salary: "₹9 LPA", details: "Developing automated telemetry arrays for sensor fields." },
        { name: "Wipro Technologies", role: "IoT Product Engineer", salary: "₹11 LPA", details: "Integrating smart home sensor arrays with AWS IoT dashboards." }
      ],
      roadmap: [
        { phase: "Phase 1", description: "Learn Python script writing, serial communications, and sensors polling loops." },
        { phase: "Phase 2", description: "Study network protocols (MQTT, HTTP APIs, WebSockets) and link devices to databases." },
        { phase: "Phase 3", description: "Configure edge servers, deploy data cleaning models, and automate cloud triggers." }
      ],
      resources: [
        { name: "IoT Foundations (Coursera)", link: "https://www.coursera.org/specializations/iot" },
        { name: "AWS Certified Alexa Skill Builder - Specialty", link: "https://aws.amazon.com/" }
      ]
    },

    // --- HUMAN-ROBOT INTERACTION (HRI) ---
    {
      id: "hri_engineer",
      name: "HRI Engineer",
      domain: "Human-Robot Interaction (HRI)",
      requiredSkills: ["ros", "python", "opencv", "huggingface"],
      niceSkills: ["designing", "figma", "css"],
      averageSalary: "₹11.5 LPA",
      description: "Structures communication protocols linking robots to users, programs speech inputs, and builds facial tracking routines.",
      companies: [
        { name: "GreyOrange Robotics", role: "HRI Engineer", salary: "₹13.5 LPA", details: "Developing user gesture indicators mappings for AGV warehouses rovers." },
        { name: "TCS Research", role: "HRI Associate Scientist", salary: "₹9 LPA", details: "Designing elder-care companion robot visual responses profiles." }
      ],
      roadmap: [
        { phase: "Phase 1", description: "Study core HRI concepts, human factors engineering, interface design, and learn Python." },
        { phase: "Phase 2", description: "Program camera face trackers using OpenCV and publish output values in ROS nodes." },
        { phase: "Phase 3", description: "Integrate speech NLP engines using Hugging Face models and test social gestures scripts." }
      ],
      resources: [
        { name: "Human-Computer Interaction (Georgia Tech)", link: "https://www.coursera.org/specializations/human-computer-interaction" },
        { name: "ROS Speech and Sound Packages Tutorials", link: "http://wiki.ros.org/" }
      ]
    },
    {
      id: "hri_designer",
      name: "Robot Experience Designer",
      domain: "Human-Robot Interaction (HRI)",
      requiredSkills: ["ros", "designing", "python", "opencv", "huggingface"],
      niceSkills: ["figma", "raspi", "css"],
      averageSalary: "₹11.0 LPA",
      description: "Designs the communication loop between robots and humans. Focuses on social gestures, display layouts, speech nodes, and proximity awareness.",
      companies: [
        { name: "GreyOrange", role: "HRI Experience Lead", salary: "₹13.5 LPA", details: "Optimizing how warehouse technicians coordinate with fleets of sorting robots." },
        { name: "Zomato", role: "Human-Robot Experience Lead", salary: "₹11 LPA", details: "Designing physical touch screen layouts and behavioral responses for autonomous delivery bots." }
      ],
      roadmap: [
        { phase: "Phase 1", description: "Study User Interface design, accessibility, visual hierarchy, and build mockups in Figma." },
        { phase: "Phase 2", description: "Learn ROS communications and integrate Speech-to-Text and Text-to-Speech libraries." },
        { phase: "Phase 3", description: "Implement OpenCV facial tracking to make the robot turn towards and follow human speakers." }
      ],
      resources: [
        { name: "Human-Computer Interaction Specialization by Georgia Tech", link: "https://www.coursera.org/specializations/human-computer-interaction" },
        { name: "ROS Speech Recognition Packages Tutorials", link: "http://wiki.ros.org/speech_recognition" }
      ]
    },
    {
      id: "interaction_engineer",
      name: "Interaction Engineer",
      domain: "Human-Robot Interaction (HRI)",
      requiredSkills: ["python", "designing", "figma", "javascript"],
      niceSkills: ["css", "html", "opencv"],
      averageSalary: "₹10.0 LPA",
      description: "Builds high-fidelity interactive touch panels, integrates speech interfaces, and codes user dashboard layers.",
      companies: [
        { name: "Flipkart Labs", role: "Interface Developer", salary: "₹13 LPA", details: "Developing interactive terminals for parcel collection terminals in Bengaluru." },
        { name: "Infosys", role: "Interaction Engineer", salary: "₹8 LPA", details: "Building screen dashboard widgets for visitor management bots." }
      ],
      roadmap: [
        { phase: "Phase 1", description: "Master frontend coding skills (HTML, CSS, JavaScript) and design mockup interfaces in Figma." },
        { phase: "Phase 2", description: "Learn to fetch parameters from hardware sensors APIs using python/node scripts." },
        { phase: "Phase 3", description: "Construct responsive web views dashboards and compile working touch control nodes." }
      ],
      resources: [
        { name: "User Experience Design Specialization (Google)", link: "https://www.coursera.org/professional-certificates/google-ux-design" },
        { name: "Frontend Development Path (freeCodeCamp)", link: "https://www.freecodecamp.org/" }
      ]
    },

    // --- MECHATRONICS & SMART SYSTEMS ---
    {
      id: "mechatronics_engineer",
      name: "Mechatronics Engineer",
      domain: "Mechatronics & Smart Systems",
      requiredSkills: ["cad", "matlab", "sensors", "arduino", "robotics"],
      niceSkills: ["c", "embedded", "plc"],
      averageSalary: "₹8.5 LPA",
      description: "Integrates mechanical systems, electronic controllers, and sensor loops to build autonomous smart machines.",
      companies: [
        { name: "L&T Engineering", role: "Mechatronics Systems Lead", salary: "₹9.0 LPA", details: "Designing electro-mechanical actuators and feedback loops for smart infrastructural valves." },
        { name: "Bharat Electronics Limited (BEL)", role: "Mechatronics Engineer", salary: "₹8.5 LPA", details: "Developing automated radar tracking pedest pedestals and mechanical stabilization loops." }
      ],
      roadmap: [
        { phase: "Phase 1", description: "Model physical structures in 3D CAD, study stress limits, and analyze materials properties." },
        { phase: "Phase 2", description: "Simulate electronic control loops (PID parameters) in MATLAB/Simulink." },
        { phase: "Phase 3", description: "Integrate actuators, feedback encoders, and microcontrollers to compile working mechatronics rigs." }
      ],
      resources: [
        { name: "Mechatronics Foundations by NPTEL India", link: "https://nptel.ac.in/" },
        { name: "Actuators and Control Systems (Udemy)", link: "https://www.udemy.com/" }
      ]
    },
    {
      id: "systems_engineer",
      name: "Systems Engineer",
      domain: "Mechatronics & Smart Systems",
      requiredSkills: ["cad", "matlab", "sensors", "cpp"],
      niceSkills: ["arduino", "robotics", "plc"],
      averageSalary: "₹9.0 LPA",
      description: "Designs system architecture blueprints, integrates electronic sensor arrays, and manages mechanical specifications documents.",
      companies: [
        { name: "Hero MotoCorp", role: "Systems Architect", salary: "₹9.5 LPA", details: "Managing requirements parameters for smart active suspension systems in Jaipur." },
        { name: "L&T Defense", role: "Systems Engineer", salary: "₹9.0 LPA", details: "Integrating electronic targeting arrays with hydraulic systems in Mumbai." }
      ],
      roadmap: [
        { phase: "Phase 1", description: "Study systems engineering principles, design documents formatting, and learn basic 3D CAD modeling." },
        { phase: "Phase 2", description: "Run system dynamics models and loops simulations in MATLAB/Simulink." },
        { phase: "Phase 3", description: "Integrate electronic sensors, mechanical joints, and verify control parameters." }
      ],
      resources: [
        { name: "Systems Engineering Professional Certificate", link: "https://www.coursera.org/learn/systems-engineering" },
        { name: "Engineering Design Course (NPTEL)", link: "https://nptel.ac.in/" }
      ]
    },
    {
      id: "smart_systems_specialist",
      name: "Smart Systems Specialist",
      domain: "Mechatronics & Smart Systems",
      requiredSkills: ["cad", "sensors", "arduino", "robotics", "iot"],
      niceSkills: ["python", "embedded", "matlab"],
      averageSalary: "₹9.5 LPA",
      description: "Builds local networks for mechatronics devices, integrates internet of things telemetry, and configures smart actuator networks.",
      companies: [
        { name: "ABB India", role: "Smart Grid Specialist", salary: "₹10 LPA", details: "Configuring telemetry grids and smart relays actuators loops in Bengaluru." },
        { name: "Schneider Electric", role: "Smart Buildings Consultant", salary: "₹9.2 LPA", details: "Deploying automated lighting and HVAC feedback control sensors in Noida." }
      ],
      roadmap: [
        { phase: "Phase 1", description: "Learn electronic prototyping basics, CAD schematics designs, and program microcontrollers." },
        { phase: "Phase 2", description: "Configure IoT network parameters (HTTP, MQTT, Wi-Fi nodes) on boards." },
        { phase: "Phase 3", description: "Deploy automated control scripts, configure feature stores, and establish analytics views." }
      ],
      resources: [
        { name: "Internet of Things & Smart Systems (Coursera)", link: "https://www.coursera.org/specializations/iot" },
        { name: "Sensors & Actuator Engineering (NPTEL)", link: "https://nptel.ac.in/" }
      ]
    },

    // --- DESIGN & UI ---
    {
      id: "ui_ux_designer",
      name: "UI/UX Designer",
      domain: "Design & UI",
      requiredSkills: ["css", "html", "designing", "figma"],
      niceSkills: ["javascript", "python"],
      averageSalary: "₹12.0 LPA",
      description: "Crafts digital experiences, visual mockups, wireframes, and prototypes for apps and web platforms, optimizing user flows and visuals.",
      companies: [
        { name: "Flipkart", role: "Product Designer - UI/UX", salary: "₹14 LPA", details: "Designing mobile checkout journeys and recommendation banners for Indian e-commerce users in Bengaluru." },
        { name: "PhonePe", role: "Lead UX Researcher", salary: "₹15 LPA", details: "Refining visual hierarchy and regional languages interfaces for fintech users." }
      ],
      roadmap: [
        { phase: "Phase 1", description: "Learn visual design, spacing, colors theory, and master layout grid systems." },
        { phase: "Phase 2", description: "Master Figma, interactive prototyping, user testing, and construct comprehensive wireframes." },
        { phase: "Phase 3", description: "Learn front-end rendering principles using HTML semantics and responsive CSS (Flexbox/Grid)." }
      ],
      resources: [
        { name: "Google UX Design Professional Certificate", link: "https://www.coursera.org/professional-certificates/google-ux-design" },
        { name: "Figma Academy Design System Tutorials", link: "https://www.figma.com/resource-library/design-systems-guide/" }
      ]
    }
  ],

  quiz: [
    {
      id: "q1",
      category: "Programming",
      question: "Which of the following describes a key syntax difference when passing arguments in Python vs C++?",
      options: [
        "Python requires specifying data types in argument headers.",
        "Python supports named (keyword) arguments natively, whereas C++ relies strictly on positional or overloaded systems.",
        "C++ does not allow passing parameters by reference.",
        "Python compiles functions into pointers automatically."
      ],
      answer: "Python supports named (keyword) arguments natively, whereas C++ relies strictly on positional or overloaded systems."
    },
    {
      id: "q2",
      category: "AI / ML & NLP",
      question: "What is the primary computational benefit of using PyTorch tensors over standard NumPy arrays on machine learning workstations?",
      options: [
        "Tensors support automatic on-device garbage collection only.",
        "Tensors can be loaded directly onto GPU hardware for accelerated parallel operations.",
        "Tensors restrict values to integers to prevent decimal roundoff errors.",
        "Tensors do not require memory allocation headers."
      ],
      answer: "Tensors can be loaded directly onto GPU hardware for accelerated parallel operations."
    },
    {
      id: "q3",
      category: "Robotics & Hardware",
      question: "What is the primary difference between a Publisher-Subscriber node connection and a Service-Client loop in ROS 2 architecture?",
      options: [
        "Pub-Sub is a synchronous request-reply loop, while Service-Client is asynchronous telemetry.",
        "Pub-Sub is a continuous, asynchronous data stream, whereas Service-Client is a synchronous, one-off request-response loop.",
        "Service-Client loops do not support payload arguments.",
        "Pub-Sub connections are restricted to hardware sensor inputs."
      ],
      answer: "Pub-Sub is a continuous, asynchronous data stream, whereas Service-Client is a synchronous, one-off request-response loop."
    },
    {
      id: "q4",
      category: "Design & Analytics",
      question: "In parametric CAD modeling, what does the term 'fully constrained sketch' signify?",
      options: [
        "The sketch is locked to prevent any exports.",
        "All dimensions, coordinates, and geometric relations are defined, leaving zero degrees of freedom.",
        "The CAD software has run out of graphic memory.",
        "The sketch is converted into a 3D mesh format."
      ],
      answer: "All dimensions, coordinates, and geometric relations are defined, leaving zero degrees of freedom."
    }
  ]
};

// Expose to window/global scope if running in browser
if (typeof window !== "undefined") {
  window.CAREER_DATA = CAREER_DATA;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { CAREER_DATA };
}
