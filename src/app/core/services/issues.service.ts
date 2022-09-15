import { Injectable } from '@angular/core';
import { issues } from 'src/assets/mock-issues';
import { IIssue } from '../../models/issue.interface';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {
  private issues: IIssue[] = issues;

  constructor() {}

  getPendingIssues(): IIssue[] {
    return this.issues.filter((issue) => !issue.completed);
  }
  createIssue(issue: IIssue): void {
    issue.issueNo = this.issues.length + 1;
    this.issues.push(issue);
  }

  completeIssue(issue: IIssue) {
    const selectedIssue: IIssue = {
      ...issue,
      completed: new Date(),
    };
    const index = this.issues.findIndex((i) => i === issue);
    this.issues[index] = selectedIssue;
  }

  getSuggstions(title: string): IIssue[] {
    if (title.length < 3) {
      return this.issues.filter((issue) => issue.title.indexOf(title) !== -1);
    }
    return [];
  }
}
