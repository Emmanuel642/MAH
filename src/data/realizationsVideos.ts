/**
 * ============================================================================
 * FICHIER DE GESTION DES VIDÉOS DE CHANTIERS RÉELS — MHA
 * ============================================================================
 * 
 * GUIDE PRATIQUE POUR LE PROPRIÉTAIRE DU SITE :
 * 
 * 1. AJOUTER UNE NOUVELLE VIDÉO :
 *    - Placez votre fichier vidéo (.mp4) dans le dossier : public/videos/
 *      (ex: public/videos/mon_nouveau_chantier.mp4)
 *    - Extrayez ou placez une image d'affiche (.jpg/.jpeg) dans src/assets/images/
 *    - Ajoutez un nouvel objet dans la liste REALIZATIONS_VIDEOS ci-dessous.
 * 
 * 2. REMPLACER UNE VIDÉO EXISTANTE :
 *    - Écrasez simplement le fichier .mp4 dans public/videos/ avec le même nom,
 *      OU mettez à jour la propriété "videoFileName" ci-dessous.
 * 
 * 3. RETIRER UNE VIDÉO :
 *    - Supprimez simplement l'objet correspondant de la liste REALIZATIONS_VIDEOS.
 * 
 * 4. MISE EN LIGNE :
 *    - Exécutez : git add . && git commit -m "update: videos" && git push origin main
 * ============================================================================
 */

import posterVideo1 from '../assets/images/poster_realisation_video1.jpg';
import posterVideo2 from '../assets/images/poster_realisation_video2.jpg';
import posterVideo3 from '../assets/images/poster_realisation_video3.jpg';
import posterVideo4 from '../assets/images/poster_realisation_video4.jpg';
import posterVideo5 from '../assets/images/poster_realisation_video5.jpg';
import posterVideo6 from '../assets/images/poster_realisation_video6.jpg';

export interface RealizationVideoItem {
  id: string;
  titleFR: string;
  titleEN: string;
  locationFR: string;
  locationEN: string;
  categoryFR: string;
  categoryEN: string;
  descriptionFR: string;
  descriptionEN: string;
  duration?: string;
  videoFileName: string; // Fichier situé dans public/videos/
  poster: string;
  altFR: string;
  altEN: string;
}

/**
 * Fonction utilitaire garantissant un chemin relatif valide
 * aussi bien en développement local que déployé sur GitHub Pages (sous-dossier /MAH/).
 */
export const getRealizationVideoUrl = (fileName: string): string => {
  const baseUrl = import.meta.env.BASE_URL || './';
  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const cleanFile = fileName.startsWith('/') ? fileName.slice(1) : fileName;
  return `${cleanBase}videos/${cleanFile}`;
};

export const REALIZATIONS_VIDEOS: RealizationVideoItem[] = [
  {
    id: 'chantier-video-1',
    titleFR: 'Parking métallique moderne',
    titleEN: 'Modern Steel Parking Canopy',
    locationFR: 'Lubumbashi / Route Aéroport',
    locationEN: 'Lubumbashi / Airport Road',
    categoryFR: 'Structure & Charpente métallique',
    categoryEN: 'Structural Steel & Canopy',
    descriptionFR: 'Découvrez la conception et le montage d’un abri de stationnement moderne à ossature métallique thermo-laquée, alliant rigidité structurale, durabilité contre les intempéries et intégration paysagère soignée.',
    descriptionEN: 'Explore the structural engineering and assembly of a contemporary powder-coated steel parking canopy, combining structural rigidity, weathering resistance, and architectural integration.',
    duration: '0:12',
    videoFileName: 'videos1.mp4',
    poster: posterVideo1,
    altFR: 'Abri de parking métallique moderne à Lubumbashi réalisé par MHA',
    altEN: 'Modern steel canopy parking structure in Lubumbashi built by MHA',
  },
  {
    id: 'chantier-video-2',
    titleFR: 'Élévation des murs & maçonnerie chaînée',
    titleEN: 'Wall Elevation & Reinforced Masonry',
    locationFR: 'Lubumbashi / Bel-Air',
    locationEN: 'Lubumbashi / Bel-Air',
    categoryFR: 'Gros œuvre & Maçonnerie',
    categoryEN: 'Structural Masonry',
    descriptionFR: 'Pose millimétrée de blocs de maçonnerie et coulage des chaînages verticaux et linteaux armés, assurant l’aplomb irréprochable et la résistance antisismique du gros œuvre.',
    descriptionEN: 'Precision blocklaying with vertical rebar tie-beams and reinforced structural lintels, guaranteeing plumb precision and structural integrity.',
    duration: '0:27',
    videoFileName: 'video2.mp4',
    poster: posterVideo2,
    altFR: 'Élévation des murs et maçonnerie chaînée sur chantier MHA à Lubumbashi',
    altEN: 'Wall elevation and tied block masonry on MHA job site in Lubumbashi',
  },
  {
    id: 'chantier-video-3',
    titleFR: 'Ferraillage haute densité & dalle de compression',
    titleEN: 'High-Density Rebar & Structural Concrete Slab',
    locationFR: 'Lubumbashi / Golf Météo',
    locationEN: 'Lubumbashi / Golf Météo',
    categoryFR: 'Génie civil & Béton armé',
    categoryEN: 'Civil Engineering & Concrete',
    descriptionFR: 'Supervision du ferraillage haute densité, calage d’armatures et coulage de dalle de plancher portée avec vibration mécanique pour une compacité maximale du béton.',
    descriptionEN: 'Supervision of heavy-gauge rebar placement, bar spacers, and structural floor slab pouring with mechanical compaction for optimal concrete density.',
    duration: '0:22',
    videoFileName: 'video3.mp4',
    poster: posterVideo3,
    altFR: 'Coulage de dalle béton armé et treillis de ferraillage MHA',
    altEN: 'Reinforced concrete slab casting with high-gauge rebar by MHA',
  },
  {
    id: 'chantier-video-4',
    titleFR: 'Toiture contemporaine & vue d’ensemble du chantier',
    titleEN: 'Contemporary Roofing & Site Compound Overview',
    locationFR: 'Lubumbashi / Luano City',
    locationEN: 'Lubumbashi / Luano City',
    categoryFR: 'Charpente, Toiture & Concession',
    categoryEN: 'Roofing & Compound Architecture',
    descriptionFR: 'Perspective d’ensemble sur la volumétrie de la toiture contemporaine thermo-laquée, étanchéité de noues et gestion gravitaire maîtrisée des eaux pluviales.',
    descriptionEN: 'Compound overview showcasing contemporary coated steel roof geometry, valley flashings, and gravity stormwater drainage design.',
    duration: '0:21',
    videoFileName: 'video4.mp4',
    poster: posterVideo4,
    altFR: 'Vue d’ensemble de toiture contemporaine et cour de chantier MHA',
    altEN: 'Contemporary roof geometry and architectural compound overview by MHA',
  },
  {
    id: 'chantier-video-5',
    titleFR: 'Second œuvre, enduits fins & finitions intérieures',
    titleEN: 'Interior Finishing, Smooth Plastering & Detailing',
    locationFR: 'Lubumbashi / Golf Plateau',
    locationEN: 'Lubumbashi / Golf Plateau',
    categoryFR: 'Finitions intérieures & Second œuvre',
    categoryEN: 'Interior Fit-Out & Finishing',
    descriptionFR: 'Application soignée d’enduits lissés haute adhérence, préparation des supports pour revêtements de sol et intégration minutieuse des réservations techniques.',
    descriptionEN: 'Careful smoothing plaster coats, surface preparation for premium flooring, and precision recessed technical installations.',
    duration: '0:53',
    videoFileName: 'video5.mp4',
    poster: posterVideo5,
    altFR: 'Travaux de second œuvre et enduits intérieurs sur chantier MHA',
    altEN: 'Interior finishing and fine plastering work on MHA job site',
  },
  {
    id: 'chantier-video-6',
    titleFR: 'Aménagements extérieurs & concession clé en main',
    titleEN: 'Turnkey Outdoor Paving & Completed Compound',
    locationFR: 'Lubumbashi / Luano Estate',
    locationEN: 'Lubumbashi / Luano Estate',
    categoryFR: 'Aménagements extérieurs & Clôtures',
    categoryEN: 'Exterior Works & Turnkey Handover',
    descriptionFR: 'Visite des abords finalisés : pose de pavés autobloquants drainants, mur de clôture soigné et menuiseries architecturales pour une livraison de projet clé en main.',
    descriptionEN: 'Walkthrough of the completed estate surroundings: interlocking drainage pavers, perimeter security wall, and architectural joinery.',
    duration: '0:24',
    videoFileName: 'video6.mp4',
    poster: posterVideo6,
    altFR: 'Aménagements extérieurs pavés et villa contemporaine terminée MHA',
    altEN: 'Completed exterior paving and turnkey contemporary villa by MHA',
  },
];
