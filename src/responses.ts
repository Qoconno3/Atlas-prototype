import type { BotResponse } from './types';

export const BANKING_RESPONSES: BotResponse[] = [
  {
    text: "When a member is interested in opening a new Savings Account, follow these steps:\n\n1) **Verify Eligibility**: Check primary membership eligibility if they are new.\n2) **Identify Needs**: Determine savings goals (short-term vs. long-term) to recommend the right product.\n3) **Feature Education**: For MyStyle Savings, explain the sub-account naming feature in the mobile app.\n4) **System Workflow**: Use the 'New Account' workflow in the branch system.\n\n*Compliance Note*: Ensure they understand the $5 minimum balance requirement for Primary Savings.",
    citations: ["Member Onboarding SOP - 2024", "Account Product Matrix - SharePoint", "Minimum Balance Requirements Policy"]
  },
  {
    text: "To assist a member with a mortgage application, please guide them through the following checklist:\n\n1) **Documentation**: Gather 30 days of pay stubs and 2 years of W-2s.\n2) **History**: Verify current residential history for the past 24 months.\n3) **Clarification**: Explain the difference between pre-qualification and pre-approval.\n4) **Referral**: Initiate the lead in the 'Lending Portal' and assign it to a Mortgage Officer.\n\n*Special Case*: For self-employed members, we require the last two years of full personal and business tax returns.",
    citations: ["Mortgage Lending Standard Operating Procedure", "Internal Document Checklist v5", "Self-Employed Income Verification Guide"]
  },
  {
    text: "When discussing Credit Card options, help the member choose based on their spending habits:\n\n1) **Travelers**: Recommend the Visa® Rewards card for points on gas and groceries.\n2) **Interest-Sensitive**: The Low Rate Visa is the best fit for those carrying a balance.\n3) **Pre-Approvals**: Use the 'Credit Tool' to check for pre-approved offers first.\n\nAlways provide the 'Consumer Credit Card Agreement' and the current 'Interest Rate & Fee' schedule.",
    citations: ["Credit Product Guide 2024", "Compliance Disclosure Requirements", "Pre-Approval Workflow Documentation"]
  },
  {
    text: "For members having trouble with Zelle®, follow this internal troubleshooting process:\n\n1) **Profile Audit**: Verify email or US mobile number is correctly updated.\n2) **Status Check**: Ensure account is not restricted.\n3) **Logs**: Check 'Digital Banking Logs' for failed authentication attempts.\n4) **Recipient Status**: Confirm the recipient's enrollment status if funds are missing.\n\n*Safety Tip*: Remind members that Zelle payments to enrolled users cannot be cancelled.",
    citations: ["Zelle Member Support Guide", "Digital Banking Troubleshooting SOP", "Fraud & Risk Management - P2P Payments"]
  }
];
