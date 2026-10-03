import { GlobalErrorBoundary } from './components/ui/GlobalErrorBoundary';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Home from './pages/Home';

// Route-Level Code Splitting (Reduces initial JS bundle by 80%+ for Google Core Web Vitals)
const Projects = lazy(() => import('./pages/Projects'));
const Amenities = lazy(() => import('./pages/Amenities').then(m => ({ default: m.Amenities || m.default })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact || m.default })));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const About = lazy(() => import('./pages/About').then(m => ({ default: m.About || m.default })));
const LocationHighlights = lazy(() => import('./pages/LocationHighlights').then(m => ({ default: m.LocationHighlights || m.default })));
const Lifestyle = lazy(() => import('./pages/Lifestyle').then(m => ({ default: m.Lifestyle || m.default })));
const TwoBHK = lazy(() => import('./pages/landing/TwoBHK').then(m => ({ default: m.TwoBHK || m.default })));
const ThreeBHK = lazy(() => import('./pages/landing/ThreeBHK').then(m => ({ default: m.ThreeBHK || m.default })));
const FourBHK = lazy(() => import('./pages/landing/FourBHK').then(m => ({ default: m.FourBHK || m.default })));
const NRICorner = lazy(() => import('./pages/NRICorner').then(m => ({ default: m.NRICorner || m.default })));
const Testimonials = lazy(() => import('./pages/Testimonials').then(m => ({ default: m.Testimonials || m.default })));
const TownshipGuide = lazy(() => import('./pages/TownshipGuide').then(m => ({ default: m.TownshipGuide || m.default })));
const MediaCenter = lazy(() => import('./pages/MediaCenter').then(m => ({ default: m.MediaCenter || m.default })));
const BlogPostPage = lazy(() => import('./pages/BlogPost').then(m => ({ default: m.BlogPostPage || m.default })));
const ConnectivityHub = lazy(() => import('./pages/ConnectivityHub').then(m => ({ default: m.ConnectivityHub || m.default })));
const TownshipIntelligence = lazy(() => import('./pages/TownshipIntelligence').then(m => ({ default: m.TownshipIntelligence || m.default })));
const HyperLocalLanding = lazy(() => import('./pages/HyperLocalLanding').then(m => ({ default: m.HyperLocalLanding || m.default })));
const NRIInvestmentHub = lazy(() => import('./pages/NRIInvestmentHub').then(m => ({ default: m.NRIInvestmentHub || m.default })));
const ITProfessionalsHub = lazy(() => import('./pages/ITProfessionalsHub').then(m => ({ default: m.ITProfessionalsHub || m.default })));
const Sustainability = lazy(() => import('./pages/Sustainability').then(m => ({ default: m.Sustainability || m.default })));
const CommunityForum = lazy(() => import('./pages/CommunityForum').then(m => ({ default: m.CommunityForum || m.default })));
const LocationLanding = lazy(() => import('./pages/LocationLanding').then(m => ({ default: m.LocationLanding || m.default })));
const Insights = lazy(() => import('./pages/Insights'));
const Article = lazy(() => import('./pages/Article'));
const LocationsDirectory = lazy(() => import('./pages/LocationsDirectory'));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound || m.default })));
const HTMLSitemap = lazy(() => import('./pages/HTMLSitemap'));
const InsightsLanding = lazy(() => import('./pages/InsightsLanding').then(m => ({ default: m.InsightsLanding || m.default })));
const InsightDetail = lazy(() => import('./pages/InsightDetail').then(m => ({ default: m.InsightDetail || m.default })));
const SiloLanding = lazy(() => import('./pages/SiloLanding').then(m => ({ default: m.SiloLanding || m.default })));
const PrivacyPolicy = lazy(() => import('./pages/legal/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy || m.default })));
const TermsOfService = lazy(() => import('./pages/legal/TermsOfService').then(m => ({ default: m.TermsOfService || m.default })));
const Disclaimer = lazy(() => import('./pages/legal/Disclaimer').then(m => ({ default: m.Disclaimer || m.default })));


// Keep layout components static as they are used on every page
import { FloatingContact } from './components/ui/FloatingContact';
import { CommandPalette } from './components/ui/CommandPalette';
import { CookieConsent } from './components/ui/CookieConsent';
import { Layout } from './components/layout/Layout';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { CustomCursor } from './components/ui/CustomCursor';
import { ExitIntentOffer } from './components/ui/ExitIntentOffer';
import { useEffect } from 'react';

// Lazy load Admin components

import { motion, AnimatePresence } from 'framer-motion';

export const PageLoader = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.8, ease: "easeInOut" }}
    className="min-h-[75vh] flex flex-col items-center justify-center bg-[#E5C07B] fixed inset-0 z-[1000]"
  >
    <div className="w-full max-w-xs px-8">
      {/* Premium minimal expanding line loader */}
      <div className="w-full h-[1px] bg-gray-200 relative overflow-hidden">
        <motion.div 
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full h-full bg-accent"
        />
      </div>
      
      <div className="mt-8 flex flex-col items-center space-y-3">
        <motion.div 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-[10px] font-bold text-white tracking-tight font-semibold"
        >
          Kolte Patil
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-[9px] font-light text-gray-400 tracking-tight font-semibold"
        >
          Life Republic
        </motion.div>
      </div>
    </div>
  </motion.div>
);

function App() {
  const location = useLocation();

  useEffect(() => {
    if (!sessionStorage.getItem('lr_entry_page')) {
      sessionStorage.setItem('lr_entry_page', window.location.pathname);
    }
  }, []);

  return (
    <>
      <GlobalErrorBoundary>
      <CommandPalette />
      <CustomCursor />
      <ExitIntentOffer />
      <FloatingContact />
      <CookieConsent />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />}>
          <Routes location={location} key={location.pathname}>
            {/* Public Routes */}
            <Route path="/" element={
              <Layout ariaLabel="Kolte Patil Life Republic Township Hinjewadi">
                <Home />
              </Layout>
            } />
            <Route path="/projects" element={
              <Layout ariaLabel="Kolte Patil Life Republic Township Hinjewadi Gallery">
                <Projects />
              </Layout>
            } />
            <Route path="/projects/sector-r17b-life-republic" element={<Navigate to="/projects/kolte-patil-life-republic-nora-bungalow-plots-hinjewadi" replace />} />
            <Route path="/projects/:id" element={
              <Layout ariaLabel="Kolte Patil Life Republic Township Project Monograph">
                <ProjectDetails />
              </Layout>
            } />
            <Route path="/project/:id" element={
              <Layout ariaLabel="Kolte Patil Life Republic Township Project Monograph">
                <ProjectDetails />
              </Layout>
            } />
            <Route path="/amenities" element={
              <Layout ariaLabel="Kolte Patil Life Republic Township Amenities">
                <Amenities />
              </Layout>
            } />
            <Route path="/contact" element={
              <Layout ariaLabel="Contact Kolte Patil Life Republic">
              <Contact />
            </Layout>
          } />
          <Route path="/about" element={
            <Layout ariaLabel="About Kolte Patil Life Republic">
              <About />
            </Layout>
          } />

          <Route path="/location" element={
            <Layout ariaLabel="Hinjewadi Location Guide & Strategic Infrastructure">
              <LocationHighlights />
            </Layout>
          } />
          <Route path="/connectivity" element={
            <Layout ariaLabel="Life Republic Connectivity & Infrastructure">
              <ConnectivityHub />
            </Layout>
          } />

          {/* Micro-Landing Pages */}
          <Route path="/2-bhk-flats-in-hinjewadi" element={
            <Layout ariaLabel="2 BHK Flats in Hinjewadi">
              <TwoBHK />
            </Layout>
          } />
          <Route path="/3-bhk-flats-in-hinjewadi" element={
            <Layout ariaLabel="3 BHK Flats in Hinjewadi">
              <ThreeBHK />
            </Layout>
          } />
          <Route path="/4-bhk-flats-in-hinjewadi" element={
            <Layout ariaLabel="4 BHK Flats in Hinjewadi">
              <FourBHK />
            </Layout>
          } />
          <Route path="/row-houses-in-life-republic" element={
            <Layout ariaLabel="Row Houses in Life Republic">
              <Projects />
            </Layout>
          } />
          <Route path="/plots-in-hinjewadi" element={
            <Layout ariaLabel="Plots in Hinjewadi">
              <Projects />
            </Layout>
          } />
          <Route path="/luxury-villas-near-hinjewadi" element={
            <Layout ariaLabel="Luxury Villas near Hinjewadi">
              <Projects />
            </Layout>
          } />

          {/* Location SEO Landing Pages */}
          <Route path="/location/flats-near-hinjewadi" element={
            <Layout ariaLabel="Flats near Hinjewadi Phase 1">
              <LocationLanding
                locationName="Hinjewadi Phase 1"
                distance="5 mins"
                commuteTime="10 mins"
                slug="flats-near-hinjewadi"
              />
            </Layout>
          } />
          <Route path="/location/flats-near-tathawade" element={
            <Layout ariaLabel="Flats near Tathawade">
              <LocationLanding
                locationName="Tathawade"
                distance="10 mins"
                commuteTime="15 mins"
                slug="flats-near-tathawade"
              />
            </Layout>
          } />
          <Route path="/location/flats-near-punawale" element={
            <Layout ariaLabel="Flats near Punawale">
              <LocationLanding
                locationName="Punawale"
                distance="7 mins"
                commuteTime="12 mins"
                slug="flats-near-punawale"
              />
            </Layout>
          } />
          <Route path="/location/flats-near-wakad" element={
            <Layout ariaLabel="Flats near Wakad Hinjewadi Road">
              <LocationLanding
                locationName="Wakad"
                distance="12 mins"
                commuteTime="20 mins"
                slug="flats-near-wakad"
              />
            </Layout>
          } />
          <Route path="/location/flats-near-marunji" element={
            <Layout ariaLabel="Flats near Marunji Road Hinjewadi">
              <LocationLanding
                locationName="Marunji"
                distance="0 mins"
                commuteTime="Walking Distance"
                slug="flats-near-marunji"
              />
            </Layout>
          } />

          {/* Dynamic Sector/Locality Landing Pages */}
          <Route path="/location/:slug" element={
            <Layout ariaLabel="Sovereign Sector Landing Page">
              <HyperLocalLanding />
            </Layout>
          } />

          
          {/* Real Estate Market Reports / Long Form Content */}
          <Route path="/market-reports" element={
            <Layout ariaLabel="Pune Real Estate Market Reports">
              <Insights />
            </Layout>
          } />
          <Route path="/market-reports/:slug" element={
            <Layout ariaLabel="Real Estate Market Analysis">
              <Article />
            </Layout>
          } />

          {/* Locations Directory */}
          <Route path="/locations-directory" element={
            <Layout ariaLabel="Pune Real Estate Locations Directory">
              <LocationsDirectory />
            </Layout>
          } />

          {/* Programmatic SEO (10,000+ Permutations) */}
          <Route path="/search/:siloSlug" element={
            <Layout ariaLabel="Kolte Patil Real Estate Search">
              <SiloLanding />
            </Layout>
          } />

          {/* Insights / Knowledge Hub */}
          <Route path="/insights" element={
            <Layout ariaLabel="Pune Real Estate Insights">
              <InsightsLanding />
            </Layout>
          } />
          <Route path="/insights/:slug" element={
            <Layout ariaLabel="Real Estate Market Analysis">
              <InsightDetail />
            </Layout>
          } />

          {/* Legal Compliance */}
          <Route path="/privacy-policy" element={
            <Layout ariaLabel="Privacy Policy">
              <PrivacyPolicy />
            </Layout>
          } />
          <Route path="/terms-of-service" element={
            <Layout ariaLabel="Terms of Service">
              <TermsOfService />
            </Layout>
          } />
          <Route path="/disclaimer" element={
            <Layout ariaLabel="Legal Disclaimer">
              <Disclaimer />
            </Layout>
          } />

          {/* HTML Sitemap */}
          <Route path="/sitemap" element={
            <Layout ariaLabel="Sovereign Site Directory">
              <HTMLSitemap />
            </Layout>
          } />

          {/* Phase 4 Routes */}
          <Route path="/nri-corner" element={
            <Layout ariaLabel="NRI Corner & Global Investment Desk">
              <NRICorner />
            </Layout>
          } />
          <Route path="/township-intelligence" element={
            <Layout ariaLabel="Hinjewadi Township Intelligence & Infrastructure Hub">
              <TownshipIntelligence />
            </Layout>
          } />
          <Route path="/nri-investment-guide" element={
            <Layout ariaLabel="Kolte Patil Life Republic NRI Investment Guide">
              <NRIInvestmentHub />
            </Layout>
          } />
          <Route path="/it-professionals-hinjewadi" element={
            <Layout ariaLabel="IT Professionals Hub | Life Republic Hinjewadi">
              <ITProfessionalsHub />
            </Layout>
          } />
          <Route path="/testimonials" element={
            <Layout ariaLabel="Resident Testimonials & Success Stories">
              <Testimonials />
            </Layout>
          } />
          <Route path="/township-guide" element={
            <Layout ariaLabel="The Ultimate Guide to Kolte Patil Life Republic Hinjewadi">
              <TownshipGuide />
            </Layout>
          } />
          <Route path="/media-center" element={
            <Layout ariaLabel="Media Center & Press Monographs">
              <MediaCenter />
            </Layout>
          } />
          <Route path="/media-center/:slug" element={
            <Layout ariaLabel="Sovereign Media Monograph">
              <BlogPostPage />
            </Layout>
          } />
          <Route path="/lifestyle" element={
            <Layout ariaLabel="Life at Life Republic - 390 Acre Township">
              <Lifestyle />
            </Layout>
          } />
          <Route path="/sustainability" element={
            <Layout ariaLabel="Sustainability & Green Initiatives at Life Republic">
              <Sustainability />
            </Layout>
          } />
          <Route path="/community-hub" element={
            <Layout ariaLabel="Resident Hub & Community Forum at Life Republic">
              <CommunityForum />
            </Layout>
          } />
          {/* Catch-all for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </Suspense>
      </AnimatePresence>
      </GlobalErrorBoundary>
    </>
  );
}

export default App;
