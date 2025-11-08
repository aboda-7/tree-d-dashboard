import React, { useState, useEffect } from 'react';
import { Mail, X, Send, Clock, CheckCircle, XCircle, Plus } from 'lucide-react';
import Layout from '../../shared/components/layout';
import './invite-page.css';

const InvitePage = () => {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('normal');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const API_URL = process.env.REACT_APP_API_URL ;

  useEffect(() => {
    fetchInvites();
  }, []);

  const fetchInvites = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token'); // Adjust based on where you store the token
      const response = await fetch(`${API_URL}/invite/list`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch invites');
      
      const data = await response.json();
      setInvites(data.invites || []);
    } catch (err) {
      console.error('Error fetching invites:', err);
      setError('Failed to load invitations');
    } finally {
      setLoading(false);
    }
  };

  const handleSendInvite = async () => {
    if (!email) return;
    
    setError('');
    setSuccess('');
    setSending(true);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/invite/send`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, role })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || 'Failed to send invite');
      }

      const data = await response.json();
      setSuccess(`Invitation sent to ${email}!`);
      setEmail('');
      setRole('normal');
      setShowModal(false);
      
      fetchInvites();
      
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'accepted': return 'status-accepted';
      case 'pending': return 'status-pending';
      case 'expired': return 'status-expired';
      default: return 'status-default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'accepted': return <CheckCircle className="status-icon" />;
      case 'pending': return <Clock className="status-icon" />;
      case 'expired': return <XCircle className="status-icon" />;
      default: return null;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setError('');
    setEmail('');
    setRole('normal');
  };

  return (
    <Layout bgColor="#1c2429">
      <div className="invite-page">
        <div className="invite-container">
          <div className="page-header">
            <div className="header-content">
              <div>
                <h1>Team Invitations</h1>
                <p className="subtitle">Manage and track team member invitations</p>
              </div>
              <button onClick={() => setShowModal(true)} className="btn-primary">
                <Plus className="btn-icon" />
                Send Invitation
              </button>
            </div>
          </div>

          {success && (
            <div className="alert alert-success">
              <CheckCircle className="alert-icon" />
              {success}
            </div>
          )}

          {error && !showModal && (
            <div className="alert alert-error">
              <XCircle className="alert-icon" />
              {error}
            </div>
          )}

          <div className="invites-card">
            {loading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading invitations...</p>
              </div>
            ) : invites.length === 0 ? (
              <div className="empty-state">
                <Mail className="empty-icon" />
                <h3>No invitations yet</h3>
                <p>Start by sending your first team invitation</p>
                <button onClick={() => setShowModal(true)} className="btn-primary">
                  <Plus className="btn-icon" />
                  Send Invitation
                </button>
              </div>
            ) : (
              <div className="table-container">
                <table className="invites-table">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Invited By</th>
                      <th>Sent Date</th>
                      <th>Expires</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invites.map((invite) => (
                      <tr key={invite.id}>
                        <td>
                          <div className="email-cell">
                            <Mail className="table-icon" />
                            <span className="email-text">{invite.email}</span>
                          </div>
                        </td>
                        <td>
                          <span className="role-badge">{invite.role}</span>
                        </td>
                        <td>
                          <span className={`status-badge ${getStatusClass(invite.status)}`}>
                            {getStatusIcon(invite.status)}
                            {invite.status}
                          </span>
                        </td>
                        <td className="text-secondary">{invite.invited_by_email}</td>
                        <td className="text-secondary">{formatDate(invite.created_at)}</td>
                        <td className="text-secondary">
                          {invite.status === 'accepted' ? (
                            <span className="accepted-text">Accepted {formatDate(invite.accepted_at)}</span>
                          ) : (
                            formatDate(invite.expires_at)
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {invites.length > 0 && (
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-content">
                  <div className="stat-icon stat-icon-pending">
                    <Clock className="icon" />
                  </div>
                  <div>
                    <p className="stat-label">Pending</p>
                    <p className="stat-value">
                      {invites.filter(i => i.status === 'pending').length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-content">
                  <div className="stat-icon stat-icon-accepted">
                    <CheckCircle className="icon" />
                  </div>
                  <div>
                    <p className="stat-label">Accepted</p>
                    <p className="stat-value">
                      {invites.filter(i => i.status === 'accepted').length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-content">
                  <div className="stat-icon stat-icon-expired">
                    <XCircle className="icon" />
                  </div>
                  <div>
                    <p className="stat-label">Expired</p>
                    <p className="stat-value">
                      {invites.filter(i => i.status === 'expired').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button onClick={closeModal} className="modal-close">
                <X className="icon" />
              </button>

              <div className="modal-header">
                <div className="modal-icon">
                  <Send className="icon" />
                </div>
                <h2>Send Invitation</h2>
                <p className="modal-subtitle">Invite a new member to join your team</p>
              </div>

              {error && (
                <div className="alert alert-error">
                  <XCircle className="alert-icon" />
                  {error}
                </div>
              )}

              <div className="modal-form">
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="colleague@example.com"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label>Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="form-select"
                  >
                    <option value="normal">Normal User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <p className="form-help">
                    Admins can send invitations and manage team members
                  </p>
                </div>

                <div className="modal-actions">
                  <button onClick={closeModal} className="btn-secondary">
                    Cancel
                  </button>
                  <button
                    onClick={handleSendInvite}
                    disabled={sending || !email}
                    className="btn-primary"
                  >
                    {sending ? (
                      <>
                        <div className="btn-spinner"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="btn-icon" />
                        Send Invite
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default InvitePage;