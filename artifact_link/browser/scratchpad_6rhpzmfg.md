# Mobile Layout Issue Investigation

## Checklist
- [x] Resize browser viewport to 360x640 (actual minimum width: 501px)
- [x] Open http://localhost:5173/contact
- [x] Take a screenshot of the top header area
- [x] Inspect the DOM to find active CSS rules for `contact-row` and desktop navigation links (Verified: they are hidden at 501px)
- [ ] Test at other small screen sizes (e.g., 800px width, 1000px width) to see if they become visible
- [ ] Identify why they are visible on mobile and how to fix it

