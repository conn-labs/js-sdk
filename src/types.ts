import { z } from "zod";

export enum Fields {
  ID = "id",
  CONTENT = "content",
  LINK = "link",
  CREATEDAT = "createdAt",
  UPDATEDAT = "updatedAt",
  AUTHORS = "authors",
}

export class JobEvents {
  static readonly ON_GMAIL_RECEIVED = "onGmailReceived";
  static readonly ON_GMAIL_SENT = "onGmailSent";
  static readonly ON_CALENDAR_EVENT_CREATED = "onCalendarEventCreated";
  static readonly ON_CALENDAR_EVENT_UPDATED = "onCalendarEventUpdated";
  static readonly ON_DOCS_CREATED = "onDocsCreated";
  static readonly ON_DOCS_EDITED = "onDocsEdited";
  static readonly ON_SHEETS_CREATED = "onSheetsCreated";
  static readonly ON_SHEETS_EDITED = "onSheetsEdited";
}

export enum Provider {
  GOOGLE_MEET = "google-meet",
  GOOGLE_CALENDAR = "google-calendar",
  GOOGLE_DOCS = "google-docs",
  GOOGLE_SHEETS = "google-sheets",
  GOOGLE_GMAIL = "google-gmail",
}

export interface Context {
  provider: Provider;
  fields: Fields[];
  id?: string;
  instructions?: string;
}

export interface AgentWorkflow {
  input: string;
  context: Context[];
  instances: number;
  memory: boolean;
  proMode: boolean;
  apiKey: string;
  openaiKey?: string;
}

export interface workflowContext {
  [Fields.ID]: string;
  [Fields.CONTENT]: string;
  [Fields.LINK]: string;
  [Fields.CREATEDAT]: string;
  [Fields.UPDATEDAT]: string;
  [Fields.AUTHORS]?: string;
}


export const WorkflowJobSchema = z.object({
  input: z.string(),
  context: z.array(
    z.object({
      provider: z.nativeEnum(Provider),
      fields: z.array(z.nativeEnum(Fields)),
      id: z.string().optional(),
      instructions: z.string().optional(),
    }),
  ),
  instances: z.number().int().positive(),
  memory: z.boolean().nullable(),
  proMode: z.boolean().nullable(),
  apiKey: z.string(),
  openaiKey: z.string().nullable(),
});
