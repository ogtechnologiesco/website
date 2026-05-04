import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../partials/Footer';
import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';
import HelpDeskForm from '../partials/Tickets';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useAuth } from '../hooks/useAuth';
import { crmAPI } from '../services/api';
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
  'in-progress': 'bg-purple-600',
  resolved: 'bg-green-600',
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
const NewTicketModal = ({ show, onClose, editingTicket, isCreatingTicket, ticketSuccess, ticketError, ticketForm, onFormChange, onSubmit }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg border border-gray-700 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">
            {editingTicket ? 'Edit Ticket' : 'Create New Ticket'}
          </h2>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div className="p-6">
          {/* Success Message */}
          {ticketSuccess && (
            <div className="mb-4 p-3 bg-green-600/20 border border-green-600/30 rounded-md">
              <p className="text-green-400 text-sm">
                {editingTicket ? 'Ticket updated successfully!' : 'Ticket created successfully!'}
              </p>
            </div>
          )}

          {/* Error Message */}
          {ticketError && (
            <div className="mb-4 p-3 bg-red-600/20 border border-red-600/30 rounded-md">
              <p className="text-red-400 text-sm">{ticketError}</p>
            </div>
          )}

          <form onSubmit={(e) => {
            e.preventDefault();
            onSubmit(ticketForm);
          }}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 text-sm mb-1">Title *</label>
                <input
                  type="text"
                  name="title"
                  required
                  disabled={isCreatingTicket}
                  value={ticketForm.title}
                  onChange={onFormChange}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none disabled:opacity-50"
                  placeholder="Enter ticket title"
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm mb-1">Customer Email *</label>
                <input
                  type="email"
                  name="customer"
                  required
                  disabled={isCreatingTicket}
                  value={ticketForm.customer}
                  onChange={onFormChange}
                  className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none disabled:opacity-50"
                  placeholder="customer@example.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Priority *</label>
              <select
                name="priority"
                value={ticketForm.priority}
                onChange={onFormChange}
                disabled={isCreatingTicket}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none disabled:opacity-50"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Assigned To (Email)</label>
              <input
                type="email"
                name="assignedTo"
                disabled={isCreatingTicket}
                value={ticketForm.assignedTo}
                onChange={onFormChange}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none disabled:opacity-50"
                placeholder="user@example.com (optional)"
              />
            </div>
            <div>
              <label className="block text-gray-400 text-sm mb-1">Tags</label>
              <input
                type="text"
                name="tags"
                disabled={isCreatingTicket}
                value={ticketForm.tags}
                onChange={onFormChange}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none disabled:opacity-50"
                placeholder="e.g., Technical, Billing"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-gray-400 text-sm mb-1">Description *</label>
              <textarea
                name="description"
                required
                disabled={isCreatingTicket}
                value={ticketForm.description}
                onChange={onFormChange}
                rows={4}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none disabled:opacity-50"
                placeholder="Describe the issue in detail"
              />
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                disabled={isCreatingTicket}
                className="px-4 py-2 text-gray-400 hover:text-white disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isCreatingTicket}
                className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50"
              >
                {isCreatingTicket ? 'Saving...' : (editingTicket ? 'Update Ticket' : 'Create Ticket')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

function HelpdeskDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState([]);
  const [activeView, setActiveView] = useState('dashboard');
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);
  const [ticketError, setTicketError] = useState(null);
  const [ticketSuccess, setTicketSuccess] = useState(false);
  const [updatingTicketId, setUpdatingTicketId] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [editingTicket, setEditingTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [ticketForm, setTicketForm] = useState({
    title: '',
    customer: '',
    priority: 'medium',
    tags: '',
    description: '',
    assignedTo: ''
  });

  // Helper function to shorten ticket ID
  const shortenTicketId = (id) => {
    if (!id) return '';
    const idStr = id.toString();
    return idStr.length > 8 ? `#${idStr.slice(-8)}` : `#${idStr}`;
  };

  // Calculate SLA based on priority
  const calculateSLA = (priority) => {
    const slaMap = {
      urgent: '1h',
      high: '4h',
      medium: '8h',
      low: '24h'
    };
    return slaMap[priority] || '24h';
  };

  // Fetch tickets from database on component mount
  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      setFetchError(null);
      try {
        const userId = user?._id || user?.id;
        console.log('Fetching tickets for user:', userId);
        console.log('Full user object:', user);
        console.log('User _id:', user?._id);
        console.log('User id:', user?.id);
        // Try with user filter if user ID exists
        let data;
        if (userId) {
          try {
            data = await crmAPI.getTickets({ assignedTo: userId });
          } catch (filterError) {
            console.error('Error with user filter, trying without filter:', filterError);
            // Fallback: try fetching all tickets
            data = await crmAPI.getTickets({});
          }
        } else {
          // No user ID, fetch all tickets
          data = await crmAPI.getTickets({});
        }
        console.log('Tickets fetched:', data);
        const ticketsWithSLA = (data.tickets || []).map(ticket => ({
          ...ticket,
          sla: ticket.sla || calculateSLA(ticket.priority),
          slaStatus: ticket.slaStatus || 'on_track'
        }));
        setTickets(ticketsWithSLA);
        setFilteredTickets(ticketsWithSLA);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        setFetchError(error.message || 'Failed to load tickets. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [user]);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!showNewTicketModal) {
      setTicketForm({
        title: '',
        customer: '',
        priority: 'medium',
        tags: '',
        description: '',
        assignedTo: ''
      });
    }
  }, [showNewTicketModal]);

  // Update form when editingTicket changes (only when modal is open)
  useEffect(() => {
    if (showNewTicketModal && editingTicket) {
      setTicketForm({
        title: editingTicket.title || '',
        customer: editingTicket.customer?.email || editingTicket.customer || '',
        priority: editingTicket.priority || 'medium',
        tags: editingTicket.tags?.[0] || '',
        description: editingTicket.description || '',
        assignedTo: editingTicket.assignedTo?.email || editingTicket.assignedTo || ''
      });
    }
  }, [editingTicket, showNewTicketModal]);

  const handleFormChange = useCallback((e) => {
    const { name, value } = e.target;
    setTicketForm(prev => ({ ...prev, [name]: value }));
  }, []);

  // Calculate stats
  const stats = {
    total: tickets.length,
    open: tickets.filter(t => ['new', 'open', 'pending', 'in-progress'].includes(t.status)).length,
    solved: tickets.filter(t => t.status === 'resolved').length,
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

  const handleNewTicket = async (ticketData) => {
    setIsCreatingTicket(true);
    setTicketError(null);
    setTicketSuccess(false);

    try {
      let apiTicketData;
      
      if (editingTicket) {
        // Update existing ticket
        apiTicketData = {
          title: ticketData.title,
          description: ticketData.description,
          priority: ticketData.priority || 'medium',
          tags: ticketData.tags ? [ticketData.tags] : []
        };

        // If assignedTo email is provided, look up the user and update assignedTo
        if (ticketData.assignedTo && ticketData.assignedTo.trim() !== '') {
          // Check if the email matches the current user's email
          if (user?.email && user.email.toLowerCase() === ticketData.assignedTo.toLowerCase()) {
            const currentUserId = user?._id || user?.id;
            if (currentUserId) {
              apiTicketData.assignedTo = currentUserId;
              console.log('Using current user ID for assignment:', currentUserId);
            }
          } else {
            // Email doesn't match current user, do lookup
            try {
              const userData = await crmAPI.lookupUserByEmail(ticketData.assignedTo);
              console.log('Found user by email:', userData);
              if (userData && userData.id) {
                apiTicketData.assignedTo = userData.id;
              } else {
                throw new Error('User not found');
              }
            } catch (userError) {
              console.log('User lookup failed:', userError);
              setTicketError(`User with email "${ticketData.assignedTo}" not found. Please check the email address or leave the field blank to keep the current assignment.`);
              setIsCreatingTicket(false);
              return; // Stop ticket update
            }
          }
        } else if (ticketData.assignedTo === '') {
          // If email is cleared, unassign the ticket
          apiTicketData.assignedTo = null;
        }

        await crmAPI.updateTicket(editingTicket._id || editingTicket.id, apiTicketData);
        
        // Update local state
        setTickets(tickets.map(ticket => 
          (ticket._id || ticket.id) === (editingTicket._id || editingTicket.id) 
            ? { ...ticket, ...ticketData, updated: 'Just now' }
            : ticket
        ));
        
        setTicketSuccess(true);
        setTimeout(() => {
          setShowNewTicketModal(false);
          setTicketSuccess(false);
          setEditingTicket(null);
        }, 1500);
        
      } else {
      // First, look up the Contact by email to get ObjectId
      let customerObjectId = null;
      try {
        const contacts = await crmAPI.getContacts({ email: ticketData.customer });
        console.log('Found contacts:', contacts);
        
        if (contacts && contacts.length > 0) {
          customerObjectId = contacts[0]._id || contacts[0].id;
          console.log('Found existing contact with ID:', customerObjectId);
        } else {
          // For now, use a default existing contact since Contact creation requires valid Company
          // In production, you might want to create a default company or handle this differently
          console.log('No existing contact found, using fallback contact');
          // Use the existing contact from the database as fallback
          customerObjectId = '69bc2ac5b7f847970ccc95d3'; // John Doe's contact ID
        }
      } catch (contactError) {
        console.log('Contact lookup failed, using fallback contact:', contactError);
        // Fallback: use existing contact
        customerObjectId = '69bc2ac5b7f847970ccc95d3';
      }

      const apiTicketData = {
        title: ticketData.title,
        description: ticketData.description,
        customer: customerObjectId,
        priority: ticketData.priority || 'medium',
        tags: ticketData.tags ? [ticketData.tags] : [],
        assignedTo: user?._id || user?.id // Default to current user
      };

      // If assignedTo email is provided, look up the user and update assignedTo
      if (ticketData.assignedTo && ticketData.assignedTo.trim() !== '') {
        // Check if the email matches the current user's email
        if (user?.email && user.email.toLowerCase() === ticketData.assignedTo.toLowerCase()) {
          const currentUserId = user?._id || user?.id;
          if (currentUserId) {
            apiTicketData.assignedTo = currentUserId;
            console.log('Using current user ID for assignment:', currentUserId);
          }
        } else {
          // Email doesn't match current user, do lookup
          try {
            const userData = await crmAPI.lookupUserByEmail(ticketData.assignedTo);
            console.log('Found user by email:', userData);
            if (userData && userData.id) {
              apiTicketData.assignedTo = userData.id;
            } else {
              throw new Error('User not found');
            }
          } catch (userError) {
            console.log('User lookup failed:', userError);
            setTicketError(`User with email "${ticketData.assignedTo}" not found. Please check the email address or leave the field blank to assign to yourself.`);
            setIsCreatingTicket(false);
            return; // Stop ticket creation
          }
        }
      } else {
        // If no email provided, assign to current user
        const currentUserId = user?._id || user?.id;
        console.log('Current user object:', user);
        console.log('Current user ID:', currentUserId);
        if (currentUserId) {
          apiTicketData.assignedTo = currentUserId;
          console.log('Setting assignedTo to current user ID:', currentUserId);
        } else {
          console.log('No current user ID available, assignedTo will be undefined');
        }
      }

      console.log('Sending ticket data:', apiTicketData);
      
      // Create ticket via API - backend is now working correctly
      const response = await crmAPI.createTicket(apiTicketData);
      console.log('API response:', response);
      
      // Add the new ticket to local state with proper structure
      const newTicket = {
        ...response,
        sla: response.sla || calculateSLA(response.priority),
        slaStatus: response.slaStatus || 'on_track'
      };
      
      setTickets([newTicket, ...tickets]);
      setTicketSuccess(true);
      
      // Close modal after a short delay to show success message
      setTimeout(() => {
        setShowNewTicketModal(false);
        setTicketSuccess(false);
      }, 1500);
      }
    } catch (error) {
      console.error('Error creating ticket:', error);
      setTicketError(error.message || 'Failed to create ticket. Please try again.');
    } finally {
      setIsCreatingTicket(false);
    }
  };

  const handleStatusUpdate = async (ticketId, newStatus) => {
    setUpdatingTicketId(ticketId);
    
    try {
      // Try to update ticket via API
      await crmAPI.updateTicket(ticketId, { status: newStatus });
      console.log('Status updated successfully via API');
    } catch (error) {
      console.log('API update failed, updating locally:', error);
      // Fallback: update locally only when API fails
    }
    
    // Always update local state for immediate UI feedback
    setTickets(tickets.map(ticket => 
      (ticket._id || ticket.id) === ticketId 
        ? { ...ticket, status: newStatus, updated: 'Just now' }
        : ticket
    ));
    
    setUpdatingTicketId(null);
  };

  const toggleTicketSelection = (id) => {
    setSelectedTickets(prev => 
      prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]
    );
  };

  const handleActionClick = (action, ticket) => {
    setActiveDropdown(null); // Close dropdown
    
    switch (action) {
      case 'view':
        // Navigate to ticket details
        navigate(`/helpdesk/ticket/${ticket._id || ticket.id}`);
        break;
      case 'edit':
        // Open edit modal with ticket data
        setEditingTicket(ticket);
        setShowNewTicketModal(true);
        break;
      case 'assign':
        // Navigate to ticket detail page for assignment
        navigate(`/helpdesk/ticket/${ticket._id || ticket.id}`);
        break;
      case 'comment':
        // Navigate to ticket detail page for comments
        navigate(`/helpdesk/ticket/${ticket._id || ticket.id}`);
        break;
      case 'delete':
        // Handle ticket deletion with confirmation
        if (window.confirm(`Are you sure you want to delete ticket #${ticket._id || ticket.id}? This action cannot be undone.`)) {
          handleDeleteTicket(ticket._id || ticket.id);
        }
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  const handleDeleteTicket = async (ticketId) => {
    try {
      // Delete ticket via API
      await crmAPI.deleteTicket(ticketId);
      
      // Remove from local state
      setTickets(tickets.filter(ticket => (ticket._id || ticket.id) !== ticketId));
      
      console.log('Ticket deleted successfully');
    } catch (error) {
      console.error('Error deleting ticket:', error);
      // You could add error notification here
    }
  };

  useEffect(() => {
    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (activeDropdown && !event.target.closest('.actions-dropdown')) {
        setActiveDropdown(null);
      }
    };

    // Close dropdown on Escape key
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && activeDropdown) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [activeDropdown]);

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
              <div className="mt-4 md:mt-0 flex gap-3 relative z-40">
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
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('New Ticket button clicked!');
                    setShowNewTicketModal(true);
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-semibold transition duration-150 ease-in-out flex items-center relative z-50 cursor-pointer"
                  style={{ pointerEvents: 'auto' }}
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
                {/* Loading State */}
                {loading && (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                  </div>
                )}

                {/* Error State */}
                {fetchError && (
                  <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-4 mb-6">
                    <p className="text-red-400">{fetchError}</p>
                  </div>
                )}

                {/* Empty State */}
                {!loading && !fetchError && tickets.length === 0 && (
                  <div className="bg-gray-800 rounded-lg border border-gray-700 p-12 text-center">
                    <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-400 mb-2">No tickets found</h3>
                    <p className="text-gray-500 mb-6">You don't have any tickets assigned to you yet.</p>
                    <button
                      onClick={() => setShowNewTicketModal(true)}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md font-semibold transition duration-150 ease-in-out"
                    >
                      Create Your First Ticket
                    </button>
                  </div>
                )}

                {/* Stats Overview */}
                {!loading && !fetchError && tickets.length > 0 && (
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
                )}

                {/* AI Suggestions Banner */}
                {!loading && !fetchError && (
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
                )}

                {/* Filters */}
                {!loading && !fetchError && (
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
                )}

                {/* Tickets Table */}
                {!loading && !fetchError && (
                <div className="bg-gray-800 rounded-lg border border-gray-700">
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
                        <tr key={ticket._id || ticket.id} className="hover:bg-gray-700/50 align-middle">
                          <td className="p-4">
                            <div>
                              <Link to={`/helpdesk/ticket/${ticket._id || ticket.id}`} className="text-purple-400 hover:text-purple-300 font-medium">
                                {shortenTicketId(ticket._id || ticket.id)}: {ticket.title}
                              </Link>
                              <p className="text-gray-500 text-sm">{ticket.tags?.[0] || ''}</p>
                            </div>
                          </td>
                          <td className="p-4 text-white">{ticket.customer?.email || ticket.customer?.name || ticket.customer || ''}</td>
                          <td className="p-4">
                            <select
                              value={ticket.status}
                              onChange={(e) => handleStatusUpdate(ticket._id || ticket.id, e.target.value)}
                              disabled={updatingTicketId === ticket._id || ticket.id}
                              className={`px-3 py-1 rounded-full text-xs font-semibold text-white border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-500 ${statusColors[ticket.status]} ${updatingTicketId === ticket.id ? 'opacity-50' : ''}`}
                              style={{ backgroundColor: 'transparent' }}
                            >
                              <option value="new">New</option>
                              <option value="open">Open</option>
                              <option value="in-progress">In Progress</option>
                              <option value="pending">Pending</option>
                              <option value="resolved">Resolved</option>
                              <option value="closed">Closed</option>
                            </select>
                            {updatingTicketId === ticket.id && (
                              <div className="text-xs text-gray-400 mt-1">Updating...</div>
                            )}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center justify-center">
                              <span className={`inline-block px-3 py-1 rounded-md bg-gray-700 border border-gray-600 font-semibold text-sm ${priorityColors[ticket.priority]}`}>
                                {ticket.priority}
                              </span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center">
                              <div className={`w-2 h-2 rounded-full mr-2 ${slaStatusColors[ticket.slaStatus]}`}></div>
                              <span className="text-gray-400 text-sm">
                                {ticket.sla || calculateSLA(ticket.priority)}
                              </span>
                            </div>
                          </td>
                          <td className="p-4 text-gray-400">
                            {ticket.assignedTo ? (typeof ticket.assignedTo === 'object' ? ticket.assignedTo.email || ticket.assignedTo.name : 'Assigned') : 'Unassigned'}
                          </td>
                          <td className="p-4">
                            <div className="relative actions-dropdown">
                              <button
                                onClick={() => setActiveDropdown(activeDropdown === (ticket._id || ticket.id) ? null : (ticket._id || ticket.id))}
                                className="text-gray-400 hover:text-white p-2 rounded-md hover:bg-gray-700 transition duration-150 ease-in-out"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
                                </svg>
                              </button>
                              
                              {/* Dropdown Menu */}
                              {activeDropdown === (ticket._id || ticket.id) && (
                                <div className="absolute right-0 mt-1 w-48 bg-gray-800 rounded-md shadow-lg border border-gray-700 z-50">
                                  <div className="py-1">
                                    {/* View Ticket */}
                                    <button
                                      onClick={() => handleActionClick('view', ticket)}
                                      className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition duration-150 ease-in-out"
                                    >
                                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                                      </svg>
                                      View Ticket
                                    </button>
                                    
                                    {/* Edit Ticket */}
                                    <button
                                      onClick={() => handleActionClick('edit', ticket)}
                                      className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition duration-150 ease-in-out"
                                    >
                                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-11a2 2 0 00-2-2z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 9l3 3-3-3"></path>
                                      </svg>
                                      Edit Ticket
                                    </button>
                                    
                                    {/* Assign Ticket */}
                                    <button
                                      onClick={() => handleActionClick('assign', ticket)}
                                      className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition duration-150 ease-in-out"
                                    >
                                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l7-7 7 7"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M22 12h-4"></path>
                                      </svg>
                                      Assign
                                    </button>
                                    
                                    {/* Add Comment */}
                                    <button
                                      onClick={() => handleActionClick('comment', ticket)}
                                      className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition duration-150 ease-in-out"
                                    >
                                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12h.01M8 5l-3 3 3-3"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12c0 4.418-4.03 8-9 8s-9 3.582-9 8c0 4.418 4.03 8 9s9-3.582 9-8c0-4.418-4.03-8-9-8z"></path>
                                      </svg>
                                      Add Comment
                                    </button>
                                    
                                    <div className="border-t border-gray-700 my-1"></div>
                                    
                                    {/* Delete Ticket */}
                                    <button
                                      onClick={() => handleActionClick('delete', ticket)}
                                      className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-red-600 hover:text-white transition duration-150 ease-in-out"
                                    >
                                      <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0016.138 21H7.862a2 2 0 00-1.995-1.858L5 7m5 4v6M4 7v6a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2z"></path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5v14l11-7-11"></path>
                                      </svg>
                                      Delete Ticket
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                )}
              </>
            )}

            {activeView === 'kanban' && (
              <>
                {console.log('Kanban view - tickets:', tickets.map(t => ({id: t._id, status: t.status})))}
                {console.log('Kanban view - filteredTickets:', filteredTickets.map(t => ({id: t._id, status: t.status})))}
                {!loading && !fetchError && tickets.length === 0 && (
                  <div className="bg-gray-800 rounded-lg border border-gray-700 p-12 text-center">
                    <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"></path>
                    </svg>
                    <h3 className="text-xl font-semibold text-gray-400 mb-2">No tickets found</h3>
                    <p className="text-gray-500 mb-6">You don't have any tickets assigned to you yet.</p>
                    <button
                      onClick={() => setShowNewTicketModal(true)}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md font-semibold transition duration-150 ease-in-out"
                    >
                      Create Your First Ticket
                    </button>
                  </div>
                )}
                {!loading && !fetchError && tickets.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {['new', 'open', 'in-progress', 'pending', 'resolved', 'closed'].map((status) => {
                  const statusConfig = {
                    new: { name: 'New', color: 'blue' },
                    open: { name: 'Open', color: 'yellow' },
                    'in-progress': { name: 'In Progress', color: 'purple' },
                    pending: { name: 'Pending', color: 'orange' },
                    resolved: { name: 'Resolved', color: 'green' },
                    closed: { name: 'Closed', color: 'gray' }
                  };
                  const config = statusConfig[status];
                  const statusTickets = filteredTickets.filter(t => t.status === status);
                  console.log(`Status ${status}:`, statusTickets.length, 'tickets');
                  
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
                          <div key={ticket._id || ticket.id} className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                            <div className="flex justify-between items-start mb-2">
                              <span className="text-gray-400 text-xs">{shortenTicketId(ticket._id || ticket.id)}</span>
                              <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                                ticket.priority === 'high' ? 'bg-red-600 text-white' :
                                ticket.priority === 'medium' ? 'bg-yellow-600 text-white' :
                                'bg-gray-600 text-gray-300'
                              }`}>
                                {ticket.priority}
                              </span>
                            </div>
                            <h4 className="text-white font-medium text-sm mb-2">{ticket.title}</h4>
                            <p className="text-gray-400 text-xs mb-2">{ticket.customer?.email || ticket.customer?.name || ticket.customer || ''}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
                )}
              </>
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
      
      <NewTicketModal
        show={showNewTicketModal}
        onClose={() => {
          setShowNewTicketModal(false);
          setEditingTicket(null);
          setTicketError(null);
          setTicketSuccess(false);
        }}
        editingTicket={editingTicket}
        isCreatingTicket={isCreatingTicket}
        ticketSuccess={ticketSuccess}
        ticketError={ticketError}
        ticketForm={ticketForm}
        onFormChange={handleFormChange}
        onSubmit={handleNewTicket}
      />
      <Footer />
    </div>
  );
}

// Public Helpdesk for non-authenticated users
function PublicHelpdesk() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-gray-900">
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

                  <div className="text-left text-justify text-white text-lg">
                    <p className="mb-4">
                      Welcome to OG Technologies EU's Help Desk! We're here to assist you with any IT-related issues or inquiries you may have. Our dedicated team is committed to providing you with prompt and reliable support to ensure your business operations run smoothly.
                    </p>

                    <p className="mb-4">
                      Whether you need technical assistance, have questions about our services, or require troubleshooting, we're here to help.
                    </p>
                    
                    <div className="my-6">
                      <h3 className="h3"> How can we assist you today? </h3>
                    </div>
                    
                    <div className="my-6">
                      <HelpDeskForm />
                    </div>

                  </div>
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

function HelpDesk() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <HelpdeskDashboard />;
  }

  return <PublicHelpdesk />;
}

export default HelpDesk;
