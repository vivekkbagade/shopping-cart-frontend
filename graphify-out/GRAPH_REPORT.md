# Graph Report - d:\Playground\shopping-cart-frontend  (2026-06-28)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 9 nodes · 16 edges · 3 communities (2 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]

## God Nodes (most connected - your core abstractions)
1. `App()` - 6 edges
2. `fetchProducts()` - 3 edges
3. `fetchCart()` - 3 edges
4. `addToCart()` - 3 edges
5. `removeFromCart()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `App()` --calls--> `addToCart()`  [EXTRACTED]
  src/App.jsx → src/services/api.js
- `App()` --calls--> `fetchProducts()`  [EXTRACTED]
  src/App.jsx → src/services/api.js
- `App()` --calls--> `removeFromCart()`  [EXTRACTED]
  src/App.jsx → src/services/api.js
- `App()` --calls--> `fetchCart()`  [EXTRACTED]
  src/App.jsx → src/services/api.js

## Import Cycles
- None detected.

## Communities (3 total, 1 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.70
Nodes (3): addToCart(), fetchProducts(), removeFromCart()

## Knowledge Gaps
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `App()` connect `Community 1` to `Community 0`?**
  _High betweenness centrality (0.143) - this node is a cross-community bridge._
- **Why does `fetchProducts()` connect `Community 0` to `Community 1`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **Why does `fetchCart()` connect `Community 1` to `Community 0`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._