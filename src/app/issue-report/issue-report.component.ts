import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IssuesService } from '../core/services/issues.service';
import { IIssue } from '../models/issue.interface';

@Component({
  selector: 'app-issue-report',
  templateUrl: './issue-report.component.html',
  styleUrls: ['./issue-report.component.css'],
})
export class IssueReportComponent implements OnInit {
  @Output() formClose = new EventEmitter();

  issueForm: FormGroup | undefined;
  suggestions: IIssue[] = [];

  constructor(
    private builder: FormBuilder,
    private issuesService: IssuesService
  ) {}

  ngOnInit(): void {
    this.issueForm = this.builder.group({
      title: ['', Validators.required],
      description: [''],
      priority: ['', Validators.required],
      type: ['', Validators.required],
    });
    //* the following code add autocomplete functionality to the title field
    this.issueForm.controls['title'].valueChanges.subscribe((title: string) => {
      this.suggestions = this.issuesService.getSuggstions(title);
    });
  }

  createIssue(): void {
    if (this.issueForm && this.issueForm.invalid) {
      this.issueForm.markAllAsTouched();
      return;
    }

    this.issuesService.createIssue(this.issueForm?.value);
    this.formClose.emit();
  }
}
