import React, { useState } from 'react';
import { 
  Inbox, 
  Sparkles, 
  Settings, 
  AlertCircle, 
  ChevronRight, 
  Search, 
  Filter, 
  ArrowLeft, 
  FileEdit, 
  ExternalLink, 
  MessageSquare, 
  Zap, 
  Check 
} from 'lucide-react';
import './KnowledgeOps.css';

type KnowledgeView = 'triage' | 'copilot' | 'settings';

interface Ticket {
  id: string;
  user: string;
  role: string;
  feedback: string;
  category: 'Outdated Info' | 'Missing Step' | 'Confusing Content' | 'Broken Link';
  priority: 'High' | 'Medium' | 'Low';
  time: string;
}

const TICKETS: Ticket[] = [
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

export const KnowledgeOps: React.FC = () => {
  const [activeTab, setActiveTab] = useState<KnowledgeView>('triage');
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  const handleTicketClick = (id: string) => {
    setSelectedTicketId(id);
    setActiveTab('copilot');
  };

  const renderSidebar = () => (
    <aside className="ops-sidebar">
      <div className="ops-header-top">
        <button className="ops-menu-trigger" onClick={() => (window as any).togglePrototypeMenu()}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
        <div className="ops-logo">
          <div className="logo-icon">M</div>
          <span>Knowledge Hub</span>
        </div>
      </div>
      
      <nav className="ops-nav">
        <button 
          className={`ops-nav-item ${activeTab === 'triage' ? 'active' : ''}`}
          onClick={() => setActiveTab('triage')}
        >
          <Inbox size={18} />
          <span>Triage Queue</span>
          <span className="nav-badge">24</span>
        </button>
        <div className="nav-spacer-ops"></div>
        <button 
          className={`ops-nav-item ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <Settings size={18} />
          <span>Settings</span>
        </button>
      </nav>
    </aside>
  );

  const renderTriage = () => (
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

  const renderCoPilot = () => {
    const isProposedFix = selectedTicketId === 'T-1082';
    const isConfusingContent = selectedTicketId === 'T-1080';
    const isBrokenLink = selectedTicketId === 'T-1081';
    const ticket = TICKETS.find(t => t.id === selectedTicketId) || TICKETS[0];

    return (
      <div className="ops-view">
        <header className="view-header split-header">
          <div className="header-left-ops">
            <button className="back-btn" onClick={() => setActiveTab('triage')}>
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1>Co-Pilot Resolution</h1>
              <p className="subtitle">Reviewing Ticket {ticket.id}: {ticket.category}</p>
            </div>
          </div>
          <div className="header-actions">
            <button className="secondary-btn" onClick={() => setActiveTab('triage')}>Cancel</button>
            <button className="primary-btn">
              <Check size={18} />
              <span>{isProposedFix || isConfusingContent ? 'Approve & Publish' : 'Save Changes'}</span>
            </button>
          </div>
        </header>

        <div className="copilot-grid">
          <div className="context-column">
            <section className="context-section">
              <h3><MessageSquare size={16} /> Conversation Context</h3>
              <div className="section-content">
                <div className="chat-snippet">
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
                {isProposedFix && "Atlas has proposed a draft based on recent policy release notes."}
                {isBrokenLink && "Atlas has identified the problematic section but requires your expertise to provide the update."}
                {isConfusingContent && "Atlas has proposed a readability improvement to clarify fee frequency."}
              </span>
            </div>
            <div className="rich-editor">
              <div className="editor-toolbar">
                <span className="doc-title">Article: {isProposedFix ? 'Wire Transfer Guidelines' : isBrokenLink ? 'Auto Loan Process' : 'New Account Disclosures'}</span>
                <div className="toolbar-icons"><FileEdit size={16} /><ExternalLink size={16} /></div>
              </div>
              <div className="editor-content">
                <h2>{isProposedFix ? 'Wire Transfer Limitations' : isBrokenLink ? 'Auto Loan Origination' : 'Maintenance Fee Schedule'}</h2>
                <p>
                  {isProposedFix ? "Mountains America Credit Union enforces daily limits on wire transfers for security purposes. These limits vary by account type." : 
                   isBrokenLink ? "To begin your application, ensure you have your member ID and secondary form of identification ready." :
                   "The following fees are associated with the standard personal checking and savings accounts."}
                </p>
                
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

  return (
    <div className="knowledge-ops-container">
      {renderSidebar()}
      <main className="ops-main">
        {activeTab === 'triage' && renderTriage()}
        {activeTab === 'copilot' && renderCoPilot()}
        {activeTab === 'settings' && (
          <div className="ops-view">
            <h1>Settings</h1>
            <p className="subtitle">Manage AI models and routing rules</p>
          </div>
        )}
      </main>
    </div>
  );
};
