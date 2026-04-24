import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import type { Message } from './types';
import { BANKING_RESPONSES } from './responses';
import { KnowledgeOps } from './KnowledgeOps';
import { DynamicsCRM } from './DynamicsCRM';

// In Vite, files in public/ can be accessed by absolute paths from the root
const atlasLogo = import.meta.env.BASE_URL + "ai-logo.png"; 

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    text: "I'm **Atlas**, your internal AI resource for Mountain America.\n\nI'm here to help you assist members with processes, products, and guidelines. How can I help you today?",
    sender: 'bot',
    timestamp: new Date(),
    source: 'kb'
  },
];

const FormattedText = ({ text }: { text: string }) => {
  const lines = text.split('\n');
  
  return (
    <div className="message-text">
      {lines.map((line, i) => {
        if (line.trim() === '') return <div key={i} className="text-line-spacer" />;
        
        const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-');
        const isNumbered = /^\d+[\)\.]/.test(line.trim());
        
        const content = line.split(/(\*\*.*?\*\*|\*.*?\*)/g).map((part, j) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={j}>{part.slice(2, -2)}</strong>;
          }
          if (part.startsWith('*') && part.endsWith('*')) {
            return <em key={i + '-' + j}>{part.slice(1, -1)}</em>;
          }
          return part;
        });

        return (
          <div key={i} className={`text-line ${isBullet ? 'bullet-line' : ''} ${isNumbered ? 'numbered-line' : ''}`}>
            {content}
          </div>
        );
      })}
    </div>
  );
};

type ViewId = 'chat' | 'ops' | 'dynamics';

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
  const [isUploading, setIsUploading] = useState(false);
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

  const simulateBotResponse = (customText?: string, isOperator?: boolean) => {
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setSearchStatus("Searching Knowledge Base...");
        setTimeout(() => {
          if (isOperator) {
            setSearchStatus("✨ Routing to Operator...");
          } else {
            setSearchStatus("Accessing SharePoint documents...");
          }
          
          setTimeout(() => {
            if (!isOperator) setSearchStatus("Synthesizing internal guidelines...");
            
            setTimeout(() => {
              let botMessage: Message;
              
              if (customText) {
                botMessage = {
                  id: (Date.now() + 1).toString(),
                  text: customText,
                  sender: 'bot',
                  timestamp: new Date(),
                  source: isOperator ? 'operator' : 'kb'
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
            }, isOperator ? 3500 : 3000);
          }, 2500);
        }, 2000);
      }, 1500);
    }, 1000);
  };

  const runChatScenario = (id: number) => {
    let text = "";
    if (id === 1) text = "I have a member with a complex commercial loan escalation, who do I transfer them to?";
    else if (id === 2) text = "I have a weird case where a member claims their account was locked because their notary seal on a power of attorney was rejected, but they say the notary is a mobile service.";
    else if (id === 3) text = "tell me about Bryan Rhodes team";
    else if (id === 4) text = "can you review this power of attorney document";
    
    const userMessage: Message = { id: Date.now().toString(), text, sender: 'user', timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    
    if (id === 1) {
      simulateBotResponse("For complex commercial loan escalations, you should contact the Commercial Underwriting Lead:\n\n• **Lead on rotation**: Sarah Chen\n• **Transfer Code**: *123\n• **Status**: 🟢 Available (On-Shift)", true);
    } else if (id === 2) {
      simulateBotResponse("This sounds like a nuanced verification issue. Based on those specific details, I recommend routing to the **Fraud and Verification Special Operations Team**.\n\nWhile the general Fraud line is ext. 500, they handle mobile notary discrepancies directly.\n\n• **Available Analyst**: Marcus Thompson\n• **Transfer Code**: *582", true);
    } else if (id === 3) {
      simulateBotResponse("Bryan Rhodes manages the following Product Management team:\n\n• **Quincy O'Connor**, Senior PM\n• **Jessica Alba**, Senior PM\n• **Jeff White**, PM Manager\n• **Ben Macey**, Director of PM", true);
    } else if (id === 4) {
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: "Yes, I can certainly help with that. Please upload the document you'd like me to review.",
            sender: 'bot',
            timestamp: new Date(),
            source: 'kb'
          };
          setMessages((prev) => [...prev, botMessage]);
          setIsTyping(false);

          // Simulate user "uploading" after a short pause
          setTimeout(() => {
            setIsUploading(true);
            setTimeout(() => {
              setIsUploading(false);
              const uploadMsg: Message = {
                id: (Date.now() + 2).toString(),
                text: "📄 Jenkins_POA_Draft.pdf",
                sender: 'user',
                timestamp: new Date(),
              };
              setMessages((prev) => [...prev, uploadMsg]);

              // Now Atlas reviews with longer latency
              setTimeout(() => {
                setIsTyping(true);
                setSearchStatus("Analyzing document structure...");
                setTimeout(() => {
                  setSearchStatus("Verifying notary acknowledgment...");
                  setTimeout(() => {
                    setSearchStatus("Checking for signature completeness...");
                    setTimeout(() => {
                      const finalResponse: Message = {
                        id: (Date.now() + 3).toString(),
                        text: "I have reviewed the Power of Attorney document for **Sarah Jenkins**. The document appears to be correctly executed, including the required notary acknowledgment and signatures. You are clear to proceed with the account update.",
                        sender: 'bot',
                        timestamp: new Date(),
                        source: 'kb'
                      };
                      setMessages((prev) => [...prev, finalResponse]);
                      setIsTyping(false);
                      setSearchStatus(null);
                    }, 4000);
                  }, 3000);
                }, 3000);
              }, 1500);
            }, 3000);
          }, 2000);
        }, 1500);
      }, 1000);
    }
  };

  const renderViewContent = () => {
    switch (currentView) {
      case 'chat':
        return (
          <>
            {/* Main Content Area */}
            <main className="main-content chat-only-view">
              <header className="chat-header">
                <div className="header-left">
                  <div className="menu-trigger-header" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                  </div>
                  
                  {isMenuOpen && renderPrototypeMenu()}

                  <div className="bot-avatar-header">
                    <img src={atlasLogo} alt="Atlas" />
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
                    <div className="msg-avatar" style={{ background: msg.sender === 'bot' ? 'var(--macu-red)' : '#d1d8f5' }}>
                      {msg.sender === 'bot' ? <img src={atlasLogo} alt="A" /> : 'Q'}
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
                    <div className="msg-avatar" style={{ background: 'var(--macu-red)' }}>
                      <img src={atlasLogo} alt="A" />
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
                  <button onClick={() => runChatScenario(1)}>Commercial Loan</button>
                  <button onClick={() => runChatScenario(2)}>Verification</button>
                  <button onClick={() => runChatScenario(3)}>Who Am I?</button>
                  <button onClick={() => runChatScenario(4)}>Review POA</button>
                </div>
                {isUploading && (
                  <div className="upload-status-indicator">
                    <div className="upload-spinner"></div>
                    Uploading Jenkins_POA_Draft.pdf...
                  </div>
                )}
                <form className="chat-input-area" onSubmit={handleSend}>
                  <textarea
                    className="chat-input"
                    placeholder="Type a message"
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
      case 'dynamics':
        return <DynamicsCRM />;
    }
  };

  const renderPrototypeMenu = () => (
    <div className={`prototype-menu ${currentView !== 'chat' ? 'floating' : ''}`}>
      <div className="menu-header">Prototype Views</div>
      <div className={`menu-item ${currentView === 'chat' ? 'active' : ''}`} onClick={() => { setCurrentView('chat'); setIsMenuOpen(false); }}>
        Chat Interface
      </div>
      <div className={`menu-item ${currentView === 'ops' ? 'active' : ''}`} onClick={() => { setCurrentView('ops'); setIsMenuOpen(false); }}>
        Atlas Knowledge Hub
      </div>
      <div className={`menu-item ${currentView === 'dynamics' ? 'active' : ''}`} onClick={() => { setCurrentView('dynamics'); setIsMenuOpen(false); }}>
        CRM
      </div>
    </div>
  );

  return (
    <div className="teams-layout">
      {currentView !== 'chat' && isMenuOpen && renderPrototypeMenu()}

      {renderViewContent()}
    </div>
  );
}

export default App;
