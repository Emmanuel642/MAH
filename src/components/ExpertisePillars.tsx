import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import {
  ArrowUpRight,
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  FileText,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

// Static ES Imports for Category 01 — Vente de matériaux
import materiauxDepotCover from '../assets/images/materiaux_depot_cover_1791885249795.jpg';
import materiauxBriquesFer from '../assets/images/materiaux_briques_fer_1791885336113.jpg';
import materiauxSableGravier from '../assets/images/materiaux_sable_gravier_1791886115011.jpg';
import parkingMetallique from '../assets/images/parking_metallique_1790686297016.jpg';

// Static ES Imports for Category 02 — Location d'engins
import enginsLocationCover from '../assets/images/engins_location_cover_1791885268667.jpg';
import pelleExcavatriceAction from '../assets/images/pelle_excavatrice_action_1791885358961.jpg';
import enginsNiveleuseChantier from '../assets/images/engins_niveleuse_chantier_1791886149444.jpg';
import drainageBusesTranchee from '../assets/images/drainage_buses_tranchee_1791885421093.jpg';

// Static ES Imports for Category 03 — Services de finition
import finitionsTravauxCover from '../assets/images/finitions_travaux_cover_1791885289306.jpg';
import finitionsPeinturePlafond from '../assets/images/finitions_peinture_plafond_1791886188216.jpg';
import finitionPlomberieElec from '../assets/images/finition_plomberie_elec_1791885394696.jpg';
import villaCharcoalHome from '../assets/images/villa_charcoal_home_1790686776772.jpg';

// Static ES Imports for Category 04 — Drainage et canalisations
import drainageCanalisationsCover from '../assets/images/drainage_canalisations_cover_1791885308583.jpg';
import drainageCaniveauCours from '../assets/images/drainage_caniveau_cours_1791886224491.jpg';
import chantierVillaReel from '../assets/images/chantier_villa_reel_1790686529029.jpg';
import residenceAnnexeAerial from '../assets/images/residence_annexe_aerial_1790685925017.jpg';

interface ExpertisePillarsProps {
  language: Language;
  isEstimatorOpen?: boolean;
  onSelectPole?: (poleIdOrTitle: string) => void;
}

export interface ServiceGalleryItem {
  id: string;
  titleFR: string;
  titleEN: string;
  legendFR: string;
  legendEN: string;
  image: string;
  badgeFR: string;
  badgeEN: string;
  altFR: string;
  altEN: string;
}

export interface ServiceCategory {
  id: 'materials' | 'equipment-rental' | 'finishing' | 'drainage';
  num: string;
  titleFR: string;
  titleEN: string;
  shortDescFR: string;
  shortDescEN: string;
  fullDescFR: string;
  fullDescEN: string;
  coverImage: string;
  coverAltFR: string;
  coverAltEN: string;
  tagsFR: string[];
  tagsEN: string[];
  gallery: ServiceGalleryItem[];
}

export const SERVICES_CATEGORIES: ServiceCategory[] = [
  {
    id: 'materials',
    num: '01',
    titleFR: 'Vente de matériaux',
    titleEN: 'Building Materials Supply',
    shortDescFR: 'Approvisionnement et distribution de matériaux de construction : briques cuites, ciments, sables, graviers et armatures métalliques.',
    shortDescEN: 'Procurement and distribution of construction supplies: fired bricks, certified cement, sand, gravel, and steel rebar.',
    fullDescFR: 'Centrale d’approvisionnement et distribution de matériaux de construction pour les chantiers en République Démocratique du Congo. Nous sélectionnons des produits de gros œuvre et de structure conformes aux règles de l’art pour vos projets résidentiels et professionnels.',
    fullDescEN: 'Direct procurement and distribution of construction materials for building sites across the Democratic Republic of Congo. We supply structural materials compliant with industry building codes for residential and commercial works.',
    coverImage: materiauxDepotCover,
    coverAltFR: 'Dépôt de matériaux de construction avec palettes de ciment et briques cuites',
    coverAltEN: 'Building materials supply depot with cement pallets and fired clay bricks',
    tagsFR: ['Briques cuites & blocs', 'Ciment & liants', 'Sable de rivière & gravier', 'Fer à béton & profilés'],
    tagsEN: ['Fired bricks & blocks', 'Cement & binders', 'River sand & gravel', 'Rebar steel & sections'],
    gallery: [
      {
        id: 'mat-1',
        titleFR: 'Briques cuites & Blocs de maçonnerie',
        titleEN: 'Fired Clay Bricks & Masonry Blocks',
        legendFR: 'Briques cuites régulières destinées aux élévations, murs porteurs et clôtures parcellaires.',
        legendEN: 'Calibrated fired bricks for structural elevations, load-bearing walls, and compound fencing.',
        image: materiauxBriquesFer,
        badgeFR: 'Gros œuvre',
        badgeEN: 'Masonry',
        altFR: 'Piles de briques cuites de construction sur palette de chantier',
        altEN: 'Stacks of fired clay building bricks on a wooden construction pallet',
      },
      {
        id: 'mat-2',
        titleFR: 'Ciments certifiés en sacs protégés',
        titleEN: 'Certified Cement in Sealed Bags',
        legendFR: 'Liants hydrauliques conditionnés sur palettes protégées pour bétons armés et mortiers de pose.',
        legendEN: 'Hydraulic cement packed on weather-protected pallets for structural reinforced concrete and mortars.',
        image: materiauxDepotCover,
        badgeFR: 'Liants hydrauliques',
        badgeEN: 'Cement',
        altFR: 'Palettes de sacs de ciment empilées sous abri de stockage',
        altEN: 'Pallets of construction cement bags stacked in a storage facility',
      },
      {
        id: 'mat-3',
        titleFR: 'Sable de rivière & Gravier concassé',
        titleEN: 'Washed River Sand & Crushed Gravel',
        legendFR: 'Agrégats lavés et calibrés pour la confection de bétons de propreté, semelles et dallages.',
        legendEN: 'Clean river sand and graded crushed aggregates for foundation concrete and flooring slabs.',
        image: materiauxSableGravier,
        badgeFR: 'Agrégats',
        badgeEN: 'Aggregates',
        altFR: 'Zones de stockage de sable fin de rivière et de gravier concassé pour béton',
        altEN: 'Storage bays of washed river sand and crushed concrete aggregates',
      },
      {
        id: 'mat-4',
        titleFR: 'Armatures métalliques & Profilés d’acier',
        titleEN: 'Steel Rebar & Metal Profiles',
        legendFR: 'Ronds à béton haute adhérence pour ferraillage de fondations, poteaux et poutres.',
        legendEN: 'High-tensile deformed rebar rods and structural sections for foundation and beam reinforcement.',
        image: parkingMetallique,
        badgeFR: 'Aciers & Armatures',
        badgeEN: 'Reinforcing Steel',
        altFR: 'Profilés et structures en acier haute résistance pour ouvrages de génie civil',
        altEN: 'High-strength steel structural sections for civil engineering projects',
      },
    ],
  },
  {
    id: 'equipment-rental',
    num: '02',
    titleFR: 'Location d\'engins',
    titleEN: 'Heavy Equipment Rental',
    shortDescFR: 'Mise à disposition d\'engins de terrassement et de génie civil : pelles mécaniques, chargeuses, niveleuses et matériel de voirie.',
    shortDescEN: 'Provision of earthmoving and civil equipment: hydraulic excavators, wheel loaders, motor graders, and compaction machinery.',
    fullDescFR: 'Parc d’engins de chantier pour vos opérations de terrassement, nivellement, déblayage et fouilles en tranchée. Prestations proposées à la demande avec opérateurs qualifiés pour vos parcelles privées et voiries.',
    fullDescEN: 'Fleet of civil engineering machinery available for earthmoving, grading, site excavation, and trenching. Equipment supplied with skilled operators for private compounds and access roadways.',
    coverImage: enginsLocationCover,
    coverAltFR: 'Flotte d’engins lourds de chantier : pelle hydraulique, chargeuse et niveleuse',
    coverAltEN: 'Heavy construction equipment fleet: hydraulic excavator, wheel loader, and grader',
    tagsFR: ['Pelles hydrauliques sur chenilles', 'Chargeuses sur pneus', 'Niveleuses de voirie', 'Engins de levage & pose'],
    tagsEN: ['Crawler excavators', 'Wheel loaders', 'Motor graders', 'Lifting & pipe handling'],
    gallery: [
      {
        id: 'eng-1',
        titleFR: 'Pelles hydrauliques sur chenilles',
        titleEN: 'Crawler Hydraulic Excavators',
        legendFR: 'Engins d’excavation pour terrassements de plateformes, fouilles de fondations et curage de tranchées.',
        legendEN: 'Hydraulic tracked excavators for foundation digging, platform earthworks, and trench excavation.',
        image: pelleExcavatriceAction,
        badgeFR: 'Terrassement',
        badgeEN: 'Excavation',
        altFR: 'Pelle hydraulique sur chenilles en cours de terrassement sur un chantier',
        altEN: 'Tracked hydraulic excavator digging earth on an active construction site',
      },
      {
        id: 'eng-2',
        titleFR: 'Chargeuses sur pneus grand godet',
        titleEN: 'Heavy Wheel Loaders',
        legendFR: 'Engins de manutention pour le chargement de déblais, le déplacement d’agrégats et le remblaiement.',
        legendEN: 'Wheel loaders for bulk soil loading, aggregate transport, and site backfilling.',
        image: enginsLocationCover,
        badgeFR: 'Manutention',
        badgeEN: 'Loading',
        altFR: 'Chargeuse sur pneus avec grand godet de chantier',
        altEN: 'Wheel loader machine parked on an earthmoving site',
      },
      {
        id: 'eng-3',
        titleFR: 'Niveleuses de voirie & Pistes d’accès',
        titleEN: 'Motor Graders for Roads & Tracks',
        legendFR: 'Matériel de nivellement précis pour pistes d’accès, esplanades de concession et voiries parcellaires.',
        legendEN: 'Grading machinery for access tracks, compound esplanades, and private road profiling.',
        image: enginsNiveleuseChantier,
        badgeFR: 'Nivellement',
        badgeEN: 'Grading',
        altFR: 'Niveleuse de voirie en action sur une piste de chantier',
        altEN: 'Heavy road motor grader profiling a laterite construction track',
      },
      {
        id: 'eng-4',
        titleFR: 'Engins de levage pour pose de canalisations',
        titleEN: 'Lifting Equipment for Culvert Laying',
        legendFR: 'Engins équipés pour la manutention et la descente sécurisée de buses et canalisations en tranchée.',
        legendEN: 'Machinery configured for safe handling and lowering of precast concrete culvert pipes in trenches.',
        image: drainageBusesTranchee,
        badgeFR: 'Levage & Réseaux',
        badgeEN: 'Pipe Handling',
        altFR: 'Pelle mécanique assurant le levage et la pose de tuyaux de drainage',
        altEN: 'Excavator machine lowering a concrete storm drainage pipe into an open trench',
      },
    ],
  },
  {
    id: 'finishing',
    num: '03',
    titleFR: 'Services de finition',
    titleEN: 'Finishing Works',
    shortDescFR: 'Prestations de second œuvre : pose de carrelage, peinture et enduits, faux-plafonds, électricité et plomberie sanitaire.',
    shortDescEN: 'Interior and exterior finishes: floor tiling, interior painting and plaster, gypsum ceilings, wiring, and plumbing.',
    fullDescFR: 'Équipes d’artisans et techniciens qualifiés pour l’achèvement des bâtiments neufs et rénovations. Nous prenons en charge les revêtements de sols, les enduits muraux lissés, les plafonds suspendus et les réseaux techniques terminaux.',
    fullDescEN: 'Skilled trades teams for completion of newly built and renovated residences. We execute floor tiling, fine wall plastering, suspended ceilings, and terminal plumbing and electrical installations.',
    coverImage: finitionsTravauxCover,
    coverAltFR: 'Travaux de finition intérieure : pose de carrelage grand format et faux-plafonds',
    coverAltEN: 'Interior finishing works: large-format porcelain floor tiling and recessed ceiling',
    tagsFR: ['Carrelage & revêtements', 'Peinture & enduits lissés', 'Faux-plafonds & éclairage', 'Plomberie & électricité'],
    tagsEN: ['Tiling & flooring', 'Painting & plaster', 'Suspended ceilings', 'Plumbing & electrical'],
    gallery: [
      {
        id: 'fin-1',
        titleFR: 'Pose de carrelage au sol & Faïence murale',
        titleEN: 'Floor Tiling & Wall Ceramics',
        legendFR: 'Alignement au cordeau et découpes soignées pour grès cérame, dalles de sol et pièces humides.',
        legendEN: 'Precision layout and clean mitred jointing for porcelain stoneware floors and sanitary areas.',
        image: finitionsTravauxCover,
        badgeFR: 'Carrelage',
        badgeEN: 'Tiling',
        altFR: 'Pose de carrelage grand format au sol dans une villa contemporaine',
        altEN: 'Artisan laying large-format porcelain floor tiles in a contemporary villa',
      },
      {
        id: 'fin-2',
        titleFR: 'Peinture intérieure & Faux-plafonds',
        titleEN: 'Interior Painting & Suspended Ceilings',
        legendFR: 'Application d’enduits de finition lissés et pose de plafonds en plaques de plâtre avec réservations lumineuses.',
        legendEN: 'Application of smooth wall finishing coats and installation of gypsum plasterboard ceilings with lighting cutouts.',
        image: finitionsPeinturePlafond,
        badgeFR: 'Peinture & Plafonds',
        badgeEN: 'Painting',
        altFR: 'Peintre appliquant une peinture de finition sur un mur intérieur lissé',
        altEN: 'Painter applying smooth wall paint in a newly finished residential interior',
      },
      {
        id: 'fin-3',
        titleFR: 'Plomberie sanitaire & Distribution d’eau',
        titleEN: 'Sanitary Plumbing & Water Distribution',
        legendFR: 'Réseaux de tuyauteries encastrées ou apparentes et raccordement des équipements sanitaires.',
        legendEN: 'Installation of domestic water supply lines and connections for kitchen and bathroom fixtures.',
        image: finitionPlomberieElec,
        badgeFR: 'Plomberie',
        badgeEN: 'Plumbing',
        altFR: 'Réseau de tuyauterie sanitaire et collecteurs de distribution d’eau',
        altEN: 'Plumbing distribution manifold and sanitary pipe network in a residential structure',
      },
      {
        id: 'fin-4',
        titleFR: 'Menuiseries & Finitions de façades',
        titleEN: 'Exterior Joinery & Facade Finishes',
        legendFR: 'Pose de baies vitrées aluminium, vitrages sécurisés et application d’enduits minéraux extérieurs.',
        legendEN: 'Installation of black aluminum glazed frames, security glazing, and exterior mineral wall stuccos.',
        image: villaCharcoalHome,
        badgeFR: 'Façades & Baies',
        badgeEN: 'Joinery & Facade',
        altFR: 'Façade contemporaine avec menuiseries aluminium noires et enduit soigné',
        altEN: 'Contemporary residence facade featuring dark aluminum window frames and smooth stucco',
      },
    ],
  },
  {
    id: 'drainage',
    num: '04',
    titleFR: 'Drainage et canalisations',
    titleEN: 'Drainage & Stormwater Piping',
    shortDescFR: 'Ouvrages de collecte et d\'évacuation des eaux pluviales : caniveaux maçonnés, buses en béton armé et canalisations.',
    shortDescEN: 'Stormwater collection and conveyance networks: masonry gutters, reinforced concrete culverts, and drainage pipes.',
    fullDescFR: 'Réalisation de réseaux d’assainissement pluvial pour protéger les cours, les fondations et les concessions contre le ravinement et la stagnation des eaux lors des saisons des pluies en RDC.',
    fullDescEN: 'Execution of surface and buried stormwater drainage networks to protect foundations, courtyards, and property plots against rain erosion and standing water during rainy periods in DRC.',
    coverImage: drainageCanalisationsCover,
    coverAltFR: 'Travaux de pose de canalisations d’évacuation pluviale et caniveaux à grilles',
    coverAltEN: 'Civil installation of underground stormwater drainage pipes and grated gutters',
    tagsFR: ['Caniveaux béton avec grilles', 'Buses béton armé', 'Tranchées de drainage', 'Évacuation des eaux de cour'],
    tagsEN: ['Concrete grated gutters', 'Reinforced culverts', 'Drainage trenches', 'Courtyard stormwater'],
    gallery: [
      {
        id: 'drn-1',
        titleFR: 'Caniveaux préfabriqués à grilles de voirie',
        titleEN: 'Precast Grated Gutters along Driveways',
        legendFR: 'Caniveaux longitudinaux bordant les allées carrossables pour capter les flux d’eau de ruissellement.',
        legendEN: 'Linear drainage channels equipped with traffic-rated grates bordering paved vehicular access lanes.',
        image: drainageCaniveauCours,
        badgeFR: 'Caniveaux',
        badgeEN: 'Drain Channels',
        altFR: 'Caniveau en béton avec grille métallique le long d’une allée pavée',
        altEN: 'Precast concrete drain channel with metal grate installed beside a paved driveway',
      },
      {
        id: 'drn-2',
        titleFR: 'Pose de buses en béton armé',
        titleEN: 'Reinforced Concrete Culvert Pipe Laying',
        legendFR: 'Canalisations grande section emboîtées en tranchée pour les traversées de voirie et collecteurs pluviaux.',
        legendEN: 'Large-diameter interlocking concrete culvert pipes placed in trenches for roadway crossings and collectors.',
        image: drainageBusesTranchee,
        badgeFR: 'Buses en béton',
        badgeEN: 'Concrete Pipes',
        altFR: 'Ouvriers et engin installant des buses en béton armé dans une tranchée',
        altEN: 'Workers and excavator positioning reinforced concrete culverts into an excavated trench',
      },
      {
        id: 'drn-3',
        titleFR: 'Réseaux de canalisations enterrées',
        titleEN: 'Buried Stormwater Pipe Networks',
        legendFR: 'Pose de conduites d’évacuation et raccordements de regards techniques pour les eaux de toiture et de voirie.',
        legendEN: 'Buried stormwater conduit installation with junction inspection pits for roof and surface runoff.',
        image: drainageCanalisationsCover,
        badgeFR: 'Canalisations',
        badgeEN: 'Piping',
        altFR: 'Tranchée de canalisation pluviale avec conduite PEHD et gravier de calage',
        altEN: 'Stormwater drainage trench with buried pipe and aggregate backfill bedding',
      },
      {
        id: 'drn-4',
        titleFR: 'Assainissement parcellaire & Gestion des pentes',
        titleEN: 'Plot Drainage & Runoff Slope Profiling',
        legendFR: 'Nivellement et caniveaux d’exutoire pour prévenir la boue et préserver les fondations de bâtiments.',
        legendEN: 'Surface slope shaping and perimeter collectors to prevent water pooling and protect structural foundations.',
        image: chantierVillaReel,
        badgeFR: 'Assainissement',
        badgeEN: 'Site Drainage',
        altFR: 'Chantier d’aménagement extérieur avec tranchées d’évacuation et bordures maçonnées',
        altEN: 'Outdoor landscaping site with perimeter drainage trenches and concrete borders',
      },
    ],
  },
];

export const ExpertisePillars: React.FC<ExpertisePillarsProps> = ({
  language,
  isEstimatorOpen = false,
  onSelectPole,
}) => {
  // State for active category detail view (null = overview mode)
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | null>(null);

  // State for Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Hierarchical Escape key management without conflicting global listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. If estimator modal is currently open, let the estimator handle Escape exclusively!
      if (isEstimatorOpen) {
        return;
      }

      // 2. If lightbox is open inside this section, Escape closes ONLY the lightbox
      if (lightboxOpen && selectedCategory) {
        if (e.key === 'Escape') {
          e.stopPropagation();
          setLightboxOpen(false);
        } else if (e.key === 'ArrowLeft') {
          setLightboxIndex((prev) => (prev > 0 ? prev - 1 : selectedCategory.gallery.length - 1));
        } else if (e.key === 'ArrowRight') {
          setLightboxIndex((prev) => (prev < selectedCategory.gallery.length - 1 ? prev + 1 : 0));
        }
        return;
      }

      // 3. If no modal and no lightbox, Escape closes the detailed service view and returns to the 4 services grid
      if (selectedCategory && e.key === 'Escape') {
        setSelectedCategory(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, selectedCategory, isEstimatorOpen]);

  const handleOpenCategory = (cat: ServiceCategory) => {
    setSelectedCategory(cat);
    const sectionEl = document.getElementById('expertises');
    if (sectionEl) {
      sectionEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCloseCategory = () => {
    setSelectedCategory(null);
  };

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Pass stable ID to quotation configurator
  const handleRequestQuoteForCategory = (categoryId: string) => {
    if (onSelectPole) {
      onSelectPole(categoryId);
    }
  };

  const activeCategory = selectedCategory;
  const currentLightboxItem = activeCategory ? activeCategory.gallery[lightboxIndex] : null;

  return (
    <section id="expertises" className="bg-[#faf9f6] border-b border-[#c4c7c7]/30 py-20 md:py-28 relative">
      <div className="max-w-[1440px] mx-auto px-5 md:px-8 lg:px-12">
        {/* ========================================================================= */}
        {/* MODE 1: VUE GÉNÉRALE DES 4 CATÉGORIES                                      */}
        {/* ========================================================================= */}
        {!activeCategory && (
          <div>
            {/* Section Header: NOS SERVICES / Des solutions complètes pour tous vos projets */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
              <div className="max-w-2xl space-y-2">
                <span className="font-label-technical text-label-technical tracking-widest uppercase text-[#765935] font-bold block">
                  {language === 'FR' ? 'NOS SERVICES' : 'OUR SERVICES'}
                </span>
                <h2 className="font-headline-lg text-3xl md:text-4xl lg:text-5xl text-[#000000] tracking-tight text-balance">
                  {language === 'FR'
                    ? 'Des solutions complètes pour tous vos projets.'
                    : 'Comprehensive solutions for all your projects.'}
                </h2>
              </div>
              <p className="font-body-md text-sm md:text-base text-[#444748] max-w-md leading-relaxed">
                {language === 'FR'
                  ? 'Fourniture de matériaux, engins lourds, second œuvre et assainissement : découvrez en détail nos prestations avec galeries photos.'
                  : 'Materials supply, heavy machinery rental, finishing craftsmanship, and civil drainage: explore our detailed service galleries.'}
              </p>
            </div>

            {/* 4 Category Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#c4c7c7]/40 shadow-xs">
              {SERVICES_CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => handleOpenCategory(cat)}
                  tabIndex={0}
                  role="button"
                  aria-label={language === 'FR' ? `Découvrir la catégorie ${cat.titleFR}` : `Discover category ${cat.titleEN}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOpenCategory(cat);
                    }
                  }}
                  className="border-r border-b border-[#c4c7c7]/40 p-6 md:p-7 bg-[#faf9f6] hover:bg-[#f4f3f1] transition-all duration-200 cursor-pointer group flex flex-col justify-between space-y-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#000000]"
                >
                  <div className="space-y-4">
                    {/* Header: Numéro + Titre */}
                    <div className="flex items-center justify-between">
                      <span className="font-label-technical text-label-technical text-[#765935] font-bold">
                        {cat.num}
                      </span>
                      <span className="font-label-technical text-[10px] tracking-widest uppercase text-[#747878] group-hover:text-[#765935] transition-colors flex items-center gap-1">
                        <span>{language === 'FR' ? 'Galerie' : 'Gallery'}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    </div>

                    <h3 className="font-headline-md text-xl md:text-2xl text-[#000000] tracking-tight group-hover:text-[#765935] transition-colors">
                      {language === 'FR' ? cat.titleFR : cat.titleEN}
                    </h3>

                    {/* Image Card */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#efeeeb] border border-[#c4c7c7]/40">
                      <img
                        src={cat.coverImage}
                        alt={language === 'FR' ? cat.coverAltFR : cat.coverAltEN}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-104"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                        <span className="font-label-technical text-[10px] uppercase tracking-wider text-white bg-black/70 backdrop-blur-xs px-2.5 py-1 flex items-center gap-1.5">
                          <Maximize2 className="w-3 h-3" />
                          {language === 'FR' ? `${cat.gallery.length} photos disponibles` : `${cat.gallery.length} photos available`}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="font-body-md text-xs md:text-sm text-[#444748] leading-relaxed">
                      {language === 'FR' ? cat.shortDescFR : cat.shortDescEN}
                    </p>

                    {/* Sub-categories tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {(language === 'FR' ? cat.tagsFR : cat.tagsEN).slice(0, 3).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="font-label-technical text-[9px] uppercase tracking-wider px-2 py-0.5 bg-[#efeeeb] text-[#444748] border border-[#c4c7c7]/40"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="pt-4 border-t border-[#c4c7c7]/30 flex items-center justify-between">
                    <span className="font-label-technical text-[11px] uppercase tracking-wider text-[#000000] font-bold group-hover:text-[#765935] transition-colors">
                      {language === 'FR' ? 'Consulter la galerie' : 'View gallery'}
                    </span>
                    <span className="p-1 text-[#000000] group-hover:text-[#765935] transition-colors">
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE 2: VUE DÉTAILLÉE INTÉGRÉE AVEC GALERIE COMPLÈTE                      */}
        {/* ========================================================================= */}
        {activeCategory && (
          <div className="space-y-10 animate-in fade-in duration-300">
            {/* Top Navigation Bar: Retour aux services + Bouton Devis */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#c4c7c7]/40">
              <button
                onClick={handleCloseCategory}
                className="inline-flex items-center gap-2 font-label-technical text-[11px] uppercase tracking-widest text-[#000000] hover:text-[#765935] transition-colors p-2 -ml-2 cursor-pointer"
                aria-label={language === 'FR' ? 'Retour aux 4 services' : 'Back to all 4 services'}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{language === 'FR' ? 'Retour aux 4 services' : 'Back to all 4 services'}</span>
              </button>

              <div className="flex items-center gap-3">
                <span className="font-label-technical text-[11px] uppercase tracking-widest text-[#747878] hidden sm:inline">
                  {language === 'FR' ? `Catégorie ${activeCategory.num}` : `Category ${activeCategory.num}`}
                </span>
                <button
                  onClick={() => handleRequestQuoteForCategory(activeCategory.id)}
                  className="inline-flex items-center gap-2 bg-[#000000] text-white font-label-technical text-[10px] sm:text-[11px] tracking-widest uppercase px-5 py-2.5 hover:bg-[#765935] transition-colors duration-200 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{language === 'FR' ? 'Demander un devis' : 'Request a quotation'}</span>
                </button>
              </div>
            </div>

            {/* Category Presentation Header */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="font-label-technical text-sm font-bold text-[#765935] px-2 py-0.5 bg-[#efeeeb] border border-[#c4c7c7]/50">
                    {activeCategory.num}
                  </span>
                  <span className="font-label-technical text-xs tracking-widest uppercase text-[#747878]">
                    {language === 'FR' ? 'VITRINE PRESTATIONS & FOURNITURES' : 'SUPPLIES & PROFESSIONAL SERVICES'}
                  </span>
                </div>

                <h3 className="font-headline-lg text-3xl md:text-4xl text-[#000000] tracking-tight">
                  {language === 'FR' ? activeCategory.titleFR : activeCategory.titleEN}
                </h3>

                <p className="font-body-lg text-sm md:text-base text-[#444748] leading-relaxed max-w-3xl">
                  {language === 'FR' ? activeCategory.fullDescFR : activeCategory.fullDescEN}
                </p>

                {/* Sub-services Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {(language === 'FR' ? activeCategory.tagsFR : activeCategory.tagsEN).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="font-label-technical text-[10px] uppercase tracking-wider px-3 py-1 bg-[#f4f3f1] text-[#000000] border border-[#c4c7c7]/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Service Commitments Box */}
              <div className="lg:col-span-4 bg-[#f4f3f1] border border-[#c4c7c7]/50 p-6 space-y-4">
                <div className="flex items-center gap-2 text-[#765935]">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="font-label-technical text-xs uppercase tracking-widest font-bold">
                    {language === 'FR' ? 'ENGAGEMENTS MHA' : 'MHA COMMITMENTS'}
                  </span>
                </div>
                <ul className="space-y-2.5 font-body-sm text-xs text-[#444748]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#765935] shrink-0 mt-0.5" />
                    <span>
                      {language === 'FR'
                        ? 'Matériaux et prestations conformes aux règles de l’art'
                        : 'Supplies and works compliant with professional building codes'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#765935] shrink-0 mt-0.5" />
                    <span>
                      {language === 'FR'
                        ? 'Coordination technique et logistique sur vos chantiers en RDC'
                        : 'Technical coordination and site logistics across project sites in DRC'}
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#765935] shrink-0 mt-0.5" />
                    <span>
                      {language === 'FR'
                        ? 'Étude personnalisée établie selon vos métrés et spécifications'
                        : 'Custom estimate tailored to your project requirements and quantities'}
                    </span>
                  </li>
                </ul>
                <button
                  onClick={() => handleRequestQuoteForCategory(activeCategory.id)}
                  className="w-full mt-2 py-3 bg-[#000000] text-white font-label-technical text-[10px] uppercase tracking-widest hover:bg-[#765935] transition-colors cursor-pointer text-center block"
                >
                  {language === 'FR'
                    ? `Estimer mon besoin : ${activeCategory.titleFR}`
                    : `Estimate requirement: ${activeCategory.titleEN}`}
                </button>
              </div>
            </div>

            {/* Gallery Section */}
            <div className="space-y-6 pt-6 border-t border-[#c4c7c7]/40">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <span className="font-label-technical text-[10px] tracking-widest uppercase text-[#765935] font-bold block">
                    {language === 'FR' ? 'GALERIE DE PHOTOGRAPHIES' : 'PHOTO GALLERY'}
                  </span>
                  <h4 className="font-headline-md text-xl md:text-2xl text-[#000000]">
                    {language === 'FR' ? 'Aperçu détaillé des produits et prestations' : 'Detailed overview of supplies and works'}
                  </h4>
                </div>
                <span className="font-label-technical text-xs text-[#747878]">
                  {language === 'FR' ? 'Cliquez sur une photo pour l\'agrandir' : 'Click any photo to enlarge'}
                </span>
              </div>

              {/* Photo Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {activeCategory.gallery.map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => handleOpenLightbox(idx)}
                    tabIndex={0}
                    role="button"
                    aria-label={language === 'FR' ? `Agrandir : ${item.titleFR}` : `Enlarge: ${item.titleEN}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleOpenLightbox(idx);
                      }
                    }}
                    className="group bg-[#ffffff] border border-[#c4c7c7]/40 overflow-hidden cursor-pointer flex flex-col justify-between hover:border-[#000000] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#000000]"
                  >
                    {/* Image with zoom on hover */}
                    <div className="relative aspect-[4/3] bg-[#efeeeb] overflow-hidden">
                      <img
                        src={item.image}
                        alt={language === 'FR' ? item.altFR : item.altEN}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-106"
                        loading="lazy"
                      />
                      {/* Badge on top */}
                      <div className="absolute top-2.5 left-2.5">
                        <span className="font-label-technical text-[9px] uppercase tracking-wider text-white bg-black/75 backdrop-blur-xs px-2 py-0.5">
                          {language === 'FR' ? item.badgeFR : item.badgeEN}
                        </span>
                      </div>
                      {/* Zoom icon on hover */}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="p-2.5 bg-white/95 rounded-full text-black shadow-lg">
                          <Maximize2 className="w-4 h-4" />
                        </span>
                      </div>
                    </div>

                    {/* Caption / Legend under photo */}
                    <div className="p-4 space-y-2 bg-[#faf9f6] flex-grow flex flex-col justify-between border-t border-[#c4c7c7]/30">
                      <div>
                        <h5 className="font-headline-sm text-sm font-semibold text-[#000000] group-hover:text-[#765935] transition-colors leading-snug">
                          {language === 'FR' ? item.titleFR : item.titleEN}
                        </h5>
                        <p className="font-body-sm text-[11px] text-[#444748] mt-1.5 leading-relaxed line-clamp-3">
                          {language === 'FR' ? item.legendFR : item.legendEN}
                        </p>
                      </div>

                      <div className="pt-3 mt-2 border-t border-[#c4c7c7]/20 flex items-center justify-between text-[10px] font-label-technical tracking-wider text-[#747878]">
                        <span>{language === 'FR' ? 'Photo grand format' : 'Enlarge photo'}</span>
                        <Maximize2 className="w-3 h-3 text-[#000000] group-hover:text-[#765935]" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Return Button */}
            <div className="pt-6 border-t border-[#c4c7c7]/40 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={handleCloseCategory}
                className="inline-flex items-center gap-2 border border-[#000000] bg-transparent text-[#000000] font-label-technical text-[11px] tracking-widest uppercase px-6 py-3 hover:bg-[#efeeeb] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{language === 'FR' ? 'Consulter une autre catégorie' : 'Browse another category'}</span>
              </button>

              <button
                onClick={() => handleRequestQuoteForCategory(activeCategory.id)}
                className="inline-flex items-center gap-2 bg-[#000000] text-white font-label-technical text-[11px] tracking-widest uppercase px-7 py-3 hover:bg-[#765935] transition-colors duration-200 cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>
                  {language === 'FR'
                    ? `Demander un devis : ${activeCategory.titleFR}`
                    : `Request quote: ${activeCategory.titleEN}`}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* LIGHTBOX (VISIONNEUSE GRAND FORMAT AVEC NAVIGATION)                       */}
      {/* ========================================================================= */}
      {lightboxOpen && activeCategory && currentLightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={language === 'FR' ? 'Visionneuse de photographies' : 'Photo viewer'}
          className="fixed inset-0 z-50 bg-[#000000]/92 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 md:p-8 animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxOpen(false);
          }}
        >
          {/* Lightbox Top Header */}
          <div className="flex items-center justify-between text-white z-10 w-full max-w-6xl mx-auto pb-4">
            <div className="flex items-center gap-3">
              <span className="font-label-technical text-[11px] uppercase tracking-widest text-[#c7a97b] font-bold">
                {language === 'FR' ? activeCategory.titleFR : activeCategory.titleEN}
              </span>
              <span className="text-white/40">|</span>
              <span className="font-label-technical text-[11px] uppercase tracking-widest text-white/80">
                {language === 'FR'
                  ? `Photo ${lightboxIndex + 1} sur ${activeCategory.gallery.length}`
                  : `Photo ${lightboxIndex + 1} of ${activeCategory.gallery.length}`}
              </span>
            </div>

            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 transition-colors cursor-pointer border border-white/20"
              aria-label={language === 'FR' ? 'Fermer la visionneuse' : 'Close photo viewer'}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Lightbox Center: Image with Prev/Next Buttons */}
          <div className="relative flex-grow flex items-center justify-center max-w-6xl mx-auto w-full py-2">
            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev > 0 ? prev - 1 : activeCategory.gallery.length - 1));
              }}
              className="absolute left-2 sm:left-4 z-20 p-3 text-white bg-black/60 hover:bg-black/90 border border-white/20 rounded-full transition-all cursor-pointer hover:scale-105"
              aria-label={language === 'FR' ? 'Photo précédente' : 'Previous photo'}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Displayed Image */}
            <div className="relative max-h-[72vh] max-w-full flex items-center justify-center">
              <img
                src={currentLightboxItem.image}
                alt={language === 'FR' ? currentLightboxItem.altFR : currentLightboxItem.altEN}
                className="max-h-[70vh] w-auto max-w-full object-contain border border-white/15 shadow-2xl"
              />
            </div>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex((prev) => (prev < activeCategory.gallery.length - 1 ? prev + 1 : 0));
              }}
              className="absolute right-2 sm:right-4 z-20 p-3 text-white bg-black/60 hover:bg-black/90 border border-white/20 rounded-full transition-all cursor-pointer hover:scale-105"
              aria-label={language === 'FR' ? 'Photo suivante' : 'Next photo'}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Lightbox Bottom Footer: Caption + Actions */}
          <div className="w-full max-w-6xl mx-auto pt-4 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-white">
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="font-label-technical text-[9px] uppercase tracking-wider text-[#c7a97b] px-2 py-0.5 bg-white/10">
                  {language === 'FR' ? currentLightboxItem.badgeFR : currentLightboxItem.badgeEN}
                </span>
                <h4 className="font-headline-md text-base sm:text-lg text-white font-medium">
                  {language === 'FR' ? currentLightboxItem.titleFR : currentLightboxItem.titleEN}
                </h4>
              </div>
              <p className="font-body-sm text-xs text-white/70 leading-relaxed">
                {language === 'FR' ? currentLightboxItem.legendFR : currentLightboxItem.legendEN}
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => {
                  setLightboxOpen(false);
                  handleRequestQuoteForCategory(activeCategory.id);
                }}
                className="inline-flex items-center gap-2 bg-white text-black font-label-technical text-[10px] uppercase tracking-widest px-5 py-2.5 hover:bg-[#c7a97b] hover:text-white transition-colors cursor-pointer font-bold"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{language === 'FR' ? 'Demander un devis' : 'Request quote'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
