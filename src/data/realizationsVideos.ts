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
    titleEN: 'Modern Metal Parking Structure',
    locationFR: 'Lieu non précisé',
    locationEN: 'Location not specified',
    categoryFR: 'Parking métallique',
    categoryEN: 'Metal Parking Structure',
    descriptionFR: 'Découvrez un parking à structure métallique au design moderne, conçu pour offrir une solution de stationnement fonctionnelle. Cette séquence met en valeur la structure et son intégration dans l’environnement.',
    descriptionEN: 'Discover a modern metal parking structure designed to provide a functional parking solution. This sequence highlights the structure and how it fits into its surroundings.',
    videoFileName: 'videos1.mp4',
    poster: posterVideo1,
    altFR: 'Parking moderne à structure métallique',
    altEN: 'Modern metal parking structure',
  },
  {
    id: 'chantier-video-2',
    titleFR: 'Travaux de décoration intérieure',
    titleEN: 'Interior Decorating Work',
    locationFR: 'Lieu non précisé',
    locationEN: 'Location not specified',
    categoryFR: 'Décoration intérieure',
    categoryEN: 'Interior Decorating',
    descriptionFR: 'Découvrez les travaux de décoration intérieure réalisés sur ce chantier. Cette séquence présente les espaces intérieurs et les éléments visibles qui contribuent à leur mise en valeur.',
    descriptionEN: 'Discover the interior decorating work carried out on this site. This sequence shows the interior spaces and the visible elements that contribute to their presentation.',
    videoFileName: 'video2.mp4',
    poster: posterVideo2,
    altFR: 'Travaux de décoration intérieure sur un chantier',
    altEN: 'Interior decorating work on a construction site',
  },
  {
    id: 'chantier-video-3',
    titleFR: 'Bâtiment à deux niveaux — Phase de finition',
    titleEN: 'Two-Storey Building — Finishing Phase',
    locationFR: 'Lieu non précisé',
    locationEN: 'Location not specified',
    categoryFR: 'Finition de bâtiment',
    categoryEN: 'Building Finishing',
    descriptionFR: 'Suivez l’évolution d’un bâtiment à deux niveaux en phase de finition. Cette visite montre l’état d’avancement du chantier et les espaces en cours de finalisation.',
    descriptionEN: 'Follow the progress of a two-storey building in its finishing phase. This walkthrough shows the state of the site and the spaces being completed.',
    videoFileName: 'video3.mp4',
    poster: posterVideo3,
    altFR: 'Bâtiment à deux niveaux en phase de finition',
    altEN: 'Two-storey building in the finishing phase',
  },
  {
    id: 'chantier-video-4',
    titleFR: 'Démarrage du chantier — Implantation et fondations',
    titleEN: 'Project Start — Site Layout and Foundations',
    locationFR: 'Lieu non précisé',
    locationEN: 'Location not specified',
    categoryFR: 'Implantation et fondations',
    categoryEN: 'Site Layout and Foundations',
    descriptionFR: 'Découvrez les premières étapes d’un nouveau projet de construction, avec l’implantation du chantier et la mise en place des fondations visibles dans cette séquence.',
    descriptionEN: 'Discover the first stages of a new construction project, including the site layout and the foundations visible in this sequence.',
    videoFileName: 'video4.mp4',
    poster: posterVideo4,
    altFR: 'Implantation d’un nouveau chantier et mise en place des fondations',
    altEN: 'Layout of a new construction site and foundation work',
  },
  {
    id: 'chantier-video-5',
    titleFR: 'Finitions intérieures en cours',
    titleEN: 'Interior Finishing in Progress',
    locationFR: 'Lieu non précisé',
    locationEN: 'Location not specified',
    categoryFR: 'Finitions intérieures',
    categoryEN: 'Interior Finishing',
    descriptionFR: 'Entrez dans un chantier en phase de finition intérieure. Cette visite permet d’observer les espaces et l’avancement des travaux avant l’achèvement du projet.',
    descriptionEN: 'Step inside a site in the interior finishing phase. This walkthrough lets you observe the spaces and the progress of the work before the project is complete.',
    videoFileName: 'video5.mp4',
    poster: posterVideo5,
    altFR: 'Intérieur d’un chantier en phase de finition',
    altEN: 'Interior of a construction site in the finishing phase',
  },
  {
    id: 'chantier-video-6',
    titleFR: 'Visite intérieure d’une maison en construction',
    titleEN: 'Interior Tour of a House Under Construction',
    locationFR: 'Lieu non précisé',
    locationEN: 'Location not specified',
    categoryFR: 'Maison en construction',
    categoryEN: 'House Under Construction',
    descriptionFR: 'Découvrez l’intérieur d’une maison en cours de réalisation. Cette séquence offre un aperçu des espaces intérieurs et de l’état d’avancement du chantier.',
    descriptionEN: 'Discover the interior of a house under construction. This sequence offers a look at the interior spaces and the progress of the work.',
    videoFileName: 'video6.mp4',
    poster: posterVideo6,
    altFR: 'Intérieur d’une maison en cours de réalisation',
    altEN: 'Interior of a house under construction',
  },
];
