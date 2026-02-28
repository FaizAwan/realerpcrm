# RealERPCRM Copilot Technical Architecture

## Current Backend: OpenAI AI
The system has been migrated to OpenAI to ensure high reliability and expert-level reasoning for the Pakistani real estate market.

## Integration Details
- **Provider**: OpenAI
- **Model**: `gpt-4-turbo-preview`
- **SDK**: `openai` (Official Node.js library)
- **API Key**: Managed via `OPENAI_API_KEY` in `.env`

## Core Capabilities
1. **Dynamic Context Injection**: Every request to `/api/chat` sends current project KPIs, lead statuses, or inventory balances to the model.
2. **Pakistani Real Estate Localization**: System prompts are tuned to understand "Marla", "Kanal", "Allotment", and "Possession" terminology.
3. **Structured Response Generation**: AI handles complex financial projections and restock logic for the Store and Lead modules.

## Recovery Steps
If the Copilot encounters an error:
1. Ensure the `OPENAI_API_KEY` is valid in `.env`.
2. Check the server logs for `OpenAI API Error` details.
3. Verify that the `openai` package is installed (`npm install openai`).
