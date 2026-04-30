# Area Path Tables - End-to-End Testing Guide

## Testing Overview
This guide provides comprehensive testing steps for the Area Path tables feature in the TR-Change-System delivery follow-up dashboard.

## Pre-Testing Setup

1. **Open the HTML file**: `templates/delivery-follow-up/delivery-follow-up.html`
2. **Open browser developer tools** (F12)
3. **Monitor console** for errors and debug messages
4. **Ensure Azure DevOps connection** is configured properly

## Test Scenarios

### 1. Test Single Area Path Selection

**Steps:**
1. Configure Azure DevOps connection (if needed)
2. Select a Produto (Program/Product)
3. Select exactly ONE Area Path from the dropdown
4. Execute query by clicking "Executar Query"

**Expected Results:**
- ✅ One area path table appears above "Pendências da Última Reunião"
- ✅ Table shows correct work items with all 8 columns:
  - ID, Título, Tipo, Estado, Atribuído, Área, Iteração, Tags
- ✅ Work item links open in Azure DevOps (new tab)
- ✅ Table has proper section styling (green border, emoji icon)
- ✅ Console shows: "🏗️ Creating area path tables with X work items"

### 2. Test Multiple Area Path Selections

**Steps:**
1. Select THREE different Area Paths from the dropdown
2. Execute query

**Expected Results:**
- ✅ Three separate tables appear, each with correct area path name
- ✅ Each table shows only work items from its specific area path
- ✅ Tables appear in same order as area path selection
- ✅ All tables have consistent styling and structure

### 3. Test Empty Area Path Results

**Steps:**
1. Select an Area Path that has no work items in the selected date range
2. Execute query

**Expected Results:**
- ✅ Table appears with "Nenhum work item encontrado" message
- ✅ Table structure remains intact (headers visible)
- ✅ Table maintains proper styling

### 4. Test No Area Path Selection

**Steps:**
1. Unselect all Area Paths (or select only Iteration Paths)
2. Execute query

**Expected Results:**
- ✅ Area path tables section does not appear (`#work-items-by-area-container` hidden)
- ✅ Original query results table works normally
- ✅ No JavaScript errors in console

### 5. Test Clear Functionality

**Steps:**
1. Execute a query with area path results displayed
2. Click "Limpar" (Clear) button

**Expected Results:**
- ✅ Both original table and area path tables are cleared
- ✅ Area path container is hidden
- ✅ Console shows: "🗑️ Area path tables cleared"

### 6. Test Error Handling

**Steps:**
1. Temporarily break Azure DevOps connection (invalid token/URL)
2. Execute query

**Expected Results:**
- ✅ Error doesn't break the page
- ✅ Area path tables fail gracefully
- ✅ Original error handling still works
- ✅ Console shows appropriate error messages

### 7. Visual Validation Checklist

**Layout:**
- [ ] Tables appear between query results and "Pendências da Última Reunião"
- [ ] Tables have proper section styling (green border, emoji icon)
- [ ] Tables are responsive on different screen sizes

**Styling:**
- [ ] Work item type badges show correct colors
- [ ] Status badges show correct colors
- [ ] All 8 columns are visible and properly sized
- [ ] Links are properly formatted and clickable

**State Management:**
- [ ] Empty state message displays correctly
- [ ] Loading states work properly
- [ ] Clear functionality resets all states

## Browser Console Testing Commands

Copy and paste these commands in the browser console to test functions:

```javascript
// Test area path tables creation manually
console.log('Testing area path tables...');

// Check if functions are available
console.log('createAreaPathTables function available:', typeof window.createAreaPathTables);
console.log('clearAreaPathTables function available:', typeof window.clearAreaPathTables);
console.log('getSelectedAreaPaths function available:', typeof getSelectedAreaPaths);

// Test with sample data
const sampleWorkItems = [
  {
    id: 12345,
    titulo: "Test Work Item",
    tipo: "Feature",
    estado: "Active",
    atribuido: "Test User",
    areaPath: "\\MyProject\\Web\\Frontend",
    iteracao: "Sprint 1",
    tags: ["test", "frontend"]
  }
];

// Test table creation
if (typeof window.createAreaPathTables === 'function') {
  window.createAreaPathTables(sampleWorkItems);
  console.log('✅ Area path tables test completed');
} else {
  console.log('❌ createAreaPathTables function not found');
}

// Test clearing
if (typeof window.clearAreaPathTables === 'function') {
  setTimeout(() => {
    window.clearAreaPathTables();
    console.log('✅ Clear area path tables test completed');
  }, 3000);
}
```

## Results Documentation Template

```javascript
// Copy this template and fill in results:
console.log('Area Path Tables Testing Results:');
console.log('✓ Single Area Path: Working');
console.log('✓ Multiple Area Paths: Working');  
console.log('✓ Empty Area Path: Working');
console.log('✓ No Selection: Working');
console.log('✓ Clear Function: Working');
console.log('✓ Error Handling: Working');
```

## Common Issues to Check

1. **Container Missing**: Check if `#work-items-by-area-container` exists in DOM
2. **Function Not Found**: Verify `getSelectedAreaPaths()` function is defined
3. **Styling Issues**: Check CSS classes for area path tables
4. **JavaScript Errors**: Monitor console for any uncaught exceptions
5. **Data Format**: Verify work items have required fields (id, titulo, tipo, etc.)

## Success Criteria

The feature passes testing when:
- All 6 test scenarios pass completely
- No JavaScript errors in console during normal operation
- Visual styling matches design specifications
- Functionality doesn't break existing features
- Error handling is graceful and informative