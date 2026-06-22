# DORA Assessment Backend Architecture

## Overview
This document outlines the backend architecture for implementing the DORA (Digital Operational Resilience Act) compliance assessment API.

## Tech Stack Recommendations
- **Runtime**: Node.js with Express.js
- **Database**: MongoDB (for flexibility with assessment data)
- **Authentication**: JWT with OAuth2 (Google)
- **Validation**: Joi or Zod
- **Email**: SendGrid or AWS SES
- **Hosting**: Heroku or Railway

## Database Schema

### DORA Assessment Model
```javascript
{
  _id: ObjectId,
  company: {
    name: String (required),
    contactName: String (required),
    email: String (required, indexed),
    phone: String,
    size: String (enum: ['1-10', '11-50', '51-200', '201-500', '500+']),
    type: [String] (enum: ['Fintech Startup', 'Traditional Bank', 'Payment Processor', 'Crypto Exchange', 'DeFi Protocol', 'Web3 Infrastructure', 'Other'])
  },
  technology: {
    blockchainPlatforms: [String],
    primaryTechFocus: String (required),
    web3Protocols: [String],
    smartContractAuditStatus: String (enum: ['Audited', 'In Progress', 'Not Audited', 'N/A'])
  },
  compliance: {
    ictRiskManagement: String (enum: ['Implemented', 'Partially Implemented', 'Planning Phase', 'Not Started']),
    ictThirdPartyRisk: String (enum: ['Implemented', 'Partially Implemented', 'Planning Phase', 'Not Started']),
    digitalResilienceTesting: String (enum: ['Regular Testing', 'Occasional Testing', 'Planning Phase', 'Not Started']),
    ictIncidentReporting: String (enum: ['Full Capabilities', 'Partial Capabilities', 'Planning Phase', 'Not Started']),
    informationSharing: String (enum: ['Active Participation', 'Limited Participation', 'Planning Phase', 'Not Started']),
    criticalThirdPartyOversight: String (enum: ['Comprehensive Oversight', 'Basic Oversight', 'Planning Phase', 'Not Started']),
    complianceDeadlineAwareness: String (enum: ['January 2025', 'Aware but Uncertain of Date', 'Not Aware'])
  },
  project: {
    estimatedBudget: String,
    timeline: String,
    preferredContactMethod: String (enum: ['Email', 'Phone', 'Video Call']),
    additionalComments: String
  },
  calculated: {
    complianceScore: Number (0-100),
    complianceLevel: String (enum: ['Strong', 'Moderate', 'Critical'])
  },
  status: {
    current: String (enum: ['submitted', 'reviewed', 'contacted', 'converted'], default: 'submitted'),
    assignedTo: ObjectId (ref: User),
    notes: String
  },
  metadata: {
    ipAddress: String,
    userAgent: String,
    submittedAt: Date (default: Date.now),
    updatedAt: Date
  }
}
```

### Indexes
```javascript
// Compound index for queries
db.doraAssessments.createIndex({ 'company.email': 1, 'metadata.submittedAt': -1 })
db.doraAssessments.createIndex({ 'status.current': 1, 'metadata.submittedAt': -1 })
db.doraAssessments.createIndex({ 'calculated.complianceScore': -1 })
```

## API Endpoints

### POST /api/dora/assessment
Submit a new DORA compliance assessment.

**Request Body:**
```json
{
  "companyName": "string",
  "contactName": "string",
  "email": "string",
  "phone": "string",
  "companySize": "string",
  "companyType": ["string"],
  "blockchainPlatforms": ["string"],
  "primaryTechFocus": "string",
  "web3Protocols": ["string"],
  "smartContractAuditStatus": "string",
  "ictRiskManagement": "string",
  "ictThirdPartyRisk": "string",
  "digitalResilienceTesting": "string",
  "ictIncidentReporting": "string",
  "informationSharing": "string",
  "criticalThirdPartyOversight": "string",
  "complianceDeadlineAwareness": "string",
  "estimatedBudget": "string",
  "timeline": "string",
  "preferredContactMethod": "string",
  "additionalComments": "string"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "_id": "string",
    "calculated": {
      "complianceScore": 75,
      "complianceLevel": "Strong"
    },
    "metadata": {
      "submittedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Validation error",
  "message": "Detailed error message",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### GET /api/dora/assessments
Get all DORA assessments (admin only).

**Query Parameters:**
- `page`: number (default: 1)
- `limit`: number (default: 20, max: 100)
- `status`: string (filter by status)
- `minScore`: number (filter by minimum compliance score)
- `maxScore`: number (filter by maximum compliance score)
- `search`: string (search in company name or email)

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "_id": "string",
      "company": { "name": "string", "email": "string" },
      "calculated": { "complianceScore": 75, "complianceLevel": "Strong" },
      "status": { "current": "submitted" },
      "metadata": { "submittedAt": "2024-01-01T00:00:00.000Z" }
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "pages": 5
  }
}
```

### GET /api/dora/assessments/:id
Get a single DORA assessment by ID (admin only).

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "string",
    "company": { ... },
    "technology": { ... },
    "compliance": { ... },
    "project": { ... },
    "calculated": { ... },
    "status": { ... },
    "metadata": { ... }
  }
}
```

### PUT /api/dora/assessments/:id/status
Update assessment status (admin only).

**Request Body:**
```json
{
  "status": "reviewed",
  "assignedTo": "userId",
  "notes": "Assessment reviewed, follow-up scheduled"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "string",
    "status": {
      "current": "reviewed",
      "assignedTo": "userId",
      "notes": "Assessment reviewed, follow-up scheduled"
    }
  }
}
```

### DELETE /api/dora/assessments/:id
Delete a DORA assessment (admin only).

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Assessment deleted successfully"
}
```

### GET /api/dora/analytics
Get DORA assessment analytics (admin only).

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "totalAssessments": 150,
    "averageComplianceScore": 68.5,
    "scoreDistribution": {
      "strong": 45,
      "moderate": 78,
      "critical": 27
    },
    "topComplianceGaps": [
      { "field": "ictRiskManagement", "notStarted": 30 },
      { "field": "digitalResilienceTesting", "notStarted": 25 }
    ],
    "companyTypeBreakdown": {
      "Fintech Startup": 60,
      "DeFi Protocol": 45,
      "Crypto Exchange": 30,
      "Other": 15
    },
    "timeline": [
      { "date": "2024-01-01", "count": 10 },
      { "date": "2024-01-02", "count": 15 }
    ]
  }
}
```

## Compliance Score Calculation Algorithm

```javascript
function calculateComplianceScore(assessment) {
  const scores = {
    // Risk Management fields
    'Implemented': 100,
    'Partially Implemented': 66,
    'Planning Phase': 33,
    'Not Started': 0,
    // Testing fields
    'Regular Testing': 100,
    'Occasional Testing': 66,
    // Capabilities fields
    'Full Capabilities': 100,
    'Partial Capabilities': 66,
    // Participation fields
    'Active Participation': 100,
    'Limited Participation': 66,
    // Oversight fields
    'Comprehensive Oversight': 100,
    'Basic Oversight': 66
  };

  const fields = [
    'ictRiskManagement',
    'ictThirdPartyRisk',
    'digitalResilienceTesting',
    'ictIncidentReporting',
    'informationSharing',
    'criticalThirdPartyOversight'
  ];

  let totalScore = 0;
  fields.forEach(field => {
    totalScore += scores[assessment.compliance[field]] || 0;
  });

  const averageScore = Math.round(totalScore / fields.length);
  
  let complianceLevel;
  if (averageScore >= 75) {
    complianceLevel = 'Strong';
  } else if (averageScore >= 50) {
    complianceLevel = 'Moderate';
  } else {
    complianceLevel = 'Critical';
  }

  return {
    score: averageScore,
    level: complianceLevel
  };
}
```

## Implementation Structure

```
backend/
├── src/
│   ├── controllers/
│   │   └── doraController.js
│   ├── models/
│   │   └── DoraAssessment.js
│   ├── routes/
│   │   └── doraRoutes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   ├── validation.js
│   │   └── errorHandler.js
│   ├── services/
│   │   ├── emailService.js
│   │   └── scoreCalculator.js
│   └── utils/
│       └── logger.js
├── config/
│   └── database.js
└── tests/
    ├── dora.test.js
    └── scoreCalculator.test.js
```

## Example Implementation

### Model (src/models/DoraAssessment.js)
```javascript
const mongoose = require('mongoose');

const doraAssessmentSchema = new mongoose.Schema({
  company: {
    name: { type: String, required: true },
    contactName: { type: String, required: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: String,
    size: { 
      type: String, 
      enum: ['1-10', '11-50', '51-200', '201-500', '500+'] 
    },
    type: [{ 
      type: String, 
      enum: ['Fintech Startup', 'Traditional Bank', 'Payment Processor', 
             'Crypto Exchange', 'DeFi Protocol', 'Web3 Infrastructure', 'Other'] 
    }]
  },
  technology: {
    blockchainPlatforms: [String],
    primaryTechFocus: { type: String, required: true },
    web3Protocols: [String],
    smartContractAuditStatus: { 
      type: String, 
      enum: ['Audited', 'In Progress', 'Not Audited', 'N/A'] 
    }
  },
  compliance: {
    ictRiskManagement: { type: String, required: true },
    ictThirdPartyRisk: { type: String, required: true },
    digitalResilienceTesting: { type: String, required: true },
    ictIncidentReporting: { type: String, required: true },
    informationSharing: { type: String, required: true },
    criticalThirdPartyOversight: { type: String, required: true },
    complianceDeadlineAwareness: { type: String, required: true }
  },
  project: {
    estimatedBudget: String,
    timeline: String,
    preferredContactMethod: { 
      type: String, 
      enum: ['Email', 'Phone', 'Video Call'] 
    },
    additionalComments: String
  },
  calculated: {
    complianceScore: { type: Number, min: 0, max: 100 },
    complianceLevel: { type: String, enum: ['Strong', 'Moderate', 'Critical'] }
  },
  status: {
    current: { 
      type: String, 
      enum: ['submitted', 'reviewed', 'contacted', 'converted'], 
      default: 'submitted' 
    },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    notes: String
  },
  metadata: {
    ipAddress: String,
    userAgent: String,
    submittedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  }
}, { timestamps: true });

// Indexes
doraAssessmentSchema.index({ 'company.email': 1, 'metadata.submittedAt': -1 });
doraAssessmentSchema.index({ 'status.current': 1, 'metadata.submittedAt': -1 });
doraAssessmentSchema.index({ 'calculated.complianceScore': -1 });

module.exports = mongoose.model('DoraAssessment', doraAssessmentSchema);
```

### Controller (src/controllers/doraController.js)
```javascript
const DoraAssessment = require('../models/DoraAssessment');
const { calculateComplianceScore } = require('../services/scoreCalculator');
const emailService = require('../services/emailService');

exports.submitAssessment = async (req, res) => {
  try {
    const assessmentData = req.body;
    
    // Calculate compliance score
    const { score, level } = calculateComplianceScore(assessmentData);
    
    // Create assessment
    const assessment = new DoraAssessment({
      company: {
        name: assessmentData.companyName,
        contactName: assessmentData.contactName,
        email: assessmentData.email,
        phone: assessmentData.phone,
        size: assessmentData.companySize,
        type: assessmentData.companyType
      },
      technology: {
        blockchainPlatforms: assessmentData.blockchainPlatforms,
        primaryTechFocus: assessmentData.primaryTechFocus,
        web3Protocols: assessmentData.web3Protocols,
        smartContractAuditStatus: assessmentData.smartContractAuditStatus
      },
      compliance: {
        ictRiskManagement: assessmentData.ictRiskManagement,
        ictThirdPartyRisk: assessmentData.ictThirdPartyRisk,
        digitalResilienceTesting: assessmentData.digitalResilienceTesting,
        ictIncidentReporting: assessmentData.ictIncidentReporting,
        informationSharing: assessmentData.informationSharing,
        criticalThirdPartyOversight: assessmentData.criticalThirdPartyOversight,
        complianceDeadlineAwareness: assessmentData.complianceDeadlineAwareness
      },
      project: {
        estimatedBudget: assessmentData.estimatedBudget,
        timeline: assessmentData.timeline,
        preferredContactMethod: assessmentData.preferredContactMethod,
        additionalComments: assessmentData.additionalComments
      },
      calculated: {
        complianceScore: score,
        complianceLevel: level
      },
      metadata: {
        ipAddress: req.ip,
        userAgent: req.get('user-agent')
      }
    });

    await assessment.save();
    
    // Send confirmation email
    await emailService.sendAssessmentConfirmation(
      assessmentData.email,
      assessmentData.contactName,
      score,
      level
    );
    
    // Send notification to admin
    await emailService.sendAdminNotification(assessment);
    
    res.status(201).json({
      success: true,
      data: {
        _id: assessment._id,
        calculated: assessment.calculated,
        metadata: {
          submittedAt: assessment.metadata.submittedAt
        }
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.getAssessments = async (req, res) => {
  try {
    const { page = 1, limit = 20, status, minScore, maxScore, search } = req.query;
    
    const query = {};
    if (status) query['status.current'] = status;
    if (minScore) query['calculated.complianceScore'] = { $gte: minScore };
    if (maxScore) {
      query['calculated.complianceScore'] = { 
        ...query['calculated.complianceScore'], 
        $lte: maxScore 
      };
    }
    if (search) {
      query.$or = [
        { 'company.name': { $regex: search, $options: 'i' } },
        { 'company.email': { $regex: search, $options: 'i' } }
      ];
    }
    
    const assessments = await DoraAssessment
      .find(query)
      .select('company calculated status metadata')
      .sort({ 'metadata.submittedAt': -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await DoraAssessment.countDocuments(query);
    
    res.json({
      success: true,
      data: assessments,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.getAssessmentById = async (req, res) => {
  try {
    const assessment = await DoraAssessment.findById(req.params.id);
    
    if (!assessment) {
      return res.status(404).json({
        success: false,
        error: 'Assessment not found'
      });
    }
    
    res.json({
      success: true,
      data: assessment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status, assignedTo, notes } = req.body;
    
    const assessment = await DoraAssessment.findByIdAndUpdate(
      req.params.id,
      {
        'status.current': status,
        'status.assignedTo': assignedTo,
        'status.notes': notes,
        'metadata.updatedAt': new Date()
      },
      { new: true }
    );
    
    if (!assessment) {
      return res.status(404).json({
        success: false,
        error: 'Assessment not found'
      });
    }
    
    res.json({
      success: true,
      data: assessment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

exports.deleteAssessment = async (req, res) => {
  try {
    await DoraAssessment.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Assessment deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

exports.getAnalytics = async (req, res) => {
  try {
    const total = await DoraAssessment.countDocuments();
    const avgScore = await DoraAssessment.aggregate([
      { $group: { _id: null, avgScore: { $avg: '$calculated.complianceScore' } } }
    ]);
    
    const scoreDistribution = await DoraAssessment.aggregate([
      { $group: { _id: '$calculated.complianceLevel', count: { $sum: 1 } } }
    ]);
    
    const companyTypeBreakdown = await DoraAssessment.aggregate([
      { $unwind: '$company.type' },
      { $group: { _id: '$company.type', count: { $sum: 1 } } }
    ]);
    
    res.json({
      success: true,
      data: {
        totalAssessments: total,
        averageComplianceScore: avgScore[0]?.avgScore || 0,
        scoreDistribution: scoreDistribution.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {}),
        companyTypeBreakdown: companyTypeBreakdown.reduce((acc, item) => {
          acc[item._id] = item.count;
          return acc;
        }, {})
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
```

### Routes (src/routes/doraRoutes.js)
```javascript
const express = require('express');
const router = express.Router();
const doraController = require('../controllers/doraController');
const { authenticate, authorize } = require('../middleware/auth');
const { validateDoraAssessment } = require('../middleware/validation');

// Public endpoint
router.post('/assessment', validateDoraAssessment, doraController.submitAssessment);

// Admin-only endpoints
router.get('/assessments', authenticate, authorize(['admin']), doraController.getAssessments);
router.get('/assessments/:id', authenticate, authorize(['admin']), doraController.getAssessmentById);
router.put('/assessments/:id/status', authenticate, authorize(['admin']), doraController.updateStatus);
router.delete('/assessments/:id', authenticate, authorize(['admin']), doraController.deleteAssessment);
router.get('/analytics', authenticate, authorize(['admin']), doraController.getAnalytics);

module.exports = router;
```

### Service (src/services/scoreCalculator.js)
```javascript
function calculateComplianceScore(assessment) {
  const scores = {
    'Implemented': 100,
    'Partially Implemented': 66,
    'Planning Phase': 33,
    'Not Started': 0,
    'Regular Testing': 100,
    'Occasional Testing': 66,
    'Full Capabilities': 100,
    'Partial Capabilities': 66,
    'Active Participation': 100,
    'Limited Participation': 66,
    'Comprehensive Oversight': 100,
    'Basic Oversight': 66
  };

  const fields = [
    'ictRiskManagement',
    'ictThirdPartyRisk',
    'digitalResilienceTesting',
    'ictIncidentReporting',
    'informationSharing',
    'criticalThirdPartyOversight'
  ];

  let totalScore = 0;
  fields.forEach(field => {
    totalScore += scores[assessment.compliance[field]] || 0;
  });

  const averageScore = Math.round(totalScore / fields.length);
  
  let complianceLevel;
  if (averageScore >= 75) {
    complianceLevel = 'Strong';
  } else if (averageScore >= 50) {
    complianceLevel = 'Moderate';
  } else {
    complianceLevel = 'Critical';
  }

  return {
    score: averageScore,
    level: complianceLevel
  };
}

module.exports = { calculateComplianceScore };
```

## Security Considerations

1. **Rate Limiting**: Implement rate limiting on the submission endpoint to prevent abuse
2. **Input Validation**: Validate all input fields using Joi or Zod
3. **Email Verification**: Consider implementing email verification for submissions
4. **Admin Authorization**: Protect all admin endpoints with proper JWT authentication and role-based access control
5. **Data Encryption**: Encrypt sensitive data at rest in the database
6. **CORS**: Configure CORS properly to only allow requests from your frontend domain
7. **Logging**: Implement comprehensive logging for audit trails

## Email Templates

### Confirmation Email
- Subject: "Your DORA Compliance Assessment Results"
- Content: Includes compliance score, level, and next steps

### Admin Notification
- Subject: "New DORA Assessment Submitted - [Company Name]"
- Content: Includes summary of assessment, contact info, and compliance score

## Testing Strategy

1. **Unit Tests**: Test score calculation algorithm
2. **Integration Tests**: Test API endpoints with database
3. **Validation Tests**: Ensure all validation rules work correctly
4. **Load Tests**: Test endpoint performance under load

## Deployment Checklist

- [ ] Set up MongoDB database
- [ ] Configure environment variables (DB URL, JWT secret, email credentials)
- [ ] Implement authentication middleware
- [ ] Set up email service (SendGrid/AWS SES)
- [ ] Configure CORS for production domain
- [ ] Set up rate limiting
- [ ] Implement error logging (Sentry, LogRocket)
- [ ] Deploy to Heroku/Railway
- [ ] Set up automated backups
- [ ] Configure monitoring (Uptime, performance)
