# Manual Test Cases for Azure Test Plans

This document contains detailed manual test cases designed to be executed via **Azure Test Plans**. These test cases complement the automated testing suite and focus on scenarios that require human judgment, exploratory testing, or user experience validation.

## Integration with Azure Test Plans

These test cases can be imported into Azure Test Plans for:
- Test case management and organization
- Test execution tracking and status updates
- Linking to user stories and requirements
- Defect tracking and reporting
- Test run history and analytics
- Team collaboration and assignments

## Test Case Format

Each test case includes:
- **Test Case ID:** Unique identifier
- **Title:** Descriptive name
- **Preconditions:** Setup requirements before testing
- **Steps:** Detailed step-by-step instructions
- **Expected Result:** What should happen
- **Priority:** Critical, High, Medium, Low
- **Status:** Draft, Ready, Active

---

## Test Cases

### TC-001: User Login with Valid Credentials

**Test Case ID:** TC-001  
**Title:** Verify user can successfully login with valid credentials  
**Priority:** Critical  
**Status:** Ready  

**Preconditions:**
- Application is accessible and running
- Valid user account exists in the system
- User is on the login page

**Test Steps:**
1. Navigate to the application login page
2. Enter valid username in the "Username" field
3. Enter valid password in the "Password" field
4. Click the "Login" button

**Expected Result:**
- User is successfully authenticated
- User is redirected to the dashboard/home page
- Welcome message displays the user's name
- No error messages are shown

**Test Data:**
- Username: testuser@example.com
- Password: ValidPass123!

---

### TC-002: User Login with Invalid Credentials

**Test Case ID:** TC-002  
**Title:** Verify appropriate error message for invalid login credentials  
**Priority:** High  
**Status:** Ready  

**Preconditions:**
- Application is accessible and running
- User is on the login page

**Test Steps:**
1. Navigate to the application login page
2. Enter invalid username in the "Username" field
3. Enter invalid password in the "Password" field
4. Click the "Login" button

**Expected Result:**
- Login attempt fails
- Error message displays: "Invalid username or password"
- User remains on the login page
- Password field is cleared for security
- Username field retains the entered value

**Test Data:**
- Username: invaliduser@example.com
- Password: WrongPassword123

---

### TC-003: Navigation Menu Functionality

**Test Case ID:** TC-003  
**Title:** Verify all navigation menu items are functional and lead to correct pages  
**Priority:** High  
**Status:** Ready  

**Preconditions:**
- User is logged into the application
- User is on the home/dashboard page

**Test Steps:**
1. Identify all navigation menu items
2. Click on "Dashboard" menu item
3. Verify Dashboard page loads correctly
4. Click on "Profile" menu item
5. Verify Profile page loads correctly
6. Click on "Settings" menu item
7. Verify Settings page loads correctly
8. Click on "Logout" menu item
9. Verify user is logged out and redirected to login page

**Expected Result:**
- All navigation menu items are visible and clickable
- Each menu item navigates to the correct page
- Page content matches the selected menu item
- URL updates to reflect the current page
- No broken links or 404 errors occur

---

### TC-004: Search Functionality

**Test Case ID:** TC-004  
**Title:** Verify search functionality returns accurate results  
**Priority:** Medium  
**Status:** Ready  

**Preconditions:**
- User is logged into the application
- Database contains searchable data
- User is on a page with search functionality

**Test Steps:**
1. Locate the search input field
2. Enter a valid search term (e.g., "test item")
3. Click the "Search" button or press Enter
4. Review the search results displayed
5. Verify results are relevant to the search term
6. Click on a search result
7. Verify the correct detail page opens

**Expected Result:**
- Search executes without errors
- Results are displayed in a clear, organized format
- Only relevant results matching the search term are shown
- Result count is displayed (e.g., "5 results found")
- Each result is clickable and leads to the correct detail page
- "No results found" message appears for searches with no matches

**Test Data:**
- Valid search term: "test"
- Invalid search term: "xyzabc123notfound"

---

### TC-005: Form Submission with Required Fields

**Test Case ID:** TC-005  
**Title:** Verify form validation for required fields and successful submission  
**Priority:** High  
**Status:** Ready  

**Preconditions:**
- User is logged into the application
- User navigates to a page with a form (e.g., "Create New Item")

**Test Steps:**
1. Navigate to the form page
2. Leave all required fields empty
3. Click the "Submit" button
4. Observe validation messages
5. Fill in all required fields with valid data
6. Click the "Submit" button
7. Verify successful submission

**Expected Result:**
- When required fields are empty:
  - Form submission is prevented
  - Error messages appear near each required field
  - Messages clearly indicate which fields are required
- When all required fields are filled:
  - Form submits successfully
  - Success message or confirmation appears
  - User is redirected to appropriate page (e.g., success page, list view)
  - New data is saved and visible in the system

**Test Data:**
- Required fields: Title, Description, Category
- Valid values:
  - Title: "Test Item"
  - Description: "This is a test description"
  - Category: "General"

---

### TC-006: Error Handling for Network Issues

**Test Case ID:** TC-006  
**Title:** Verify application handles network errors gracefully  
**Priority:** Medium  
**Status:** Ready  

**Preconditions:**
- User is logged into the application
- Browser developer tools are available

**Test Steps:**
1. Open browser developer tools
2. Navigate to the Network tab
3. Set network throttling to "Offline" mode
4. Attempt to perform an action that requires network connectivity (e.g., save data)
5. Observe the application behavior
6. Re-enable network connectivity
7. Retry the action

**Expected Result:**
- When offline:
  - User-friendly error message appears: "Network connection lost. Please check your connection."
  - Action does not complete
  - Application does not crash or show technical error details
  - Loading spinners/indicators stop appropriately
- When online again:
  - Action completes successfully
  - Data is saved/loaded as expected
  - Application returns to normal operation

---

### TC-007: Data Persistence After Page Reload

**Test Case ID:** TC-007  
**Title:** Verify user data persists after browser refresh  
**Priority:** Medium  
**Status:** Ready  

**Preconditions:**
- User is logged into the application
- User has entered data into a form but not submitted

**Test Steps:**
1. Navigate to a form page
2. Fill in several form fields with test data
3. Do NOT submit the form
4. Refresh the browser page (F5 or Ctrl+R)
5. Observe whether the data persists

**Expected Result:**
- For draft/autosave features:
  - Data should persist after refresh (if autosave is implemented)
  - User sees a "Draft saved" indicator
- For standard forms without autosave:
  - Warning message appears before refresh: "You have unsaved changes"
  - User can cancel the refresh or proceed
  - If proceeded, data is cleared (expected behavior)

---

### TC-008: Responsive Design on Mobile Devices

**Test Case ID:** TC-008  
**Title:** Verify application is responsive and usable on mobile devices  
**Priority:** High  
**Status:** Ready  

**Preconditions:**
- Access to mobile device or browser developer tools with device emulation
- Application is accessible

**Test Steps:**
1. Open the application in a mobile browser or device emulator
2. Navigate through key pages: Home, Login, Dashboard, Forms
3. Test navigation menu (hamburger menu if present)
4. Test form inputs and buttons
5. Verify text readability
6. Check image scaling
7. Test scrolling behavior
8. Rotate device to test landscape mode

**Expected Result:**
- All pages render correctly on mobile viewports
- Navigation menu adapts to mobile (collapsible/hamburger menu)
- Text is readable without horizontal scrolling
- Buttons and links are easily tappable (minimum 44x44px touch target)
- Images scale appropriately without overflow
- Forms are usable and inputs are accessible
- No content is cut off or hidden
- Landscape mode works correctly

**Test Devices:**
- iPhone 12 (iOS)
- Samsung Galaxy S21 (Android)
- iPad Pro (iOS tablet)

---

### TC-009: Browser Compatibility

**Test Case ID:** TC-009  
**Title:** Verify application functions correctly across different browsers  
**Priority:** High  
**Status:** Ready  

**Preconditions:**
- Access to multiple browsers: Chrome, Firefox, Safari, Edge
- Application is accessible

**Test Steps:**
1. Open the application in Google Chrome
2. Perform key user workflows (login, navigation, form submission)
3. Note any issues or inconsistencies
4. Repeat steps 1-3 in Firefox
5. Repeat steps 1-3 in Safari (if on macOS)
6. Repeat steps 1-3 in Microsoft Edge

**Expected Result:**
- Application loads successfully in all browsers
- UI appears consistent across browsers (minor differences acceptable)
- All functionality works as expected
- No console errors related to browser incompatibility
- Forms submit correctly
- Navigation works properly
- Animations and transitions work smoothly

**Browsers to Test:**
- Google Chrome (latest version)
- Mozilla Firefox (latest version)
- Safari (latest version, macOS only)
- Microsoft Edge (latest version)

---

### TC-010: Accessibility - Keyboard Navigation

**Test Case ID:** TC-010  
**Title:** Verify application can be fully navigated using keyboard only  
**Priority:** Medium  
**Status:** Ready  

**Preconditions:**
- Application is accessible
- User has a keyboard available

**Test Steps:**
1. Navigate to the application login page
2. Use only keyboard (Tab, Enter, Arrow keys, Esc) - do not use mouse
3. Tab through all interactive elements
4. Verify focus indicator is visible
5. Press Enter on buttons and links
6. Use arrow keys for dropdowns/menus if applicable
7. Complete a full user workflow using only keyboard

**Expected Result:**
- All interactive elements can be reached with Tab key
- Tab order is logical and follows visual flow
- Focus indicator is clearly visible on all elements
- Enter key activates buttons and links
- Esc key closes modals and dialogs
- Arrow keys navigate through select dropdowns
- No keyboard traps (user can navigate away from all elements)
- Skip links are available for main content

---

## Notes for Test Execution in Azure Test Plans

### Importing Test Cases
1. Export this document or manually create test cases in Azure Test Plans
2. Link test cases to user stories or product backlog items
3. Assign test cases to test suites (e.g., "Smoke Test Suite", "Regression Suite")

### Test Execution
1. Create a test plan in Azure Test Plans
2. Add test suites and test cases
3. Assign testers to test cases
4. Execute tests and mark Pass/Fail for each step
5. Log bugs directly from failed test cases
6. Add comments and attachments (screenshots)

### Reporting
1. Use Azure DevOps Analytics to generate reports
2. Track test pass rates and trends over time
3. Export reports to Power BI for executive dashboards
4. Monitor test coverage metrics

---

**Last Updated:** 2024-02-14  
**Document Owner:** QA Team  
**Review Cycle:** Quarterly
