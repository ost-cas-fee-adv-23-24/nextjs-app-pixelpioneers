export class ActionError extends Error {
    subject: string;
    issue: string;

    constructor(subject: string, issue: string) {
        super(`${subject}: ${issue}`);
        this.subject = subject;
        this.issue = issue;
    }
}

export class ValidationError extends Error {
    issues: Record<string, string[]>;

    constructor(issues: Record<string, string[]>) {
        super(issues[0][0]);
        this.issues = issues;
    }
}
