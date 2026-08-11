# Automated Data Entry and Management System

An automated job registration and management system developed for **SH TECHINFO** to streamline customer data entry, job tracking, customer communication, and receipt generation.

## Project Status

*Completed and Operational*

The system was successfully developed and submitted to SH TECHINFO on July 9, 2024.

## Project Objectives

The main objectives of the project were:

- Automate customer and job data entry.
- Reduce manual data entry and human errors.
- Store customer and job information in a centralized database.
- Automate customer communication.
- Generate customized PDF receipts automatically.
- Send automated email notifications.
- Generate WhatsApp messages for customers.
- Simplify third-party service management.
- Track job registration and completion.
- Improve the overall efficiency of the company's service process.

---

## System Components

The system consists of three main forms.

### 1. Job Registration Form
The Job Registration Form is used to register new customer jobs and service requests.

### 2. Third-Party Service Form
The Third-Party Service Form is used to manage devices or products that are sent to external service providers.

The system can retrieve existing customer and job information using a reference number. This reduces duplicate data entry and makes it easier for staff to manage third-party service requests.
(for Privacy concern Ill didnt ADD)

### 3. Job Completed Form
The Job Completed Form is used to record information when a customer job has been completed.

----

## Development Details

### Frontend

The user interfaces and forms were developed using:

- HTML5
- CSS3
- JavaScript

These technologies were used to create the forms for customer registration, third-party service management, and completed jobs.

### Backend

**Google Apps Script** was used as the backend and automation layer.
Google Sheets was preferred because it provided a simple, accessible, and cost-effective solution for the company's requirements without requiring a separate database server.

### Database / Data Storage

**Job Registration Sheet Structure**

| Date & Time | Name | Phone Number | Email Address | Type | Company Name | Address | Device | Password | Brand & Model | Serial Number | Accessories | Problems | Warranty | Venue | Issued By | Collected By | Message Text | Mail Status | Receipt Link | Receipt PDF Complete | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|

**Job Completed Sheet Structure**

| Name | Email Address | Phone Number | Address | Device | Problems | Brand & Model | Accessories | Warranty | Serial No | Technical Report | Venue | Delivery Date | Delivered By | Received By | Mail Status | Receipt Link | Receipt PDF Complete | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|


