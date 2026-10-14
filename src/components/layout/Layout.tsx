import React, { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingContact } from '../ui/FloatingContact';
import { WhatsAppWidget } from '../ui/WhatsAppWidget';
import { Breadcrumbs } from '../seo/Breadcrumbs';
import { NRIBar } from '../ui/NRIBar';

const EnquiryModal = lazy(() => import('../ui/EnquiryModal').then(m => ({ default: m.EnquiryModal })));
const NeuralSearch = lazy(() => import('../ui/NeuralSearch').then(m => ({ default: m.NeuralSearch })));
const TownshipAgent = lazy(() => import('../sections/TownshipAgent').then(m => ({ default: m.TownshipAgent })));
const ExitIntentModal = lazy(() => import('../ui/ExitIntentModal').then(m => ({ default: m.ExitIntentModal })));

interface LayoutProps {
  children: React.ReactNode;
  ariaLabel?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, ariaLabel }) => {
  const location = useLocation();
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [enquiryProject, setEnquiryProject] = useState<string | undefined>(undefined);
  const [enquiryType, setEnquiryType] = useState<string | undefined>(undefined);

  useEffect(() => {
    const handleEnquiryOpen = (e: any) => {
        const proj = e.detail?.project || e.detail?.projectName || e.detail?.cluster;
        const typ = e.detail?.type || e.detail?.source || 'Priority Site Visit';
        setEnquiryProject(proj);
        setEnquiryType(typ);
        setIsEnquiryOpen(true);
    };
    const handleSearchOpen = () => setIsSearchOpen(true);
    
    window.addEventListener('open-enquiry-modal', handleEnquiryOpen as any);
    window.addEventListener('open-neural-search', handleSearchOpen);

    const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey)) {
            if (e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen(prev => !prev);
            }
        }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('open-enquiry-modal', handleEnquiryOpen);
      window.removeEventListener('open-neural-search', handleSearchOpen);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-[75vh] bg-transparent flex flex-col font-sans selection:bg-accent selection:text-[#202124] overflow-x-hidden">
      <NRIBar />
      <Navbar />
      <Breadcrumbs />
      <main className="flex-grow" aria-label={ariaLabel}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: "circOut" }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <FloatingContact />
      <Suspense fallback={null}>
        <TownshipAgent />
        {isEnquiryOpen && (
          <EnquiryModal 
            isOpen={isEnquiryOpen}
            onClose={() => {
                setIsEnquiryOpen(false);
                setEnquiryProject(undefined);
                setEnquiryType(undefined);
            }}
            projectName={enquiryProject}
            enquiryType={enquiryType}
          />
        )}
        {isSearchOpen && (
          <NeuralSearch 
            isOpen={isSearchOpen}
            onClose={() => setIsSearchOpen(false)}
          />
        )}
        <ExitIntentModal />
      </Suspense>
    </div>
  );
};
