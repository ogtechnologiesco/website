import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../partials/Footer';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import HelpDeskForm from '../partials/Tickets';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useAuth } from '../hooks/useAuth';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBFile
} from 'mdb-react-ui-kit';

// Sample ticket data for authenticated dashboard
const sampleTickets = [
  { id: 1, subject: 'Cannot access dashboard', requester: 'john@example.com', company: 'Acme Corp', priority: 'high', status: 'open', category: 'Technical', assigned: 'Agent 1', created: '2 hours ago', updated: '30 min ago', sla: '4h', slaStatus: 'on_track' },
  { id: 2, subject: 'Billing question', requester: 'jane@techcorp.com', company: 'TechCorp', priority: 'medium', status: 'pending', category: 'Billing', assigned: 'Agent 2', created: '1 day ago', updated: '2 hours ago', sla: '8h', slaStatus: 'on_track' },
  { id: 3, subject: 'Feature request: API access', requester: 'mike@startup.io', company: 'Startup Inc', priority: 'low', status: 'new', category: 'Feature Request', assigned: 'Unassigned', created: '3 hours ago', updated: '3 hours ago', sla: '24h', slaStatus: 'on_track' },
  { id: 4, subject: 'Integration issue with CRM', requester: 'sarah@bigcorp.com', company: 'BigCorp', priority: 'high', status: 'in_progress', category: 'Technical', assigned: 'Agent 1', created: '5 hours ago', updated: '1 hour ago', sla: '4h', slaStatus: 'at_risk' },
  { id: 5, subject: 'Password reset not working', requester: 'david@smallbiz.com', company: 'SmallBiz', priority: 'medium', status: 'solved', category: 'Technical', assigned: 'Agent 3', created: '1 day ago', updated: '4 hours ago', sla: '8h', slaStatus: 'breached' },
  { id: 6, subject: 'How to export data?', requester: 'lisa@enterprise.com', company: 'Enterprise Ltd', priority: 'low', status: 'closed', category: 'Question', assigned: 'Agent 2', created: '3 days ago', updated: '1 day ago', sla: '24h', slaStatus: 'met' }
];

const statusColors = {
  new: 'bg-blue-600',
  open: 'bg-yellow-600',
  pending: 'bg-orange-600',
  in_progress: 'bg-purple-600',
  solved: 'bg-green-600',
  closed: 'bg-gray-600'
};

const priorityColors = {
  low: 'text-green-400',
  medium: 'text-yellow-400',
  high: 'text-red-400',
  urgent: 'text-red-600 font-bold'
};

const slaStatusColors = {
  on_track: 'bg-green-500',
  at_risk: 'bg-yellow-500',
  breached: 'bg-red-500',
  met: 'bg-blue-500'
};

// OG Helpdesk Dashboard for authenticated users
function HelpdeskDashboard() {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState(sampleTickets);
  const [filteredTickets, setFilteredTickets] = useState(sampleTickets);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [activeView, setActiveView] = useState('dashboard');

  // Calculate stats
  const stats = {
    total: tickets.length,
    open: tickets.filter(t => ['new', 'open', 'pending', 'in_progress'].includes(t.status)).length,
    solved: tickets.filter(t => t.status === 'solved').length,
    highPriority: tickets.filter(t => t.priority === 'high' || t.priority === 'urgent').length,
    slaBreaches: tickets.filter(t => t.slaStatus === 'breached').length,
    avgResponseTime: '2.3h'
  };

  // Filter tickets
  useEffect(() => {
    let filtered = tickets;
    
    if (searchTerm) {
      filtered = filtered.filter(ticket => 
        ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.requester.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.status === statusFilter);
    }
    
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(ticket => ticket.priority === priorityFilter);
    }
    
    setFilteredTickets(filtered);
  }, [tickets, searchTerm, statusFilter, priorityFilter]);

  const handleNewTicket = (ticketData) => {
    const newTicket = {
      ...ticketData,
      id: Math.max(...tickets.map(t => t.id), 0) + 1,
      status: 'new',
      assigned: 'Unassigned',
      created: 'Just now',
      updated: 'Just now',
      sla: ticketData.priority === 'urgent' ? '1h' : ticketData.priority === 'high' ? '4h' : ticketData.priority === 'medium' ? '8h' : '24h',
      slaStatus: 'on_track'
    };
    setTickets([newTicket, ...tickets]);
    setShowNewTicketModal(false);
  };

  const toggleTicketSelection = (id) => {
    setSelectedTickets(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-gray-900">
      <Header />
      
      <main className="grow">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <PageIllustration />
          
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
              <div>
                <h1 className="h1 mb-2">OG Helpdesk</h1>
                <p className="text-xl text-gray-400">AI-powered ticket management system</p>
              </div>
              <div className="mt-4 md:mt-0 flex gap-3">
                <div className="flex bg-gray-800 rounded-md p-1">
                  <button
                    onClick={() => setActiveView('dashboard')}
                    className={`px-4 py-2 rounded-md font-medium transition duration-150 ease-in-out ${
                      activeView === 'dashboard' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => setActiveView('kanban')}
                    className={`px-4 py-2 rounded-md font-medium transition duration-150 ease-in-out ${
                      activeView === 'kanban' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Kanban
                  </button>
                  <button
                    onClick={() => setActiveView('knowledge')}
                    className={`px-4 py-2 rounded-md font-medium transition duration-150 ease-in-out ${
                      activeView === 'knowledge' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Knowledge
                  </button>
                </div>
                <button
                  onClick={() => setShowNewTicketModal(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-semibold transition duration-150 ease-in-out flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                  New Ticket
                </button>
              </div>
            </div>

            {activeView === 'dashboard' && (
              <>
                {/* Stats Overview */}
                <div className="grid md:grid-cols-6 gap-4 mb-8">
                  <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 rounded-lg p-4 border border-blue-500/30">
                    <p className="text-gray-400 text-sm">Total Tickets</p>
                    <p className="text-2xl font-bold text-white">{stats.total}</p>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-900/50 to-yellow-800/30 rounded-lg p-4 border border-yellow-500/30">
                    <p className="text-gray-400 text-sm">Open</p>
                    <p className="text-2xl font-bold text-white">{stats.open}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-900/50 to-green-800/30 rounded-lg p-4 border border-green-500/30">
                    <p className="text-gray-400 text-sm">Solved</p>
                    <p className="text-2xl font-bold text-white">{stats.solved}</p>
                  </div>
                  <div className="bg-gradient-to-br from-red-900/50 to-red-800/30 rounded-lg p-4 border border-red-500/30">
                    <p className="text-gray-400 text-sm">High Priority</p>
                    <p className="text-2xl font-bold text-white">{stats.highPriority}</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-900/50 to-orange-800/30 rounded-lg p-4 border border-orange-500/30">
                    <p className="text-gray-400 text-sm">SLA Breaches</p>
                    <p className="text-2xl font-bold text-white">{stats.slaBreaches}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 rounded-lg p-4 border border-purple-500/30">
                    <p className="text-gray-400 text-sm">Avg Response</p>
                    <p className="text-2xl font-bold text-white">{stats.avgResponseTime}</p>
                  </div>
                </div>

                {/* AI Suggestions Banner */}
                <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-lg p-4 mb-6 border border-purple-500/30">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-semibold">AI Smart Routing Active</h3>
                      <p className="text-gray-400 text-sm">3 tickets auto-assigned based on expertise matching • 2 potential duplicate tickets detected</p>
                    </div>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm transition duration-150 ease-in-out">
                      Review
                    </button>
                  </div>
                </div>

                {/* Filters */}
                <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Search tickets..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-700 text-white px-4 py-3 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                    <div className="flex gap-3">
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-gray-700 text-white px-4 py-3 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
                      >
                        <option value="all">All Status</option>
                        <option value="new">New</option>
                        <option value="open">Open</option>
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="solved">Solved</option>
                        <option value="closed">Closed</option>
                      </select>
                      <select
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        className="bg-gray-700 text-white px-4 py-3 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none"
                      >
                        <option value="all">All Priorities</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                      <button
                        onClick={() => {setSearchTerm(''); setStatusFilter('all'); setPriorityFilter('all');}}
                        className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-md transition duration-150 ease-in-out"
                      >
                        Clear
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tickets Table */}
                <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="p-4 text-left text-gray-300 font-semibold">Ticket</th>
                        <th className="p-4 text-left text-gray-300 font-semibold">Requester</th>
                        <th className="p-4 text-left text-gray-300 font-semibold">Status</th>
                        <th className="p-4 text-left text-gray-300 font-semibold">Priority</th>
                        <th className="p-4 text-left text-gray-300 font-semibold">SLA</th>
                        <th className="p-4 text-left text-gray-300 font-semibold">Assigned</th>
                        <th className="p-4 text-left text-gray-300 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {filteredTickets.map((ticket) => (
                        <tr key={ticket.id} className="hover:bg-gray-700/50">
                          <td className="p-4">
                            <div>
                              <Link to={`/helpdesk/ticket/${ticket.id}`} className="text-purple-400 hover:text-purple-300 font-medium">
                                #{ticket.id}: {ticket.subject}
                              </Link>
                              <p className="text-gray-500 text-sm">{ticket.company}</p>
                            </div>
                          </td>
                          <td className="p-4 text-white">{ticket.requester}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${statusColors[ticket.status]}`}>
                              {ticket.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className={`font-semibold ${priorityColors[ticket.priority]}`}>
                              {ticket.priority}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center">
                              <div className={`w-2 h-2 rounded-full mr-2 ${slaStatusColors[ticket.slaStatus]}`}></div>
                              <span className="text-gray-400 text-sm">{ticket.sla}</span>
                            </div>
                          </td>
                          <td className="p-4 text-gray-400">{ticket.assigned}</td>
                          <td className="p-4">
                            <button className="text-blue-400 hover:text-blue-300 p-2 rounded-md hover:bg-blue-600/20 transition duration-150 ease-in-out">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {activeView === 'kanban' && (
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {['new', 'open', 'in_progress', 'pending', 'solved', 'closed'].map((status) => {
                  const statusConfig = {
                    new: { name: 'New', color: 'blue' },
                    open: { name: 'Open', color: 'yellow' },
                    in_progress: { name: 'In Progress', color: 'purple' },
                    pending: { name: 'Pending', color: 'orange' },
                    solved: { name: 'Solved', color: 'green' },
                    closed: { name: 'Closed', color: 'gray' }
                  };
                  const config = statusConfig[status];
                  const statusTickets = filteredTickets.filter(t => t.status === status);
                  
                  return (
                    <div key={status} className={`bg-${config.color}-900/20 rounded-lg border border-${config.color}-500/30 min-h-[500px]`}>
                      <div className={`p-4 border-b border-${config.color}-500/30 bg-${config.color}-900/30`}>
                        <div className="flex justify-between items-center">
                          <h3 className={`font-semibold text-${config.color}-300`}>{config.name}</h3>
                          <span className={`text-${config.color}-300 text-sm`}>{statusTickets.length}</span>
                        </div>
                      </div>
                      <div className="p-3 space-y-3">
                        {statusTickets.map((ticket) => (
                          <div key={ticket.id} className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-gray-400 text-xs">#{ticket.id}</span>
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                                ticket.priority === 'high' ? 'bg-red-600 text-white' :
                                ticket.priority === 'medium' ? 'bg-yellow-600 text-white' :
                                'bg-gray-600 text-gray-300'
                              }`}>
                                {ticket.priority}
                              </span>
                            </div>
                            <h4 className="text-white font-medium text-sm mb-2">{ticket.subject}</h4>
                            <p className="text-gray-400 text-xs mb-2">{ticket.company}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {activeView === 'knowledge' && (
              <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                <h2 className="text-xl font-semibold text-white mb-4">Knowledge Base</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-900/30 rounded-lg p-4 border border-blue-500/30">
                    <h3 className="text-blue-300 font-semibold mb-2">CRM Documentation</h3>
                    <p className="text-gray-400 text-sm">Guides for using OG CRM features</p>
                  </div>
                  <div className="bg-green-900/30 rounded-lg p-4 border border-green-500/30">
                    <h3 className="text-green-300 font-semibold mb-2">Helpdesk Guides</h3>
                    <p className="text-gray-400 text-sm">Ticket management and SLA setup</p>
                  </div>
                  <div className="bg-purple-900/30 rounded-lg p-4 border border-purple-500/30">
                    <h3 className="text-purple-300 font-semibold mb-2">API Reference</h3>
                    <p className="text-gray-400 text-sm">Developer documentation and SDKs</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* New Ticket Modal */}
      {showNewTicketModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-lg border border-gray-700 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Create New Ticket</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              handleNewTicket({
                subject: formData.get('subject'),
                requester: formData.get('requester'),
                company: formData.get('company'),
                priority: formData.get('priority'),
                category: formData.get('category'),
                description: formData.get('description')
              });
            }} className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">Subject</label>
                <input name="subject" type="text" required className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Requester Email</label>
                  <input name="requester" type="email" required className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Company</label>
                  <input name="company" type="text" className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Priority</label>
                  <select name="priority" className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-400 text-sm mb-1">Category</label>
                  <select name="category" className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none">
                    <option value="Technical">Technical</option>
                    <option value="Billing">Billing</option>
                    <option value="Feature Request">Feature Request</option>
                    <option value="Question">Question</option>
                    <option value="Bug Report">Bug Report</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Description</label>
                <textarea name="description" rows={4} className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none resize-none"></textarea>
              </div>
              <div className="flex gap-3 mt-6">
                <button type="button" onClick={() => setShowNewTicketModal(false)} className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-md transition duration-150 ease-in-out">Cancel</button>
                <button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-md transition duration-150 ease-in-out">Create Ticket</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Public Helpdesk View for logged out users
function PublicHelpdesk() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <Header />

      <main className="grow">
        <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
          <PageIllustration />
        </div>

        <section className="relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">

              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1"> Help Desk </h1>
              </div>

              
              <div className="max-w-XL mx-auto">
                <Container disableGutters maxWidth="xl" component="main" sx={{ pt: 1, pb: 6 }}>

                  <Typography textAlignLast='right' textAlign="left" variant="h5" align="justify" color="white" component="p">


                    Welcome to OG Technologies EU's Help Desk! We're here to assist you with any IT-related issues or inquiries you may have. Our dedicated team is committed to providing you with prompt and reliable support to ensure your business operations run smoothly.<br />

                    Whether you need technical assistance, have questions about our services, or require troubleshooting, we're here to help.<br />
                    <br />
                    <br />
                    <div >
                      <h3 className="h3"> How can we assist you today? </h3>
                    </div>
                    <br />
                    <br />
                    <HelpDeskForm />
                    <br />
                    <br />
                    <Typography textAlignLast='right' textAlign="left" variant="h5" align="justify" color="white" component="p" >
                      For any urgent inquiries, please contact us at hi@ogtechnologies.co <br></br>
                      We're here to help you overcome any challenges and ensure your business success!
                    </Typography>
                  </Typography>
                </Container>
              </div>

            </div>
          </div>
        </section>

      </main>
     
      <Footer />


    </div>
  );
}

// Main Helpdesk Component - Shows Dashboard for authenticated users, Public view for guests
function HelpDesk() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <HelpdeskDashboard />;
  }

  return <PublicHelpdesk />;
}

export default HelpDesk;
