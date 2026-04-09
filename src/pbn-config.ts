// ============================================
// 5GO BLOG CONFIG - GŁÓWNY PLIK KONFIGURACYJNY
// ============================================
// Domena: 5go.biz
// Portal wielotematyczny po angielsku
// ============================================

// ==========================================
// KONFIGURACJA PODSTAWOWA (SEO + INFO)
// ==========================================
export const SITE_CONFIG = {
  // Nazwa strony
  name: '5Go Blog',
  
  // Opis strony
  description: 'Your daily source of insights on self-improvement, wellness, productivity, and lifestyle tips. Discover practical advice to live a better life.',
  
  // URL strony
  url: 'https://5go.biz',
  
  // Język strony
  language: 'en-US',
  
  // Autor domyślny
  defaultAuthor: '5Go Editorial Team',
  
  // Dane organizacji
  organization: {
    name: '5Go Blog',
    email: 'hello@5go.biz',
    logo: '/logo.png',
    sameAs: [
      // 'https://twitter.com/5goblog',
      // 'https://facebook.com/5goblog',
    ],
  },
} as const;

// ==========================================
// KONFIGURACJA LAYOUTU (DE-FOOTPRINTING!)
// ==========================================
export type LayoutVariant = 'grid' | 'list' | 'magazine' | 'minimal';
export type SidebarPosition = 'left' | 'right' | 'none';
export type HeaderStyle = 'standard' | 'centered' | 'minimal';
export type FooterStyle = 'standard' | 'compact' | 'none';

// Funkcja pomocnicza do generowania klas z prefiksem
const getPrefixedClass = (className: string): string => {
  return `${LAYOUT_CONFIG.htmlStructure.prefix}-${className}`;
};

export const LAYOUT_CONFIG = {
  // Wariant strony głównej - GRID dla 5Go
  homeVariant: 'grid' as LayoutVariant,
  
  // Sidebar PO LEWEJ stronie (inaczej niż oryginał)
  sidebarPosition: 'left' as SidebarPosition,
  
  // Styl nagłówka - CENTERED
  headerStyle: 'centered' as HeaderStyle,
  
  // Styl stopki - STANDARD
  footerStyle: 'standard' as FooterStyle,
  
  // Widoczność elementów
  showSidebar: true,
  showTags: true,
  showAuthor: true,
  showDates: true,
  showReadingTime: true,
  showRelatedPosts: true,
  showBreadcrumbs: true,
  showSearch: false,
  
  // Ilość elementów
  postsPerPage: 12,
  postsPerRow: 3,
  relatedPostsCount: 3,
  maxTagsInCloud: 25,
  
  // STRUKTURA HTML (ANTY-FOOTPRINT!)
  htmlStructure: {
    mainId: 'primary-content',
    wrapperClass: 'page-wrapper',
    articleClass: 'entry-card',
    headingClass: 'block-header',
    prefix: 'app',
  },
  
  // Kolory specyficzne dla layoutu
  colors: {
    headerBg: 'bg-white',
    headerBorder: 'border-b border-slate-200',
    sidebarBg: 'bg-slate-50',
    footerBg: 'bg-slate-900',
    footerText: 'text-slate-300',
    cardBg: 'bg-white',
    cardBorder: 'border border-slate-200',
    linkColor: 'text-primary-600',
    linkHover: 'hover:text-primary-700',
  },
  
  // Funkcja generująca klasy z prefiksem
  getPrefixedClass,
} as const;

// ==========================================
// KONFIGURACJA SEO
// ==========================================
export const SEO_CONFIG = {
  defaultTitle: '%s | 5Go Blog',
  titleTemplate: '%s',
  defaultOgImage: '/og-default.jpg',
  twitterHandle: '@5goblog',
  twitterCardType: 'summary_large_image',
  googleSiteVerification: '',
  bingSiteVerification: '',
  yandexVerification: '',
  robotsDefault: 'index, follow',
  trailingSlash: true,
} as const;

// ==========================================
// FUNKCJE POMOCNICZE
// ==========================================
export function getFullUrl(path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const baseUrl = SITE_CONFIG.url.endsWith('/') 
    ? SITE_CONFIG.url.slice(0, -1) 
    : SITE_CONFIG.url;
  return `${baseUrl}${cleanPath}`;
}

export function getPaginationPath(page: number): string {
  if (page === 1) return '/';
  return `/page/${page}/`;
}
