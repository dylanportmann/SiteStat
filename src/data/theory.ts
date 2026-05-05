import type { TheorySchema, TheorySchemaVariant, TheorySection, TheorySource } from "../types";

export const theorySchemaVariants: TheorySchemaVariant[] = [
  "population-flow",
  "variable-tree",
  "randomization-plan",
  "center-skew",
  "boxplot-iqr",
  "graph-choices",
  "probability-events",
  "normal-z",
  "t-vs-normal",
  "scientific-cycle",
  "sampling-distribution",
  "hypothesis-pvalue",
  "t-test-choice",
  "error-matrix",
  "alternative-tails"
];

const theorySchemasByCardId: Record<string, TheorySchema[]> = {
  "population-echantillon": [
    {
      id: "schema-population-echantillon",
      title: "De la population a l'inference",
      description:
        "Le schema suit la chaine population, echantillon, statistique observee, puis inference vers un parametre inconnu.",
      variant: "population-flow",
      labels: ["Population", "Echantillon", "Statistique", "Inference", "Parametre"]
    }
  ],
  "types-variables": [
    {
      id: "schema-types-variables",
      title: "Arbre des types de variables",
      description:
        "Le schema separe les variables qualitatives et quantitatives, puis leurs sous-types usuels.",
      variant: "variable-tree",
      labels: ["Variable", "Qualitative", "Quantitative", "Nominale", "Ordinale", "Discrete", "Continue"]
    }
  ],
  "collecte-biais": [
    {
      id: "schema-randomisation-plan",
      title: "Selection aleatoire et assignation aleatoire",
      description:
        "Le schema distingue la selection qui aide a generaliser et l'assignation qui aide a conclure causalement.",
      variant: "randomization-plan",
      labels: ["Population", "Echantillon", "Groupe A", "Groupe B", "Generaliser", "Causalite"]
    }
  ],
  centre: [
    {
      id: "schema-centre-asymetrie",
      title: "Moyenne, mediane et asymetrie",
      description:
        "Le schema montre une distribution tiree a droite ou la moyenne est deplacee plus fortement que la mediane.",
      variant: "center-skew",
      labels: ["Mediane", "Moyenne", "Queue droite", "Valeurs extremes"]
    }
  ],
  "dispersion-position": [
    {
      id: "schema-boxplot-iqr",
      title: "Schema du boxplot et de l'IQR",
      description:
        "Le schema situe minimum, Q1, mediane, Q3, maximum et IQR dans un boxplot.",
      variant: "boxplot-iqr",
      labels: ["Min", "Q1", "Mediane", "Q3", "Max", "IQR"]
    }
  ],
  "formes-graphes": [
    {
      id: "schema-choix-graphiques",
      title: "Choisir un graphique selon la question",
      description:
        "Le schema relie histogramme, boxplot et QQ-plot aux questions de forme, comparaison et normalite.",
      variant: "graph-choices",
      labels: ["Histogramme", "Boxplot", "QQ-plot", "Forme", "Groupes", "Normalite"]
    }
  ],
  "probabilite-evenement": [
    {
      id: "schema-probabilite-evenements",
      title: "Evenement, complement et conditionnelle",
      description:
        "Le schema represente A, son complement et l'espace reduit quand on conditionne par B.",
      variant: "probability-events",
      labels: ["Univers", "A", "non A", "B", "A et B", "P(A | B)"]
    }
  ],
  "loi-normale-z": [
    {
      id: "schema-normale-z",
      title: "Loi normale, ecart-type et score z",
      description:
        "Le schema place la moyenne mu, les ecarts-types et une valeur x transformee en score z.",
      variant: "normal-z",
      labels: ["mu", "-1 sigma", "+1 sigma", "x", "z = (x - mu) / sigma"]
    }
  ],
  "loi-t-simulation": [
    {
      id: "schema-t-vs-normale",
      title: "Loi t comparee a la normale",
      description:
        "Le schema compare la normale a la loi t, dont les queues sont plus epaisses avec peu de degres de liberte.",
      variant: "t-vs-normal",
      labels: ["Normale", "Loi t", "Queues plus epaisses", "ddl"]
    }
  ],
  "cycle-scientifique": [
    {
      id: "schema-cycle-scientifique",
      title: "Cycle observation, hypothese, test et revision",
      description:
        "Le schema met le calcul statistique dans une boucle scientifique: observation, hypothese, prediction, test, revision.",
      variant: "scientific-cycle",
      labels: ["Observation", "Hypothese", "Prediction", "Test", "Revision"]
    }
  ],
  "distribution-echantillonnage": [
    {
      id: "schema-distribution-echantillonnage",
      title: "Distribution d'echantillonnage et erreur standard",
      description:
        "Le schema montre que plusieurs echantillons produisent plusieurs statistiques, dont la dispersion est l'erreur standard.",
      variant: "sampling-distribution",
      labels: ["Echantillons repetes", "Statistiques", "Distribution", "Erreur standard", "xbar"]
    }
  ],
  "test-hypothese": [
    {
      id: "schema-test-pvalue",
      title: "Zone alpha et p-value",
      description:
        "Le schema situe une statistique observee, la zone critique alpha et la p-value dans la queue de distribution sous H0.",
      variant: "hypothesis-pvalue",
      labels: ["Distribution sous H0", "Statistique observee", "p-value", "alpha", "Zone critique"]
    }
  ],
  "tests-t": [
    {
      id: "schema-famille-tests-t",
      title: "Choisir le bon test t",
      description:
        "Le schema aide a choisir entre test t a un echantillon, apparie et independant selon la structure des donnees.",
      variant: "t-test-choice",
      labels: ["Une moyenne", "Deux mesures liees", "Deux groupes", "1 echantillon", "Apparie", "Independant"]
    }
  ],
  "types-erreurs": [
    {
      id: "schema-matrice-erreurs",
      title: "Matrice des decisions et erreurs",
      description:
        "Le schema croise l'etat reel de H0 avec la decision du test pour situer type I, type II, decision correcte et puissance.",
      variant: "error-matrix",
      labels: ["H0 vraie", "H1 vraie", "Rejeter H0", "Ne pas rejeter H0", "Type I", "Type II", "Puissance"]
    }
  ],
  "unilateral-bilateral": [
    {
      id: "schema-alternatives",
      title: "Tests bilateral et unilateraux",
      description:
        "Le schema compare la repartition du risque alpha pour two.sided, greater et less.",
      variant: "alternative-tails",
      labels: ["two.sided", "greater", "less", "alpha / 2", "alpha"]
    }
  ]
};

export const theorySources: TheorySource[] = [
  {
    id: "stat-resume",
    label: "Stat-resume.html"
  },
  {
    id: "stat500",
    label: "Penn State STAT 500",
    url: "https://online.stat.psu.edu/stat500/"
  },
  {
    id: "openintro",
    label: "OpenIntro Statistics",
    url: "https://www.openintro.org/book/os/"
  },
  {
    id: "nist",
    label: "NIST e-Handbook",
    url: "https://www.itl.nist.gov/div898/handbook/"
  }
];

const rawTheorySections: TheorySection[] = [
  {
    id: "variables",
    title: "Variables, collecte et plan d'etude",
    shortTitle: "Variables",
    courseRef: "S01",
    intro:
      "Avant une formule ou un test, il faut savoir ce qui est mesure, sur qui, comment, et avec quel risque de biais. Cette section pose le vocabulaire qui conditionne toute la suite.",
    keyQuestions: [
      "Quelle est l'unite statistique observee ?",
      "La variable est-elle qualitative, quantitative, explicative ou reponse ?",
      "Le plan de collecte permet-il de generaliser ou de conclure causalement ?"
    ],
    sourceIds: ["stat-resume", "stat500", "openintro"],
    cards: [
      {
        id: "population-echantillon",
        title: "Population, echantillon et unite statistique",
        summary: "Distinguer le groupe vise, la partie observee et l'objet mesure.",
        definition:
          "La population est l'ensemble sur lequel on veut conclure. L'echantillon est la partie effectivement observee. L'unite statistique est l'individu, objet ou cas qui fournit une ligne de donnees.",
        intuition:
          "Une moyenne calculee sur l'echantillon n'a de sens generalisable que si l'echantillon represente correctement la population visee.",
        details: [
          "Un parametre de population est fixe mais souvent inconnu, par exemple la vraie moyenne mu.",
          "Une statistique d'echantillon est calculee a partir des donnees, par exemple la moyenne observee.",
          "La taille d'echantillon n aide a reduire l'incertitude, mais elle ne corrige pas un biais de collecte."
        ],
        conditions: [
          "Definir la population avant de regarder les resultats.",
          "Verifier que chaque ligne du tableau correspond a la meme unite statistique.",
          "Identifier si les observations sont independantes ou liees."
        ],
        pitfalls: [
          "Confondre grand echantillon et echantillon representatif.",
          "Generaliser a une population plus large que celle couverte par la collecte."
        ],
        example:
          "Si 80 etudiants de Stat 1 repondent a un questionnaire, l'unite est l'etudiant, l'echantillon est ces 80 etudiants, et la population pourrait etre tous les etudiants du cours seulement si la collecte le justifie.",
        commandLinks: [
          { commandId: "base-head-tail", label: "Inspecter les lignes" },
          { commandId: "base-str", label: "Voir la structure" }
        ],
        tags: ["population", "echantillon", "unite", "parametre", "statistique"]
      },
      {
        id: "types-variables",
        title: "Types de variables",
        summary: "Choisir les resumes et graphiques selon la nature de la variable.",
        definition:
          "Une variable qualitative decrit une categorie; une variable quantitative decrit une quantite numerique. Les qualitatives peuvent etre nominales ou ordinales; les quantitatives discretes ou continues.",
        intuition:
          "Le type de variable decide ce que l'on peut calculer: une moyenne pour une mesure numerique, des frequences pour une categorie.",
        details: [
          "Nominale: categories sans ordre naturel, comme groupe sanguin ou nationalite.",
          "Ordinale: categories ordonnees, comme faible, moyen, fort.",
          "Discrete: valeurs numeriques comptees, comme nombre d'erreurs.",
          "Continue: mesure sur un continuum, comme taille, temps ou masse."
        ],
        interpretation: [
          "Une variable codee avec des nombres peut rester qualitative si les nombres ne representent que des etiquettes.",
          "Une variable ordinale autorise un classement, mais pas forcement des distances egales entre niveaux."
        ],
        pitfalls: [
          "Calculer une moyenne sur des codes de categories nominales.",
          "Oublier l'ordre d'un facteur ordinal dans R."
        ],
        commandLinks: [
          { commandId: "variables-factor", label: "factor()" },
          { commandId: "variables-ordered", label: "ordered()" },
          { commandId: "variables-type-conversion", label: "as.numeric()" }
        ],
        tags: ["qualitative", "quantitative", "nominale", "ordinale", "discrete", "continue"]
      },
      {
        id: "roles-variables",
        title: "Variable reponse, explicative et confusion",
        summary: "Identifier ce que l'on cherche a expliquer et ce qui pourrait biaiser la relation.",
        definition:
          "La variable reponse est l'issue que l'on veut comprendre. La variable explicative est celle qui pourrait expliquer ou predire la reponse. Une variable de confusion est liee aux deux et peut fausser l'interpretation.",
        intuition:
          "Une relation observee entre deux variables peut venir d'une troisieme variable non controlee.",
        details: [
          "Le role d'une variable depend de la question de recherche.",
          "Une variable peut etre reponse dans une etude et explicative dans une autre.",
          "Un plan experimental cherche a neutraliser la confusion par randomisation, controle et replication."
        ],
        pitfalls: [
          "Interpreter une correlation comme une causalite sans plan experimental.",
          "Omettre les variables de contexte qui changent l'association observee."
        ],
        example:
          "Si les heures d'etude predisent la note, la note est la reponse et les heures sont explicatives. Le niveau initial peut etre une variable de confusion.",
        commandLinks: [
          { commandId: "descriptives-correlation", label: "cor()" },
          { commandId: "inference-lm", label: "lm()" }
        ],
        tags: ["reponse", "explicative", "confusion", "causalite", "association"]
      },
      {
        id: "collecte-biais",
        title: "Collecte, biais et representativite",
        summary: "Comprendre quand un echantillon peut soutenir une conclusion fiable.",
        definition:
          "Un biais est une erreur systematique due a la collecte, au recrutement, a la mesure ou a la non-reponse. Il deplace les resultats dans une direction et ne disparait pas automatiquement avec n.",
        intuition:
          "La statistique quantifie l'incertitude aleatoire; elle ne repare pas un mauvais plan de collecte.",
        details: [
          "Echantillonnage aleatoire: chaque unite a une probabilite connue d'etre selectionnee.",
          "Echantillon de convenance: facile a obtenir mais souvent non representatif.",
          "Non-reponse: les personnes qui ne repondent pas peuvent differer des repondants.",
          "Biais de mesure: l'instrument ou la question modifie la valeur observee."
        ],
        interpretation: [
          "Random selection aide a generaliser a la population.",
          "Random assignment aide a interpreter causalement un effet."
        ],
        pitfalls: [
          "Confondre selection aleatoire et assignation aleatoire.",
          "Rapporter des p-values precises sur des donnees fortement biaisees."
        ],
        commandLinks: [
          { commandId: "methode-set-seed", label: "set.seed()" },
          { commandId: "prob-sample", label: "sample()" }
        ],
        tags: ["biais", "representativite", "randomisation", "non-reponse", "causalite"]
      }
    ]
  },
  {
    id: "descriptives",
    title: "Statistiques descriptives",
    shortTitle: "Descriptives",
    courseRef: "S02-S03",
    intro:
      "Les statistiques descriptives organisent les donnees avant toute conclusion. Elles servent a voir la forme, le centre, la dispersion, les valeurs atypiques et les relations simples.",
    keyQuestions: [
      "Quelle est la forme globale de la distribution ?",
      "Quel resume est robuste aux valeurs extremes ?",
      "Les groupes ou variables semblent-ils differer avant un test ?"
    ],
    sourceIds: ["stat-resume", "stat500", "openintro"],
    cards: [
      {
        id: "frequences-proportions",
        title: "Frequences et proportions",
        summary: "Resumer une variable qualitative avec des effectifs et pourcentages.",
        definition:
          "Une frequence absolue compte le nombre d'observations dans chaque modalite. Une frequence relative divise ce compte par le total.",
        intuition:
          "Pour une variable categorielle, la question centrale est combien d'observations tombent dans chaque categorie.",
        details: [
          "Les tableaux de contingence croisent deux variables qualitatives.",
          "Les proportions facilitent la comparaison entre groupes de tailles differentes.",
          "Un diagramme en barres est souvent plus lisible qu'un diagramme circulaire."
        ],
        formulas: [
          {
            label: "Proportion",
            expression: "p_i = n_i / n",
            explanation: "n_i est l'effectif de la modalite i et n le total."
          }
        ],
        pitfalls: [
          "Comparer des effectifs bruts quand les tailles de groupes different.",
          "Masquer les valeurs manquantes sans les signaler."
        ],
        commandLinks: [
          { commandId: "variables-table", label: "table()" },
          { commandId: "descriptives-prop-table", label: "prop.table()" },
          { commandId: "descriptives-barplot", label: "barplot()" }
        ],
        tags: ["frequence", "proportion", "pourcentage", "categorielle", "tableau"]
      },
      {
        id: "centre",
        title: "Tendance centrale",
        summary: "Moyenne, mediane et mode ne racontent pas la meme histoire.",
        definition:
          "La tendance centrale resume une distribution par une valeur typique. La moyenne utilise toutes les valeurs; la mediane coupe les observations triees en deux; le mode est la valeur la plus frequente.",
        intuition:
          "La moyenne est sensible aux extremes, la mediane est plus robuste, le mode est surtout utile pour les categories ou distributions discretes.",
        details: [
          "Moyenne: pertinente pour des donnees quantitatives sans asymetrie extreme.",
          "Mediane: utile pour revenus, temps, scores asymetriques ou valeurs extremes.",
          "Mode: utile pour identifier la categorie dominante."
        ],
        formulas: [
          {
            label: "Moyenne",
            expression: "xbar = sum(x_i) / n",
            explanation: "Somme des valeurs divisee par le nombre d'observations."
          }
        ],
        interpretation: [
          "Si moyenne et mediane sont proches, la distribution est souvent assez symetrique.",
          "Si la moyenne est plus grande que la mediane, la distribution peut etre tiree vers la droite."
        ],
        pitfalls: [
          "Donner uniquement la moyenne sans regarder la distribution.",
          "Utiliser la moyenne sur une variable ordinale comme si les distances etaient exactes."
        ],
        commandLinks: [
          { commandId: "descriptives-mean", label: "mean()" },
          { commandId: "descriptives-median", label: "median()" },
          { commandId: "descriptives-summary", label: "summary()" }
        ],
        tags: ["moyenne", "mediane", "mode", "centre", "asymetrie"]
      },
      {
        id: "dispersion-position",
        title: "Dispersion, quantiles et valeurs extremes",
        summary: "Mesurer si les donnees sont regroupees ou tres etalees.",
        definition:
          "La dispersion decrit l'etalement des valeurs. Les quantiles decrivent des positions dans la distribution.",
        intuition:
          "Deux groupes peuvent avoir la meme moyenne mais des variabilites tres differentes.",
        details: [
          "L'etendue utilise seulement le minimum et le maximum.",
          "La variance moyenne les ecarts quadratiques a la moyenne.",
          "L'ecart-type remet la dispersion dans l'unite d'origine.",
          "L'IQR mesure l'etalement des 50% centraux et resiste mieux aux extremes."
        ],
        formulas: [
          {
            label: "Variance d'echantillon",
            expression: "s^2 = sum((x_i - xbar)^2) / (n - 1)",
            explanation: "Le denominateur n - 1 corrige l'estimation de la variance populationnelle."
          },
          {
            label: "Ecart-type",
            expression: "s = sqrt(s^2)",
            explanation: "La racine carree remet la mesure dans l'unite de la variable."
          }
        ],
        interpretation: [
          "Un ecart-type grand indique des valeurs plus dispersees autour de la moyenne.",
          "Un boxplot met en evidence mediane, IQR et valeurs atypiques potentielles."
        ],
        pitfalls: [
          "Traiter toute valeur extreme comme une erreur sans verifier le contexte.",
          "Comparer des ecarts-types de variables exprimees dans des unites differentes."
        ],
        commandLinks: [
          { commandId: "descriptives-sd", label: "sd()" },
          { commandId: "descriptives-variance", label: "var()" },
          { commandId: "descriptives-iqr", label: "IQR()" },
          { commandId: "descriptives-boxplot", label: "boxplot()" }
        ],
        tags: ["dispersion", "variance", "ecart-type", "quantile", "IQR", "outlier"]
      },
      {
        id: "formes-graphes",
        title: "Forme d'une distribution",
        summary: "Lire l'asymetrie, les groupes et les valeurs atypiques avant de tester.",
        definition:
          "La forme d'une distribution decrit la symetrie, les queues, le nombre de bosses, les trous et les valeurs atypiques.",
        intuition:
          "Un graphique montre souvent une structure que les nombres masquent.",
        details: [
          "Histogramme: adapte aux variables quantitatives continues ou avec beaucoup de valeurs.",
          "Boxplot: efficace pour comparer plusieurs groupes.",
          "QQ-plot: compare la distribution observee a une distribution theorique, souvent normale.",
          "Nuage de points: explore la relation entre deux variables quantitatives."
        ],
        conditions: [
          "Adapter le nombre de classes de l'histogramme au volume de donnees.",
          "Comparer les graphiques avec la meme echelle si les groupes sont mis cote a cote."
        ],
        pitfalls: [
          "Lire une moyenne sans inspecter l'asymetrie.",
          "Sur-interpreter une forme avec tres peu d'observations."
        ],
        commandLinks: [
          { commandId: "descriptives-hist", label: "hist()" },
          { commandId: "descriptives-boxplot", label: "boxplot()" },
          { commandId: "prob-qqnorm", label: "qqnorm()" }
        ],
        tags: ["histogramme", "boxplot", "QQ-plot", "asymetrie", "distribution"]
      },
      {
        id: "relation-correlation",
        title: "Relation entre deux variables",
        summary: "Distinguer association descriptive, correlation et causalite.",
        definition:
          "Une association indique que deux variables varient ensemble. La correlation mesure l'association lineaire entre deux variables quantitatives.",
        intuition:
          "Une correlation proche de 0 ne veut pas dire absence totale de relation; elle indique surtout absence de relation lineaire forte.",
        details: [
          "Le coefficient r varie entre -1 et 1.",
          "Le signe indique le sens de la relation lineaire.",
          "La valeur absolue indique la force lineaire.",
          "Un nuage de points doit accompagner la correlation."
        ],
        formulas: [
          {
            label: "Correlation",
            expression: "r = cov(x, y) / (sd(x) sd(y))",
            explanation: "Correlation = covariance standardisee."
          }
        ],
        pitfalls: [
          "Conclure a une causalite avec une simple correlation.",
          "Utiliser r pour une relation fortement courbee sans regarder le nuage de points."
        ],
        commandLinks: [
          { commandId: "descriptives-correlation", label: "cor()" },
          { commandId: "inference-cor-test", label: "cor.test()" },
          { commandId: "inference-lm", label: "lm()" }
        ],
        tags: ["correlation", "association", "causalite", "covariance", "nuage de points"]
      }
    ]
  },
  {
    id: "probabilites",
    title: "Probabilites et distributions",
    shortTitle: "Probabilites",
    courseRef: "S04-S06",
    intro:
      "Les probabilites relient l'incertitude theorique aux donnees observees. Les distributions donnent un modele des valeurs possibles avant ou apres observation.",
    keyQuestions: [
      "Quel evenement ou quelle variable aleatoire modelise la situation ?",
      "Quelle distribution est plausible pour les donnees ou la statistique ?",
      "Quelle aire sous la courbe correspond a la probabilite demandee ?"
    ],
    sourceIds: ["stat-resume", "stat500", "openintro", "nist"],
    cards: [
      {
        id: "probabilite-evenement",
        title: "Evenements et probabilites",
        summary: "Quantifier la chance qu'un evenement se produise.",
        definition:
          "Une probabilite est une valeur entre 0 et 1 associee a un evenement. 0 signifie impossible, 1 certain.",
        intuition:
          "Une probabilite peut etre pensee comme une proportion attendue sur un grand nombre de repetitions comparables.",
        details: [
          "Des evenements incompatibles ne peuvent pas arriver ensemble.",
          "Des evenements independants ne s'influencent pas probabilistiquement.",
          "La probabilite conditionnelle change l'univers de reference."
        ],
        formulas: [
          {
            label: "Complement",
            expression: "P(non A) = 1 - P(A)",
            explanation: "La probabilite totale vaut 1."
          },
          {
            label: "Conditionnelle",
            expression: "P(A | B) = P(A et B) / P(B)",
            explanation: "Probabilite de A parmi les cas ou B est vrai."
          }
        ],
        pitfalls: [
          "Confondre independance et incompatibilite.",
          "Oublier de preciser l'univers de reference d'une proportion."
        ],
        commandLinks: [
          { commandId: "prob-sample", label: "sample()" },
          { commandId: "prob-replicate", label: "replicate()" }
        ],
        tags: ["probabilite", "evenement", "conditionnelle", "independance", "simulation"]
      },
      {
        id: "variable-aleatoire",
        title: "Variable aleatoire et distribution",
        summary: "Associer des valeurs possibles a leurs probabilites.",
        definition:
          "Une variable aleatoire associe un nombre a un resultat aleatoire. Sa distribution decrit les valeurs possibles et leurs probabilites ou densites.",
        intuition:
          "La distribution est la carte de ce que l'on attend avant l'observation.",
        details: [
          "Une distribution discrete attribue une probabilite a chaque valeur.",
          "Une distribution continue attribue des probabilites a des intervalles.",
          "Une densite n'est pas une probabilite ponctuelle; la probabilite est une aire."
        ],
        formulas: [
          {
            label: "Esperance discrete",
            expression: "E(X) = sum(x_i p_i)",
            explanation: "Moyenne theorique ponderee par les probabilites."
          }
        ],
        interpretation: [
          "Une distribution empirique vient des donnees observees.",
          "Une distribution theorique vient d'un modele probabiliste."
        ],
        commandLinks: [
          { commandId: "prob-normal-density", label: "dnorm()" },
          { commandId: "prob-binom", label: "dbinom()" },
          { commandId: "prob-pois", label: "dpois()" }
        ],
        tags: ["variable aleatoire", "distribution", "densite", "esperance", "variance"]
      },
      {
        id: "loi-normale-z",
        title: "Loi normale et score z",
        summary: "Standardiser une valeur pour la situer dans une distribution normale.",
        definition:
          "La loi normale est une distribution continue symetrique caracterisee par sa moyenne et son ecart-type. Le score z mesure la distance a la moyenne en ecarts-types.",
        intuition:
          "Le score z permet de comparer des valeurs qui ne sont pas dans la meme unite.",
        details: [
          "La normale standard a moyenne 0 et ecart-type 1.",
          "Une valeur z positive est au-dessus de la moyenne; negative en dessous.",
          "Les probabilites normales se lisent comme des aires sous la courbe."
        ],
        formulas: [
          {
            label: "Score z",
            expression: "z = (x - mu) / sigma",
            explanation: "Distance standardisee entre x et la moyenne mu."
          }
        ],
        conditions: [
          "La normale est utile pour des mesures continues approximativement symetriques.",
          "Pour l'inference sur la moyenne, la normalite peut venir du TCL si n est assez grand."
        ],
        pitfalls: [
          "Confondre probabilite a gauche P(Z <= z) et probabilite centrale.",
          "Utiliser une normale sans verifier que le modele est raisonnable."
        ],
        commandLinks: [
          { commandId: "prob-zscore", label: "score z" },
          { commandId: "prob-normal-cdf", label: "pnorm()" },
          { commandId: "prob-normal-quantile", label: "qnorm()" },
          { commandId: "prob-scale", label: "scale()" }
        ],
        tags: ["normale", "score z", "standardisation", "densite", "probabilite"]
      },
      {
        id: "lois-discretes",
        title: "Binomiale et Poisson",
        summary: "Modeliser des succes sur essais ou des comptages d'evenements.",
        definition:
          "La binomiale modelise le nombre de succes sur n essais independants de probabilite p. La Poisson modelise un nombre d'evenements dans un intervalle avec taux moyen lambda.",
        intuition:
          "La binomiale compte des succes parmi un nombre fixe d'essais; la Poisson compte des evenements rares dans un espace ou un temps.",
        details: [
          "Binomiale: n fixe, deux issues, meme probabilite p, essais independants.",
          "Poisson: evenements independants, taux moyen stable, comptage sur intervalle fixe.",
          "Les fonctions d* donnent P(X = k), les fonctions p* donnent P(X <= k)."
        ],
        formulas: [
          {
            label: "Binomiale",
            expression: "P(X = k) = choose(n, k) p^k (1-p)^(n-k)",
            explanation: "Probabilite de k succes exactement."
          },
          {
            label: "Poisson",
            expression: "P(X = k) = exp(-lambda) lambda^k / k!",
            explanation: "Probabilite de k evenements pour un taux lambda."
          }
        ],
        pitfalls: [
          "Utiliser une binomiale si la probabilite de succes change fortement entre essais.",
          "Utiliser une Poisson si les evenements se produisent par grappes dependantes."
        ],
        commandLinks: [
          { commandId: "prob-binom", label: "dbinom()" },
          { commandId: "prob-binom-cdf", label: "pbinom()" },
          { commandId: "prob-pois", label: "dpois()" }
        ],
        tags: ["binomiale", "poisson", "discrete", "succes", "comptage"]
      },
      {
        id: "loi-t-simulation",
        title: "Loi t, simulation et incertitude",
        summary: "Passer d'une distribution connue a une distribution de statistique.",
        definition:
          "La loi t ressemble a la normale mais avec des queues plus epaisses. Elle est centrale pour l'inference sur une moyenne quand l'ecart-type populationnel est inconnu.",
        intuition:
          "Quand on remplace sigma par s estime sur l'echantillon, on ajoute de l'incertitude: la loi t corrige cela.",
        details: [
          "Les degres de liberte controlent la forme de la loi t.",
          "Plus les degres de liberte augmentent, plus la loi t se rapproche de la normale.",
          "La simulation permet d'observer la variabilite d'une statistique par repetitions artificielles."
        ],
        conditions: [
          "Donnees quantitatives.",
          "Observations independantes ou differences appariees independantes.",
          "Distribution approximativement normale ou echantillon suffisamment grand."
        ],
        commandLinks: [
          { commandId: "prob-t-quantile", label: "qt()" },
          { commandId: "prob-replicate", label: "replicate()" },
          { commandId: "prob-set-seed", label: "set.seed()" }
        ],
        tags: ["loi t", "student", "simulation", "incertitude", "degres de liberte"]
      }
    ]
  },
  {
    id: "methode",
    title: "Methode scientifique et raisonnement statistique",
    shortTitle: "Methode",
    courseRef: "S07",
    intro:
      "La statistique n'est pas seulement un calcul. Elle s'insere dans une question, une hypothese, un plan de collecte, une analyse et une interpretation limitee par les donnees.",
    keyQuestions: [
      "Quelle hypothese le test cherche-t-il a mettre a l'epreuve ?",
      "Quelle conclusion serait justifiee par le plan de collecte ?",
      "L'analyse est-elle reproductible et decidee avant de regarder les resultats ?"
    ],
    sourceIds: ["stat-resume", "stat500", "openintro"],
    cards: [
      {
        id: "cycle-scientifique",
        title: "Observation, hypothese, prediction, test",
        summary: "Relier le calcul statistique a une demarche scientifique.",
        definition:
          "Une demarche scientifique part d'une observation, propose une hypothese, derive une prediction observable, collecte des donnees et confronte les resultats a cette prediction.",
        intuition:
          "Un test statistique n'est utile que si l'on sait quelle hypothese il devait evaluer avant de voir les donnees.",
        details: [
          "L'hypothese statistique traduit une idee scientifique en parametre ou distribution.",
          "La prediction indique ce qu'on s'attend a observer si l'hypothese est plausible.",
          "La conclusion doit parler du contexte, pas seulement de la p-value."
        ],
        pitfalls: [
          "Transformer une observation apres coup en hypothese pretendument predefinie.",
          "Confondre resultat statistiquement significatif et resultat scientifiquement important."
        ],
        commandLinks: [
          { commandId: "methode-save-script", label: "sink()" },
          { commandId: "methode-all-equal", label: "all.equal()" }
        ],
        tags: ["hypothese", "prediction", "test", "conclusion", "science"]
      },
      {
        id: "association-causalite",
        title: "Association, causalite et plan d'etude",
        summary: "Savoir ce que le plan autorise comme conclusion.",
        definition:
          "Une association decrit une relation observee. Une conclusion causale affirme qu'une variable produit un changement dans une autre.",
        intuition:
          "La causalite repose surtout sur le plan d'etude, pas sur la taille de la p-value.",
        details: [
          "Etude observationnelle: mesure sans assigner les traitements.",
          "Experience randomisee: assigne les traitements de facon aleatoire.",
          "Randomisation, controle et replication reduisent les explications alternatives."
        ],
        interpretation: [
          "Une experience randomisee peut soutenir une conclusion causale.",
          "Une etude observationnelle soutient plutot une association, sauf arguments supplementaires forts."
        ],
        pitfalls: [
          "Ecrire 'X cause Y' avec des donnees purement observationnelles.",
          "Ignorer les variables de confusion plausibles."
        ],
        commandLinks: [
          { commandId: "descriptives-correlation", label: "cor()" },
          { commandId: "inference-lm", label: "lm()" }
        ],
        tags: ["association", "causalite", "experience", "observationnel", "randomisation"]
      },
      {
        id: "reproductibilite",
        title: "Reproductibilite et controle de l'analyse",
        summary: "Rendre une analyse relancable et verifiable.",
        definition:
          "Une analyse reproductible permet a quelqu'un d'obtenir les memes resultats a partir des memes donnees et du meme code.",
        intuition:
          "Un resultat fiable doit pouvoir etre retrace: donnees, nettoyage, hypotheses, commandes, versions.",
        details: [
          "Fixer la graine aleatoire pour les simulations.",
          "Conserver les scripts plutot que seulement les sorties de console.",
          "Verifier les preconditions avant un calcul important.",
          "Documenter les decisions de nettoyage des valeurs manquantes."
        ],
        pitfalls: [
          "Modifier manuellement les donnees sans trace.",
          "Changer le test apres avoir vu la p-value."
        ],
        commandLinks: [
          { commandId: "methode-set-seed", label: "set.seed()" },
          { commandId: "base-source", label: "source()" },
          { commandId: "methode-stopifnot", label: "stopifnot()" },
          { commandId: "base-session-info", label: "sessionInfo()" }
        ],
        tags: ["reproductibilite", "script", "controle", "seed", "session"]
      },
      {
        id: "taille-effet",
        title: "Significativite, importance et taille d'effet",
        summary: "Ne pas confondre evidence statistique et effet utile.",
        definition:
          "La significativite statistique indique que les donnees sont peu compatibles avec H0 selon alpha. L'importance pratique juge la taille de l'effet dans le contexte.",
        intuition:
          "Avec un tres grand n, un effet minuscule peut devenir significatif. Avec un petit n, un effet important peut rester incertain.",
        details: [
          "Toujours regarder l'estimation de l'effet en plus de la p-value.",
          "Un intervalle de confiance aide a juger la precision et les valeurs plausibles.",
          "La taille d'effet doit etre interpretee dans l'unite du probleme."
        ],
        pitfalls: [
          "Dire 'pas d'effet' parce que p >= alpha.",
          "Dire 'effet important' uniquement parce que p < alpha."
        ],
        commandLinks: [
          { commandId: "inference-confint-t", label: "IC avec t.test()" },
          { commandId: "erreurs-power-t", label: "power.t.test()" }
        ],
        tags: ["significativite", "taille d'effet", "p-value", "importance", "confiance"]
      }
    ]
  },
  {
    id: "inference",
    title: "Inference statistique",
    shortTitle: "Inference",
    courseRef: "S08-S10",
    intro:
      "L'inference utilise un echantillon pour raisonner sur une population. Elle quantifie l'incertitude des estimations et formalise les decisions par tests.",
    keyQuestions: [
      "Quel parametre de population est vise ?",
      "Quelle statistique d'echantillon l'estime ?",
      "Les conditions du test ou de l'intervalle sont-elles raisonnables ?"
    ],
    sourceIds: ["stat-resume", "stat500", "openintro", "nist"],
    cards: [
      {
        id: "distribution-echantillonnage",
        title: "Distribution d'echantillonnage et erreur standard",
        summary: "Comprendre la variabilite d'une statistique d'un echantillon a l'autre.",
        definition:
          "La distribution d'echantillonnage est la distribution qu'une statistique aurait si l'on repetait l'echantillonnage de nombreuses fois.",
        intuition:
          "La moyenne observee varie selon l'echantillon. L'erreur standard mesure cette variabilite attendue.",
        details: [
          "Une statistique est aleatoire car elle depend de l'echantillon.",
          "L'erreur standard diminue quand n augmente.",
          "Le theoreme central limite explique pourquoi beaucoup de moyennes d'echantillon deviennent approximativement normales."
        ],
        formulas: [
          {
            label: "Erreur standard de la moyenne",
            expression: "SE = s / sqrt(n)",
            explanation: "s estime la dispersion individuelle; SE estime l'incertitude de la moyenne."
          }
        ],
        pitfalls: [
          "Confondre ecart-type des donnees et erreur standard de la moyenne.",
          "Croire qu'une seule moyenne observee revele directement la moyenne de population."
        ],
        commandLinks: [
          { commandId: "descriptives-sd", label: "sd()" },
          { commandId: "prob-replicate", label: "replicate()" }
        ],
        tags: ["distribution d'echantillonnage", "erreur standard", "TCL", "statistique"]
      },
      {
        id: "intervalle-confiance",
        title: "Intervalle de confiance",
        summary: "Donner une plage de valeurs plausibles pour un parametre.",
        definition:
          "Un intervalle de confiance est construit par une methode qui, sur des repetitions, capture le vrai parametre dans une proportion donnee des cas.",
        intuition:
          "L'intervalle combine une estimation et une marge d'erreur.",
        details: [
          "Forme generale: estimation +/- valeur critique * erreur standard.",
          "Un niveau de confiance plus eleve donne un intervalle plus large.",
          "Un echantillon plus grand reduit l'erreur standard et donc la largeur."
        ],
        formulas: [
          {
            label: "IC d'une moyenne",
            expression: "xbar +/- t* s / sqrt(n)",
            explanation: "t* depend du niveau de confiance et des degres de liberte."
          }
        ],
        interpretation: [
          "Dire que la methode a un taux de couverture de 95%, pas que le parametre fixe a 95% de probabilite d'etre dans cet intervalle particulier.",
          "Un intervalle large signale une estimation peu precise."
        ],
        pitfalls: [
          "Interpreter 95% de confiance comme une probabilite apres avoir observe l'intervalle.",
          "Comparer seulement les p-values sans regarder les intervalles."
        ],
        commandLinks: [
          { commandId: "inference-confint-t", label: "t.test()$conf.int" },
          { commandId: "inference-model-confint", label: "confint()" }
        ],
        tags: ["intervalle de confiance", "marge d'erreur", "estimation", "precision"]
      },
      {
        id: "test-hypothese",
        title: "Test d'hypothese et p-value",
        summary: "Evaluer si les donnees sont compatibles avec une hypothese nulle.",
        definition:
          "Un test d'hypothese compare une statistique observee a ce qui serait attendu si H0 etait vraie. La p-value mesure la probabilite d'un resultat au moins aussi extreme sous H0.",
        intuition:
          "Une petite p-value indique que le resultat observe serait surprenant si H0 decrivait bien la situation.",
        details: [
          "H0 represente souvent absence d'effet, absence de difference ou valeur de reference.",
          "H1 represente l'alternative: different, plus grand ou plus petit.",
          "Alpha est le seuil de decision fixe avant l'analyse.",
          "Rejeter H0 ne prouve pas H1; ne pas rejeter H0 ne prouve pas H0."
        ],
        formulas: [
          {
            label: "Decision",
            expression: "rejeter H0 si p-value < alpha",
            explanation: "C'est une regle de decision, pas une mesure de taille d'effet."
          }
        ],
        pitfalls: [
          "Dire que la p-value est la probabilite que H0 soit vraie.",
          "Choisir un test unilateral apres avoir vu le sens des donnees."
        ],
        commandLinks: [
          { commandId: "erreurs-pvalue", label: "p-value depuis t" },
          { commandId: "erreurs-decision", label: "Decision avec alpha" }
        ],
        tags: ["hypothese", "H0", "H1", "p-value", "alpha", "test"]
      },
      {
        id: "tests-t",
        title: "Famille des tests t",
        summary: "Comparer une moyenne, deux mesures appariees ou deux groupes independants.",
        definition:
          "Les tests t utilisent la loi t pour tester une moyenne ou une difference de moyennes quand la variabilite est estimee par l'echantillon.",
        intuition:
          "Tous les tests t comparent une difference observee a l'incertitude attendue de cette difference.",
        details: [
          "Un echantillon: comparer une moyenne a mu0.",
          "Apparie: calculer les differences individu par individu, puis tester leur moyenne.",
          "Independant: comparer deux groupes distincts, avec Welch par defaut dans R.",
          "L'argument alternative fixe le sens: two.sided, greater ou less."
        ],
        formulas: [
          {
            label: "Test t a un echantillon",
            expression: "t = (xbar - mu0) / (s / sqrt(n))",
            explanation: "Distance entre la moyenne observee et H0, en erreurs standards."
          }
        ],
        conditions: [
          "Variable quantitative.",
          "Observations independantes, sauf test apparie ou les paires sont explicites.",
          "Distribution des donnees ou des differences approximativement normale, ou n assez grand.",
          "Pour deux groupes: groupes independants et absence d'outliers dominants."
        ],
        pitfalls: [
          "Utiliser un test independant sur des donnees appariees.",
          "Oublier que greater/less depend de l'ordre des groupes.",
          "Confondre difference statistiquement significative et difference importante."
        ],
        commandLinks: [
          { commandId: "inference-t-test-one", label: "t.test(x, mu=)" },
          { commandId: "inference-t-test-paired", label: "t.test(..., paired=TRUE)" },
          { commandId: "inference-t-test-independent", label: "t.test(y ~ groupe)" }
        ],
        tags: ["test t", "moyenne", "apparie", "independant", "alternative", "Welch"]
      },
      {
        id: "extensions-tests",
        title: "Encadres: khi-deux, ANOVA et regression simple",
        summary: "Trois extensions utiles pour variables qualitatives, plusieurs groupes et prediction.",
        definition:
          "Ces methodes prolongent la logique d'inference a d'autres questions: association entre categories, comparaison de plusieurs moyennes, relation lineaire.",
        intuition:
          "Le choix du test depend de la question, du type des variables et du plan de donnees.",
        details: [
          "Khi-deux: teste l'association entre deux variables qualitatives dans un tableau croise.",
          "ANOVA: compare les moyennes de plus de deux groupes avec une statistique F.",
          "Regression lineaire: estime une relation lineaire entre une reponse quantitative et un ou plusieurs predicteurs.",
          "Correction de p-values: reduit le risque de faux positifs quand plusieurs tests sont menes."
        ],
        conditions: [
          "Khi-deux: effectifs attendus suffisants et observations independantes.",
          "ANOVA: groupes independants, residus approximativement normaux, variances raisonnablement comparables.",
          "Regression: relation lineaire plausible, residus interpretablement aleatoires, observations independantes."
        ],
        pitfalls: [
          "Faire beaucoup de tests sans corriger le risque de type I.",
          "Interpreter un coefficient de regression causalement sans plan d'etude adapte.",
          "Utiliser ANOVA sans regarder les graphiques de groupes."
        ],
        commandLinks: [
          { commandId: "inference-chisq", label: "chisq.test()" },
          { commandId: "inference-aov", label: "aov()" },
          { commandId: "inference-lm", label: "lm()" },
          { commandId: "erreurs-p-adjust", label: "p.adjust()" }
        ],
        tags: ["khi-deux", "ANOVA", "regression", "p.adjust", "tests multiples"]
      }
    ]
  },
  {
    id: "erreurs",
    title: "Erreurs de decision et puissance",
    shortTitle: "Erreurs",
    courseRef: "S11",
    intro:
      "Un test statistique aide a decider sous incertitude. Il faut donc comprendre les erreurs possibles, la puissance et les effets du choix d'alpha.",
    keyQuestions: [
      "Quel risque d'erreur de type I accepte-t-on ?",
      "Quelle puissance a-t-on pour detecter un effet utile ?",
      "Le test est-il bilateral ou unilateral, et ce choix etait-il predefini ?"
    ],
    sourceIds: ["stat-resume", "stat500", "openintro"],
    cards: [
      {
        id: "types-erreurs",
        title: "Erreur de type I et type II",
        summary: "Comprendre les deux facons principales de se tromper.",
        definition:
          "L'erreur de type I consiste a rejeter H0 alors qu'elle est vraie. L'erreur de type II consiste a ne pas rejeter H0 alors qu'une alternative vraie existe.",
        intuition:
          "Alpha controle le risque de fausse alarme; beta mesure le risque de manquer un effet reel.",
        details: [
          "Type I: faux positif, risque alpha.",
          "Type II: faux negatif, risque beta.",
          "Puissance: 1 - beta, probabilite de detecter un effet reel.",
          "Reduire alpha peut augmenter beta si n et l'effet restent constants."
        ],
        formulas: [
          {
            label: "Puissance",
            expression: "puissance = 1 - beta",
            explanation: "Probabilite de rejeter H0 quand H1 est vraie."
          }
        ],
        pitfalls: [
          "Penser qu'alpha = 5% signifie 95% de chance que H1 soit vraie apres rejet.",
          "Ignorer le risque de type II quand un test n'est pas significatif."
        ],
        commandLinks: [
          { commandId: "erreurs-decision", label: "Decision alpha" },
          { commandId: "erreurs-power-t", label: "power.t.test()" }
        ],
        tags: ["type I", "type II", "alpha", "beta", "puissance"]
      },
      {
        id: "alpha-pvalue-decision",
        title: "Alpha, p-value et decision",
        summary: "Distinguer seuil choisi, resultat calcule et conclusion.",
        definition:
          "Alpha est fixe avant l'analyse. La p-value est calculee avec les donnees. La decision compare p-value et alpha.",
        intuition:
          "Alpha est une regle du jeu; la p-value est le score observe sous H0.",
        details: [
          "p < alpha: rejeter H0 au seuil choisi.",
          "p >= alpha: ne pas rejeter H0, sans prouver H0.",
          "Un seuil plus strict reduit les rejets mais aussi la sensibilite."
        ],
        interpretation: [
          "Toujours rapporter le contexte, l'estimation, l'intervalle et le seuil si possible.",
          "Une p-value proche d'alpha demande une interpretation prudente."
        ],
        pitfalls: [
          "Changer alpha apres avoir vu p.",
          "Transformer p = 0.051 en absence totale d'effet."
        ],
        commandLinks: [
          { commandId: "erreurs-pvalue", label: "p-value bilaterale" },
          { commandId: "erreurs-alpha-critical", label: "Seuil critique" }
        ],
        tags: ["alpha", "p-value", "decision", "seuil", "significativite"]
      },
      {
        id: "puissance",
        title: "Puissance, taille d'effet et taille d'echantillon",
        summary: "Comprendre ce qui rend un effet detectable.",
        definition:
          "La puissance depend de la taille d'effet, de la variabilite, de la taille d'echantillon et du seuil alpha.",
        intuition:
          "Un effet grand, peu de bruit et beaucoup d'observations rendent le rejet de H0 plus probable si l'effet existe.",
        details: [
          "Augmenter n reduit l'erreur standard.",
          "Un effet plus grand est plus facile a detecter.",
          "Une variabilite plus forte masque les differences.",
          "La puissance se planifie avant l'etude, pas seulement apres."
        ],
        formulas: [
          {
            label: "Effet standardise simple",
            expression: "d = delta / s",
            explanation: "Difference attendue rapportee a la variabilite."
          }
        ],
        pitfalls: [
          "Interpreter un resultat non significatif comme preuve d'absence d'effet avec une faible puissance.",
          "Chercher un n qui rend n'importe quel effet minuscule significatif."
        ],
        commandLinks: [
          { commandId: "erreurs-power-t", label: "power.t.test()" },
          { commandId: "erreurs-power-prop", label: "power.prop.test()" }
        ],
        tags: ["puissance", "taille d'effet", "echantillon", "beta", "delta"]
      },
      {
        id: "unilateral-bilateral",
        title: "Tests bilateraux et unilateraux",
        summary: "Choisir le sens de l'alternative avant de regarder les donnees.",
        definition:
          "Un test bilateral cherche une difference dans les deux sens. Un test unilateral cherche uniquement une difference dans un sens predefini.",
        intuition:
          "Un unilateral concentre le risque alpha dans une seule queue, mais il exige une hypothese directionnelle justifiee a l'avance.",
        details: [
          "two.sided: H1 dit different de la reference.",
          "greater: H1 dit plus grand que la reference ou que l'autre groupe.",
          "less: H1 dit plus petit que la reference ou que l'autre groupe.",
          "Dans R, l'ordre des groupes influence le sens de greater et less."
        ],
        conditions: [
          "Choix directionnel fonde sur la theorie ou le protocole.",
          "Choix fixe avant exploration des donnees.",
          "Rapporter explicitement l'alternative utilisee."
        ],
        pitfalls: [
          "Passer de bilateral a unilateral pour rendre un resultat significatif.",
          "Oublier que l'intervalle de confiance change avec alternative."
        ],
        commandLinks: [
          { commandId: "inference-t-test-one", label: "t.test(..., alternative=)" },
          { commandId: "erreurs-confidence-level", label: "conf.level" }
        ],
        tags: ["unilateral", "bilateral", "alternative", "greater", "less", "two.sided"]
      },
      {
        id: "ic-test-lien",
        title: "Lien entre intervalle de confiance et test",
        summary: "Pour un test bilateral, l'IC et le test racontent souvent la meme decision.",
        definition:
          "Pour beaucoup de tests bilateraux, rejeter H0 au seuil alpha revient a voir la valeur nulle hors de l'intervalle de confiance a 1 - alpha.",
        intuition:
          "L'intervalle donne plus d'information: il montre aussi les valeurs compatibles avec les donnees.",
        details: [
          "Si mu0 est hors d'un IC 95%, le test bilateral a alpha = 5% rejette souvent H0.",
          "Si mu0 est dans l'IC, le test bilateral ne rejette pas au meme seuil.",
          "Ce lien est plus delicat pour les tests unilateraux et certains tests approximatifs."
        ],
        pitfalls: [
          "Utiliser le lien IC/test sans verifier que le niveau de confiance correspond a alpha.",
          "Oublier que l'IC indique une plage d'effets plausibles, pas seulement une decision."
        ],
        commandLinks: [
          { commandId: "inference-confint-t", label: "t.test()$conf.int" },
          { commandId: "erreurs-confidence-level", label: "conf.level" }
        ],
        tags: ["intervalle de confiance", "test", "bilateral", "alpha", "decision"]
      }
    ]
  }
];

export const theorySections: TheorySection[] = rawTheorySections.map((section) => ({
  ...section,
  cards: section.cards.map((card) => {
    const schemas = theorySchemasByCardId[card.id];
    return schemas ? { ...card, schemas } : card;
  })
}));
