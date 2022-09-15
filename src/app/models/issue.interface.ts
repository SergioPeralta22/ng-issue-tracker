export interface IIssue {
  issueNo: number;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  type: 'Bug' | 'Feature' | 'Documentation';
  status?: 'open' | 'in progress' | 'closed';
  completed?: Date;
}
