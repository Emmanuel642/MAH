/**
 * ============================================================================
 * FICHIER DE GESTION MANUELLE DES VIDÉOS DE CHANTIERS — MHA
 * ============================================================================
 * 
 * GUIDE PRATIQUE POUR LE PROPRIÉTAIRE DU SITE :
 * 
 * 1. AJOUTER UNE NOUVELLE VIDÉO :
 *    - Placez votre fichier vidéo (.mp4) dans le dossier : public/videos/
 *      (ex: public/videos/mon_nouveau_chantier.mp4)
 *    - (Optionnel) Placez une image d'affiche (.jpg/.jpeg) dans src/assets/images/
 *    - Ajoutez un nouvel objet dans la liste REALIZATIONS_VIDEOS ci-dessous.
 * 
 * 2. REMPLACER UNE VIDÉO EXISTANTE :
 *    - Écrasez simplement le fichier .mp4 dans public/videos/ avec le même nom,
 *      OU changez la propriété "videoFileName" ci-dessous.
 * 
 * 3. RETIRER UNE VIDÉO :
 *    - Supprimez simplement l'objet correspondant de la liste REALIZATIONS_VIDEOS ci-dessous.
 * 
 * 4. MISE EN LIGNE :
 *    - Exécutez : git add . && git commit -m "update: videos" && git push origin main
 * ============================================================================
 */

import posterChantierGrosOeuvre from '../assets/images/video_poster_chantier_1790686955515.jpg';
import posterSecondOeuvre from '../assets/images/chantier_villa_reel_1790686529029.jpg';
import posterParkingChantier from '../assets/images/parking_reel_chantier_1790686512603.jpg';
import posterVueAerienne from '../assets/images/drone_villa_katanga_1790686546337.jpg';
import posterElevation from '../assets/images/villa_elevation_reelle_1790686559026.jpg';
import posterCharcoalHome from '../assets/images/villa_charcoal_home_1790686776772.jpg';

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
    titleFR: 'Chantier 01 — Fondations, Terrassement & Gros Œuvre',
    titleEN: 'Site 01 — Foundations, Earthworks & Structural Massing',
    locationFR: 'Lubumbashi / Route Aéroport',
    locationEN: 'Lubumbashi / Airport Road',
    categoryFR: 'Gros œuvre & Structures',
    categoryEN: 'Structural Works',
    descriptionFR: 'Visite de chantier en direct : coulage des voiles de béton armé, coffrage des longrines et préparation des semelles de fondation.',
    descriptionEN: 'Direct site walkthrough: pouring reinforced concrete walls, ground beam formwork, and foundation footings.',
    duration: '0:45',
    videoFileName: 'videos1.mp4',
    poster: posterChantierGrosOeuvre,
    altFR: 'Chantier de gros œuvre MHA avec ouvriers et bétonnière à Lubumbashi',
    altEN: 'MHA structural building site with workers and mixer in Lubumbashi',
  },
  {
    id: 'chantier-video-2',
    titleFR: 'Chantier 02 — Élévation des Murs & Maçonnerie Chaînée',
    titleEN: 'Site 02 — Wall Elevation & Reinforced Masonry',
    locationFR: 'Lubumbashi / Bel-Air',
    locationEN: 'Lubumbashi / Bel-Air',
    categoryFR: 'Maçonnerie & Chaînage',
    categoryEN: 'Masonry & Tie Beams',
    descriptionFR: 'Pose soignée de blocs de maçonnerie, vérification de l’aplomb et coulage des linteaux et chaînages horizontaux.',
    descriptionEN: 'Precise blocklaying, vertical plumb checks, and pouring of structural lintels and horizontal tie beams.',
    duration: '0:50',
    videoFileName: 'video2.mp4',
    poster: posterSecondOeuvre,
    altFR: 'Élévation des murs et maçonnerie de villa à Lubumbashi',
    altEN: 'Wall elevation and villa masonry work in Lubumbashi',
  },
  {
    id: 'chantier-video-3',
    titleFR: 'Chantier 03 — Charpente Métallique & Dalles de Compression',
    titleEN: 'Site 03 — Steel Framework & Structural Concrete Slabs',
    locationFR: 'Lubumbashi / Golf Météo',
    locationEN: 'Lubumbashi / Golf Météo',
    categoryFR: 'Génie civil & Aciers',
    categoryEN: 'Civil & Steel Works',
    descriptionFR: 'Assemblage de structures métalliques de toiture, ferraillage haute densité et coulage de dalle de plancher.',
    descriptionEN: 'Assembly of structural roof steel, high-density rebar grid installation, and structural floor slab casting.',
    duration: '0:42',
    videoFileName: 'video3.mp4',
    poster: posterParkingChantier,
    altFR: 'Structure métallique et dalle béton sur chantier de construction',
    altEN: 'Steel structural framing and concrete floor slab on construction site',
  },
  {
    id: 'chantier-video-4',
    titleFR: 'Chantier 04 — Toitures Haute Pente & Vue d’Ensemble',
    titleEN: 'Site 04 — Monumental Roofing & Compound Overview',
    locationFR: 'Lubumbashi / Luano City',
    locationEN: 'Lubumbashi / Luano City',
    categoryFR: 'Toitures & Concessions',
    categoryEN: 'Roofing & Compounds',
    descriptionFR: 'Vue d’ensemble des toitures contemporaines thermo-laquées, étanchéité de noues et gestion gravitaire des eaux pluviales.',
    descriptionEN: 'Overview of coated steel roof geometry, valley waterproofing, and gravitational stormwater discharge.',
    duration: '0:48',
    videoFileName: 'video4.mp4',
    poster: posterVueAerienne,
    altFR: 'Vue aérienne de toiture contemporaine et cour de villa',
    altEN: 'Aerial view of contemporary roof architecture and villa courtyard',
  },
  {
    id: 'chantier-video-5',
    titleFR: 'Chantier 05 — Second Œuvre, Enduits & Finitions Intérieures',
    titleEN: 'Site 05 — Interior Finishing, Plastering & Detailing',
    locationFR: 'Lubumbashi / Golf Plateau',
    locationEN: 'Lubumbashi / Golf Plateau',
    categoryFR: 'Finitions de prestige',
    categoryEN: 'Interior Finishing',
    descriptionFR: 'Phase d’application des enduits lissés, pose des carrelages grand format et intégration des réservations pour éclairages LED.',
    descriptionEN: 'Application of smooth plaster coats, large-format tiling installation, and recessed LED cove lighting fit-outs.',
    duration: '0:55',
    videoFileName: 'video5.mp4',
    poster: posterElevation,
    altFR: 'Finitions intérieures et élévation contemporaine',
    altEN: 'Interior finishing work and contemporary residential facade',
  },
  {
    id: 'chantier-video-6',
    titleFR: 'Chantier 06 — Aménagements Extérieurs & Concession Terminée',
    titleEN: 'Site 06 — Outdoor Paving & Turnkey Villa Delivery',
    locationFR: 'Lubumbashi / Luano Estate',
    locationEN: 'Lubumbashi / Luano Estate',
    categoryFR: 'Livraison clé en main',
    categoryEN: 'Turnkey Handover',
    descriptionFR: 'Aperçu du projet finalisé : allées pavées, portails et clôtures de sécurité, menuiseries aluminium et éclairages de façade.',
    descriptionEN: 'Walkthrough of the completed project: concrete interlocking pavers, security gate and walls, aluminum glazing, and facade lighting.',
    duration: '0:40',
    videoFileName: 'video6.mp4',
    poster: posterCharcoalHome,
    altFR: 'Villa contemporaine MHA finalisée avec cour pavée',
    altEN: 'Finished contemporary MHA villa with paved courtyard',
  },
];
