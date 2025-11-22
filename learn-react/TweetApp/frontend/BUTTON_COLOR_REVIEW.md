# Button Color Review - Topic Components

## Current State Analysis

### Issues Found:

1. **Inconsistent Color Schemes:**
   - `TopicBase`: Uses blue theme (✅ good)
   - `TopicCard`: Uses gray buttons (`bg-gray-300`) - inconsistent with blue theme
   - `ButtonGroup`: Uses slate colors (`bg-slate-100`) - different from both
   - `CustomButton` default: Blue (`bg-blue-600`) - good for primary actions
   - `FloatingButton`: Very light gray (`bg-gray-100`) - poor visibility

2. **No Semantic Distinction:**
   - Primary actions (Save, Create, Edit) should be blue
   - Secondary actions (Cancel, Back) should be gray/outline
   - Navigation buttons (Previous/Next) could use a distinct style

3. **Accessibility Concerns:**
   - Gray buttons on gray backgrounds may have contrast issues
   - Light gray FloatingButton may not be visible enough

## Proposed Color Scheme

### Primary Actions (Blue):
- Save, Create, Edit, Add, Submit
- Default `CustomButton` style: `bg-blue-600 hover:bg-blue-700 text-white`

### Secondary Actions (Gray/Outline):
- Cancel, Back, Close
- Style: `bg-gray-200 hover:bg-gray-300 text-gray-800 border border-gray-400`

### Navigation Buttons:
- Previous/Next (ButtonGroup)
- Style: `bg-slate-100 hover:bg-slate-200 text-gray-800 border border-slate-300`

### Floating Buttons:
- Info/Help buttons
- Style: `bg-blue-100 hover:bg-blue-200 text-blue-800 border border-blue-300`

## Files to Update:
1. `TopicCard.jsx` - Action buttons
2. `TopicSectionCard.jsx` - Action buttons  
3. `ButtonGroup.jsx` - Already uses slate (acceptable for navigation)
4. `FloatingButton.jsx` - Improve visibility
5. `TopicTreeViewDashboard.jsx` - Action buttons
