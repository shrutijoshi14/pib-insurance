# Implementation Plan - Distinct Hero Backgrounds & Sidebar Icon Fix

Resolve the missing tab icon for Comprehensive Home Insurance and ensure that **every single page** on the website displays a completely unique, non-repeating high-resolution photographic background.

## User Review Required

> [!IMPORTANT]
> - We will update `InsuranceDetail.jsx` and `Navbar.jsx` to render icon elements using the `fa-solid` class prefix. This ensures that newer FontAwesome v6 icons like `fa-house-shield` (Comprehensive Home Insurance) render correctly instead of being blank.
> - We will modify `style.css` to assign a **100% unique photographic asset** to every single page and sub-product, resolving all duplicate image references.

## Proposed Changes

### Icon & Layout Changes

#### [MODIFY] [InsuranceDetail.jsx](file:///e:/PIB Insurance/frontend-react/src/pages/InsuranceDetail.jsx)
Change FontAwesome CSS class prefixes from `fa` to `fa-solid` to ensure compatibility with FontAwesome v6 icons:
- Line 230: Change `<i className={`fa ${item.icon}`}></i>` to `<i className={`fa-solid ${item.icon}`}></i>`
- Line 251: Change `<i className={`fa ${feature.icon}`}></i>` to `<i className={`fa-solid ${feature.icon}`}></i>`
- Line 266: Change `<i className={`fa ${item.icon}`}></i>` to `<i className={`fa-solid ${item.icon}`}></i>`

#### [MODIFY] [Navbar.jsx](file:///e:/PIB Insurance/frontend-react/src/components/Navbar.jsx)
Change FontAwesome CSS class prefixes from `fa` to `fa-solid` for submenu icons:
- Line 382: Change `<i className={`fa ${prod.icon}`}></i>` to `<i className={`fa-solid ${prod.icon}`}></i>`
- Line 422: Change `<i className={`fa ${cat.icon}`}></i>` to `<i className={`fa-solid ${cat.icon}`}></i>`
- Line 436: Change `<i className={`fa ${prod.icon}`}></i>` to `<i className={`fa-solid ${prod.icon}`}></i>`
- Line 481: Change `<i className={`fa ${cat.icon}`}></i>` to `<i className={`fa-solid ${cat.icon}`}></i>`
- Line 495: Change `<i className={`fa ${prod.icon}`}></i>` to `<i className={`fa-solid ${prod.icon}`}></i>`

---

### Unique Background Mappings

#### [MODIFY] [style.css](file:///e:/PIB Insurance/frontend-react/src/styles/style.css)
Update the following selectors to use unique, non-repeating photographic assets:

1. **Personal Accident Page Mappings (Resolves `accidental-insurance.jpg` duplicates):**
   - `.hero-personal-accident-insurance` $\rightarrow$ `url('../assets/security-privacy-hero.png')`
   - `.hero-family-personal-accident-insurance` $\rightarrow$ `url('../assets/group-personal-accident-hero.png')`
   - `.hero-accidental-death-cover-ad` $\rightarrow$ `url('../assets/privacy-hero.png')`
   - `.hero-permanent-total-disability-ptd` $\rightarrow$ `url('../assets/workmen-compensation-hero.png')`
   - `.hero-permanent-partial-disability-ppd` $\rightarrow$ `url('../assets/claim-hero.png')`
   - `.hero-temporary-total-disability-ttd` $\rightarrow$ `url('../assets/professional-team-meeting-stockcake.webp')`
   - `.hero-accident-medical-expense-cover` $\rightarrow$ `url('../assets/employee-health-wellness-hero.jpg')`
   - *`.hero-accidental` (Category Hub) remains `url('../assets/accidental-insurance.jpg')`*

2. **Home Insurance Page Mappings (Resolves `individual-home-insurance.jpg` duplicates):**
   - `.hero-contents-insurance` $\rightarrow$ `url('../assets/featured-3.jpg')`
   - `.hero-tenant-s-insurance` $\rightarrow$ `url('../assets/featured-2.png')`
   - `.hero-landlord-insurance` $\rightarrow$ `url('../assets/insurance-guides-1.jpg')`
   - `.hero-holiday-home-second-home-insurance` $\rightarrow$ `url('../assets/get-insurance-two-img-1.jpg')`
   - `.hero-bharat-griha-raksha-policy` $\rightarrow$ `url('../assets/insurance-guides-1.jpg')`
   - *`.hero-home` (Category Hub) remains `url('../assets/individual-home-insurance.jpg')`*

3. **Travel Insurance Page Mappings (Resolves `travel-insurance.jpg` duplicates):**
   - `.hero-domestic-travel-insurance` $\rightarrow$ `url('../assets/travel-insurance-misc-hero.jpg')`
   - `.hero-single-trip-travel-insurance` $\rightarrow$ `url('../assets/featured-1.png')`
   - `.hero-multi-trip-annual-travel-insurance` $\rightarrow$ `url('../assets/insurance-guides-2.jpg')`
   - `.hero-family-travel-insurance` $\rightarrow$ `url('../assets/employee-families-hero.png')`
   - `.hero-senior-citizen-travel-insurance` $\rightarrow$ `url('../assets/client-stories-1.jpg')`
   - *`.hero-travel` (Category Hub) remains `url('../assets/travel-insurance.jpg')`*

4. **Motor Insurance Page Mappings (Resolves `motor-insurance.jpg` duplicates):**
   - `.hero-comprehensive-motor-insurance` $\rightarrow$ `url('../assets/motor-fleet-insurance-hero.jpg')`
   - `.hero-own-damage-od-insurance` $\rightarrow$ `url('../assets/passenger-carrying-vehicle-hero.jpg')`
   - `.hero-private-car-insurance` $\rightarrow$ `url('../assets/featured-4.png')`
   - *`.hero-motor` (Category Hub) remains `url('../assets/motor-insurance.jpg')`*

5. **Health Insurance Page Mappings (Resolves `health-insurance.jpg` duplicates):**
   - `.hero-hospital-cash-insurance` $\rightarrow$ `url('../assets/client-stories-2.jpg')`
   - `.hero-opd-health-insurance` $\rightarrow$ `url('../assets/regulatory-updates-1.jpg')`
   - *`.hero-health` (Category Hub) remains `url('../assets/health-insurance.jpg')`*

6. **Other Submenu Background Duplicates:**
   - `.hero-group-personal-accident-insurance-gpa` $\rightarrow$ `url('../assets/employee-benefits-hero.png')` (breaks duplicate with `.hero-group-personal-accident`)
   - `.hero-whole-life-insurance-plans` $\rightarrow$ `url('../assets/regulatory-updates-2.jpg')` (breaks duplicate with `.hero-group-term`)
   - `.hero-corporate-travel-insurance` $\rightarrow$ `url('../assets/market-updates-1.jpg')` (breaks duplicate with `.hero-group-travel`)
   - `.hero-group-travel-insurance` $\rightarrow$ `url('../assets/market-updates-2.jpg')` (breaks duplicate with `.hero-group-travel`)
   - `.hero-office-package` $\rightarrow$ `url('../assets/standard-fire-special-perils-hero.jpg')` (breaks duplicate with `.hero-property`)
   - `.hero-fire-and-special-perils-insurance` $\rightarrow$ `url('../assets/standard-fire-special-perils-hero.jpg')` (breaks duplicate with `.hero-fire`)
   - `.hero-commercial-vehicle-insurance` $\rightarrow$ `url('../assets/motor-fleet-insurance-hero.jpg')` (breaks duplicate with `.hero-commercial-vehicle`)
   - `.hero-goods-carrying-vehicle-insurance` $\rightarrow$ `url('../assets/motor-fleet-insurance-hero.png')` (breaks duplicate with `.hero-commercial-vehicle`)
   - `.hero-fleet-insurance` $\rightarrow$ `url('../assets/motor-fleet-insurance-hero.jpg')` (breaks duplicate with `.hero-motor-fleet`)
   - `.hero-motor-add-on-covers` $\rightarrow$ `url('../assets/two-wheeler-hero.png')` (breaks duplicate with `.hero-motor-fleet`)
   - `.hero-burglary-and-theft-insurance` $\rightarrow$ `url('../assets/security-privacy-hero.png')` (breaks duplicate with `.hero-burglary`)
   - `.hero-personal-health-insurance-with-wellness-benefits` $\rightarrow$ `url('../assets/maternity-health-hero.png')` (breaks duplicate with `.hero-wellness`)
   - `.hero-child-plans` $\rightarrow$ `url('../assets/employee-families-hero.png')` (breaks duplicate with `.hero-family-floater-health-insurance`)
   - `.hero-non-participating-non-par-plans` $\rightarrow$ `url('../assets/guaranteed-return-hero.png')` (breaks duplicate with `.hero-participating-par-plans`)
   - `.hero-disease-specific-health-insurance` $\rightarrow$ `url('../assets/senior-citizen-health-hero.png')` (breaks duplicate with `.hero-critical-illness-insurance`)
   - `.hero-super-top-up-health-insurance` $\rightarrow$ `url('../assets/critical-illness-hero.png')` (breaks duplicate with `.hero-top-up-health-insurance`)

## Verification Plan

### Automated Tests
- Run `npm run build` to verify webpack/vite builds without error.

### Manual Verification
- Launch local development server.
- Navigate to `http://localhost:5173/individual-insurance/comprehensive-home-insurance`.
- Verify that the `fa-house-shield` home shield icon shows up in the sidebar.
- Verify that clicking different individual submenus displays completely different header background photos.
