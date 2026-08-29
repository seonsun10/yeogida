import type { GuideTranslation } from '@/lib/guides';

export const guideTranslationsEnPart2: Record<string, GuideTranslation> = {
  'voice-phishing-privacy-breach-response': {
    title: 'Fell for Voice Phishing or Had Your Personal Info Leaked? What to Do Right Now',
    summary:
      'What to do, step by step, if you have already sent money or your information may have leaked, instead of just panicking.',
    blocks: [
      {
        type: 'paragraph',
        text: 'Voice phishing is a race against time. If you have already sent money or handed over your information, this is not the moment to blame yourself — moving through the steps below, in order, is the surest way to limit the damage.',
      },
      {
        type: 'heading',
        text: 'Step 1 — If you have already sent money, request a payment freeze first',
      },
      {
        type: 'paragraph',
        text: 'If there is an account you sent money to, contact both the call center of the bank you sent it from and the police (112, no area code) at the same time, as fast as possible, and request a payment freeze. 112 is the National Police Agency\'s main emergency line for reporting crimes and dispatching officers; if it is hard to talk, you can also file a report by text through "Visible 112".',
      },
      {
        type: 'heading',
        text: 'Step 2 — Check whether another account or loan has been opened in your name',
      },
      {
        type: 'paragraph',
        text: 'On FINE (Financial Consumer Information Portal), run by the Financial Supervisory Service, you can look up your accounts, insurance policies, and loans scattered across multiple financial companies in one place. Check that no account or loan you do not recognize has been opened under your name, and it is worth reviewing the voice-phishing prevention information there as well.',
      },
      {
        type: 'heading',
        text: 'Step 3 — If your personal information itself seems to have leaked, report it to 118',
      },
      {
        type: 'paragraph',
        text: 'If it looks like personal information such as your resident registration number or account number was handed over during the phishing, report it to the Personal Information Infringement Report Center (118, no area code), run by the Korea Internet & Security Agency (KISA). They review whether any law was violated, take corrective action, and notify you of the outcome; if dispute mediation is needed, they will refer you to the Personal Information Dispute Mediation Committee.',
      },
      {
        type: 'services',
        intro: 'Services mentioned in this guide',
        slugs: ['police-112', 'fine-fss-portal', 'privacy-breach-118'],
      },
    ],
  },
  'missing-child-emergency-response': {
    title: 'When Your Child Suddenly Goes Missing: Preparing in Advance and Responding Immediately',
    summary:
      'The reporting steps to follow without panicking if your child goes missing, plus the pre-registration that cuts down verification time when done ahead of time.',
    blocks: [
      {
        type: 'paragraph',
        text: 'When a child disappears from sight, a few minutes can feel like hours. In this situation, reporting it right away, following the steps below, is faster than searching alone.',
      },
      {
        type: 'heading',
        text: 'Step 1 — Report to both Safe Dream (182) and 112 at the same time',
      },
      {
        type: 'paragraph',
        text: 'Safe Dream Missing Child Finder, run by the National Police Agency, takes reports 24 hours a day at 182 (no area code). It is also a good idea to report to 112 at the same time, so nearby patrol officers can move immediately. Both start responding as soon as a report comes in, so there is no need to stick with just one line — contact both at once.',
      },
      {
        type: 'heading',
        text: 'Step 2 — Pre-registering in advance sharply cuts down verification time',
      },
      {
        type: 'paragraph',
        text: 'On the Safe Dream website or app, you can register your child\'s photo and physical information, and, if needed, biometric data such as fingerprints, in advance. If a disappearance actually happens, having this pre-registered information on file greatly reduces the time needed to verify identity, so it is worth registering before an emergency ever comes up.',
      },
      {
        type: 'services',
        intro: 'Services mentioned in this guide',
        slugs: ['safe182-missing-child', 'police-112'],
      },
    ],
  },
  'school-violence-response-steps': {
    title: 'If You Have Experienced or Witnessed School Violence: From Reporting to 117 to Legal Support',
    summary:
      'The order to follow for reporting and legal response when your child has been a victim of school violence.',
    blocks: [
      {
        type: 'paragraph',
        text: 'With school violence, people often hesitate to report it at all and end up missing the right moment. Here is the order to follow, starting with a process that protects your identity and moving on to legal support if needed.',
      },
      { type: 'heading', text: 'Step 1 — Report to 117' },
      {
        type: 'paragraph',
        text: 'The School Violence Report Center 117 is jointly run by the Ministry of Education and the National Police Agency, and takes reports 24 hours a day by phone (117, no area code), text (#0117), and through the Safe Dream website and app. As soon as a report comes in, it is handled as a one-stop process covering emergency rescue, investigation orders, legal counseling, and referral to support agencies, and the reporter\'s identity is kept confidential — so even if you only witnessed it, it is worth reporting without hesitation.',
      },
      {
        type: 'heading',
        text: 'Step 2 — If you are unsure about the process, check Easy-to-Find Everyday Legal Information first',
      },
      {
        type: 'paragraph',
        text: 'If the procedures of the School Violence Prevention Deliberation Committee, or how to file an objection, feel complicated, you can first look up material organized at a citizen\'s level on Easy-to-Find Everyday Legal Information, run by the Ministry of Government Legislation. It is free to browse with no sign-up required.',
      },
      {
        type: 'heading',
        text: 'Step 3 — If you need legal action but the cost is a concern',
      },
      {
        type: 'paragraph',
        text: 'If a dispute with the other student\'s side is heading toward litigation, or you need professional legal help but hiring a lawyer feels too expensive, the Korea Legal Aid Corporation (132, no area code) can provide free legal counseling, and even litigation representation, if you meet the income requirements.',
      },
      {
        type: 'services',
        intro: 'Services mentioned in this guide',
        slugs: ['school-violence-117', 'easylaw-portal', 'legal-aid-corporation-132'],
      },
    ],
  },
  'domestic-violence-support-steps': {
    title: 'If You Have Experienced Domestic Violence or Dating Violence: From 1366 to Legal Support',
    summary:
      'The order in which to reach out for help when you are in a situation that is dangerous or that needs protection right now.',
    blocks: [
      {
        type: 'paragraph',
        text: 'Domestic violence and dating violence are not something to just endure alone. If you are in a dangerous situation right now, the first step is to ask for help in the order below.',
      },
      {
        type: 'heading',
        text: 'Step 1 — If it is dangerous, start with the Women\'s Emergency Hotline 1366',
      },
      {
        type: 'paragraph',
        text: 'If you need urgent rescue, protection, or counseling because of domestic violence, sexual violence, prostitution, or similar situations, call 1366 (no area code). A counselor begins crisis counseling immediately and, if needed, connects you directly to the police, a medical institution, or a shelter; it operates 24 hours a day, 365 days a year.',
      },
      {
        type: 'heading',
        text: 'Step 2 — If you need a lawyer but the cost is a concern',
      },
      {
        type: 'paragraph',
        text: 'If you are considering legal action but the cost of hiring a lawyer is a concern, look into the Village Lawyer / Legal Home Doctor program. It is a Ministry of Justice program that connects residents in areas without easy access to a lawyer to phone, fax, or email consultations, or places a lawyer on-site at community hub agencies serving vulnerable groups. The assigned lawyer and consultation method vary by region, so check with your local town, township, or neighborhood community service center.',
      },
      {
        type: 'heading',
        text: 'Step 3 — If it has to go to litigation, the Korea Legal Aid Corporation',
      },
      {
        type: 'paragraph',
        text: 'If you need to go as far as litigation — divorce, a restraining order, damages — the Korea Legal Aid Corporation (132) can provide free litigation representation if you meet the income requirements.',
      },
      {
        type: 'services',
        intro: 'Services mentioned in this guide',
        slugs: ['women-hotline-1366', 'village-lawyer', 'legal-aid-corporation-132'],
      },
    ],
  },
  'multicultural-family-support-guide': {
    title: 'If You Are in a Multicultural Family: From Interpretation Counseling to Childcare Support',
    summary:
      'The order in which multicultural families and immigrants unfamiliar with life in Korea can get counseling and childcare support without worrying about language.',
    blocks: [
      {
        type: 'paragraph',
        text: 'Because of the language barrier, many people do not know where to ask and just let things go. Here is where multicultural families and immigrants can turn, organized by situation.',
      },
      {
        type: 'heading',
        text: 'Step 1 — If everyday life feels overwhelming, Danuri (1577-1366)',
      },
      {
        type: 'paragraph',
        text: 'The Danuri Multicultural Family Support Portal, run by the Ministry of Gender Equality and Family, provides comprehensive everyday-life information as well as three-way sequential interpretation and emergency or crisis counseling. Calling 1577-1366 connects you with a specialist counselor in 13 languages, including Vietnamese, Chinese, and English, and it operates 24 hours a day, 365 days a year.',
      },
      {
        type: 'heading',
        text: 'Step 2 — If you need childcare or childcare-fee support',
      },
      {
        type: 'paragraph',
        text: 'On the Aisarang Pregnancy and Childcare Portal, you can search daycare centers nationwide, apply for a spot on the waiting list, and pay childcare fees with the National Happiness Card, all online. Pregnancy, birth, and childcare counseling is handled separately at 1644-7373, and daycare-related counseling at 1566-3232.',
      },
      {
        type: 'heading',
        text: 'Step 3 — If you need family counseling or a settlement program',
      },
      {
        type: 'paragraph',
        text: 'Family Centers (formerly Healthy Family Support Centers), set up in cities, counties, and districts nationwide, connect you to family-relationship counseling, parent education, and family care-sharing programs. Calling the main line (1577-9337) connects you to your nearest center, and joining a program requires an advance reservation.',
      },
      {
        type: 'services',
        intro: 'Services mentioned in this guide',
        slugs: ['danuri-portal', 'childcare-portal', 'familynet-center'],
      },
    ],
  },
  'childcare-government-support-by-stage': {
    title: 'From Pregnancy to Before Elementary School: Government Childcare Support at a Glance',
    summary:
      'Birth grants, childcare fees, and care services each have a different ministry and application window. Here is what to check right now, organized by your child\'s age and situation.',
    blocks: [
      {
        type: 'paragraph',
        text: 'There are many kinds of childcare support, and the application window differs by ministry, so it is common to apply for one and assume the rest are handled automatically, then miss them. Instead of searching over and over, here is what to check right now and where to apply, organized by your child\'s situation.',
      },
      {
        type: 'heading',
        text: 'Once you have confirmed a pregnancy — register on the Aisarang portal first',
      },
      {
        type: 'paragraph',
        text: 'Registering your pregnancy on the Aisarang Pregnancy and Childcare Portal, run by the Ministry of Health and Welfare, lets you get information on prenatal-checkup cost support, folic acid and iron supplement support, and other pregnancy-period benefits, all in one place. After birth, you will keep using the same portal to search daycare centers and pay childcare fees with the National Happiness Card, so signing up early makes the later stages easier.',
      },
      {
        type: 'heading',
        text: 'Right after birth — you do not apply separately for the First Meeting Voucher, parental allowance, and child allowance',
      },
      {
        type: 'paragraph',
        text: 'After registering a birth, it might seem like you need to apply separately at different places for the First Meeting Voucher, parental allowance, and child allowance — but you can apply for all of them at once through Gov24\'s Happy Birth One-Stop Service. It is processed at the same time as the birth registration, so there is no need to visit the community service center multiple times.',
      },
      {
        type: 'heading',
        text: 'If you are about to return to work — apply for parental leave benefits separately, on Work24',
      },
      {
        type: 'paragraph',
        text: 'Unlike the support payments above, parental leave benefits fall under the Ministry of Employment and Labor rather than the Ministry of Health and Welfare, so the application window is different. If you are an employee enrolled in employment insurance and you take parental leave, you need to apply for parental leave benefits separately on Work24 — applying for the earlier birth-support payments does not process this automatically, which is easy to miss.',
      },
      {
        type: 'heading',
        text: 'If you need somewhere to leave your child — the right window depends on age and situation',
      },
      {
        type: 'list',
        items: [
          'Still looking into daycare centers → apply online for a spot on the waiting list through the Aisarang portal',
          'Dual-income or single-parent household that wants a caregiver to come to your home → Idolbom Childcare Service (government-supported home-visit care)',
          'Elementary-school child with nowhere reliable to go after school → check local care facilities through the Dahamkke (All-Together) Care Center',
        ],
      },
      {
        type: 'heading',
        text: 'Multicultural families have a separate place to get counseling without worrying about language',
      },
      {
        type: 'paragraph',
        text: 'Most of the services above are guided in Korean, so multicultural families often get stuck during the application process. Calling Danuri (1577-1366), run by the Ministry of Gender Equality and Family, gets you interpretation counseling in 13 languages, including guidance through applying for childcare support.',
      },
      {
        type: 'heading',
        text: 'Wondering whether there is support beyond what is listed here',
      },
      {
        type: 'paragraph',
        text: 'There is often more childcare support than what is listed here — local governments add their own on top, and new programs keep appearing. Rather than searching separately every time, Bokjiro, run by the Ministry of Health and Welfare, lets you enter your household\'s situation and find every welfare service you qualify for, organized by life stage, in one search — so it is more efficient to look there first, then go find the actual application window in the order above.',
      },
      {
        type: 'services',
        intro: 'Services mentioned in this guide',
        slugs: [
          'childcare-portal',
          'happy-birth-onestop',
          'work24-portal',
          'idolbom-childcare',
          'dadol-childcare',
          'danuri-portal',
          'bokjiro-portal',
        ],
      },
    ],
  },
  'pet-registration-and-vet-cost-guide': {
    title: 'The Administrative Steps Easy to Miss When Living With a Pet: From Registration to Vet Bills',
    summary:
      'Whether your pet is registered, whether treatment costs are reasonable, and where to check in an emergency — the administrative tasks that come with pet life, laid out in order.',
    blocks: [
      {
        type: 'paragraph',
        text: 'Living with a pet comes with more administrative tasks than people expect. Putting off registration can lead to a fine, and vet costs vary so much between clinics that it is easy to overpay without realizing it. Here are the things that are easy to miss in pet life, in order.',
      },
      {
        type: 'heading',
        text: 'If you have not registered your animal yet, check this first',
      },
      {
        type: 'paragraph',
        text: 'Registering a dog is mandatory, and failing to register can result in a fine. First check whether it is already registered, by registration number or owner information, on the Animal Registration Information Lookup within the National Animal Protection Information System; if it is not, find a nearby registration agency, such as a veterinary clinic, through the Animal Registration Agency Lookup and register there.',
      },
      {
        type: 'heading',
        text: 'If you are worried about vet costs, start by comparing treatment fees',
      },
      {
        type: 'paragraph',
        text: 'Veterinary clinics can charge very different amounts for the same treatment item. Checking the lowest, highest, and average cost of major treatment items by region in advance, through the Veterinary Clinic Fee Disclosure System, gives you a benchmark when switching clinics or comparing quotes.',
      },
      {
        type: 'heading',
        text: 'If money is tight, check whether treatment-cost support is available',
      },
      {
        type: 'paragraph',
        text: 'If you are part of a vulnerable group, such as a basic livelihood recipient, check whether a support program can significantly discount your pet\'s treatment costs. "Our Neighborhood Animal Hospital" is the name of Seoul\'s support program for pet treatment costs for vulnerable groups; other local governments may run programs with different names and conditions, so check separately with your local public health center or animal-protection department.',
      },
      { type: 'heading', text: 'If your pet has passed away' },
      {
        type: 'paragraph',
        text: 'In the rush of grief, it is easy to end up using an unlicensed business, but unlicensed funeral businesses are illegal and their handling of remains cannot be trusted. Check whether a business is officially registered through the Registered Pet Funeral Business Lookup before using it — that is the safer route.',
      },
      {
        type: 'services',
        intro: 'Services mentioned in this guide',
        slugs: [
          'pet-registration-lookup',
          'pet-registration-agency-lookup',
          'pet-clinic-fee-lookup',
          'our-neighborhood-animal-hospital',
          'pet-funeral-business-lookup',
        ],
      },
    ],
  },
  'insurance-checkup-and-claims-guide': {
    title: 'Actually Managing Your Insurance: From Checking What You Are Enrolled In to Unclaimed Money',
    summary:
      'It is easy to lose track of which policies you are even enrolled in. Here is the order to check: enrollment details, indemnity claims, and money sitting unclaimed.',
    blocks: [
      {
        type: 'paragraph',
        text: 'People often take out a policy and then forget about it. If you are not even sure what insurance you are enrolled in, follow the order below.',
      },
      { type: 'heading', text: 'First, check everything you are enrolled in' },
      {
        type: 'paragraph',
        text: 'Your insurance policies, scattered across multiple insurers, can be checked at a glance with a single identity verification on My Insurance Enrollment Lookup (Credit4U). The first step is finding out how many policies you actually have.',
      },
      {
        type: 'heading',
        text: 'Look for insurance money that has been sitting unclaimed',
      },
      {
        type: 'paragraph',
        text: 'There may be insurance money you never claimed after a policy matured, or dormant insurance money that has gone unclaimed for a long time. Find My Insurance (Nae Bohum Chajajum) lets you check, in one search, whether there is any unclaimed money under your name.',
      },
      {
        type: 'heading',
        text: 'When claiming indemnity insurance for medical costs',
      },
      {
        type: 'paragraph',
        text: 'If you have had a hospital visit, Silson24 lets you claim indemnity medical insurance directly from your smartphone, without getting a separate receipt issued.',
      },
      {
        type: 'heading',
        text: 'If you are taking out new insurance or switching providers, compare first',
      },
      {
        type: 'paragraph',
        text: 'If you are taking out a new policy or thinking about switching an existing one, the first step is comparing products from multiple insurers side by side on Insurance Supermarket (Bohum Damoa), rather than relying only on what an agent tells you.',
      },
      { type: 'heading', text: 'If you suspect insurance fraud' },
      {
        type: 'paragraph',
        text: 'If you have witnessed or experienced something that looks like insurance fraud — a false or inflated diagnosis, a staged accident — you can report it online to the Insurance Fraud Report Center.',
      },
      {
        type: 'services',
        intro: 'Services mentioned in this guide',
        slugs: [
          'credit4u-insurance-inquiry',
          'find-my-insurance',
          'silson24',
          'insurance-supermarket',
          'insurance-fraud-report-center',
        ],
      },
    ],
  },
  'parent-elderly-care-support-guide': {
    title: 'When a Parent Starts Struggling to Live Alone: What to Check, Step by Step',
    summary:
      'For a parent whose mobility is declining or who lives alone, here is what kind of support to look into first, organized by situation.',
    blocks: [
      {
        type: 'paragraph',
        text: 'Once a parent starts having more trouble getting around than before, or you start worrying about them living alone, it is hard to know where to even begin. Here is the order to check, by situation.',
      },
      {
        type: 'heading',
        text: 'If mobility has become difficult, start by applying for a long-term care grade',
      },
      {
        type: 'paragraph',
        text: 'If daily life has become difficult due to old age or an age-related illness, the first step is applying to Long-Term Care Insurance for the Elderly for a care-grade assessment. Once a grade is assigned, a large portion of the cost of in-home services, such as home visit care, or facility admission can be covered through social insurance.',
      },
      { type: 'heading', text: 'If their memory has noticeably declined recently' },
      {
        type: 'paragraph',
        text: 'If you are worried about worsening forgetfulness or them repeating the same things, you can get a free dementia screening test at your local public health center\'s Dementia Relief Center. The earlier it is checked, the easier it is to plan care afterward.',
      },
      { type: 'heading', text: 'If they live alone and you are worried about their safety' },
      {
        type: 'paragraph',
        text: 'The Personalized Senior Care Service regularly visits older adults living alone to check on them and support their daily life. If you are more worried about emergencies like a fire or a fall, the Emergency Safety Confirmation Service for Seniors and People with Disabilities Living Alone installs a fire detector and emergency call device in the home for free, with 24-hour remote monitoring.',
      },
      { type: 'heading', text: 'If you suspect abuse' },
      {
        type: 'paragraph',
        text: 'If you suspect your parent is being abused, do not hesitate — call the Elder Abuse Report Line (1577-1389). It connects with no area code, and the regional Senior Protection Agency with jurisdiction responds immediately.',
      },
      { type: 'heading', text: 'If the cost of knee surgery is a concern' },
      {
        type: 'paragraph',
        text: 'If a low-income older adult needs knee replacement surgery but the cost is a concern, check whether they qualify for support through Knee Replacement Surgery Cost Support for Seniors.',
      },
      {
        type: 'services',
        intro: 'Services mentioned in this guide',
        slugs: [
          'long-term-care-insurance',
          'dementia-safety-center',
          'senior-customized-care-service',
          'emergency-safety-service-elderly',
          'elderly-abuse-report-1577-1389',
          'knee-replacement-surgery-support-elderly',
        ],
      },
    ],
  },
};
