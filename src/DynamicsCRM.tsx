import React, { useState } from 'react';
import './DynamicsCRM.css';

type CallState = 'active' | 'ended';

export const DynamicsCRM: React.FC = () => {
  const [callState, setCallState] = useState<CallState>('active');
  const [chatInput, setChatInput] = useState('');

  const toggleCallState = () => {
    setCallState(prev => prev === 'active' ? 'ended' : 'active');
  };

  return (
    <div className="dynamics-container">
      {/* Top Navigation Bar */}
      <header className="dynamics-header">
        <div className="header-left">
          <div className="menu-trigger-header-dynamics" onClick={() => (window as any).togglePrototypeMenu?.()}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </div>
          <div className="dynamics-logo">Dynamics 365</div>
          <div className="app-name">Customer Service</div>
        </div>
        <div className="header-right">
          <button className="state-toggle-btn" onClick={toggleCallState}>
            Switch to {callState === 'active' ? 'Call Ended' : 'Active Call'}
          </button>
          <div className="user-profile">QO</div>
        </div>
      </header>

      <div className="dynamics-body">
        {/* Left Sidebar */}
        <nav className="dynamics-sidebar">
          <div className="nav-item active" title="Home">
            <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
          </div>
          <div className="nav-item" title="Dashboards">
            <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>
          </div>
          <div className="nav-item" title="Accounts">
            <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm10 12h-8v-2h8v2zm0-4h-8v-2h8v2zm0-4h-8V9h8v2zm0-4h-8V5h8v2zm4 12h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2z"/></svg>
          </div>
          <div className="nav-item" title="Contacts">
            <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
          </div>
          <div className="nav-item" title="Cases">
            <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="dynamics-main">
          {/* Call Status Banner */}
          <div className={`call-banner ${callState}`}>
            {callState === 'active' ? (
              <><span className="pulse-icon">📞</span> Live Call in Progress: 04:12</>
            ) : (
              <><span className="check-icon">✓</span> Call Ended. Wrap-up pending.</>
            )}
          </div>

          <div className="record-header">
            <div className="breadcrumb">Accounts &gt; Sarah Jenkins</div>
            <h1 className="record-title">Member: Sarah Jenkins</h1>
            <div className="record-actions">
              <button className="crm-btn secondary">Edit</button>
              <button className="crm-btn secondary">Deactivate</button>
              <button className="crm-btn primary">Save</button>
            </div>
          </div>

          <div className="record-grid">
            <div className="grid-section card">
              <h3>Summary</h3>
              <div className="field-group">
                <div className="field">
                  <label>Account Number</label>
                  <span>****4829</span>
                </div>
                <div className="field">
                  <label>Member Since</label>
                  <span>Oct 2018</span>
                </div>
                <div className="field">
                  <label>Primary Phone</label>
                  <span>(555) 012-3456</span>
                </div>
                <div className="field">
                  <label>Email</label>
                  <span>sarah.j@email.com</span>
                </div>
              </div>
            </div>

            <div className="grid-section card">
              <h3>Financial Overview</h3>
              <div className="field-group">
                <div className="field">
                  <label>Total Balance</label>
                  <span className="balance-high">$12,450.82</span>
                </div>
                <div className="field">
                  <label>Credit Score</label>
                  <span>742 (Excellent)</span>
                </div>
                <div className="field">
                  <label>Open Cases</label>
                  <span>1</span>
                </div>
              </div>
            </div>

            <div className="grid-section card wide">
              <h3>Recent Transactions</h3>
              <table className="crm-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>04/07/2026</td>
                    <td>Starbucks Coffee</td>
                    <td>Dining</td>
                    <td>-$6.45</td>
                  </tr>
                  <tr>
                    <td>04/06/2026</td>
                    <td>Amazon.com</td>
                    <td>Shopping</td>
                    <td>-$42.18</td>
                  </tr>
                  <tr>
                    <td>04/05/2026</td>
                    <td>Shell Oil</td>
                    <td>Transport</td>
                    <td>-$55.00</td>
                  </tr>
                  <tr>
                    <td>04/01/2026</td>
                    <td>Payroll Deposit</td>
                    <td>Income</td>
                    <td className="positive">+$3,200.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* Right Sidebar (Atlas Panel) */}
        <aside className="atlas-panel">
          <div className="atlas-top-section">
            <header className="atlas-section-header">
              <span className="sparkle">✨</span>
              {callState === 'active' ? 'Atlas Account Insights' : 'Atlas Call Summary'}
            </header>
            
            <div className="atlas-content">
              {callState === 'active' ? (
                <div className="active-insights">
                  <div className="insight-card ai-style">
                    <div className="insight-title">Churn Risk: High</div>
                    <p>Member had 3 failed login attempts yesterday and viewed the 'Wire Out' policy page. High frustration likely.</p>
                  </div>
                  <div className="insight-card ai-style">
                    <div className="insight-title">Opportunity</div>
                    <p>Pre-approved for an Auto Loan refinance. Current external rate is likely 2% higher.</p>
                  </div>
                  <div className="next-best-action ai-style">
                    <div className="action-label">Next Best Action: Script</div>
                    <p className="script-text">"Ask Sarah if she was able to resolve her login issues yesterday."</p>
                  </div>
                </div>
              ) : (
                <div className="wrap-up-content">
                  <div className="summary-card ai-style">
                    <div className="summary-item">
                      <strong>Call Reason:</strong> Disputed late fee on credit card.
                    </div>
                    <div className="summary-item">
                      <strong>Resolution:</strong> Fee reversed as a one-time courtesy.
                    </div>
                    <div className="summary-item">
                      <strong>Sentiment:</strong> Frustrated &rarr; Satisfied.
                    </div>
                  </div>
                  
                  <div className="action-items-card ai-style">
                    <div className="insight-title">Suggested Actions</div>
                    <label className="checkbox-item">
                      <input type="checkbox" defaultChecked />
                      <span>Create Case: "Late Fee Reversal" and auto-close.</span>
                    </label>
                    <label className="checkbox-item">
                      <input type="checkbox" defaultChecked />
                      <span>Send "Fee Reversal Confirmation" email to sarah.j@email.com.</span>
                    </label>
                  </div>

                  <div className="wrap-up-buttons">
                    <button className="crm-btn primary full-width">Approve & Save to CRM</button>
                    <button className="crm-btn secondary full-width">Edit Notes</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="atlas-bottom-section">
            <header className="atlas-section-header">
              <span className="chat-icon">💬</span> Persistent Knowledge Chat
            </header>
            <div className="atlas-chat-messages">
              <div className="message bot-small">
                How can I help you assist Sarah Jenkins?
              </div>
            </div>
            <div className="atlas-chat-input-container">
              <input 
                type="text" 
                placeholder="Ask Atlas..." 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button className="atlas-send-btn">
                <svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};
