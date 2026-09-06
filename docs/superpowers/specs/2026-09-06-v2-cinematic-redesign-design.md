# lvtesting.eu v2 — kinematická prerábka so scroll-driven príbehom

**Dátum:** 2026-09-06
**Stav:** návrh na schválenie
**Repozitár:** `AmBonum/lvtesting`, vetva `main` na commite `631c647`

---

## 1. Zadanie a cieľ

Prerobiť prezentačnú stránku `lvtesting.eu` na úroveň, ktorá sama o sebe slúži ako
dôkaz remesla. Návštevník má z webu odísť s presvedčením, že autor vie stavať
softvér — nie preto, že to o sebe napísal, ale preto, že to práve videl.

**Cieľová skupina:** kolegovia a klienti, ktorých presvedčí kvalita vyhotovenia.
**Merateľný výsledok návštevy:** kontakt cez formulár.

Rozsah zásahu: nový vizuál **a** prestavba štruktúry sekcií. Existujúce základy
(i18n v 5 jazykoch, súhlas s cookies, kontaktný formulár s hCaptcha, testy vo
Vitest, statický export) zostávajú a znovu sa použijú.

## 2. Nosná myšlienka

Pozadie stránky nie je dekorácia, ale **rozprávanie o tom, ako vzniká softvér** —
od nápadu po nasadenie do produkcie. Scroll je jeho časová os.

Šesť scén, každá patrí jednej sekcii. Naprieč všetkými scénami putuje **ten istý
predmet**: skica v zápisníku → diagram na tabuli → rozhranie na monitore →
testovaná obrazovka → build v pipeline → hotová aplikácia v cudzej ruke. Tento
prvok je rozdiel medzi šiestimi peknými pozadiami a jedným príbehom.

## 3. Štruktúra sekcií

Sedem dnešných sekcií sa mení na šesť, aby platilo *jedna sekcia = jedna scéna*.

| # | Sekcia | Scéna | Zmena oproti dnešku |
|---|---|---|---|
| 1 | Hero | 01 Nápad — noc, lampa, skica | Bez plávajúcich gulí. Jedna veta, jedno CTA. |
| 2 | Ako pracujem | 02 Zadanie — whiteboard | Dnešné *About* sa preklápa z „kto som" na „ako pracujem". Štatistiky sa dopočítavajú pri scrolle. |
| 3 | Práca | 03 Tvorba — monitory | Dnešné *Projects*. Tri case studies: Caterpillar, subenai, **tento web**. |
| 4 | Čím to overujem | 04 Testovanie — device lab | Dnešné *Skills*. Ukazovatele úrovní dobiehajú podľa scrollu. |
| 5 | Kde to bežalo | 05 Pipeline — serverovňa | **Zlúčenie** *Experience* + *Companies* do jednej silnej sekcie. |
| 6 | Kontakt | 06 Produkcia — svitanie | Formulár funkčne nezmenený (hCaptcha, validácia). |

**Dôvod zlúčenia sekcií 5:** *Experience* aj *Companies* majú dnes každá príliš
málo obsahu na vlastnú obrazovku a pôsobia ako výplň. Spolu dávajú jeden celok a
zároveň zrovnajú počet sekcií na šesť — inak by jedna scéna musela slúžiť dvakrát
a príbeh by sa zadrhol.

**Dôvod preklopenia sekcie 2:** dnešné štyri odstavce hovoria *kto autor je* (od
atletiky po grafický dizajn). Pri cieli „dokáž remeslo" je silnejšie ukázať *ako
pracuje*; životopisné veci zostávajú ako kratšia vsuvka.

## 4. Vizuálny smer a pôvod obrazov

Smer: **kinematický**, tmavý, vo vývoji z dnešnej palety (`#0F0F1A`, purpurová
`#6C63FF`, koralová `#FF6B6B`, tyrkysová `#4ECDC4`).

Obrazy sú **fotografie s licenciou na komerčné použitie** (Unsplash / Pexels),
nie generované. Higgsfield kredity (50 na účte) zostávajú nedotknuté ako rezerva
na neskoršiu výmenu jednotlivých scén.

**Riziko a jeho riešenie:** šesť fotografií od šiestich autorov vyzerá ako šesť
fotografií. Zjednotenie sa robí v kóde a je záväzné pre všetky scény:

- jednotné farebné ladenie do palety (prekrytie a `mix-blend-mode`),
- rovnaká vinieta a rovnaké zrno,
- rovnaký kontrast a rovnaká hĺbka čiernej.

Fotografia nesie **zadné plátno**. Popredie — rozhrania, kód, ukazovatele testov,
kontrolky, nosný predmet príbehu — **kreslí kód**. Má to dva dôvody: dá sa presne
animovať podľa scrollu a váži rádovo menej než ďalšia fotografia.

## 5. Technický návrh

### 5.1 Javisko

Za obsahom stojí jediný `SceneStage`: `position: sticky`, výška obrazovky,
vykreslený raz. V ňom je naskladaných šesť scén cez seba. Sekcie s textom
scrollujú nad ním normálne. Nič sa nepresúva medzi sekciami — mení sa len
viditeľnosť scén a posun vrstiev v nich.

### 5.2 Tok dát

```
globálny progres scrollu (0 → 1)
        ↓
useScrollStory()
        ↓
index aktívnej scény  +  progres vnútri scény (0 → 1)
        ↓                        ↓
    opacity scén        translateY vrstiev × ich rýchlosť
                        + hodnoty pre popredie kreslené kódom
```

### 5.3 Scéna ako dáta

```ts
type SceneLayer = { src: string; speed: number; alt?: string };

type Scene = {
  id: string;
  plate: SceneLayer;          // zadné plátno — fotografia, najpomalšia vrstva
  layers: SceneLayer[];       // voliteľné ďalšie obrazové vrstvy (spravidla prázdne)
  Foreground?: ComponentType<{ progress: MotionValue<number> }>;
};
```

Pri zvolenom rozpočte má scéna spravidla **jedno fotografické plátno a jedno
popredie kreslené kódom**; pole `layers` existuje preto, aby sa dala scéna neskôr
obohatiť o ďalšiu obrazovú vrstvu bez zmeny typu.

Scéna je dáta, nie kód. Ktorúkoľvek scénu možno neskôr vymeniť za Higgsfield
verziu bez zásahu do animačnej logiky.

### 5.4 Hranice modulov

| Modul | Zodpovednosť | Závisí od |
|---|---|---|
| `useScrollStory` | čistá matematika: progres → scéna + vnútorný progres | Framer Motion `useScroll` |
| `SceneStage` | vykreslenie a prelínanie scén | `useScrollStory`, dáta scén |
| `SceneLayerImage` | jedna vrstva, jej posun a `srcset` | — |
| `Foreground*` | popredie konkrétnej scény kreslené kódom | progres scény |
| sekcie obsahu | text, dáta, odkazy | i18n, `content.ts` |

Animačná logika nevie nič o obsahu; obsah nevie nič o animáciách.

### 5.5 Výkon

- Animujú sa **výhradne `transform` a `opacity`** — spracúva ich kompozitor, teda
  mimo hlavného vlákna. Nikdy `top`, `margin` ani `background-position`.
- **`background-attachment: fixed` sa nepoužije** (dlhodobo nefunkčné na iOS Safari).
- `overflow-x: hidden` sa v layoute v2 presúva z `html` na `body` — na `html`
  rozbíja `position: sticky` v niektorých prehliadačoch.
- Projekt beží na `output: "export"` s `images.unoptimized: true`, takže Next.js
  obrázky **neoptimalizuje**. Optimalizácia je preto súčasťou zadania:
  AVIF + WebP fallback, `srcset` pre šírky 640 / 1280 / 1920 / 2400.
- Rozpočet: prvá obrazovka do **1,2 MB**, jedno plátno do **200 kB** v AVIF.
- Plátno scény 1 sa načíta prednostne (je to LCP obrázok), ostatné odložene.

### 5.6 Prístupnosť

- `prefers-reduced-motion` → scény zostávajú ako statické obrazy: bez posunu
  vrstiev a bez dopočítavania. Nie „vypnuté", ale pokojná verzia.
- Kontrast textu voči plátnu musí spĺňať WCAG AA — zabezpečí ho tmavé prekrytie
  pod textom, nie nádej, že fotografia bude dosť tmavá.
- Poradie fokusu a čitateľnosť bez JavaScriptu zostávajú zachované; scény sú
  `aria-hidden`, lebo nenesú informáciu.

## 6. Stratégia /v2

Nový dizajn vzniká v `src/app/v2/` s vlastným layoutom a komponentmi v
`src/components/v2/`. Dnešný web sa nedotkne, `lvtesting.eu` beží nezmenene a
`lvtesting.eu/v2/` je jeho náhľad.

**Rozsah v2:** domovská stránka so šiestimi scénami. Stránka `/portfolio`
(dnes 565 riadkov) dostane rovnaký vizuálny jazyk ako **druhá etapa**, na
`/v2/portfolio`, až keď bude domovská stránka schválená. Dôvod: portfólio má inú
úlohu (hĺbkové case studies, nie príbeh) a jeho prerábka by zdržala to, čo
rozhoduje o prvom dojme. Do schválenia zostáva dnešná `/portfolio` v prevádzke
nezmenená — okrem odstránenia Mobixu podľa kapitoly 7.

**Zdieľa sa** (je overené a nemá dôvod existovať dvakrát): i18n provider,
`ConsentProvider`, analytika, logika kontaktného formulára.
**Nezdieľajú sa štýly:** v2 má vlastné farebné tokeny, inak by ladenie nového
vzhľadu rozbíjalo starý.

**Ochrana pred duplicitou v indexe** (inak by dve takmer identické stránky v
piatich jazykoch súperili o rovnaké kľúčové slová):

- `/v2` dostane `robots: { index: false, follow: false }` v metadátach,
- `Disallow: /v2/` v `robots.txt`,
- `/v2` sa neuvedie v `sitemap.xml`.

**Nasadenie po schválení** je mechanická operácia, nie zlučovanie:
`app/v2/page.tsx` → `app/page.tsx`, komponenty `v2/` → na miesto pôvodných,
staré komponenty zmazať, odstrániť `noindex`, vrátiť `robots.txt` a `sitemap.xml`.

## 7. Odstránenie Mobixu

Samostatná zmena na dnešnom webe, **nezávislá od v2** a nasaditeľná okamžite.
V2 vzniká už bez Mobixu.

**Zmizne meno** v týchto miestach:

| Súbor | Čo |
|---|---|
| `src/data/content.ts` | položka `mobiX Platform` v `projects`, riadok `mobiX` v `companies` |
| `src/app/portfolio/page.tsx` | karta projektu, `mobixTechStack`, odkaz na `mobix.eu.sk` |
| `src/i18n/{sk,cs,en,de,es}.ts` | blok `mobix` (tagline, popis, `visitSite`, features, rok) |
| `src/i18n/types.ts` | typ `mobix` |
| `public/llms.txt` | 2 zmienky |
| `public/llms-full.txt` | 3 zmienky |
| `public/mobix-{logo,icon,favicon}.svg` | zmazať |

**Zostáva skúsenosť bez mena:** „mobilitná platforma pre klienta v doprave —
Flutter, WebSockets, Stripe, Google/Apple Pay, mapy". Technológie a rozsah práce
nesú váhu aj bez značky.

**Dôsledok, ktorý sa musí ošetriť súčasne:** po odstránení zostáva na `/portfolio`
jediný projekt (subenai) a na domovskej stránke tiež jediný (Caterpillar).
Miesto zaplní **case study tohto webu** — Next.js 16, statický export, 5 jazykov,
scroll-driven pozadie, vlastná optimalizácia obrázkov, testy. Pri cieli „web je
dôkaz remesla" je to najvhodnejší možný obsah: návštevník číta o tom, na čom
práve stojí.

## 8. Overenie

| Čo | Ako |
|---|---|
| matematika scrollu | jednotkové testy vo Vitest — čistá funkcia progres → scéna |
| úplnosť prekladov | existujúci `i18n-completeness.test.ts` (chráni pred osirelými kľúčmi po Mobixe) |
| neprítomnosť Mobixu | test, ktorý prehľadá zdroj a `public/` na reťazec `mobix` |
| vizuál a plynulosť | spustenie webu a skutočné scrollovanie v prehliadači, vrátane mobilnej šírky |
| výkon | veľkosť `out/` a kontrola rozpočtu prvej obrazovky po builde |
| prístupnosť | kontrast textu na plátne, správanie pri `prefers-reduced-motion` |

## 9. Čo tento návrh zámerne nerieši

- Generovanie scén cez Higgsfield — kredity zostávajú v rezerve, výmena je možná
  neskôr bez zásahu do kódu.
- Video v pozadí — flat plocha bez hĺbky, výrazne ťažšia a na iOS problematická.
- Zmenu nasadzovania — `post-build.sh` a hosting zostávajú.
- Prepis obsahu `/privacy` a chybových stránok.

## 10. Riziká

| Riziko | Opatrenie |
|---|---|
| Fotografie pôsobia ako náhodná zbierka | záväzné jednotné ladenie, vinieta a zrno pre všetky scény |
| Prerobenie textov v 5 jazykoch je väčšia práca než animácie | textové zmeny sú vlastná etapa plánu, nie dodatok |
| Parallax trhá na slabších zariadeniach | len `transform`/`opacity`, menej vrstiev na mobile, meranie |
| `/v2` sa zaindexuje | `noindex` + `robots.txt` + vynechanie zo `sitemap.xml`, overené v builde |
| Next.js 16 sa líši od zaužívaných zvykov | pred písaním kódu prečítať `node_modules/next/dist/docs/` (pokyn `AGENTS.md`) |
