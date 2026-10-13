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
 *    - (Optionnel) Placez une image d'affiche (.jpg) dans src/assets/images/
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
import posterVueAerienne from '../assets/images/drone_villa_katanga_1790686546337.jpg';

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
    id: 'chantier-lubumbashi-gros-oeuvre',
    titleFR: 'Chantier Villa Contemporaine — Gros Œuvre & Maçonnerie',
    titleEN: 'Contemporary Villa Site — Structural Work & Masonry',
    locationFR: 'Lubumbashi / Route Aéroport',
    locationEN: 'Lubumbashi / Airport Road',
    categoryFR: 'Gros œuvre & Structures',
    categoryEN: 'Structural Masonry',
    descriptionFR: 'Visite directe de chantier : coulage des voiles béton armé, élévation des maçonneries et préparation des dalles de compression.',
    descriptionEN: 'On-site walkthrough: pouring reinforced concrete walls, masonry elevation, and structural compression slabs.',
    duration: '0:45',
    videoFileName: 'chantier_villa_lubumbashi.mp4',
    poster: posterChantierGrosOeuvre,
    altFR: 'Chantier de gros œuvre MHA avec ouvriers et bétonnière à Lubumbashi',
    altEN: 'MHA structural building site with workers and mixer in Lubumbashi',
  },
  {
    id: 'chantier-second-oeuvre-finitions',
    titleFR: 'Aménagement Extérieur & Voirie Pavée',
    titleEN: 'Outdoor Landscaping & Paved Driveway',
    locationFR: 'Lubumbashi / Bel-Air',
    locationEN: 'Lubumbashi / Bel-Air',
    categoryFR: 'Second œuvre & VRD',
    categoryEN: 'Finishing & Earthworks',
    descriptionFR: 'Phase d’exécution des caniveaux d’évacuation pluviale, pose des bordures et calepinage des pavés autobloquants vibrés.',
    descriptionEN: 'Execution of stormwater drain channels, precast curbs, and heavy-duty concrete interlocking pavers.',
    duration: '0:45',
    videoFileName: 'visite_chantier_second_oeuvre.mp4',
    poster: posterSecondOeuvre,
    altFR: 'Terrassement et pose de pavés pour allée de villa à Lubumbashi',
    altEN: 'Ground leveling and paving installation for a villa driveway in Lubumbashi',
  },
  {
    id: 'survol-drone-concession-domaine',
    titleFR: 'Domaine Résidentiel & Toiture Monumentale',
    titleEN: 'Residential Estate & Monumental Roof Structure',
    locationFR: 'Lubumbashi / Luano City',
    locationEN: 'Lubumbashi / Luano City',
    categoryFR: 'Toitures & Clôtures',
    categoryEN: 'Roofing & Enclosures',
    descriptionFR: 'Captation vidéo d’un ensemble résidentiel clé en main : charpente métallique haute pente, clôture maçonnée et gestion gravitaire des eaux.',
    descriptionEN: 'Footage of a turnkey residential compound: high-slope steel roofing, masonry perimeter walls, and gravitational drainage.',
    duration: '0:45',
    videoFileName: 'chantier_villa_lubumbashi.mp4',
    poster: posterVueAerienne,
    altFR: 'Vue aérienne d’une villa MHA avec toiture thermo-laquée et cour pavée',
    altEN: 'Aerial view of an MHA villa with coated tile roof and paved courtyard',
  },
];
