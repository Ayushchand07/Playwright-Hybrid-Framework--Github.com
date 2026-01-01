export type IssueUpdatePayload = {
  title: string | number;
  body: string;
  state?: 'open' | 'closed';
  labels?: string[];
  assignees?: string[];
};
