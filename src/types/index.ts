export type Language = 'FR' | 'EN';

export type ProjectCategory = 'Tous' | 'Architecture' | 'Génie civil' | 'Construction' | 'Résidentiel' | 'Tertiaire';

export interface ProjectSpec {
  superficie: string;
  hauteur: string;
  annee: string;
  localisation: string;
  coordonnees: string;
  programme: string;
  materiaux: string[];
  phases: string[];
}

export interface Project {
  id: string;
  code: string;
  title: string;
  tagline: string;
  taglineEN?: string;
  type: string;
  typeEN?: string;
  category: ('Architecture' | 'Génie civil' | 'Construction' | 'Résidentiel' | 'Tertiaire')[];
  city: 'Kinshasa' | 'Lubumbashi' | 'Kolwezi' | 'Matadi';
  location: string;
  locationEN?: string;
  year: string;
  surface: string;
  height: string;
  heightEN?: string;
  image: string;
  gallery?: string[];
  description: string;
  descriptionEN?: string;
  fullNarrative: string;
  fullNarrativeEN?: string;
  specs: ProjectSpec;
  specsEN?: ProjectSpec;
}

export interface EstimateFormData {
  programType: string;
  city: string;
  surfaceM2: number;
  phases: string[];
  timeline: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes: string;
}
