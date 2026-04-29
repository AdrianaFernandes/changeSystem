# Work Items by Area Path Tables - Design Specification

**Date:** 2026-04-29  
**Project:** TR-Change-System  
**Feature:** Multiple tables displaying Azure DevOps work items grouped by Area Path  

## Context

The TR-Change-System delivery follow-up template currently displays Azure DevOps query results in a single comprehensive table. Users have requested an additional visualization that groups work items by Area Path, with each selected Area Path displaying its own dedicated table above the existing "Pendências da Última Reunião" section.

This enhancement will help Change Agents better visualize and organize work items by organizational areas, providing clearer visibility into delivery status across different teams and components.

## Requirements Summary

- **Trigger:** Display tables when "Executar Query" button is pressed
- **Scope:** Show all work items from the query, grouped by Area Path
- **Quantity:** One table per selected Area Path (3 Area Paths = 3 tables)
- **Behavior:** Always display when query executes, even if empty
- **Functionality:** Read-only visualization (no editing capabilities)
- **Additional Features:** None (search functionality removed per user preference)

## Architecture

### 1. Data Flow Integration

The new feature integrates seamlessly with the existing query execution flow:

```
User executes query → executarQueryWIQL()
    ↓
Populate existing results table (unchanged)
    ↓
[NEW] Group work items by Area Path
    ↓
[NEW] Create table for each selected Area Path
    ↓
Display above "Pendências da Última Reunião"
```

### 2. Positioning and Layout

**Location:** Insert between existing query results section (line ~2486) and "Pendências da Última Reunião" section (line ~2491)

**Visual Hierarchy:**
```
📊 Query Azure DevOps
├── Existing comprehensive results table
└── Export/Clear buttons

🎯 Work Items por Area Path [NEW SECTION]
├── [Area Path 1] (X work items)
│   └── Dedicated table with 8 columns
├── [Area Path 2] (Y work items)  
│   └── Dedicated table with 8 columns
└── [Area Path N] (Z work items)
    └── Dedicated table with 8 columns

📋 Pendências da Última Reunião
└── Existing pending items table
```

### 3. Data Processing Logic

```javascript
function processWorkItemsByAreaPath(workItems, selectedAreaPaths) {
    const groupedByArea = {};
    
    // Group work items by Area Path
    workItems.forEach(item => {
        const areaPath = item.fields['System.AreaPath'];
        if (selectedAreaPaths.includes(areaPath)) {
            if (!groupedByArea[areaPath]) {
                groupedByArea[areaPath] = [];
            }
            groupedByArea[areaPath].push(item);
        }
    });
    
    return groupedByArea;
}
```

## Component Design

### 1. Section Structure

Each Area Path section follows the established `.section-card` pattern:

```html
<div class="section-card" style="border-left: 4px solid var(--tr-green-mid);">
    <h2>🎯 [Area Path Name] ([X] work items)</h2>
    <p style="color:var(--gray-500); font-size:0.82rem;">
        Work items específicos desta área organizacional
    </p>
    <table class="ed-table" id="tbl-area-path-[index]">
        <!-- Table content -->
    </table>
</div>
```

### 2. Table Schema

**Table ID Pattern:** `tbl-area-path-0`, `tbl-area-path-1`, etc.

| Column | Azure DevOps Field | Width | Format | Description |
|--------|-------------------|--------|---------|-------------|
| **ID** | `System.Id` | 80px | Link | Clickable work item ID |
| **Work Item** | `System.WorkItemType` | 100px | Badge | Type with color coding |
| **Status** | `System.State` | 90px | Badge | State with status colors |
| **Target Date** | `Microsoft.VSTS.Scheduling.TargetDate` | 100px | Date | Formatted date |
| **Title** | `System.Title` | Flexible | Text | Work item title |
| **Tags** | `System.Tags` | 120px | Tags | Comma-separated tags |
| **Start Date** | `Microsoft.VSTS.Scheduling.StartDate` | 100px | Date | Formatted date |
| **Committed** | `Custom.CommittedDate` | 100px | Date | Custom field date |

### 3. Visual Styling

**Consistency with Existing Design:**
- Uses `.ed-table` class for consistent table styling
- Headers use `var(--gray-50)` background
- Status badges utilize existing `getStateClass()` function
- Date formatting uses existing `formatDate()` function
- Links follow Azure DevOps URL pattern from line 10720

**Status Badge Colors:**
- New: Gray badge
- Active: Blue badge  
- Resolved: Orange badge
- Closed/Done: Green badge

## Implementation Strategy

### 1. Function Integration Points

**Primary Integration:** Modify `preencherTabelaResultados()` function (line 10664) to:
1. Populate existing comprehensive table (unchanged behavior)
2. Call new `createAreaPathTables(workItems, obterAreaPathsSelecionadas())` function
3. Show/hide area path container based on results

**New Functions Required:**
- `createAreaPathTables(workItems, selectedAreaPaths)`
- `populateAreaPathTable(areaPath, workItems)`
- Utilize existing `obterAreaPathsSelecionadas()` function (line 10626)

### 2. HTML Template Modifications

**Location:** Insert new section structure between lines 2486-2491 in `delivery-follow-up.html`

**Dynamic Generation:** Tables created dynamically via JavaScript (not static HTML)

**Container Structure:**
```html
<div id="work-items-by-area-container" style="display: none;">
    <!-- Dynamically generated area path sections -->
</div>
```

### 3. CSS Integration

No new CSS required - leverages existing classes:
- `.section-card` for section containers
- `.ed-table` for table structure  
- Existing status badge classes
- Current typography and spacing variables

### 4. Error Handling

**Empty Area Path Scenarios:**
- Selected Area Path with 0 work items: Show table with "Nenhum work item encontrado" message
- No Area Paths selected: Hide entire section (show only original query results)

**Data Validation:**
- Handle missing Area Path field values
- Graceful fallback for undefined custom fields

## Technical Specifications

### 1. Field Mappings

| Display Column | Azure DevOps API Field | Fallback Value |
|---------------|------------------------|----------------|
| ID | `System.Id` | - |
| Work Item | `System.WorkItemType` | "Unknown" |
| Status | `System.State` | "New" |
| Target Date | `Microsoft.VSTS.Scheduling.TargetDate` | "-" |
| Title | `System.Title` | "Untitled" |
| Tags | `System.Tags` | "" |
| Start Date | `Microsoft.VSTS.Scheduling.StartDate` | "-" |
| Committed | `Custom.CommittedDate` | "-" |

### 2. Performance Considerations

**Data Processing:** O(n) complexity for grouping work items by Area Path
**Memory Usage:** No data duplication - references to existing work item objects
**Rendering:** Efficient DOM creation using DocumentFragment for multiple tables

### 3. Browser Compatibility

Compatible with existing system requirements:
- Uses standard JavaScript ES6+ features already in use
- No additional dependencies required
- Follows existing DOM manipulation patterns

## Verification Plan

### 1. Functional Testing

**Test Scenarios:**
1. **Single Area Path:** Select 1 Area Path, verify 1 table appears
2. **Multiple Area Paths:** Select 3 Area Paths, verify 3 tables appear
3. **Empty Results:** Area Path with no work items shows empty table
4. **No Selection:** No Area Paths selected shows no additional tables
5. **Mixed Data:** Some Area Paths with items, some empty

**Field Validation:**
- All 8 columns display correct data
- Dates formatted properly
- Status badges show correct colors
- Links navigate to correct Azure DevOps work items

### 2. Integration Testing

**With Existing Features:**
- Original query results table unchanged
- Export functionality works on original table
- Clear functionality works correctly
- Azure DevOps authentication remains functional

**UI Consistency:**
- Visual styling matches existing sections
- Responsive behavior consistent
- Loading states work properly

### 3. Edge Cases

**Data Edge Cases:**
- Work items missing custom fields
- Very long Area Path names
- Special characters in Area Path names
- Large number of work items (100+ per area)

**User Interaction Edge Cases:**
- Rapid query re-execution
- Changing Area Path selection between queries
- Browser back/forward navigation

## Success Criteria

✅ **Primary Objective:** Tables appear above "Pendências da Última Reunião" when query is executed  
✅ **Data Accuracy:** All 8 specified fields display correctly for each work item  
✅ **Grouping Logic:** One table per selected Area Path, filtered correctly  
✅ **Visual Integration:** Seamless integration with existing design system  
✅ **Performance:** No noticeable impact on query execution time  
✅ **Reliability:** Handles edge cases gracefully without breaking existing functionality  

## Future Considerations

**Potential Enhancements (Not in Scope):**
- Export functionality per Area Path table
- Sorting capabilities within each table
- Collapsible/expandable Area Path sections
- Custom field selection per table

**Maintenance Notes:**
- Monitor Azure DevOps API changes affecting field availability
- Consider performance optimization if Area Path count scales significantly
- Keep styling synchronized with future design system updates