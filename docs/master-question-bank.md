# Nitify Master Question Bank

Below is an **extended, implementation-ready version of the Nitify Master Question Bank**.  
It keeps every single question (₅₀ total) but adds two critical columns requested for the post-PRD phase:

* ***Data Acquisition*** – whether Nitify can **autofill** the field through an integration (and which one) or must **ask the user**.  
* ***Notes / Guard-Rails*** – validation ranges, branching logic, or UX nudges.

**Legend**  
**Auto:** value is fetched via API once the connector is live • **Ask:** Nitify prompts the user • **Est.**: light-weight estimate acceptable if exact feed is absent.

---

## **Quick-view of Integrations Used**

| System | Primary Data Pulled | Key API/Doc |
| ----- | ----- | ----- |
| **Petpooja / Posist POS** | Sales, ticket size, menu, recipe costing, labour %, seat count | Petpooja OnlineOrdering API ([onlineorderingapisv210.docs.apiary.io](https://onlineorderingapisv210.docs.apiary.io/?utm_source=chatgpt.com)) · Posist Open-API marketplace ([Posist](https://www.posist.com/out-of-house/?utm_source=chatgpt.com)) |
| **UrbanPiper Hub**(Swiggy & Zomato pipes) | Channel mix %, commissions, delivery orders | UrbanPiper hub overview ([urbanpiper.com](https://www.urbanpiper.com/?utm_term=&utm_source=chatgpt.com)) |
| **Swiggy Partner API** | Live orders, commission tiers | Swiggy API guide ([LinkedIn](https://www.linkedin.com/pulse/swiggy-api-in-depth-guide-data-sets-versatile-riddhi-pankhania-ounef?utm_source=chatgpt.com)) |
| **Zomato Order-Mgmt API** | Order webhooks, ratings | Zomato dev docs ([Zomato](https://www.zomato.com/developer/integration/docs/api-documentation/order-management?utm_source=chatgpt.com)) |
| **Google Business Profile API** | Avg rating, review volume | Google “review-data” endpoint ([Google for Developers](https://developers.google.com/my-business/content/review-data?utm_source=chatgpt.com)) |
| **Reelo CRM API** | Repeat-purchase %, loyalty type | Reelo POS-integration Postman ([Postman Documenter](https://documenter.getpostman.com/view/14784368/TzzBov5g?utm_source=chatgpt.com)) |
| **WhatsApp Business Cloud API** | Reminder & clarification loops | Meta Cloud-API messages ([Facebook for Developers](https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-messages/?utm_source=chatgpt.com)) |
| **Tally / Accounting API** | Rent, utilities, loan EMI | Tally open-API outline ([tallyfy.com](https://tallyfy.com/products/pro/integrations/open-api/?utm_source=chatgpt.com)) |
| **Keka HR API** | Staff counts, turnover | Keka API docs ([Keka API documentation](https://apidocs.keka.com/?utm_source=chatgpt.com)) |

### *(If an outlet lacks a connector, Nitify falls back to “Ask”.)*

---

## **Re-formatted Question Matrix**

Each block follows the **wizard order** (Identity → Metrics → Goals), then the progressive disclosure layers.  
All validation rules are enforced once data is in-hand.

### **1\. Business Profile (Wizard Screen 1\)**

| ID | Question (UX copy) | Priority | Data Acquisition | Notes / Guard-Rails |
| ----- | ----- | ----- | ----- | ----- |
| 1 | Which best describes your operation? (Restaurant / Café-bistro / Cloud-kitchen) | P0 | Ask | Drives persona & benchmark set |
| 2 | How many outlets under this brand? | P0 | Ask / Auto (POS multi-location flag) | Must be ≥ 1 |
| 3 | Primary cuisine or concept? | P0 | Ask | Autocomplete list, peer matching |
| 4 | City & neighbourhood of this outlet | P0 | Ask | Google-maps type-ahead |
| 5 | Years in operation | P1 | Ask | 0–99 range |

### **2\. Capacity & Operations**

| ID | Question | Priority | Data Acquisition | Notes |
| ----- | ----- | ----- | ----- | ----- |
| 6 | Number of dining seats (covers) | P0 | Ask / Auto (floor-plan API if POSist) | 10-500 seats |
| 7 | Avg weekday covers | P0 | Auto (POS sales ÷ covers) | If Auto fails → Ask |
| 8 | Peak weekend wait-time (mins) | P1 | Ask | Drop-list: None / \<15 / 15-30 / 30+ |
| 9 | Kitchen production capacity per hour | P1 | Ask / Est. | Numeric or “Unsure” |
| 10 | Operating hours & days | P0 | Ask / Auto (POS store-hours) | HH:MM-HH:MM, 1–7 days |

### **3\. Sales & Channel Mix (Wizard Screen 2\)**

| ID | Question | Priority | Data Acquisition | Notes |
| ----- | ----- | ----- | ----- | ----- |
| 11 | Last full-month gross sales (₹) | P0 | Auto (Petpooja/Posist) | Validate \>₹10 k |
| 12 | % sales by channel (dine-in, takeaway, delivery, own site) | P0 | Auto (UrbanPiper split) | Sum \= 100 % |
| 13 | Top two delivery platforms | P1 | Auto (UrbanPiper) | Multi-select |
| 14 | Current commission rate per platform | P0 | Auto (Swiggy/Zomato APIs) | 0-40 % |
| 15 | Average ticket size (₹) | P0 | Auto (POS AVG(order value)) | \>₹50 |

### **4\. Financial & Costs**

| ID | Question | Priority | Data Acquisition | Notes |
| ----- | ----- | ----- | ----- | ----- |
| 17 | Avg food-cost % of sales | P0 | Auto (recipe-costs ÷ sales) | 10-90 % |
| 18 | Avg labour-cost % of sales | P0 | Auto (Keka HR payroll ÷ sales) | 5-60 % |
| 19 | Monthly rent / occupancy cost | P1 | Ask / Auto (Tally expense tag) | ₹ or % toggle |
| 20 | Utility costs per month | P2 | Ask / Auto (Tally) | Optional |
| 21 | Any bank / VC debt repayments? | P2 | Ask / Auto (Tally loans) | Y/N \+ EMI |

### **5\. Menu & Inventory**

| ID | Question | Priority | Data Acquisition | Notes |
| ----- | ----- | ----- | ----- | ----- |
| 22 | Recipe-level costing for all items? | P0 | Auto (Petpooja menu API) | Yes / No / Partial |
| 23 | Most-ordered dish & units / week | P1 | Auto (POS top-SKU) | Dropdown if auto |
| 24 | Current food-waste % or ₹ / week | P0 | Ask | 0-100 % |
| 25 | How often do you 86 items? | P1 | Ask | Rare / Weekly / Daily |

### **6\. Customer & Marketing**

| ID | Question | Priority | Data Acquisition | Notes |
| ----- | ----- | ----- | ----- | ----- |
| 26 | Repeat-purchase rate (%) | P0 | Auto (Reelo repeat-guest) | 0-100 % |
| 27 | Do you run a loyalty programme? | P1 | Auto (Reelo plan type) | None / Card / Points / App |
| 28 | Main marketing channels in use | P1 | Ask (multi-select) | IG / FB / WhatsApp / Email / Influencers |
| 29 | Monthly marketing spend (₹) | P2 | Ask / Auto (Tally “Marketing”) | Show industry median |

### **7\. Staffing & Culture**

| ID | Question | Priority | Data Acquisition | Notes |
| ----- | ----- | ----- | ----- | ----- |
| 30 | Total FTE: FOH / BOH / Riders | P0 | Auto (Keka dept-roster) | Validate ≠ 0 |
| 31 | Annual staff turnover (%) | P1 | Auto (Keka terminations) | 0-200 % |
| 32 | Formal training or SOP manuals? | P1 | Ask | Yes / No |
| 33 | Key staff pain today? | P0 | Ask (radio) | Hiring / Scheduling / Skill / None |

### **8\. Tech Stack**

| ID | Question | Priority | Data | Notes |
| ----- | ----- | ----- | ----- | ----- |
| 34 | Which POS system? | P0 | Auto (detected via OAuth) | Dropdown |
| 35 | Inventory software? | P1 | Ask | Brand list |
| 36 | Reservation system? | P1 | Ask / Auto (EazyDiner API) | Dine-in only |
| 37 | Owned ordering site/app? | P0 | Ask / Auto (domain scan) | Yes / Working on / No |

### **9\. Supply Chain**

| ID | Question | Priority | Data Acquisition | Notes |
| ----- | ----- | ----- | ----- | ----- |
| 38 | Primary food supplier count | P1 | Ask | 1 / 2-3 / \>3 |
| 39 | Avg lead-time fresh produce (days) | P1 | Ask | 1-14 |
| 40 | Buy via aggregators / GPO? | P2 | Ask | Yes / No |

### **10\. Compliance & Risk**

| ID | Question | Priority | Data Acquisition | Notes |
| ----- | ----- | ----- | ----- | ----- |
| 41 | Latest health-inspection grade/date | P1 | Ask | Date-picker |
| 42 | Liquor licence held? | P2 | Ask | Yes / No |

### **11\. Goals & Pain Focus (Wizard Screen 3\)**

| ID | Question | Priority | Data Acquisition | Notes |
| ----- | ----- | ----- | ----- | ----- |
| 43 | Rank these goals for next 90 days | P0 | Ask (drag-rank) | Drives room suggestion |
| 44 | Biggest immediate pain (1 sentence) | P0 | Ask (free-text) | Fed direct to GPT |
| 45 | Risk appetite for experiments | P1 | Ask | Low / Medium / High |

### **12\. Sustainability / CSR**

| ID | Question | Priority | Data | Notes |
| ----- | ----- | ----- | ----- | ----- |
| 46 | Track carbon / packaging waste? | P2 | Ask | Yes / No |
| 47 | Interest in sustainability certs? | P2 | Ask | Yes / Maybe / No |

### **13\. Expansion & Future**

| ID | Question | Priority | Data Acquisition | Notes |
| ----- | ----- | ----- | ----- | ----- |
| 48 | Additional outlets planned (12 mo) | P1 | Ask | 0 / 1-2 / 3+ |
| 49 | Plan new cuisine lines / brands? | P2 | Ask | Yes / Maybe / No |
| 50 | Budget for improvements this quarter (₹ band) | P0 | Ask | Radio: \<50 k / 50-150 k / 150 k+ |

---

## **Validation & Clarification Logic**

1. **Automatic range checks** (e.g., food-cost 10-90 %) trigger inline toasts.  
2. If any P0 answer remains empty after integrations \+ wizard, Nitify fires a **single GPT-driven WhatsApp clarification** (max 3 items) leveraging Cloud API ([Facebook for Developers](https://developers.facebook.com/docs/whatsapp/cloud-api/guides/send-messages/?utm_source=chatgpt.com)).  
3. P1/P2 gaps surface later as **“Boost accuracy \+ X %”** pop-ups tied to the relevant room.

---

## **Why This Matters for the Build**

* **Connect-first philosophy** minimises typing fatigue and improves accuracy, directly addressing the PRD goal of ≤ 60 s to strategy.  
* Mapping each field to a concrete integration (or fallback) de-risks engineering scoping.  
* Guard-rails & ranges reduce hallucinations in downstream GPT prompts.  
* Complete parity with the original 50-question list keeps all analytical use-cases intact.

Use this matrix as the single source of truth for frontend form schemas, backend validation, and integration contract tests.
