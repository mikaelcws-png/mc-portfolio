# Maya's Tool Context — Grounding the Trust Calibration Case Study

*Supplement to `TRUST_CALIBRATION copy.md`. Use this to update the User Profile and Problem Statement sections so Maya's scenario is grounded in a real, plausible deployment.*

**Naming decision: the tool stays unnamed everywhere.** In both the case study and LinkedIn posts, describe it as "an enterprise AI workspace built for regulated industries." The research below is grounded in North by Cohere as internal reference only, so the details stay realistic without pointing at a vendor.

---

## The tool (internal reference: modeled on North by Cohere)

Maya was given an enterprise AI workspace: an AI assistant, search across the company's internal systems, and customizable agents that automate multi-step workflows, built for regulated industries. This class of tool is real; Cohere co-develops a banking version of North with RBC, which makes a lending audit team a realistic deployment. Her company rolled it out to the audit team as part of a firm-wide AI initiative.

## How it's supposed to help her

A lending audit means pulling a loan file (application, income documents, credit reports, approval memos) and verifying the decision followed policy. The workspace is meant to compress that work: search and summarize documents scattered across the bank's systems, extract key figures, flag inconsistencies between what was documented and what policy requires, and draft the audit summary. A day of manual document review should become a couple of hours of reviewing the agent's work.

## Why she's confused

The confusion sits in her workflow rather than in the product. The workspace logs interactions and shows reasoning traces, so the tool itself is well built. What nobody told her:

Which parts of the audit she is allowed to delegate versus must still do herself. Whether an agent-drafted summary is defensible when a regulator asks who verified the income documents. How the agent decides a discrepancy is worth flagging versus ignoring.

The capability was deployed. The working relationship wasn't.

## Framing rule: the gap is the rollout, never the product

The case study must not read as criticism of any vendor. The tool is well built; the gap is in the rollout and the missing calibration layer, which is the space this design fills.

Key distinction to make explicit: reasoning traces answer "what did it do" after the fact. Calibration answers "can I rely on it" before the first real case. Traces are the raw material for trust; calibration is the mechanism that builds it.

## Sources

- [Cohere North](https://cohere.com/north)
- [Maginative launch coverage](https://www.maginative.com/article/cohere-launches-north-a-secure-ai-workspace-for-enterprise-productivity/)
- [BetaKit coverage](https://betakit.com/cohere-launches-customizable-enterprise-ai-workspace-platform-north/)
