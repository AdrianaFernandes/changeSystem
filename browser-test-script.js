/**
 * Area Path Tables - Browser Testing Script
 * Copy and paste this script into the browser console to run comprehensive tests
 */

console.log('🧪 Area Path Tables - End-to-End Testing');
console.log('=========================================');

// Test Results Object
window.testResults = {
  singleAreaPath: false,
  multipleAreaPaths: false,
  emptyAreaPath: false,
  noSelection: false,
  clearFunction: false,
  errorHandling: false,
  visualValidation: false,
  functionsAvailable: false
};

// 1. Test Function Availability
console.log('\n1. Testing Function Availability');
console.log('--------------------------------');

const functionsCheck = {
  createAreaPathTables: typeof window.createAreaPathTables === 'function',
  clearAreaPathTables: typeof window.clearAreaPathTables === 'function',
  getSelectedAreaPaths: typeof getSelectedAreaPaths === 'function'
};

console.log('createAreaPathTables available:', functionsCheck.createAreaPathTables);
console.log('clearAreaPathTables available:', functionsCheck.clearAreaPathTables);
console.log('getSelectedAreaPaths available:', functionsCheck.getSelectedAreaPaths);

window.testResults.functionsAvailable = Object.values(functionsCheck).every(check => check);

// 2. Test Container Existence
console.log('\n2. Testing Container Existence');
console.log('------------------------------');

const container = document.getElementById('work-items-by-area-container');
console.log('Area path container found:', !!container);
console.log('Container initial display:', container ? container.style.display : 'N/A');

// 3. Test with Sample Data
console.log('\n3. Testing with Sample Data');
console.log('---------------------------');

const sampleWorkItems = [
  {
    id: 12345,
    fields: {
      'System.Id': 12345,
      'System.Title': 'Test Feature Implementation',
      'System.WorkItemType': 'Feature',
      'System.State': 'Active',
      'System.AssignedTo': { displayName: 'John Doe' },
      'System.AreaPath': '\\TestProject\\Web\\Frontend',
      'System.IterationPath': '\\TestProject\\Sprint 1',
      'System.Tags': 'frontend; testing; feature',
      'System.TeamProject': 'TestProject',
      'Microsoft.VSTS.Scheduling.TargetDate': '2026-05-15T00:00:00Z',
      'Microsoft.VSTS.Scheduling.StartDate': '2026-04-01T00:00:00Z',
      'Custom.CommittedDate': '2026-04-15T00:00:00Z'
    }
  },
  {
    id: 12346,
    fields: {
      'System.Id': 12346,
      'System.Title': 'Bug Fix for Authentication',
      'System.WorkItemType': 'Bug',
      'System.State': 'Committed',
      'System.AssignedTo': { displayName: 'Jane Smith' },
      'System.AreaPath': '\\TestProject\\API\\Security',
      'System.IterationPath': '\\TestProject\\Sprint 2',
      'System.Tags': 'security; bug; critical',
      'System.TeamProject': 'TestProject',
      'Microsoft.VSTS.Scheduling.TargetDate': '2026-05-01T00:00:00Z',
      'Microsoft.VSTS.Scheduling.StartDate': '2026-04-20T00:00:00Z',
      'Custom.CommittedDate': '2026-04-25T00:00:00Z'
    }
  },
  {
    id: 12347,
    fields: {
      'System.Id': 12347,
      'System.Title': 'Documentation Update',
      'System.WorkItemType': 'Task',
      'System.State': 'Done',
      'System.AssignedTo': { displayName: 'Bob Wilson' },
      'System.AreaPath': '\\TestProject\\Web\\Frontend',
      'System.IterationPath': '\\TestProject\\Sprint 1',
      'System.Tags': 'documentation; frontend',
      'System.TeamProject': 'TestProject',
      'Microsoft.VSTS.Scheduling.TargetDate': '2026-04-30T00:00:00Z',
      'Microsoft.VSTS.Scheduling.StartDate': '2026-04-15T00:00:00Z',
      'Custom.CommittedDate': '2026-04-28T00:00:00Z'
    }
  }
];

// Mock getSelectedAreaPaths for testing
const originalGetSelectedAreaPaths = window.getSelectedAreaPaths || getSelectedAreaPaths;

// 4. Test Single Area Path
console.log('\n4. Testing Single Area Path Selection');
console.log('------------------------------------');

// Mock single area path selection
window.getSelectedAreaPaths = () => ['\\TestProject\\Web\\Frontend'];

try {
  if (functionsCheck.createAreaPathTables) {
    window.createAreaPathTables(sampleWorkItems);

    // Check if table was created
    setTimeout(() => {
      const tables = container.querySelectorAll('.ed-table');
      console.log('Tables created for single area path:', tables.length);
      console.log('Container visible:', container.style.display !== 'none');

      if (tables.length === 1 && container.style.display !== 'none') {
        window.testResults.singleAreaPath = true;
        console.log('✅ Single area path test PASSED');
      } else {
        console.log('❌ Single area path test FAILED');
      }

      // Continue with multiple area paths test
      testMultipleAreaPaths();
    }, 1000);
  }
} catch (error) {
  console.error('Error in single area path test:', error);
  testMultipleAreaPaths();
}

// 5. Test Multiple Area Paths
function testMultipleAreaPaths() {
  console.log('\n5. Testing Multiple Area Path Selection');
  console.log('--------------------------------------');

  // Mock multiple area path selection
  window.getSelectedAreaPaths = () => [
    '\\TestProject\\Web\\Frontend',
    '\\TestProject\\API\\Security',
    '\\TestProject\\Database\\Core'
  ];

  try {
    if (functionsCheck.createAreaPathTables) {
      window.createAreaPathTables(sampleWorkItems);

      setTimeout(() => {
        const tables = container.querySelectorAll('.ed-table');
        console.log('Tables created for multiple area paths:', tables.length);

        if (tables.length >= 2) {
          window.testResults.multipleAreaPaths = true;
          console.log('✅ Multiple area paths test PASSED');
        } else {
          console.log('❌ Multiple area paths test FAILED');
        }

        // Continue with empty area path test
        testEmptyAreaPath();
      }, 1000);
    }
  } catch (error) {
    console.error('Error in multiple area paths test:', error);
    testEmptyAreaPath();
  }
}

// 6. Test Empty Area Path
function testEmptyAreaPath() {
  console.log('\n6. Testing Empty Area Path Results');
  console.log('---------------------------------');

  // Mock area path with no matching items
  window.getSelectedAreaPaths = () => ['\\TestProject\\Empty\\Area'];

  try {
    if (functionsCheck.createAreaPathTables) {
      window.createAreaPathTables(sampleWorkItems);

      setTimeout(() => {
        const tables = container.querySelectorAll('.ed-table');
        const emptyMessage = container.querySelector('td[colspan="8"]');

        console.log('Tables created for empty area path:', tables.length);
        console.log('Empty message found:', !!emptyMessage);

        if (tables.length > 0 && emptyMessage && emptyMessage.textContent.includes('Nenhum work item encontrado')) {
          window.testResults.emptyAreaPath = true;
          console.log('✅ Empty area path test PASSED');
        } else {
          console.log('❌ Empty area path test FAILED');
        }

        // Continue with no selection test
        testNoSelection();
      }, 1000);
    }
  } catch (error) {
    console.error('Error in empty area path test:', error);
    testNoSelection();
  }
}

// 7. Test No Selection
function testNoSelection() {
  console.log('\n7. Testing No Area Path Selection');
  console.log('---------------------------------');

  // Mock no area path selection
  window.getSelectedAreaPaths = () => [];

  try {
    if (functionsCheck.createAreaPathTables) {
      window.createAreaPathTables(sampleWorkItems);

      setTimeout(() => {
        const isHidden = container.style.display === 'none';
        console.log('Container hidden when no selection:', isHidden);

        if (isHidden) {
          window.testResults.noSelection = true;
          console.log('✅ No selection test PASSED');
        } else {
          console.log('❌ No selection test FAILED');
        }

        // Continue with clear function test
        testClearFunction();
      }, 1000);
    }
  } catch (error) {
    console.error('Error in no selection test:', error);
    testClearFunction();
  }
}

// 8. Test Clear Function
function testClearFunction() {
  console.log('\n8. Testing Clear Function');
  console.log('-------------------------');

  // First create some content
  window.getSelectedAreaPaths = () => ['\\TestProject\\Web\\Frontend'];

  try {
    if (functionsCheck.createAreaPathTables && functionsCheck.clearAreaPathTables) {
      window.createAreaPathTables(sampleWorkItems);

      setTimeout(() => {
        // Now clear it
        window.clearAreaPathTables();

        setTimeout(() => {
          const isHidden = container.style.display === 'none';
          const isEmpty = container.innerHTML === '';

          console.log('Container hidden after clear:', isHidden);
          console.log('Container empty after clear:', isEmpty);

          if (isHidden && isEmpty) {
            window.testResults.clearFunction = true;
            console.log('✅ Clear function test PASSED');
          } else {
            console.log('❌ Clear function test FAILED');
          }

          // Continue with visual validation
          testVisualValidation();
        }, 500);
      }, 1000);
    }
  } catch (error) {
    console.error('Error in clear function test:', error);
    testVisualValidation();
  }
}

// 9. Test Visual Validation
function testVisualValidation() {
  console.log('\n9. Testing Visual Elements');
  console.log('--------------------------');

  // Create content for visual inspection
  window.getSelectedAreaPaths = () => ['\\TestProject\\Web\\Frontend'];

  try {
    if (functionsCheck.createAreaPathTables) {
      window.createAreaPathTables(sampleWorkItems);

      setTimeout(() => {
        // Check visual elements
        const sectionCard = container.querySelector('.section-card');
        const table = container.querySelector('.ed-table');
        const headers = container.querySelectorAll('thead th');
        const workItemLinks = container.querySelectorAll('a[href*="dev.azure.com"]');

        console.log('Section card found:', !!sectionCard);
        console.log('Table found:', !!table);
        console.log('Headers count:', headers.length);
        console.log('Azure DevOps links found:', workItemLinks.length);

        const hasCorrectHeaders = headers.length === 8;
        const hasProperStyling = !!sectionCard;
        const hasWorkingLinks = workItemLinks.length > 0;

        if (hasCorrectHeaders && hasProperStyling) {
          window.testResults.visualValidation = true;
          console.log('✅ Visual validation test PASSED');
        } else {
          console.log('❌ Visual validation test FAILED');
        }

        // Restore original function and show final results
        restoreAndShowResults();
      }, 1000);
    }
  } catch (error) {
    console.error('Error in visual validation test:', error);
    restoreAndShowResults();
  }
}

// 10. Restore and Show Results
function restoreAndShowResults() {
  console.log('\n10. Final Test Results');
  console.log('=====================');

  // Restore original function
  if (originalGetSelectedAreaPaths) {
    window.getSelectedAreaPaths = originalGetSelectedAreaPaths;
  }

  // Show results
  console.log('✅ Functions Available:', window.testResults.functionsAvailable);
  console.log('✅ Single Area Path:', window.testResults.singleAreaPath);
  console.log('✅ Multiple Area Paths:', window.testResults.multipleAreaPaths);
  console.log('✅ Empty Area Path:', window.testResults.emptyAreaPath);
  console.log('✅ No Selection:', window.testResults.noSelection);
  console.log('✅ Clear Function:', window.testResults.clearFunction);
  console.log('✅ Visual Validation:', window.testResults.visualValidation);

  const allTestsPassed = Object.values(window.testResults).every(test => test);

  console.log('\n===================');
  if (allTestsPassed) {
    console.log('🎉 ALL TESTS PASSED!');
  } else {
    console.log('⚠️  SOME TESTS FAILED');
  }
  console.log('===================');

  // Clear test content
  setTimeout(() => {
    if (functionsCheck.clearAreaPathTables) {
      window.clearAreaPathTables();
    }
  }, 3000);
}

console.log('\n🚀 Starting automated tests in 2 seconds...');
// Auto-start tests
setTimeout(() => {
  if (!window.testResults.functionsAvailable) {
    console.log('❌ Required functions not available, skipping automated tests');
    console.log('Please run tests manually using the testing guide');
  }
}, 2000);