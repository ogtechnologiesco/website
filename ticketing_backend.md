Ticketing API Structure
Base URL
/api/tickets

Endpoints
Ticket CRUD Operations
GET /api/tickets

Get all tickets with pagination and filtering
Query params: page, limit, search, status, priority, assignedTo, customer
Returns: { tickets: [], pagination: { page, limit, total, pages } }
GET /api/tickets/:id

Get single ticket by ID with comments
Returns: { ticket: {}, comments: [] }
POST /api/tickets

Create new ticket
Required fields: title, description, customer
Optional fields: priority, assignedTo, tags, customFields
PUT /api/tickets/:id

Update ticket
Optional fields: title, description, priority, status, assignedTo, tags, customFields
DELETE /api/tickets/:id

Delete ticket and all associated comments
Comment Operations
POST /api/tickets/:id/comments

Add comment to ticket
Required fields: content, author
Optional fields: isInternal, attachments
PUT /api/tickets/:id/comments/:commentId

Update comment
Optional fields: content, isInternal, attachments
DELETE /api/tickets/:id/comments/:commentId

Delete comment
Data Models
Ticket Model
title: string (required)
description: string (required)
priority: 'low' | 'medium' | 'high' | 'urgent' (default: 'medium')
status: 'open' | 'in-progress' | 'pending' | 'resolved' | 'closed' (default: 'open')
assignedTo: ObjectId (ref: User)
customer: ObjectId (ref: Contact, required)
tags: string[]
customFields: Map<string, any>
resolvedAt: Date (auto-set when status changes to 'resolved')
TicketComment Model
content: string (required)
author: ObjectId (ref: User, required)
ticket: ObjectId (ref: Ticket, required)
isInternal: boolean (default: false)
attachments: string[]
Features
Full-text search on title and description
Pagination support
Status-based filtering
Priority-based filtering
Assignment filtering
Customer filtering
Automatic timestamps
Comment threading
Internal/external comment visibility
Custom field support
Tag-based organization