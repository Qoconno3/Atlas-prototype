import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import type { Message } from './types';
import { BANKING_RESPONSES } from './responses';
import { KnowledgeOps } from './KnowledgeOps';

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    text: "I'm Atlas, your internal AI resource for Mountain America. I'm here to help you assist members with processes, products, and guidelines. How can I help you today?",
    sender: 'bot',
    timestamp: new Date(),
    source: 'kb'
  },
];

const RECENT_CHATS = [
  { id: 'atlas', name: 'Atlas', lastMsg: 'I\'m Atlas, your internal AI resource...', time: '10:45 AM', active: true, isBot: true },
  { id: '1', name: 'HR Benefits', lastMsg: 'The open enrollment period starts...', time: 'Yesterday', active: false },
  { id: '2', name: 'Mortgage Team', lastMsg: 'Sarah: Updated the rates for...', time: 'Monday', active: false },
  { id: '3', name: 'IT Support', lastMsg: 'Your ticket has been resolved...', time: 'Friday', active: false },
  { id: '4', name: 'General Branch Chat', lastMsg: 'Lunch is here!', time: '12:02 PM', active: false },
];

const FormattedText = ({ text }: { text: string }) => {
  // Simple markdown-ish formatter for bold and italics
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return (
    <div className="message-text">
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('*') && part.endsWith('*')) {
          return <em key={i}>{part.slice(1, -1)}</em>;
        }
        return part;
      })}
    </div>
  );
};

type ViewId = 'chat' | 'ops' | 'settings';

interface View {
  id: ViewId;
  name: string;
  icon: React.ReactNode;
}

function App() {
  const [currentView, setCurrentView] = useState<ViewId>('chat');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    (window as any).togglePrototypeMenu = () => setIsMenuOpen(prev => !prev);
    return () => { delete (window as any).togglePrototypeMenu; };
  }, []);

  // Chat-related state
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [searchStatus, setSearchStatus] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (currentView === 'chat') {
      scrollToBottom();
    }
  }, [messages, isTyping, searchStatus, currentView]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    simulateBotResponse();
  };

  const simulateBotResponse = (customText?: string, isConnect?: boolean) => {
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setSearchStatus("Searching Knowledge Base...");
        setTimeout(() => {
          if (isConnect) {
            setSearchStatus("✨ Routing to Atlas Connect...");
          } else {
            setSearchStatus("Accessing SharePoint documents...");
          }
          
          setTimeout(() => {
            if (!isConnect) setSearchStatus("Synthesizing internal guidelines...");
            
            setTimeout(() => {
              let botMessage: Message;
              
              if (customText) {
                botMessage = {
                  id: (Date.now() + 1).toString(),
                  text: customText,
                  sender: 'bot',
                  timestamp: new Date(),
                  source: isConnect ? 'atlas-connect' : 'kb'
                };
              } else {
                const randomResponse = BANKING_RESPONSES[Math.floor(Math.random() * BANKING_RESPONSES.length)];
                botMessage = {
                  id: (Date.now() + 1).toString(),
                  text: randomResponse.text,
                  sender: 'bot',
                  timestamp: new Date(),
                  citations: randomResponse.citations,
                  source: 'kb'
                };
              }
              
              setMessages((prev) => [...prev, botMessage]);
              setIsTyping(false);
              setSearchStatus(null);
            }, isConnect ? 3500 : 3000);
          }, 2500);
        }, 2000);
      }, 1500);
    }, 1000);
  };

  const runChatScenario = (id: number) => {
    if (id === 1) {
      const text = "I have a member with a complex commercial loan escalation, who do I transfer them to?";
      const userMessage: Message = { id: Date.now().toString(), text, sender: 'user', timestamp: new Date() };
      setMessages((prev) => [...prev, userMessage]);
      simulateBotResponse("For complex commercial loan escalations, you should contact the Commercial Underwriting Lead. The current Lead on rotation is **Sarah Chen**. Her direct transfer code is ***123** and her status is **🟢 Available (On-Shift)**.", true);
    } else {
      const text = "I have a weird case where a member claims their account was locked because their notary seal on a power of attorney was rejected, but they say the notary is a mobile service.";
      const userMessage: Message = { id: Date.now().toString(), text, sender: 'user', timestamp: new Date() };
      setMessages((prev) => [...prev, userMessage]);
      simulateBotResponse("This sounds like a nuanced verification issue. Based on those specific details, I recommend routing to the **Fraud and Verification Special Operations Team**. While the general Fraud line is ext. 500, they handle mobile notary discrepancies directly. The available analyst for POA verification is **Marcus Thompson**. His transfer code is ***582**.", true);
    }
  };

  const renderViewContent = () => {
    switch (currentView) {
      case 'chat':
        return (
          <>
            {/* Chat List Sidebar */}
            <aside className="chat-sidebar">
              <header className="sidebar-header">
                <div className="sidebar-title">
                  <h2>Chat</h2>
                  <div className="filter-icon">🔍</div>
                </div>
              </header>
              <div className="chat-list">
                {RECENT_CHATS.map(chat => (
                  <div key={chat.id} className={`chat-list-item ${chat.active ? 'active' : ''}`}>
                    <div className="chat-avatar" style={{ background: chat.isBot ? 'var(--macu-red)' : '#d1d8f5', overflow: 'hidden' }}>
                      {chat.isBot ? <img src="/ai-logo.png" alt="A" style={{ width: '100%', height: '100%' }} /> : chat.name[0]}
                    </div>
                    <div className="chat-info">
                      <div className="chat-name-row">
                        <span className="chat-name">{chat.name}</span>
                        <span className="chat-time">{chat.time}</span>
                      </div>
                      <div className="chat-preview">{chat.lastMsg}</div>
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="main-content">
              <header className="chat-header">
                <div className="header-left">
                  <div className="bot-avatar-header">
                    <img src="/ai-logo.png" alt="Atlas" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                  </div>
                  <div className="chat-title">
                    <h2>Atlas</h2>
                  </div>
                </div>
              </header>

              <section className="message-list">
                <div className="date-separator"><span>Today</span></div>
                {messages.map((msg) => (
                  <div key={msg.id} className={`message-row ${msg.sender}`}>
                    <div className="msg-avatar" style={{ background: msg.sender === 'bot' ? 'var(--macu-red)' : '#d1d8f5', overflow: 'hidden' }}>
                      {msg.sender === 'bot' ? <img src="/ai-logo.png" alt="A" style={{ width: '100%', height: '100%' }} /> : 'Q'}
                    </div>
                    <div className="msg-content-wrapper">
                      <div className="msg-header">
                        <span className="sender-name">{msg.sender === 'bot' ? 'Atlas' : "Quincy O'Connor"}</span>
                        <span className="msg-time">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div className="msg-bubble">
                        <FormattedText text={msg.text} />
                        {msg.citations && msg.citations.length > 0 && (
                          <div className="citations-container">
                            <div className="citations-label">Knowledge Sources</div>
                            <ul className="citations-list">
                              {msg.citations.map((cite, i) => (
                                <li key={i}>{cite}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {(isTyping || searchStatus) && (
                  <div className="message-row bot">
                    <div className="msg-avatar" style={{ background: 'var(--macu-red)', overflow: 'hidden' }}>
                      <img src="/ai-logo.png" alt="A" style={{ width: '100%', height: '100%' }} />
                    </div>
                    <div className="msg-content-wrapper">
                      <div className="msg-header">
                        <span className="sender-name">Atlas</span>
                      </div>
                      <div className="msg-bubble">
                        <div className="typing-container">
                          {searchStatus && <div className="search-status">{searchStatus}</div>}
                          <div className="typing-indicator">
                            <div className="typing-dot"></div>
                            <div className="typing-dot"></div>
                            <div className="typing-dot"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </section>

              <footer className="chat-input-area-wrapper">
                <div className="demo-scenarios-chat">
                  <span className="demo-label">Demo Scenarios:</span>
                  <button onClick={() => runChatScenario(1)}>Commercial Loan Escalation</button>
                  <button onClick={() => runChatScenario(2)}>Verification Discrepancy</button>
                </div>
                <form className="chat-input-area" onSubmit={handleSend}>
                  <textarea
                    className="chat-input"
                    placeholder="Ask Atlas about policies, processes, or finding an expert..."
                    rows={1}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSend();
                      }
                    }}
                  />
                  <button type="submit" className="send-button" disabled={!inputText.trim() || isTyping || !!searchStatus}>
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                  </button>
                </form>
              </footer>
            </main>
          </>
        );
      case 'ops':
        return <KnowledgeOps />;
      case 'settings':
        return (
          <div className="placeholder-view">
            <h1>Settings View</h1>
            <p>This is a placeholder for the settings view.</p>
          </div>
        );
    }
  };

  return (
    <div className="teams-layout">
      {/* Far Left Icon Bar - Only show in chat view or always show trigger */}
      {currentView === 'chat' && (
        <nav className="nav-rail">
          <div className="menu-trigger nav-item" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
          </div>

          {isMenuOpen && (
            <div className="prototype-menu">
              <div className="menu-header">Prototype Views</div>
              <div className={`menu-item ${currentView === 'chat' ? 'active' : ''}`} onClick={() => { setCurrentView('chat'); setIsMenuOpen(false); }}>
                Chat Interface
              </div>
              <div className={`menu-item ${currentView === 'ops' ? 'active' : ''}`} onClick={() => { setCurrentView('ops'); setIsMenuOpen(false); }}>
                Atlas Knowledge Hub
              </div>
              <div className={`menu-item ${currentView === 'settings' ? 'active' : ''}`} onClick={() => { setCurrentView('settings'); setIsMenuOpen(false); }}>
                Settings
              </div>
            </div>
          )}

          <div className="nav-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            <span>Activity</span>
          </div>
          <div className={`nav-item ${currentView === 'chat' ? 'active' : ''}`} onClick={() => setCurrentView('chat')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <span>Chat</span>
          </div>
          <div className="nav-item atlas-nav">
            <img src="/ai-logo-bw.png" alt="Atlas" />
            <span>Atlas</span>
          </div>
          <div className="nav-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            <span>Teams</span>
          </div>
          <div className="nav-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            <span>Calendar</span>
          </div>
          <div className="nav-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
            <span>Calls</span>
          </div>
          <div className="nav-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
            <span>Files</span>
          </div>
          <div className="nav-spacer"></div>
          <div className="nav-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <span>Apps</span>
          </div>
          <div className="nav-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            <span>Help</span>
          </div>
        </nav>
      )}

      {currentView !== 'chat' && isMenuOpen && (
        <div className="prototype-menu floating">
          <div className="menu-header">Prototype Views</div>
          <div className={`menu-item ${currentView === 'chat' ? 'active' : ''}`} onClick={() => { setCurrentView('chat'); setIsMenuOpen(false); }}>
            Chat Interface
          </div>
          <div className={`menu-item ${currentView === 'ops' ? 'active' : ''}`} onClick={() => { setCurrentView('ops'); setIsMenuOpen(false); }}>
            Atlas Knowledge Hub
          </div>
          <div className={`menu-item ${currentView === 'settings' ? 'active' : ''}`} onClick={() => { setCurrentView('settings'); setIsMenuOpen(false); }}>
            Settings
          </div>
        </div>
      )}

      {renderViewContent()}
    </div>
  );
}

export default App;
