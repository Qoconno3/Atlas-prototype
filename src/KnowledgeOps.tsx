import React, { useState } from 'react';
import { 
  Inbox, 
  Sparkles, 
  AlertCircle, 
  ChevronRight, 
  Search, 
  Filter, 
  ArrowLeft, 
  FileEdit, 
  ExternalLink, 
  MessageSquare, 
  Zap, 
  Check,
  ShieldCheck,
  Layout,
  Type,
  Clock
} from 'lucide-react';
import './KnowledgeOps.css';

type KnowledgeView = 'myWork' | 'copilot' | 'myAudit' | 'auditReview';

interface Ticket {
  id: string;
  user: string;
  role: string;
  feedback: string;
  category: 'Outdated Info' | 'Missing Step' | 'Confusing Content' | 'Broken Link' | 'Product Update';
  priority: 'High' | 'Medium' | 'Low';
  time: string;
}

interface AuditItem {
  id: string;
  document: string;
  flagType: 'Formatting & Accessibility' | 'Clarity & Tone' | 'Stale Content';
  flagIcon: React.ReactNode;
  note: string;
  actionLabel: string;
}

const TICKETS: Ticket[] = [
  {
    id: 'T-1083',
    user: 'Quincy O\'Connor',
    role: 'Product Manager',
    feedback: "The 'Operator' routing feature is now live. Update the Internal Routing Procedures to reflect that Atlas can now direct complex escalations to the correct lead via the Operator function.",
    category: 'Product Update',
    priority: 'High',
    time: '2m ago'
  },
  {
    id: 'T-1082',
    user: 'Sarah Jenkins',
    role: 'Frontline Agent',
    feedback: "The wire transfer limits mentioned here don't match the new update from Friday. It says $10k but I think it should be $25k.",
    category: 'Outdated Info',
    priority: 'High',
    time: '12m ago'
  },
  {
    id: 'T-1081',
    user: 'Marcus Thorne',
    role: 'Branch Manager',
    feedback: "Step 3 on the auto loan origination page is a dead link. Keeps 404ing.",
    category: 'Broken Link',
    priority: 'Medium',
    time: '45m ago'
  },
  {
    id: 'T-1080',
    user: 'Elena Rodriguez',
    role: 'Loan Officer',
    feedback: "The wording in the 'New Account Disclosure' section is confusing members. They keep asking if the fee is monthly or annual.",
    category: 'Confusing Content',
    priority: 'Low',
    time: '2h ago'
  },
  {
    id: 'T-1079',
    user: 'David Chen',
    role: 'Call Center',
    feedback: "Missing a step for business account verification when the owner is a non-resident.",
    category: 'Missing Step',
    priority: 'High',
    time: '3h ago'
  }
];

const AUDIT_ITEMS: AuditItem[] = [
  {
    id: 'A-1',
    document: 'Checking Account Fee Schedule',
    flagType: 'Formatting & Accessibility',
    flagIcon: <Layout size={16} className="flag-warning" />,
    note: 'Table structure is broken on mobile view; missing standard Truth in Savings Act disclaimer in footer.',
    actionLabel: '✨ Review Atlas Fix'
  },
  {
    id: 'A-2',
    document: 'Auto Loan Origination Guidelines',
    flagType: 'Clarity & Tone',
    flagIcon: <Type size={16} className="flag-ai" />,
    note: 'Sections 3 and 4 use heavy passive voice and complex jargon. Reading level is currently post-graduate.',
    actionLabel: '✨ Review Atlas Fix'
  },
  {
    id: 'A-3',
    document: 'Business Member Onboarding Checklist',
    flagType: 'Stale Content',
    flagIcon: <Clock size={16} className="flag-stale" />,
    note: 'This document was last reviewed on March 12, 2025 (over 390 days ago). Policy requires annual SME verification.',
    actionLabel: '✨ Start Review'
  }
];

export const KnowledgeOps: React.FC = () => {
  const [activeTab, setActiveTab] = useState<KnowledgeView>('myWork');
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  const handleTicketClick = (id: string) => {
    setSelectedTicketId(id);
    setActiveTab('copilot');
  };

  const handleReviewClick = (item: AuditItem) => {
    if (item.id === 'A-2') {
      setActiveTab('auditReview');
    }
  };

  const renderSidebar = () => (
    <aside className="ops-sidebar">
      <div className="ops-header-top">
        <button className="ops-menu-trigger" onClick={() => (window as any).togglePrototypeMenu()}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
      </div>
      
      <nav className="ops-nav">
        <button 
          className={`ops-nav-item ${activeTab === 'myWork' ? 'active' : ''}`}
          onClick={() => setActiveTab('myWork')}
        >
          <Inbox size={18} />
          <span>MyWork</span>
          <span className="nav-badge">24</span>
        </button>
        
        <button 
          className={`ops-nav-item ${activeTab === 'myAudit' ? 'active' : ''}`}
          onClick={() => setActiveTab('myAudit')}
        >
          <ShieldCheck size={18} className={activeTab === 'myAudit' ? '' : 'ai-icon'} />
          <span>MyAudit</span>
        </button>

        <div className="nav-spacer-ops"></div>
      </nav>
    </aside>
  );

  const renderMyWork = () => (
    <div className="ops-view">
      <header className="view-header">
        <div>
          <h1>Feedback Triage Queue</h1>
          <p className="subtitle">Automated routing by Atlas AI</p>
        </div>
        <div className="header-actions">
          <div className="search-bar-ops">
            <Search size={16} />
            <input type="text" placeholder="Search tickets..." />
          </div>
          <button className="filter-btn">
            <Filter size={16} />
            <span>Filter</span>
          </button>
        </div>
      </header>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-label">Pending Reviews</div>
          <div className="metric-value">24</div>
          <div className="metric-trend up">+4 today</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Feedback by Category</div>
          <div className="pie-chart-container">
            <div className="pie-chart"></div>
            <div className="pie-legend">
              <div className="legend-item"><span className="dot outdated"></span><span>Outdated</span></div>
              <div className="legend-item"><span className="dot broken"></span><span>Broken Link</span></div>
              <div className="legend-item"><span className="dot clarity"></span><span>Clarity</span></div>
            </div>
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Avg. Resolution Time</div>
          <div className="metric-value">3 days</div>
        </div>
      </div>

      <div className="ticket-list-container">
        <table className="ops-table">
          <thead>
            <tr>
              <th>Ticket ID</th>
              <th>User Feedback</th>
              <th>AI Category</th>
              <th>AI Priority</th>
              <th>Time</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {TICKETS.map(ticket => (
              <tr key={ticket.id} onClick={() => handleTicketClick(ticket.id)} className="clickable-row">
                <td className="id-cell">{ticket.id}</td>
                <td className="feedback-cell">
                  <div className="user-info"><strong>{ticket.user}</strong> • {ticket.role}</div>
                  <div className="feedback-preview">{ticket.feedback}</div>
                </td>
                <td>
                  <span className={`badge category-${ticket.category.replace(' ', '-').toLowerCase()}`}>
                    {ticket.category}
                  </span>
                </td>
                <td>
                  <span className={`priority-indicator ${ticket.priority.toLowerCase()}`}>
                    <AlertCircle size={14} />
                    {ticket.priority}
                  </span>
                </td>
                <td className="time-cell">{ticket.time}</td>
                <td className="action-cell"><ChevronRight size={18} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderMyAudit = () => (
    <div className="ops-view">
      <header className="view-header">
        <div>
          <h1>Proactive Content Audit</h1>
          <p className="subtitle">Continuous monitoring for clarity, formatting, and compliance.</p>
        </div>
        <div className="header-actions">
          <button className="filter-btn">
            <Filter size={16} />
            <span>All Owned Content</span>
          </button>
        </div>
      </header>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-label">Pages Monitored (Your Queue)</div>
          <div className="metric-value">42</div>
          <div className="metric-trend success">Active Coverage</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Readability Score Avg.</div>
          <div className="metric-value">Grade 12</div>
          <div className="metric-trend danger">Needs Improvement</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">Active QA Flags</div>
          <div className="metric-value">5</div>
          <div className="metric-trend up">+2 since yesterday</div>
        </div>
      </div>

      <div className="audit-list-container">
        <div className="audit-list-header">Your Owned Content Flags</div>
        <div className="audit-items">
          {AUDIT_ITEMS.map(item => (
            <div key={item.id} className="audit-card">
              <div className="audit-card-main">
                <div className="audit-doc-info">
                  <div className="audit-doc-name">{item.document}</div>
                  <div className="audit-flag-tag">
                    {item.flagIcon}
                    <span>{item.flagType}</span>
                  </div>
                </div>
                <div className="audit-note">
                  <strong>Atlas Note:</strong> {item.note}
                </div>
              </div>
              <div className="audit-card-actions">
                <button className="audit-review-btn" onClick={() => handleReviewClick(item)}>
                  {item.actionLabel}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderCoPilot = () => {
    const isProductUpdate = selectedTicketId === 'T-1083';
    const isProposedFix = selectedTicketId === 'T-1082';
    const isConfusingContent = selectedTicketId === 'T-1080';
    const isBrokenLink = selectedTicketId === 'T-1081';
    const ticket = TICKETS.find(t => t.id === selectedTicketId) || TICKETS[0];

    return (
      <div className="ops-view">
        <header className="view-header split-header">
          <div className="header-left-ops">
            <button className="back-btn" onClick={() => setActiveTab('myWork')}>
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1>Co-Pilot Resolution</h1>
              <p className="subtitle">Reviewing Ticket {ticket.id}: {ticket.category}</p>
            </div>
          </div>
          <div className="header-actions">
            <button className="secondary-btn" onClick={() => setActiveTab('myWork')}>Cancel</button>
            <button className="primary-btn">
              <Check size={18} />
              <span>{isProposedFix || isConfusingContent || isProductUpdate ? 'Approve & Publish' : 'Save Changes'}</span>
            </button>
          </div>
        </header>

        <div className="copilot-grid">
          <div className="context-column">
            <section className="context-section">
              <h3><MessageSquare size={16} /> Conversation Context</h3>
              <div className="section-content">
                <div className="chat-snippet">
                  {isProductUpdate && (
                    <div className="chat-msg user"><p><strong>System Note:</strong> Release v2.4.0 deployed. Feature "Operator Routing" is now available in production.</p></div>
                  )}
                  {isProposedFix && (
                    <>
                      <div className="chat-msg user"><p><strong>Member:</strong> What are the domestic wire limits for standard personal accounts?</p></div>
                      <div className="chat-msg bot"><p><strong>Atlas:</strong> Domestic wire limits for standard personal accounts are $10,000 per business day. This limit is enforced for your security.</p></div>
                      <div className="chat-msg user"><p><strong>Member:</strong> Okay, thanks for the info. I'll need to stop by a branch then.</p></div>
                    </>
                  )}
                  {isBrokenLink && (
                    <>
                      <div className="chat-msg user"><p><strong>Member:</strong> Where can I find the auto loan application?</p></div>
                      <div className="chat-msg bot"><p><strong>Atlas:</strong> You can access the Online Application Portal directly in Step 3 of our Auto Loan Origination guide. I've sent the link to your browser.</p></div>
                      <div className="chat-msg user"><p><strong>Member:</strong> Great, I see it now. Thanks!</p></div>
                    </>
                  )}
                  {isConfusingContent && (
                    <>
                      <div className="chat-msg user"><p><strong>Member:</strong> How much is the maintenance fee for basic checking?</p></div>
                      <div className="chat-msg bot"><p><strong>Atlas:</strong> A recurring maintenance fee of $5.00 is assessed as per the account agreement terms.</p></div>
                      <div className="chat-msg user"><p><strong>Member:</strong> Is that $5 every month or what? The wording is a bit vague.</p></div>
                    </>
                  )}
                </div>
              </div>
            </section>

            <section className="context-section">
              <h3><AlertCircle size={16} /> Submitted Feedback</h3>
              <div className="section-content">
                <div className="user-feedback-box">
                  <p>"{ticket.feedback}"</p>
                  <span className="source-tag">Source: {ticket.user} ({ticket.role})</span>
                </div>
              </div>
            </section>

            {isBrokenLink && (
              <section className="context-section">
                <h3><ExternalLink size={16} /> Related Resources</h3>
                <div className="section-content">
                  <ul className="related-links-list">
                    <li><span className="link-title">Auto Loan Origination Portal (v2)</span><span className="link-url">sharepoint.macu.com/origination/portal-v2</span></li>
                    <li><span className="link-title">Lending Resource Guide - 2026</span><span className="link-url">sharepoint.macu.com/lending/guide-2026</span></li>
                  </ul>
                </div>
              </section>
            )}

            <section className="context-section">
              <h3><Zap size={16} /> AI Rationale</h3>
              <div className="section-content">
                <p className="rationale-text">
                  {isProductUpdate && "Atlas detected a new deployment (v2.4.0) that includes 'Operator Routing'. The current 'Internal Routing Procedures' document has not been updated since v2.3.1."}
                  {isProposedFix && "Atlas detected a conflict between the knowledge base and the 'Policy Update: Wire Transfers Oct 2026' document found in SharePoint."}
                  {isBrokenLink && "Atlas verified that the target URL (macu.org/apply/auto-loan-old) returns a 404 error. No direct replacement was found in recent indexed policy updates."}
                  {isConfusingContent && "Atlas analyzed 24 recent chat sessions. Members expressed 'frustration' or 'confusion' regarding fee frequency in 85% of these interactions."}
                </p>
              </div>
            </section>
          </div>

          <div className="editor-column">
            <div className={`ai-banner ${isBrokenLink ? 'warning' : isConfusingContent ? 'info' : ''}`}>
              <Sparkles size={18} />
              <span>
                {isProductUpdate && "Atlas has drafted an update to the Internal Routing Procedures based on the new release notes."}
                {isProposedFix && "Atlas has proposed a draft based on recent policy release notes."}
                {isBrokenLink && "Atlas has identified the problematic section but requires your expertise to provide the update."}
                {isConfusingContent && "Atlas has proposed a readability improvement to clarify fee frequency."}
              </span>
            </div>
            <div className="rich-editor">
              <div className="editor-toolbar">
                <span className="doc-title">Article: {isProductUpdate ? 'Internal Routing Procedures' : isProposedFix ? 'Wire Transfer Guidelines' : isBrokenLink ? 'Auto Loan Process' : 'New Account Disclosures'}</span>
                <div className="toolbar-icons"><FileEdit size={16} /><ExternalLink size={16} /></div>
              </div>
              <div className="editor-content">
                <h2>{isProductUpdate ? 'Escalations and Internal Routing' : isProposedFix ? 'Wire Transfer Limitations' : isBrokenLink ? 'Auto Loan Origination' : 'Maintenance Fee Schedule'}</h2>
                <p>
                  {isProductUpdate ? "Mountain America Credit Union utilizes a structured escalation path for complex member inquiries. These paths are designed to ensure speed and accuracy." :
                   isProposedFix ? "Mountains America Credit Union enforces daily limits on wire transfers for security purposes. These limits vary by account type." : 
                   isBrokenLink ? "To begin your application, ensure you have your member ID and secondary form of identification ready." :
                   "The following fees are associated with the standard personal checking and savings accounts."}
                </p>
                
                {isProductUpdate && (
                  <div className="diff-view">
                    <div className="diff-added">
                      <strong>New: Operator Routing Function</strong><br/>
                      As of v2.4.0, Atlas can now facilitate direct escalations. When a member inquiry requires a specialized lead (e.g., Commercial Underwriting, Fraud Verification), Atlas will offer to route the request through the "Operator" function. This ensures the correct subject matter expert is reached without manual directory searches.
                    </div>
                  </div>
                )}

                {isProposedFix && (
                  <div className="diff-view">
                    <div className="diff-removed">Domestic wire limits for standard personal accounts are $10,000 per business day.</div>
                    <div className="diff-added">Domestic wire limits for standard personal accounts have been updated to $25,000 per business day, effective October 1st, 2026.</div>
                  </div>
                )}

                {isBrokenLink && (
                  <div className="manual-highlight">
                    <p><strong>Step 3:</strong> Navigate to the <span className="highlighted-text">Online Application Portal</span> to submit your credit verification request. (Note: Ensure pop-ups are enabled in your browser settings).</p>
                    <div className="highlight-callout"><AlertCircle size={14} /><span>AI Warning: Link destination is currently returning a 404 error.</span></div>
                  </div>
                )}

                {isConfusingContent && (
                  <div className="diff-view clarity">
                    <div className="diff-removed">A recurring maintenance fee of $5.00 is assessed as per the account agreement terms.</div>
                    <div className="diff-added">A $5.00 maintenance fee will be charged to your account on the first business day of each month.</div>
                  </div>
                )}

                <p>
                  {isProposedFix ? "For international wires, limits remain at $50,000 pending executive approval for higher amounts." : 
                   isBrokenLink ? "Once submitted, an automated decision will be rendered within 60 seconds." :
                   "Members can waive this fee by maintaining a minimum daily balance of $500 or through active direct deposit."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAuditReview = () => {
    return (
      <div className="ops-view">
        <header className="view-header split-header">
          <div className="header-left-ops">
            <button className="back-btn" onClick={() => setActiveTab('myAudit')}>
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1>Atlas Content Review</h1>
              <p className="subtitle">Auto Loan Origination Guidelines • Clarity & Tone Update</p>
            </div>
          </div>
          <div className="header-actions">
            <button className="secondary-btn" onClick={() => setActiveTab('myAudit')}>Reject Suggestion</button>
            <button className="primary-btn ai-action" onClick={() => setActiveTab('myAudit')}>
              <Check size={18} />
              <span>Approve & Update Page</span>
            </button>
          </div>
        </header>

        <div className="review-ai-banner">
          <Sparkles size={16} />
          <span>✨ Atlas applied the 'Frontline Clarity' guideline. Passive voice removed and steps converted to bullets.</span>
        </div>

        <div className="review-comparison-grid standalone">
          <div className="comparison-side left">
            <div className="side-label">Current State</div>
            <div className="comparison-content dense-text">
              <p>
                In order for the application for an auto loan to be successfully processed by the lending department, it is required that all documentation, which includes but is not limited to proof of income, a valid government-issued photo identification, and the most recent two years of federal tax returns, be submitted in their entirety by the applicant. Furthermore, it should be noted that the credit report will be pulled by our automated system upon receipt of the aforementioned documents to determine the interest rate that will be applied to the loan.
              </p>
            </div>
          </div>
          <div className="comparison-side right">
            <div className="side-label">Atlas Recommendation</div>
            <div className="comparison-content">
              <p>To process your auto loan application, please submit the following documents:</p>
              <ul className="atlas-bullets">
                <li>Proof of income</li>
                <li>Valid government-issued photo ID</li>
                <li>Last two years of federal tax returns</li>
              </ul>
              <p>Once received, our system will automatically pull your credit report to determine your interest rate.</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="knowledge-ops-container">
      {renderSidebar()}
      <main className="ops-main">
        {activeTab === 'myWork' && renderMyWork()}
        {activeTab === 'myAudit' && renderMyAudit()}
        {activeTab === 'copilot' && renderCoPilot()}
        {activeTab === 'auditReview' && renderAuditReview()}
      </main>
    </div>
  );
};
