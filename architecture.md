# VeloLaunch Application Architecture

## Design Position

The application keeps **Precision Field** as the public surface: the official VeloLaunch mark anchors the identity, Velo Blue carries operational meaning, and the page uses dark material space instead of heavy interface glass. The supplied reference images inform the forward trajectory, threshold geometry, and compact capability band; their dates, rockets, and unsupported commercial claims are intentionally not reused.

## Component Integration Plan

| Layer | Component responsibility | Integration decision |
| --- | --- | --- |
| Public shell | `Home`, `Navigation`, `BrandMark`, section primitives, typed site content | Retain as the public, SEO-friendly experience. Content stays configuration-driven so prelaunch product visibility remains intentional. |
| 3D enhancement | `VeloCoreScene` | A client-side, CSS 3D enhancement surrounding the official Velo Core object. It reacts only to a coarse pointer and honours reduced-motion preferences. The hero remains comprehensible with the static core image if scripting, pointer effects, or motion are unavailable. |
| Lead intake | `consultations.create` public tRPC procedure | Validates small form payloads server-side, saves only required fields, and returns a minimal confirmation. It is independent of the public product catalogue. |
| Staff workspace | `/operations` route, protected tRPC list/update procedures | Uses the provided Manus OAuth session and role on the local `users` table. Only `admin` users can view or change consultation statuses. |
| Supabase migration boundary | `consultations` and `user_roles` mapping | The cloned repository’s Supabase patterns are treated as an import model, not a browser-side dependency. Existing Supabase leads map to `consultations`; Supabase `admin` role assignments map to `users.role`. Do not add a client-side Supabase key or copy its committed `.env`. |

## Authentication Strategy

The active project now uses the platform’s server-side OAuth and signed session cookie instead of inserting Supabase authentication directly into the browser. This preserves the cloned project’s functional goals—authentication, staff access, role gating, consultation management—while avoiding duplicated sessions, exposed credential configuration, and direct table calls from the client. A user’s server-side role is the only authorization source for staff procedures.

If an existing Supabase project must remain authoritative, it should be connected later through a private server-side migration or API boundary after credentials are provided securely. The public client should never ship service-role values, and no `.env` file should be committed.

## 3D Delivery Strategy

The cloned React Three Fiber scene is not ported wholesale because its neon palette, particles, dragon, DNA helix, and multiple animated meshes conflict with VeloLaunch’s visual system and would increase initial rendering cost. `VeloCoreScene` delivers the intended dimensional behavior through transform-only layers around the approved core art. It is gated by `pointer: fine`, disabled under `prefers-reduced-motion`, and visually harmless when JavaScript is unavailable.

| Reviewed risk | Mitigation in the redesign |
| --- | --- |
| Unresolved imports in clone | The clone is not used as the runtime base. New components are compiled against the active project’s TypeScript setup. |
| Supabase client and committed environment file | Replace client-auth coupling with server OAuth and typed tRPC procedures. Do not read, copy, or rely on the clone’s `.env`. |
| Placeholder proof and unsupported metrics | Preserve the existing prelaunch content configuration and omit logos, reviews, ratings, customer claims, and invented statistics. |
| 3D performance and motion sensitivity | Use a small CSS enhancement with static fallback, coarse-pointer disabling, and reduced-motion suppression. |
| Public form abuse | Enforce server-side validation, a compact payload, status defaults, and error handling. A production follow-up should add an approved CAPTCHA/rate-limit provider. |
| Admin data exposure | Require a signed user session and `admin` role for every read or write operation; never rely on hidden UI alone. |
| Upgrade merge damage | Repair affected imports and routes inside the active project, then run TypeScript, tests, production build, and responsive screenshots. |
