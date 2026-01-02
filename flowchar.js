flowchart TD
    subgraph "Bank Internal Systems"
        A[Risk Management Databases\n& Existing Risk APIs\n(Credit, Market, Operational Risk)]
        B[Portfolio Data\nExposure, PD/LGD, VaR Models]
        C[Stress Testing Engines\n& Historical Loss Data]
    end

    subgraph "MCP Server Layer\n(Virtual Regulator Backend)"
        D[MCP Server\n(FastMCP / Official SDK)]
        E[Tool Registry]
        F[Tool: get_portfolio_exposure]
        G[Tool: run_stress_test\n(Monte Carlo Simulation)]
        H[Tool: get_regulatory_scenario]
        I[Tool: calculate_capital_impact]
        
        E --> F & G & H & I
        A & B & C -->|Secure Read Access\n+ Authentication| D
        D --> E
    end

    subgraph "AI Agent Layer\n(Regulator Simulation)"
        J[AI Client\n(Claude / GPT / Custom Agent)]
        K[MCP Client Connection]
        L[Natural Language Processor\n(User/Risk Manager Query)]
        M[Scenario Interpreter\n(e.g. 'Simulate 2026 severe recession')]
        N[Tool Caller / Orchestrator]
        O[Result Formatter\n+ Explainability]
    end

    subgraph "User Interface & Outputs"
        P[Risk Analyst / CRO\nNatural Language Interface\n(Slack / Web App / Dashboard)]
        Q[Interactive Report\nVaR / ES / CET1 Projections]
        R[Visualization\n(Loss Distribution, Heatmaps)]
        S[Compliance Documentation\nAudit Trail / Capital Plan]
    end

    %% Connections
    P -->|"Asks: Simulate DFAST-like stress test"| L
    L --> M
    M --> K
    K -->|"MCP Protocol (stdio / http / sse)"| D
    D -->|"Executes authorized tools"| N
    N -->|Results + Metadata| O
    O -->|"Formatted Response\nwith confidence & sources"| P
    O --> Q & R & S

    %% Security & Compliance
    T[Security & Governance Layer\nRBAC • Audit Logging • Rate Limiting • Explainability]
    D -.-> T
    K -.-> T

    style D fill:#2c7bb6,stroke:#333,stroke-width:2px,color:#fff
    style J fill:#d7191c,stroke:#333,stroke-width:2px,color:#fff
    style P fill:#fdae61,stroke:#333,stroke-width:2px
