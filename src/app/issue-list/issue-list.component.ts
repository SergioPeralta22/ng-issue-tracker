import { Component, OnInit } from '@angular/core';
import { IssuesService } from '../core/services/issues.service';
import { IIssue } from '../models/issue.interface';

@Component({
  selector: 'app-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.css'],
})
export class IssueListComponent implements OnInit {
  showReportIssue = false;
  issues: IIssue[] = [];
  selectedIssue: IIssue | null = null;

  constructor(private issuesService: IssuesService) {}

  ngOnInit(): void {
    this.getPendingIssues();
  }

  private getPendingIssues() {
    this.issues = this.issuesService.getPendingIssues();
  }

  onCloseReport() {
    this.showReportIssue = false;
    this.getPendingIssues();
  }

  onConfirm(confirmed: boolean) {
    if (confirmed && this.selectedIssue) {
      this.issuesService.completeIssue(this.selectedIssue);
      this.getPendingIssues();
    }
    this.selectedIssue = null;
  }
}
