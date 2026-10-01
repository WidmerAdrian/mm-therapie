import type { ImageMetadata } from 'astro';
import trigger1 from '../assets/img/trigger-1.png';
import tief1 from '../assets/img/tief-1.png';
import fuss1 from '../assets/img/fuss-1.png';
import dorn1 from '../assets/img/dorn-1.png';
import klass1 from '../assets/img/klass-1.png';
import lymph1 from '../assets/img/lymph-1.png';
import andu1 from '../assets/img/andu-1.jpg';
import triggerHero from '../assets/img/trigger-hero.jpg';
import fussHero from '../assets/img/fuss-hero.jpg';
import dornHero from '../assets/img/dorn-hero.png';
import lymphHero from '../assets/img/lymph-hero.jpg';

export const SITE = {
  name: 'MM-Therapiepraxis',
  owner: 'Mihaela Maria Vlasin',
  url: 'https://www.mm-therapiepraxis.ch',
  street: 'Bärengasse 23',
  zip: '4800',
  city: 'Zofingen',
  phone: '+41791995588',
  phoneDisplay: '079 199 55 88',
  phoneIntl: '+41 79 199 55 88',
  email: 'termin@mm-therapiepraxis.ch',
  emailImpressum: 'mihaela@mm-therapiepraxis.ch',
  zsr: 'J905864',
  geo: { lat: 47.2905539551717, lng: 7.945536031666933 },
};

/* Opening hours in minutes after midnight, keyed by JS weekday (0 = Sunday). Sat/Sun closed. */
export const HOURS: Record<number, [number, number]> = {
  1: [420, 1080],
  2: [480, 1140],
  3: [420, 1170],
  4: [420, 1170],
  5: [420, 1170],
};
export const hm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
export const HOURS_TEXT: [string, string][] = [
  ['Montag', '07:00 bis 18:00 Uhr'],
  ['Dienstag', '08:00 bis 19:00 Uhr'],
  ['Mittwoch bis Freitag', '07:00 bis 19:30 Uhr'],
  ['Samstag und Sonntag', 'geschlossen'],
];

export interface Therapy {
  id: string;
  n: string;
  c: string;
  t: string;
  d: string;
  img: ImageMetadata;
  hero?: ImageMetadata;
  lead: string;
  facts?: [string, string][];
  sec?: [string, string][];
  steps?: string[];
  list?: [string, string[]];
  tips?: string[];
}

export const TH: Therapy[] = [
  {
    id: 'trigger', n: 'Triggerpunkt-Therapie', c: '#B4553C',
    t: 'Wohltuend bei Verspannungen, Gelenk- und Rückenschmerzen.',
    d: 'Diese Art der Behandlung wirkt sehr wohltuend bei Verspannungen, Schmerzen innerhalb von Gelenken, Rückenschmerzen oder Einschränkungen des Bewegungsablaufes.',
    img: trigger1, hero: triggerHero,
    lead: 'Leiden Sie unter Verspannungen oder Schmerzen? Mit gezielten Druckmassagen werden die schmerzhaften Punkte in der Muskulatur behandelt. So fühlen Sie sich bald wieder wohl in Ihrer Haut und können sich wieder frei bewegen.',
    sec: [
      ['Was ist ein Triggerpunkt?', 'Ein schmerzhafter Punkt in der Muskulatur, der leicht reizbar ist und empfindlich auf Druck reagiert. Vermutlich lag zuvor eine Entzündung vor, entstanden durch eine zu hohe oder zu niedrige Beanspruchung des Muskels.'],
      ['Wer ist betroffen?', 'Triggerpunkte können überall entstehen und machen vor keiner Altersgruppe halt. Besonders anfällig sind Menschen, die viel sitzen oder einseitige Bewegungsabläufe haben. Auch Über- oder Fehlbelastung durch Sport, Bewegungsmangel oder Schlafprobleme sind Auslöser.'],
      ['Gut zu wissen', 'Der Schmerz tritt oft nicht am Triggerpunkt selbst auf, sondern in benachbarten Muskeln, Sehnen oder Gelenken. Deshalb wird die Ursache nicht immer gleich erkannt.'],
    ],
    list: ['Kann eine Rolle spielen bei', ['Spannungskopfschmerzen', 'Nackenschmerzen', 'Rückenschmerzen', 'Schulterschmerzen', 'Fersensporn', 'Kopfschmerzen', 'Migräne', 'Tennisarm']],
  },
  {
    id: 'tief', n: 'Tiefenmassage', c: '#A64B5E',
    t: 'Löst Blockaden in tiefer liegenden Schichten.',
    d: 'Massage gegen muskulären Schmerz und für ein besseres Bindegewebe. Die Tiefenmassage löst Blockaden in tiefer liegenden Schichten.',
    img: tief1,
    lead: 'Die Ursache akuter oder chronischer Schmerzen kann in der Muskulatur selbst liegen. Das wird oft übersehen, weil Entstehungsort und Schmerzgebiet nicht am gleichen Ort liegen müssen.',
    sec: [
      ['Ein Beispiel', 'Blockaden in der Nackenmuskulatur können Kopfschmerzen verursachen. Der Grund für Achillessehnenschmerzen liegt meistens in der Wade. Muskelblockaden sind gut therapierbar, häufig auch noch nach Jahren.'],
      ['Was sind Muskelblockaden?', 'Gesunde Muskulatur spannt sich an und entspannt sich wieder. Blockaden sind verkrampfte Zonen, vergleichbar mit einem kleinen Dauerkrampf. Auf Dauer verkürzt sich der Muskel, verliert an Leistung, es entstehen Verhärtungen und später Schmerzen, oft in ganz anderen Körperbereichen.'],
    ],
    list: ['Sinnvoll bei', ['Rückenschmerzen, auch mit Ausstrahlung in die Beine', 'Schmerzen oder Gefühlsstörungen in Unterarm und Händen', 'Schulterschmerzen und Steifheit', 'Kopf- und Nackenschmerzen, Schwindel', 'Tennisellbogen', 'Leistenschmerzen', 'Achillessehnenschmerzen', 'Knieschmerzen', 'Chronische Zerrungen', 'Bewegungseinschränkungen', 'Kraft- oder Koordinationsverlust', 'Verzögerte Heilung nach Operationen', 'Ausbleibende Erfolge im Aufbautraining nach Sportverletzungen']],
  },
  {
    id: 'fuss', n: 'Fussreflexzonenmassage', c: '#7D5576',
    t: 'Unsere Füsse sind das Spiegelbild unseres Körpers.',
    d: 'Unsere Füsse sind das Spiegelbild unseres Körpers. Über Nervenimpulse besteht eine direkte Verbindung zu den jeweiligen Organen des Körpers.',
    img: fuss1, hero: fussHero,
    lead: 'Unsere Füsse sind das Spiegelbild unseres Körpers. Über Nervenimpulse besteht eine direkte Verbindung zu den Organen. Massiert wird der gesamte Fuss.',
    facts: [['30 bis 45 Min.', 'ideale Behandlungszeit'], ['Kombinierbar', 'mit einer Ganzkörpermassage']],
    sec: [
      ['Eine Landkarte des Körpers', 'Die Reflexzonentherapie geht von einem ganzheitlichen Körperbild aus. Der Fuss repräsentiert den Körper und seine Beschwerden. Gezielter Druck an speziellen Stellen kann körperliche und seelische Beschwerden lösen.'],
      ['Kitzlig? Im Gegenteil.', 'Es entspannen nicht nur Füsse und Waden, sondern der ganze Körper. Schmerzt eine Zone, ist das oft ein Hinweis auf eine Störung im zugehörigen Organ. Wiederholtes Massieren kann sie lindern oder beheben. Auch präventiv wirksam.'],
    ],
    list: ['Kann eingesetzt werden bei', ['Gelenkschmerzen', 'Wirbelsäulenleiden', 'Verspannungen', 'Verkrampfungen', 'Schlafstörungen', 'Durchblutungsstörungen', 'Kopfschmerzen', 'Migräne', 'Kreislaufstörungen', 'Verdauungsbeschwerden', 'Blasenentzündungen', 'Heuschnupfen', 'Erkältungen', 'Zyklusstörungen']],
  },
  {
    id: 'dorn', n: 'Dorn-Breuss-Therapie', c: '#3F6F73',
    t: 'Energetische Rückenmassage und Lockerung der Tiefenmuskulatur.',
    d: 'Eine energetische Rückenmassage mit anschliessender Lockerung der tiefen Rückenmuskulatur im Stehen und Sitzen.',
    img: dorn1, hero: dornHero,
    lead: 'Rückenschmerzen werden immer mehr zur Volkskrankheit. Sie belasten Alltag und Schlaf. Doch niemand muss dauerhaft damit leben.',
    sec: [
      ['Die Dorn-Methode', 'Fehlstellungen oder verschobene Wirbel werden sanft ertastet und gemeinsam mit Ihnen wieder an den richtigen Platz geschoben. Ganz ohne Geräte, allein mit den Händen und viel Fingerspitzengefühl.'],
      ['Die Breuss-Massage', 'Die ideale Vorarbeit: Durch sanftes Dehnen der Wirbelsäule gelangen Platz und Luft in die Zwischenwirbel, die so zur Regeneration angeregt werden. Davon profitiert auch die Bandscheibe.'],
    ],
    steps: ['Gespräch und Prüfung der Beinlängen', 'Breuss-Massage zur Vorbereitung', 'Sanfte Korrektur von Kreuzbein, Becken und Wirbeln', 'Nachruhen und Übungen für zu Hause'],
    list: ['Anwendung vor allem bei', ['Blockaden der Wirbel', 'Unterschiedliche Beinlängen', 'Migräne', 'Skoliosen', 'Lendenwirbelbeschwerden', 'Beschwerden der Brustwirbelsäule', 'HWS-Syndrom', 'Tinnitus']],
  },
  {
    id: 'klass', n: 'Klassische Massage', c: '#9A6420',
    t: 'Zug, Dehnung und Druck für Haut, Muskeln und Gelenke.',
    d: 'Diese Massage dient der mechanischen Beeinflussung der Haut, des Bindegewebes, der Muskulatur sowie der Gelenke, je nach Griff durch Zug-, Dehnungs- oder Druckreiz.',
    img: klass1,
    lead: 'Die Massage ist wahrscheinlich eine der ältesten Heilmethoden der Menschheit. Durch Zug, Dehnung oder Druck wirkt sie auf Haut, Bindegewebe, Muskulatur und Gelenke.',
    sec: [
      ['Ganzheitlich wirksam', 'Nicht nur Stress oder eine ungesunde Lebensweise hinterlassen Spuren, sondern auch Emotionen, Ängste, Sorgen und Bewegungsmangel. Die Massage wirkt entspannend auf den ganzen Organismus und berührt Körper, Geist und Seele.'],
      ['Kopfschmerzen und Migräne', 'Klassische Massagen sind weit mehr als Wellness. Das Lösen von Verspannungen in der Muskulatur kann Kopfschmerzen und sogar Migräne lindern.'],
      ['Fatigue-Syndrom', 'Betroffene beschreiben neben Müdigkeit häufig Erschöpfung, Schwäche und fehlende Energie. Viele rheumatische Erkrankungen gehen mit Fatigue einher.'],
    ],
  },
  {
    id: 'lymph', n: 'Lymphdrainage', c: '#4E7A5E',
    t: 'Sanfte Griffe regen den Lymphfluss an.',
    d: 'Die Lymphdrainage ist eine spezielle Art der medizinischen Massage. Dabei wird der Transport der Lymphflüssigkeit in den Lymphgefässen durch sanfte Grifftechniken angeregt.',
    img: lymph1, hero: lymphHero,
    lead: 'Eine spezielle medizinische Massage: Sanfte Griffe regen den Transport der Lymphflüssigkeit an. Sie ist Teil der Komplexen Physikalischen Entstauungstherapie bei Lymph- und Lipödem.',
    sec: [
      ['Wann ist sie sinnvoll?', 'Wenn sich Lymphflüssigkeit staut und etwa ein Bein oder Arm anschwillt, zum Beispiel nach Operationen oder schweren orthopädischen Verletzungen. Sie entstaut das Gewebe und reduziert Schwellungen und Schmerzen.'],
      ['In der Schwangerschaft', 'Bei medizinischer Notwendigkeit in der Regel möglich. Die Therapie wird angepasst, auf die tiefe Bauchbehandlung wird verzichtet.'],
      ['Wann abzuraten ist', 'Bei Erkrankungen wie Thrombosen oder Herzinsuffizienz nur mit Vorsicht oder gar nicht. Bitte klären Sie mögliche Kontraindikationen mit Ihrem Arzt ab.'],
    ],
    tips: ['Vorher die Blase entleeren, die Urinbildung wird angeregt.', 'Behandelt werden meist Hals, Rumpf und die betroffene Extremität.', 'Danach Arm oder Bein bandagieren oder einen Kompressionsstrumpf tragen.', 'Ausruhen, viele fühlen sich danach etwas müde.', 'Ausreichend trinken, zum Beispiel Wasser oder Tee.', 'Moderat bewegen, etwa spazieren gehen.', 'Bei Ödemen auf einengende Kleidung verzichten.'],
  },
  {
    id: 'andu', n: 'Andullation', c: '#6A5A8A',
    t: 'Biophysikalisch für Schmerzlinderung und Wellness.',
    d: 'Die Andullation gehört zur neuen Generation der Behandlungsmethoden auf biophysikalischer Basis, welche seit über einem Jahrzehnt für Schmerzlinderung, Performance und Wellness eingesetzt wird.',
    img: andu1,
    lead: 'Mit Schwingung gegen Schmerzen: Die Andullation kombiniert mechanische Vibration mit Infrarot-Tiefenwärme und verbessert Stoffwechsel und Durchblutung.',
    sec: [
      ['Wie wirkt sie?', 'Entwickelt mit Wissenschaftlern, Universitätskliniken und Ärzten. Sie regt die Zellaktivität an, überlagert Schmerzsignale, verbessert die Blutzirkulation, stimuliert den Lymphfluss und setzt Entspannung in Gang.'],
      ['Für einen starken Rücken', 'Die Infrarot-Tiefenwärme erweitert die Blutgefässe. Zusammen mit den Schwingungen setzt das Verfahren direkt an den Säulen unserer Gesundheit an.'],
    ],
    list: ['Vorteile guter Durchblutung', ['Schlafqualität', 'Schmerzreduktion', 'Verbesserter Stoffwechsel', 'Beweglichkeit', 'Gesundes Älterwerden', 'Stärkung des Immunsystems', 'Gewichtsreduktion', 'Tiefe Entspannung']],
  },
];
export const BY = Object.fromEntries(TH.map((t) => [t.id, t]));

export interface Zone { n: string; v?: ('front' | 'back')[]; g?: 1; s: string[]; t: string[]; tip: string }
export const MMR: Record<string, Zone> = {
  nacken: { n: 'Nacken und Schultern', v: ['front', 'back'], s: ['Nackenschmerzen', 'Spannungskopfschmerzen', 'Schulterschmerzen', 'Migräne', 'HWS-Syndrom', 'Schwindel'], t: ['trigger', 'tief', 'klass', 'dorn'], tip: 'Verspannungen im Nacken sind oft der Grund für Kopfschmerzen. Wer viel sitzt, ist besonders anfällig.' },
  brust: { n: 'Brust und Atmung', v: ['front'], s: ['Verspannte Brustmuskulatur', 'Flache Atmung', 'Stress', 'Innere Unruhe'], t: ['klass', 'andu'], tip: 'Eine klassische Massage wirkt auf den ganzen Körper und auf die Psyche entspannend.' },
  ruecken: { n: 'Rücken', v: ['back'], s: ['Rückenschmerzen', 'Blockaden der Wirbel', 'Lendenwirbelbeschwerden', 'Brustwirbelsäule', 'Skoliosen', 'Ausstrahlung in die Beine'], t: ['dorn', 'trigger', 'tief', 'andu'], tip: 'Rückenprobleme entstehen oft durch Fehlstellungen von Becken oder Wirbelsäule. Hier setzt die Dorn-Breuss-Therapie an.' },
  arm: { n: 'Arm und Ellbogen', v: ['front', 'back'], s: ['Tennisarm', 'Tennisellbogen', 'Muskelverhärtungen', 'Kraftverlust'], t: ['trigger', 'tief'], tip: 'Der Schmerz sitzt oft nicht dort, wo er entsteht. Triggerpunkte im Unterarm strahlen bis in den Ellbogen aus.' },
  hand: { n: 'Hand und Unterarm', v: ['front', 'back'], s: ['Schmerzen in Unterarm und Händen', 'Gefühlsstörungen', 'Schwellungen nach Operationen'], t: ['tief', 'lymph'], tip: 'Kribbeln oder Taubheit in den Händen kann von Muskelblockaden im Unterarm oder Nacken kommen.' },
  bauch: { n: 'Bauch und Verdauung', v: ['front'], s: ['Verdauungsbeschwerden', 'Zyklusstörungen', 'Blasenentzündungen', 'Innere Anspannung'], t: ['fuss', 'klass'], tip: 'Über die Fussreflexzonen lassen sich die zugehörigen Organe sanft anregen.' },
  huefte: { n: 'Hüfte und Leiste', v: ['front'], s: ['Leistenschmerzen', 'Hüftschmerzen', 'Unterschiedliche Beinlängen'], t: ['tief', 'dorn'], tip: 'Bei der Dorn-Therapie werden zuerst die Beinlängen geprüft und bei Bedarf sanft korrigiert.' },
  gesaess: { n: 'Gesäss und Becken', v: ['back'], s: ['Beckenfehlstellung', 'Ausstrahlung in die Beine', 'Ischiasähnliche Schmerzen'], t: ['dorn', 'tief'], tip: 'Eine Korrektur am Becken wirkt sich oft auf den ganzen Rücken aus.' },
  oberschenkel: { n: 'Oberschenkel', v: ['front', 'back'], s: ['Chronische Zerrungen', 'Muskelverhärtungen', 'Schwellungen', 'Schwere Beine'], t: ['tief', 'lymph', 'andu'], tip: 'Nach Sportverletzungen hilft die Tiefenmassage, wenn das Aufbautraining nicht vorankommt.' },
  knie: { n: 'Knie', v: ['front', 'back'], s: ['Knieschmerzen', 'Schwellungen nach Operationen', 'Bewegungseinschränkungen'], t: ['tief', 'lymph'], tip: 'Nach Operationen reduziert die Lymphdrainage Schwellungen und Schmerzen.' },
  wade: { n: 'Wade', v: ['front', 'back'], s: ['Achillessehnenschmerzen', 'Schwere, geschwollene Beine', 'Muskelverhärtungen'], t: ['tief', 'lymph', 'andu'], tip: 'Der Grund für Achillessehnenschmerzen liegt meistens in der Wadenmuskulatur.' },
  fuss: { n: 'Fuss und Ferse', v: ['front', 'back'], s: ['Fersensporn', 'Durchblutungsstörungen', 'Kalte Füsse', 'Müde Füsse'], t: ['fuss', 'trigger'], tip: 'Am Fuss spiegelt sich der ganze Körper. Eine Behandlung wirkt weit über die Füsse hinaus.' },
  g_erschoepft: { g: 1, n: 'Erschöpfung', s: ['Müdigkeit', 'Fehlende Energie', 'Fatigue-Syndrom', 'Schwäche'], t: ['klass', 'andu', 'fuss'], tip: 'Viele rheumatische Erkrankungen gehen mit Fatigue einher. Sanfte Behandlungen geben neue Energie.' },
  g_schlaf: { g: 1, n: 'Schlafstörungen', s: ['Einschlafprobleme', 'Unruhiger Schlaf', 'Verspannungen in der Nacht'], t: ['fuss', 'andu', 'klass'], tip: 'Eine gute Durchblutung verbessert nachweislich die Schlafqualität.' },
  g_stress: { g: 1, n: 'Stress', s: ['Innere Unruhe', 'Verspannungen', 'Kopfschmerzen'], t: ['klass', 'fuss', 'trigger'], tip: 'Stress hinterlässt Spuren im Körper. Massage berührt Körper, Geist und Seele.' },
  g_relax: { g: 1, n: 'Einfach entspannen', s: ['Auszeit vom Alltag', 'Wohlbefinden', 'Tiefe Entspannung'], t: ['klass', 'fuss', 'andu'], tip: 'Sie brauchen keinen Grund. Gönnen Sie Ihrem Körper einfach Erholung.' },
};
export const ORDER = ['nacken', 'brust', 'ruecken', 'arm', 'hand', 'bauch', 'huefte', 'gesaess', 'oberschenkel', 'knie', 'wade', 'fuss'];
export const GEN = ['g_erschoepft', 'g_schlaf', 'g_stress', 'g_relax'];

export const FAQ: [string, string][] = [
  ['Brauche ich eine Überweisung vom Arzt?', 'Das ist je nach Kasse unterschiedlich. Eine ärztliche Überweisung ist nicht in jedem Fall notwendig. Bitte informieren Sie sich vorgängig bei Ihrer Zusatzversicherung.'],
  ['Wer spricht mit meiner Versicherung?', 'Die Praxis hat keinen direkten Kontakt zu den Zusatzversicherungen. Sie sind stets auf beiden Seiten die Ansprechperson.'],
  ['Was, wenn die Kasse nicht bezahlt?', 'Die Praxis übernimmt keine Haftung für nicht rückerstattete Behandlungen. Deshalb lohnt sich die Kostengutsprache im Voraus.'],
];
