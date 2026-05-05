import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Header from '../partials/Header';
import Footer from '../partials/Footer';
import PageIllustration from '../partials/PageIllustration';
import { crmAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

// Utility functions for localStorage
const getUserEmail = () => {
  try {
    return localStorage.getItem('userEmail');
  } catch {
    return null;
  }
};

const setUserEmail = (email) => {
  try {
    if (email) {
      localStorage.setItem('userEmail', email);
    }
  } catch (error) {
    console.warn('Failed to save user email to localStorage:', error);
  }
};

function HelpDeskTicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const authContext = useAuth();
  console.log('Auth context value:', authContext);
  console.log('User from context:', authContext.user);
  const user = authContext.user;
  const [ticket, setTicket] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [storedUserEmail, setStoredUserEmail] = useState(getUserEmail());

  // Update stored email when user data changes or API responses contain email
  useEffect(() => {
    // Check if we have user email from auth context
    const userEmail = user?.user?.email || user?.email;
    if (userEmail && userEmail !== storedUserEmail) {
      setUserEmail(userEmail);
      setStoredUserEmail(userEmail);
    }
  }, [user, storedUserEmail]);

  // Also check comments for email data and update storage
  useEffect(() => {
    if (comments.length > 0) {
      const lastComment = comments[comments.length - 1];
      if (lastComment?.author?.email && lastComment.author.email !== storedUserEmail) {
        setUserEmail(lastComment.author.email);
        setStoredUserEmail(lastComment.author.email);
      }
    }
  }, [comments, storedUserEmail]);

  useEffect(() => {
    console.log('HelpDeskTicketDetail useEffect triggered with id:', id);
    
    if (!id) {
      console.log('No ID provided - setting error');
      setError('No ticket ID provided');
      setLoading(false);
      return;
    }

    const fetchTicket = async () => {
      console.log('Starting fetchTicket');
      setLoading(true);
      setError(null);
      
      try {
        console.log('Calling crmAPI.getTicket with ID:', id);
        const data = await crmAPI.getTicket(id);
        console.log('API response received:', data);
        
        if (!data || !data.ticket) {
          console.log('Invalid response structure');
          setError('Ticket not found');
          return;
        }
        
        console.log('Setting ticket state');
        setTicket(data.ticket);
        setComments(data.comments || []);
        console.log('Ticket loaded successfully');
      } catch (err) {
        console.error('Error fetching ticket:', err);
        setError(err.message || 'Failed to load ticket');
      } finally {
        console.log('Setting loading to false');
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      console.log('Current user object:', user);
      console.log('User name from user.name:', user?.name);
      console.log('User email from user.email:', user?.email);
      
      // Use stored email as fallback, then user context, then default
      const userName = storedUserEmail || user?.user?.email || user?.user?.name || 'Current User';
      console.log('Final userName:', userName);
      console.log('Stored user email:', storedUserEmail);
      console.log('User object keys:', user ? Object.keys(user) : 'null');
      console.log('User.user keys:', user?.user ? Object.keys(user.user) : 'null');
      
      const commentData = {
        content: newComment,
        author: userName,
      };
      console.log('Comment data being sent:', commentData);
      
      const result = await crmAPI.addTicketComment(id, commentData);
      console.log('API response:', result);
      console.log('API response structure:', JSON.stringify(result, null, 2));
      console.log('Result comment:', result);
      console.log('Result comment author:', result?.author);
      
      // Extract and store email from API response if available
      if (result?.author?.email) {
        setUserEmail(result.author.email);
        setStoredUserEmail(result.author.email);
        console.log('Stored user email from API response:', result.author.email);
      }
      
      // Preserve the author object from API response, but ensure it has the correct email
      const newCommentData = {
        ...result,
        author: {
          ...result.author,
          email: result.author?.email || storedUserEmail || userName,
          name: result.author?.name || userName
        },
        _id: result?._id || result?.id || Date.now() // Ensure ID exists
      };
      
      console.log('New comment data being added:', newCommentData);
      
      // Use the comment data as is since we preserved the author object
      const finalCommentData = newCommentData;
      
      console.log('Final comment data being added:', finalCommentData);
      console.log('About to setComments with new comment...');
      
      // Check if author is properly set before adding to state
      const authorDisplay = typeof finalCommentData.author === 'string' 
        ? finalCommentData.author 
        : finalCommentData.author?.email || finalCommentData.author?.name;
        
      if (!authorDisplay || authorDisplay === 'Unknown User') {
        console.error('WARNING: Author field is not properly set!');
        console.error('Falling back to API author:', result?.author);
        // Use API author as fallback
        finalCommentData.author = result?.author || { email: 'Unknown User' };
      }
      
      setComments([...comments, finalCommentData]);
      setNewComment('');
      console.log('Comments state updated, total:', comments.length + 1);
    } catch (err) {
      console.error('Error adding comment:', err);
      setError(err.message || 'Failed to add comment');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen overflow-hidden bg-gray-900">
        <Header />
        <main className="grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </main>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="flex flex-col min-h-screen overflow-hidden bg-gray-900">
        <Header />
        <main className="grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
            <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400">{error || 'Ticket not found'}</p>
              <Link to="/helpdesk" className="text-purple-400 hover:text-purple-300 mt-4 inline-block">
                ← Back to Helpdesk
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-gray-900">
      <Header />
      
      <main className="grow">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <PageIllustration />
          
          <div className="pt-32 pb-12 md:pt-40 md:pb-20">
            {/* Header */}
            <div className="mb-8">
              <Link to="/helpdesk" className="text-purple-400 hover:text-purple-300 mb-4 inline-block">
                ← Back to Helpdesk
              </Link>
              <h1 className="h1 mb-2">#{ticket.id}: {ticket.title}</h1>
              <div className="flex items-center gap-4 text-gray-400">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  ticket.priority === 'urgent' ? 'bg-red-600 text-white' :
                  ticket.priority === 'high' ? 'bg-orange-600 text-white' :
                  ticket.priority === 'medium' ? 'bg-yellow-600 text-white' :
                  'bg-green-600 text-white'
                }`}>
                  {ticket.priority}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  ticket.status === 'open' ? 'bg-yellow-600 text-white' :
                  ticket.status === 'in-progress' ? 'bg-purple-600 text-white' :
                  ticket.status === 'resolved' ? 'bg-green-600 text-white' :
                  'bg-gray-600 text-white'
                }`}>
                  {ticket.status}
                </span>
                {ticket.tags && ticket.tags.length > 0 && (
                  <span className="text-sm">{ticket.tags.join(', ')}</span>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="md:col-span-2">
                {/* Ticket Details */}
                <div className="bg-gray-800 rounded-lg border border-gray-700 p-6 mb-6">
                  <h2 className="text-xl font-bold text-white mb-4">Description</h2>
                  <p className="text-gray-300 whitespace-pre-wrap">{ticket.description}</p>
                </div>

                {/* Comments */}
                <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                  <h2 className="text-xl font-bold text-white mb-4">Comments ({comments.length})</h2>
                  
                  {comments.length === 0 ? (
                    <p className="text-gray-400">No comments yet</p>
                  ) : (
                    <div className="space-y-4 mb-6">
                      {comments.filter(comment => comment && (comment._id || comment.id)).map((comment) => (
                        <div key={comment._id || comment.id} className="bg-gray-700 rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-white font-medium">
                              {typeof comment.author === 'string' 
                                ? comment.author 
                                : comment.author?.email || comment.author?.name || 'Unknown User'
                              }
                            </span>
                            <span className="text-gray-400 text-xs">
                              {new Date(comment.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-gray-300">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Comment Form */}
                  <form onSubmit={handleAddComment}>
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      rows={3}
                      className="w-full bg-gray-700 text-white px-4 py-3 rounded-md border border-gray-600 focus:border-purple-500 focus:outline-none mb-4"
                    />
                    <button
                      type="submit"
                      disabled={!newComment.trim()}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md font-semibold transition duration-150 ease-in-out disabled:opacity-50"
                    >
                      Add Comment
                    </button>
                  </form>
                </div>
              </div>

              {/* Sidebar */}
              <div className="md:col-span-1">
                <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
                  <h2 className="text-lg font-bold text-white mb-4">Details</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-400 text-sm">Customer</p>
                      <p className="text-white">{ticket.customer?.email || ticket.customer?.name || ticket.customer || ''}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-400 text-sm">Assigned To</p>
                      <p className="text-white">
                        {ticket.assignedTo ? (
                          typeof ticket.assignedTo === 'object' 
                            ? ticket.assignedTo.email || ticket.assignedTo.name || 'Assigned'
                            : ticket.assignedTo
                        ) : 'Unassigned'}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-gray-400 text-sm">Created</p>
                      <p className="text-white">
                        {new Date(ticket.createdAt).toLocaleString()}
                      </p>
                    </div>
                    
                    {ticket.updatedAt && (
                      <div>
                        <p className="text-gray-400 text-sm">Last Updated</p>
                        <p className="text-white">
                          {new Date(ticket.updatedAt).toLocaleString()}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default HelpDeskTicketDetail;
