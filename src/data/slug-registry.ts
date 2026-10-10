export const ID_TO_SLUG: Record<string, string> = {
    'duet': 'kolte-patil-life-republic-duet-premium-2-bhk-flats-hinjewadi',
    'arezo': 'kolte-patil-life-republic-arezo-efficient-2-bhk-flats-hinjewadi',
    'canvas': 'kolte-patil-life-republic-canvas-luxury-3-4-bhk-flats-hinjewadi',
    'atmos': 'kolte-patil-life-republic-atmos-modern-2-3-bhk-flats-hinjewadi',
    '24k-espada': 'kolte-patil-life-republic-24k-espada-ultra-luxury-row-houses-hinjewadi',
    'sound-of-soul': 'kolte-patil-life-republic-sound-of-soul-luxury-4-bhk-row-houses-hinjewadi',
    'aros': 'kolte-patil-life-republic-aros-premium-2-3-bhk-flats-hinjewadi',
    'universe': 'kolte-patil-life-republic-universe-luxury-1-2-bhk-flats-hinjewadi',
    'first-avenue': 'kolte-patil-life-republic-first-avenue-premium-2-3-bhk-hinjewadi',
    'villas': 'kolte-patil-life-republic-villas-hinjewadi',
    'bungalows': 'kolte-patil-life-republic-bungalows-hinjewadi',
    'echoes': 'kolte-patil-life-republic-echoes-new-launch-2-2-5-bhk-hinjewadi',
    'qrious': 'kolte-patil-life-republic-qrious-smart-2-3-bhk-homes-hinjewadi',
    'oro-avenue': 'kolte-patil-life-republic-oro-avenue-smart-1-2-bhk-hinjewadi',
    'i-towers': 'kolte-patil-life-republic-i-towers-smart-homes-hinjewadi',
    'i-tower': 'kolte-patil-life-republic-i-towers-smart-homes-hinjewadi',
    'nora': 'kolte-patil-life-republic-nora-bungalow-plots-hinjewadi',
    '3rd-avenue': 'kolte-patil-life-republic-3rd-avenue',
    // Full slug aliases
    'kolte-patil-life-republic-duet': 'kolte-patil-life-republic-duet-premium-2-bhk-flats-hinjewadi',
    'kolte-patil-life-republic-arezo': 'kolte-patil-life-republic-arezo-efficient-2-bhk-flats-hinjewadi',
    'kolte-patil-life-republic-canvas': 'kolte-patil-life-republic-canvas-luxury-3-4-bhk-flats-hinjewadi',
    'kolte-patil-life-republic-atmos': 'kolte-patil-life-republic-atmos-modern-2-3-bhk-flats-hinjewadi',
    'kolte-patil-life-republic-24k-espada': 'kolte-patil-life-republic-24k-espada-ultra-luxury-row-houses-hinjewadi',
    'kolte-patil-life-republic-sound-of-soul': 'kolte-patil-life-republic-sound-of-soul-luxury-4-bhk-row-houses-hinjewadi',
    'kolte-patil-life-republic-aros': 'kolte-patil-life-republic-aros-premium-2-3-bhk-flats-hinjewadi',
    'kolte-patil-life-republic-universe': 'kolte-patil-life-republic-universe-luxury-1-2-bhk-flats-hinjewadi',
    'kolte-patil-life-republic-first-avenue': 'kolte-patil-life-republic-first-avenue-premium-2-3-bhk-hinjewadi',
    'kolte-patil-life-republic-villas': 'kolte-patil-life-republic-villas-hinjewadi',
    'kolte-patil-life-republic-bungalows': 'kolte-patil-life-republic-bungalows-hinjewadi',
    'kolte-patil-life-republic-echoes': 'kolte-patil-life-republic-echoes-new-launch-2-2-5-bhk-hinjewadi',
    'kolte-patil-life-republic-qrious': 'kolte-patil-life-republic-qrious-smart-2-3-bhk-homes-hinjewadi',
    'kolte-patil-life-republic-oro-avenue': 'kolte-patil-life-republic-oro-avenue-smart-1-2-bhk-hinjewadi',
    'kolte-patil-life-republic-i-towers': 'kolte-patil-life-republic-i-towers-smart-homes-hinjewadi',
    'kolte-patil-life-republic-i-tower': 'kolte-patil-life-republic-i-towers-smart-homes-hinjewadi',
    'kolte-patil-life-republic-nora': 'kolte-patil-life-republic-nora-bungalow-plots-hinjewadi'
};

export const getProjectSlug = (id?: string, existingSlug?: string): string => {
    if (id && ID_TO_SLUG[id]) return ID_TO_SLUG[id];
    if (existingSlug && ID_TO_SLUG[existingSlug]) return ID_TO_SLUG[existingSlug];
    const cleanId = id?.replace(/^kolte-patil-life-republic-/, '');
    if (cleanId && ID_TO_SLUG[cleanId]) return ID_TO_SLUG[cleanId];
    const cleanSlug = existingSlug?.replace(/^kolte-patil-life-republic-/, '');
    if (cleanSlug && ID_TO_SLUG[cleanSlug]) return ID_TO_SLUG[cleanSlug];
    if (existingSlug && (existingSlug.includes('-flats-') || existingSlug.includes('-houses-') || existingSlug.includes('-homes-') || existingSlug.includes('-plots-'))) return existingSlug;
    if (id && (id.includes('-flats-') || id.includes('-houses-') || id.includes('-homes-') || id.includes('-plots-'))) return id;
    if (existingSlug && existingSlug.startsWith('kolte-patil-')) return existingSlug;
    if (id && id.startsWith('kolte-patil-')) return id;
    if (existingSlug) return existingSlug;
    if (id) return `kolte-patil-life-republic-${id}`;
    return '';
};
