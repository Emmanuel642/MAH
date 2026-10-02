import { Project } from '../types';
import villaCharcoalHome from '../assets/images/villa_charcoal_home_1790686776772.jpg';
import villaLuanoKatanga from '../assets/images/villa_luano_katanga_1790685910085.jpg';
import residenceAnnexeAerial from '../assets/images/residence_annexe_aerial_1790685925017.jpg';
import villaGolfLubumbashi from '../assets/images/villa_golf_lubumbashi_1790685952085.jpg';
import parkingMetallique from '../assets/images/parking_metallique_1790686297016.jpg';
import villaElevationReelle from '../assets/images/villa_elevation_reelle_1790686559026.jpg';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'villa-anthracite-concept',
    code: '01',
    title: 'Villa Anthracite Modern Home',
    tagline: 'Signature architecturale contemporaine aux lignes épurées et volumétrie anthracite',
    type: 'Architecture · Construction',
    category: ['Architecture', 'Construction', 'Résidentiel'],
    city: 'Lubumbashi',
    location: 'Lubumbashi / Katanga DRC — 2024',
    year: '2024',
    surface: '450 M²',
    height: 'Plain-pied contemporain à toitures plates décaissées',
    image: villaCharcoalHome,
    description: "Volumétrie minimaliste affirmée, façades texturées gris anthracite, baies vitrées toute hauteur avec vitrage à contrôle solaire et casquettes d'ombrage en porte-à-faux. Une création exclusive signée Modern Home Concept.",
    fullNarrative: "La Villa Anthracite Modern Home incarne la vision avant-gardiste de notre cabinet : une réinterprétation audacieuse de l’habitat contemporain en République Démocratique du Congo. Les volumes géométriques imbriqués créent des jeux d'ombres nets protégeant les espaces intérieurs des rayonnements solaires directs. Les larges ouvertures vitrées en aluminium noir de première qualité invitent le paysage extérieur au cœur du séjour. La terrasse latérale ceinte d'un garde-corps en verre trempé et les marches immaculées soulignent l'élégance sobre de cet ouvrage d'exception.",
    specs: {
      superficie: '450 m² habitables sur parcelle arborée',
      hauteur: 'Plain-pied (Gabarit 4.80 m avec acrotères décaissés)',
      annee: '2024 (Conception & Réalisation)',
      localisation: 'Zone résidentielle haut standing, Lubumbashi, Katanga DRC',
      coordonnees: "11°38'45\"S 27°28'10\"E",
      programme: 'Suite parentale panoramique avec dressing privatif, 3 chambres enfants avec salles d’eau, grand salon cathédrale ouvert sur terrasse, cuisine îlot moderne et domotique intégrée',
      materiaux: [
        'Béton armé banché haute compacité avec étanchéité bicouche',
        'Enduits minéraux teintés dans la masse nuance gris anthracite profond',
        'Menuiseries aluminium rupture de pont thermique et vitrages antieffraction',
        'Garde-corps en verre trempé feuilleté 88.2 sans montants apparents',
        'Dallage extérieur antidérapant et pelouse paysagère avec arrosage intégré'
      ],
      phases: [
        'Conception volumétrique & études bioclimatiques',
        'Plans de coffrage et ferraillage d’ingénierie',
        'Gros œuvre coulé sur place et isolation thermique de toiture',
        'Pose menuiseries haut de gamme et second œuvre de précision',
        'Aménagement paysager et éclairage architectural LED nocturne'
      ]
    }
  },
  {
    id: 'villa-luano-city',
    code: '02',
    title: 'Villa Luano City',
    tagline: 'Résidence contemporaine de plain-pied avec toiture multi-pans et porche à colonnades',
    type: 'Architecture · Construction',
    category: ['Architecture', 'Construction', 'Résidentiel'],
    city: 'Lubumbashi',
    location: 'Lubumbashi / Luano City — 2024',
    year: '2024',
    surface: '580 M²',
    height: 'Plain-pied / Toiture à forte pente',
    image: villaLuanoKatanga,
    description: "Conçue pour les exigences climatiques du Haut-Katanga, cette villa contemporaine allie façades immaculées à modénatures géométriques grises, toiture monumentale en tuiles thermo-laquées foncées et porche d’accueil à arcades et colonnes jumelées.",
    fullNarrative: "Édifiée le long de la Route de l’Aéroport (secteur Luano City / Commune Annexe) à Lubumbashi, la Villa Luano City répond aux fortes amplitudes thermiques et aux pluies diluviennes de la saison humide katangaise. La charpente métallique haute pente garantit l’évacuation immédiate des eaux de ruissellement, tandis que les avant-toits protègent les baies vitrées des rayons zénithaux en saison sèche. La concession bénéficie d’un pavage intégral en pavés autobloquants vibrés haute résistance, évitant la poussière latéritique et les boues tropicales.",
    specs: {
      superficie: '580 m² habitables (concession de 1 200 m²)',
      hauteur: 'Plain-pied (Gabarit faîtage 6.80 m)',
      annee: '2024 (Livraison achevée)',
      localisation: 'Route Aéroport, Luano City, Lubumbashi, Katanga DRC',
      coordonnees: "11°36'14\"S 27°31'02\"E",
      programme: 'Villa de maître, 4 suites avec dressing et salles de bain privatives, double salon de réception, galerie couverte extérieure, cuisine équipée, logement de personnel et cour pavée',
      materiaux: ['Béton armé dosé à 350 kg/m³ MHA', 'Tuiles métalliques granulées traitées anti-UV', 'Menuiseries aluminium thermolaqué noir', 'Pavés autobloquants béton vibré 60 mm', 'Mur de clôture maçonné avec lisseuse et harponnage de sécurité'],
      phases: ['Étude géotechnique sur sol latéritique', 'Conception des plans & élévations 3D', 'Fourniture directe des matériaux par MHA', 'Gros œuvre, toiture et finitions haut de gamme']
    }
  },
  {
    id: 'residence-annexe-katanga',
    code: '02',
    title: 'Domaine Résidentiel Annexe',
    tagline: 'Concession privée intégrale avec cour pavée étanche et clôture sécurisée',
    type: 'Architecture · Construction',
    category: ['Architecture', 'Construction', 'Résidentiel'],
    city: 'Lubumbashi',
    location: 'Lubumbashi / Commune Annexe — 2024',
    year: '2024',
    surface: '720 M²',
    height: 'Plain-pied étendu',
    image: residenceAnnexeAerial,
    description: "Vue aérienne d'une réalisation clé en main MHA : clôture périmétrique maçonnée avec couronnement de poteaux, toiture complexe multi-arêtiers, cour pavée étanche et système d'évacuation gravitaire des eaux pluviales.",
    fullNarrative: "Ce domaine familial privé témoigne de l'approche intégrée de MHA à Lubumbashi, combinant bureau d'études et centrale de fourniture de matériaux de construction. Face aux sols argilo-sablonneux du Katanga, les fondations reposent sur des semelles filantes et longrines en béton armé hydrofugé. La concession est protégée par un mur d'enceinte en blocs chaînés avec harponnage, système d'électrification périmétrique et château d'eau autonome de 10 000 litres avec surpresseur.",
    specs: {
      superficie: '720 m² bâtis sur parcelle de 2 000 m²',
      hauteur: 'RDC avec charpente pyramidale',
      annee: '2024 (Livraison)',
      localisation: 'Commune Annexe Est, Lubumbashi, RDC',
      coordonnees: "11°38'20\"S 27°26'15\"E",
      programme: 'Résidence principale, pavillon d’amis indépendant, abri de 4 véhicules, local technique pour groupe électrogène et forage avec filtration UV',
      materiaux: ['Blocs béton haute densité MHA', 'Toiture bacs autoportants ondulés noir mat', 'Dalles de terrasse antidérapantes', 'Ferronnerie industrielle pour portail motorisé'],
      phases: ['Terrassement & viabilisation de concession', 'Gros œuvre et chaînages armés', 'Fourniture directe ciments et fers FE E500', 'Aménagements extérieurs et voirie pavée']
    }
  },
  {
    id: 'villa-golf-lubumbashi',
    code: '03',
    title: 'Villa Golf Lubumbashi',
    tagline: 'Villa contemporaine de plain-pied avec casquettes lumineuses LED et parement en pierre',
    type: 'Architecture · Génie civil',
    category: ['Architecture', 'Génie civil', 'Résidentiel'],
    city: 'Lubumbashi',
    location: 'Lubumbashi / Quartier Golf — 2024',
    year: '2024',
    surface: '640 M²',
    height: 'Plain-pied contemporain',
    image: villaGolfLubumbashi,
    description: "Prise de vue nocturne sur chantier : mise en lumière des casquettes en débord par spots LED encastrés, façades en enduit minéral gris texturé, soubassement en parement de pierre naturelle et menuiseries aluminium sécurisées.",
    fullNarrative: "Implantée dans le quartier résidentiel prisé du Golf à Lubumbashi, cette villa de plain-pied combine pureté géométrique et mise en valeur architecturale nocturne. Les débords de toiture intègrent une série de spots LED étanches qui ceinturent la villa, soulignant les textures de l'enduit minéral gratté et le soubassement habillé de briquettes de pierre naturelle sombre. MHA a assuré l'ensemble des études de structures, les installations électriques de précision et la réalisation tout corps d'état.",
    specs: {
      superficie: '640 m² utiles (terrain 1 500 m²)',
      hauteur: 'Gabarit 5.50 m',
      annee: '2024 (Finitions & Mise en lumière)',
      localisation: 'Quartier Golf, Lubumbashi, Haut-Katanga, RDC',
      coordonnees: "11°41'10\"S 27°27'45\"E",
      programme: '4 chambres avec salles d’eau privatives, double séjour avec hauteur sous plafond de 3,60 m, terrasse véranda extérieure éclairée et loge de gardiennage',
      materiaux: [
        'Casquettes de toiture débordantes avec spots LED intégrés étanches',
        'Enduit de façade gratté projeté gris minéral contemporain',
        'Soubassement et plinthes en parement de pierre sombre',
        'Menuiseries aluminium noires avec grilles de sécurité intégrées',
        'Massifs de fondation et chaînage béton armé dosé à 350 kg/m³'
      ],
      phases: [
        'Étude géotechnique de portance sur sol katangais',
        'Gros œuvre et coulage des casquettes en béton armé',
        'Réseau électrique encastré et pose des spots d’ambiance',
        'Application des enduits de façade et pose du parement de pierre',
        'Contrôle qualité nocturne & réception des ouvrages'
      ]
    }
  },
  {
    id: 'parking-parcellaire-metallique',
    code: '05',
    title: 'Parking Parcellaire Métallique',
    tagline: 'Ouvrage architectural en structure métallique alliant robustesse, durabilité et esthétique',
    type: 'Construction · Génie civil',
    category: ['Construction', 'Génie civil', 'Résidentiel'],
    city: 'Lubumbashi',
    location: 'Lubumbashi / Haut-Katanga — 2024',
    year: '2024',
    surface: '120 M²',
    height: 'Gabarit libre 3.40 m sous poutre',
    image: parkingMetallique,
    description: "Nous avons conçu et réalisé un parking parcellaire en structure métallique professionnelle, alliant robustesse et modernité. Plus qu’un simple espace de stationnement, c’est une œuvre architecturale qui apporte une touche d’élégance et de beauté à votre parcelle. Avec Modern Home Concept, chaque projet devient une signature de durabilité et d’esthétique.",
    fullNarrative: "Nous avons conçu et réalisé un parking parcellaire en structure métallique professionnelle, alliant robustesse et modernité. Plus qu’un simple espace de stationnement, c’est une œuvre architecturale qui apporte une touche d’élégance et de beauté à votre parcelle. Avec Modern Home Concept, chaque projet devient une signature de durabilité et d’esthétique.\n\nConçue pour abriter durablement les véhicules des fortes chaleurs équatoriales et des averses tropicales intenses du Katanga, cette infrastructure repose sur une ossature en profilés d'acier tubulaires lourds traités par poudrage époxy noir mat. Les élégants claustras verticaux latéraux agissent comme brise-soleil et brise-vue tout en conférant une ligne géométrique résolument contemporaine. L'ensemble s'intègre sur une esplanade pavée haute résistance.",
    specs: {
      superficie: '120 m² couverts (capacité 4 à 5 véhicules)',
      hauteur: '3.40 m de hauteur libre sous plafond',
      annee: '2024 (Livraison achevée)',
      localisation: 'Concession résidentielle, Lubumbashi, Katanga DRC',
      coordonnees: "11°39'25\"S 27°29'40\"E",
      programme: 'Abri de stationnement parcellaire métallique, claustras décoratifs à lamelles verticales, intégration électrique LED et cour pavée',
      materiaux: [
        'Structure porteuse en tubes carrés et profilés IPE acier galvanisé',
        'Traitement anticorrosion et thermolaquage noir mat cuit au four',
        'Claustras architecturaux brise-soleil verticaux en acier mécano-soudé',
        'Couverture étanche en bacs acier isolés avec pare-vapeur',
        'Revêtement de sol en pavés autobloquants béton vibré 60 mm'
      ],
      phases: [
        'Calculs d’ingénierie métallique et résistance au vent',
        'Découpe numérique, soudure TIG et assemblage en atelier MHA',
        'Scellement des platines sur massifs béton armé dosé à 350 kg/m³',
        'Levage, montage de la toiture et pose des ventelles',
        'Raccordements pluviaux invisibles intégrés aux poteaux creux'
      ]
    }
  },
  {
    id: 'mont-fleury',
    code: '06',
    title: 'Résidence Mont-Fleury',
    tagline: 'Composition résidentielle contemporaine en béton matricé et bois d’iroko',
    type: 'Architecture · Construction',
    category: ['Architecture', 'Construction', 'Résidentiel'],
    city: 'Kinshasa',
    location: 'Kinshasa / Gombe — 2024',
    year: '2024',
    surface: '920 M²',
    height: 'R+2',
    image: villaElevationReelle,
    description: "Composition résidentielle privée aux lignes pures en béton matricé, cours d'eau réfléchissants et protections solaires en bois d'iroko thermotraité.",
    fullNarrative: "Conçue pour un client privé au cœur de la commune de la Gombe à Kinshasa, la Résidence Mont-Fleury développe un dialogue franc entre monumentalité minérale et intimité tropicale. Le parti architectural repose sur l'alternance de voiles en béton matricé coulé sur place et d'amples porte-à-faux calculés pour abriter les façades vitrées du rayonnement équatorial direct.",
    specs: {
      superficie: '920 m² habitables (parcelle 1 400 m²)',
      hauteur: 'R+2 (Gabarit 10.40 m)',
      annee: '2023 - 2024 (Livraison achevée)',
      localisation: 'Gombe, Kinshasa, RDC',
      coordonnees: "04°18'22\"S 15°18'04\"E",
      programme: 'Villa de maître, 5 suites, espace réceptions, galerie privée, pavillon d’hôtes et miroir d’eau',
      materiaux: ['Béton architectonique matricé', 'Bardage bois d’iroko certifié FSC', 'Profilés aluminium thermolaqué noir basalte', 'Pierre calcaire locale de Kimpese'],
      phases: ['Étude géotechnique & esquisse', 'Dossier de permis de bâtir', 'Ingénierie structurelle BA', 'Direction & exécution tout corps d’état']
    }
  }
];

export const COMPANY_LEGAL_INFO = {
  denomination: "Société de Construction, d’Architecture et de Fourniture de Matériaux de Construction",
  tradeName: "MHA — Modern Home Architecture",
  nrc: "8458",
  capitalSocial: "CD 11 500 000",
  siege: "Bloc II, Bâtiment LUANO CITY, Route Aéroport, Commune Annexe, Lubumbashi Ville, Katanga DRC",
  phones: ["+243 991 999 901", "+243 850 001 001"],
  email: "contact@mha-rdc.com",
};

export const OFFICE_LOCATIONS = [
  {
    city: 'Lubumbashi',
    role: 'Siège Social & Direction Générale',
    address: 'Bloc II, Bâtiment LUANO CITY, Route Aéroport, Commune Annexe, Lubumbashi Ville',
    territory: 'Katanga DRC, Haut-Katanga, Lualaba, Kolwezi',
    phone: '+243 991 999 901 | +243 850 001 001',
    email: 'contact@mha-rdc.com',
    coordinates: "11°40'S 27°29'E",
    cadastreRef: 'CD-HK-LSH-2026/115',
    nrc: 'NRC 8458',
    hours: 'Lun — Ven : 08h30 - 17h00'
  },
  {
    city: 'Kinshasa',
    role: 'Bureau d’Études & Antenne Capitale',
    address: '42 Boulevard du 30 Juin, Gombe, Kinshasa',
    territory: 'Kinshasa, Kongo Central, Grand Bandundu',
    phone: '+243 991 999 901 | +243 850 001 001',
    email: 'contact@mha-rdc.com',
    coordinates: "04°19'S 15°18'E",
    cadastreRef: 'CD-KIN-GMB-2026/042',
    nrc: 'NRC 8458',
    hours: 'Lun — Ven : 08h30 - 17h30'
  }
];
