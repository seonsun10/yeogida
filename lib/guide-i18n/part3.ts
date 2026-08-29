import type { GuideTranslation } from '@/lib/guides';

export const guideTranslationsEnPart3: Record<string, GuideTranslation> = {
  'health-records-and-vaccination-guide': {
    title: 'How to check all your health records in one place: from vaccinations to checkup history',
    summary:
      "A rundown of where to check your scattered health information — vaccination records, checkup results, and the medications you're taking.",
    blocks: [
      {
        type: 'paragraph',
        text: "When you suddenly need your vaccination record or an old checkup result, it's easy to have no idea where to look. Here's where to check, by situation.",
      },
      {
        type: 'heading',
        text: 'If you want to check your vaccination record',
      },
      {
        type: 'paragraph',
        text: "You can look up your own or your child's lifetime vaccination record on Vaccination Helper. You can also get reminders for upcoming vaccinations and issue a vaccination certificate.",
      },
      {
        type: 'heading',
        text: 'If you want to see your past checkup and treatment history',
      },
      {
        type: 'paragraph',
        text: 'National Health Insurance Service - Health In lets you look up your past checkup results and treatment/medication history, and also provides a personalized health-prediction report based on those records.',
      },
      {
        type: 'heading',
        text: "If you're unsure exactly what a prescribed medication is",
      },
      {
        type: 'paragraph',
        text: "If you can't tell what a pill is just by looking at it, or want to know whether it's dangerous to take alongside another medication, Drug Safety Korea (Nedrug) lets you identify the pill and check dangerous drug-combination information.",
      },
      {
        type: 'heading',
        text: 'If you need verified information about a disease',
      },
      {
        type: 'paragraph',
        text: "If you need accurate information instead of whatever health advice is floating around online, the National Health Information Portal offers disease and symptom information directly verified by the Korea Disease Control and Prevention Agency. For a rare disease, the Rare Disease Helpline also provides guidance on registering for the special calculation program and on medical-cost support programs.",
      },
      {
        type: 'heading',
        text: 'If you need a health-center document, such as a health certificate',
      },
      {
        type: 'paragraph',
        text: 'A health-center matter like issuing a health certificate (health checkup result form) can be handled online through the e-Health Center. However, online issuance is only possible when the test result is "normal" — if there\'s an abnormal finding, you\'ll need to visit in person the health center where you were tested to get it issued.',
      },
      {
        type: 'services',
        intro: 'Services mentioned in this guide',
        slugs: [
          'nip-kdca',
          'nhis-healthin',
          'nedrug-mfds',
          'health-kdca',
          'helpline-kdca',
          'g-health',
        ],
      },
    ],
  },
  'workplace-rights-violation-guide': {
    title: "If you've experienced unpaid wages or unfair dismissal at work: the reporting order",
    summary:
      'A rundown of who to contact first when your pay is overdue or you\'ve been unfairly dismissed, including how to get help without cost.',
    blocks: [
      {
        type: 'paragraph',
        text: "Unpaid wages or unfair dismissal are easy to just put up with on your own, but following the established procedure often actually resolves them.",
      },
      {
        type: 'heading',
        text: 'Start by calling 1350 for counseling',
      },
      {
        type: 'paragraph',
        text: "If you're dealing with a labor issue like unpaid wages or unfair dismissal, the first step is to call the Ministry of Employment and Labor Customer Counseling Center (1350) and explain your situation. They can guide you on which procedure to follow and which labor office has jurisdiction.",
      },
      {
        type: 'heading',
        text: 'If you were injured at work',
      },
      {
        type: 'paragraph',
        text: "If you were injured or fell ill on the job, the Korea Workers' Compensation and Welfare Service (1588-0075) can advise on and process your industrial-accident insurance claim and issue related certificates.",
      },
      {
        type: 'heading',
        text: "If it may go to a lawsuit but the cost of hiring a lawyer is a burden",
      },
      {
        type: 'paragraph',
        text: "If your dispute with your employer looks likely to turn into a lawsuit and hiring a lawyer feels like too much of a financial burden, the Korea Legal Aid Corporation (132) can provide free legal counseling and even litigation representation if you meet the income criteria. If you're in an area where it's hard to find a lawyer, you can also get phone or in-person counseling through the Village Lawyer / Legal Home Doctor program.",
      },
      {
        type: 'heading',
        text: 'If your employer ignores the government process itself',
      },
      {
        type: 'paragraph',
        text: "If you feel there's a problem with the administrative handling itself — for example, your employer isn't complying even after a labor office correction order — you can file a complaint with People's Voice (Epeople) / National Call Center 110.",
      },
      {
        type: 'services',
        intro: 'Services mentioned in this guide',
        slugs: [
          'moel-labor-counsel-1350',
          'comwel-labor-welfare',
          'legal-aid-corporation-132',
          'village-lawyer',
          'epeople-110',
        ],
      },
    ],
  },
  'first-home-buying-steps-guide': {
    title: 'First steps to buying your first home: from a subscription savings account to a loan',
    summary:
      'If all you have is a subscription savings account and nothing more concrete, here\'s the order to check things in to actually buy a home.',
    blocks: [
      {
        type: 'paragraph',
        text: "Buying a home doesn't end with just having a subscription savings account. There are several stages — checking your eligibility, applying for a subscription, and working out your financing — laid out here in order.",
      },
      {
        type: 'heading',
        text: "If you're young, start with a preferential-rate subscription savings account",
      },
      {
        type: 'paragraph',
        text: 'If you\'re a homeless young person aged 19 to 34, it\'s to your advantage to open a Youth Housing Dream Subscription Savings Account, which gives you a preferential interest rate. If you later win a subscription, it leads into the low-interest Housing Dream Loan.',
      },
      {
        type: 'heading',
        text: "If you're ready to apply for a subscription",
      },
      {
        type: 'paragraph',
        text: 'For private apartment/officetel subscriptions, Cheongyak Home handles everything from checking eligibility to applying and announcing winners. If you\'re interested in public rental or pre-sale housing (Happy Housing, National Rental Housing, and the like), you\'ll need to check separately on LH Apply Plus.',
      },
      {
        type: 'heading',
        text: "If you're short on funds, check policy loans first",
      },
      {
        type: 'paragraph',
        text: 'Before looking into a commercial bank loan, the right order is to first check on the Housing and Urban Fund e-Deun-deun whether you qualify for a low-income policy loan such as the Didimdol home-purchase loan or the Beotimmok jeonse loan. These often carry a lower interest rate than commercial banks.',
      },
      {
        type: 'heading',
        text: "If your income is low, also check housing-welfare benefits",
      },
      {
        type: 'paragraph',
        text: 'If a subscription or purchase still feels like too much of a stretch, you can first look on the My Home Portal for housing-welfare benefits — such as public rental housing or housing benefit — that fit your income and asset level. The property register and actual-transaction-price checks you should do right before signing a contract are covered separately in the "What to check before signing a jeonse lease" guide.',
      },
      {
        type: 'services',
        intro: 'Services mentioned in this guide',
        slugs: [
          'youth-housing-dream-account',
          'applyhome-portal',
          'lh-apply-plus',
          'nhuf-fund-loan',
          'myhome-portal',
        ],
      },
    ],
  },
  'small-business-startup-funding-guide': {
    title: 'Starting a small business: preparing your funding step by step',
    summary:
      "There are so many startup support programs that it's confusing to know where to start. Here's the order — from searching for support programs to policy funds and loan guarantees.",
    blocks: [
      {
        type: 'paragraph',
        text: 'Startup support is run separately by different ministries and agencies, so hunting them down one by one takes a long time. Checking things in order — from searching to securing funding — cuts down on wasted effort.',
      },
      {
        type: 'heading',
        text: 'First, search for what support programs exist',
      },
      {
        type: 'paragraph',
        text: 'You can search all startup support programs run by the government and local governments in one place on the K-Startup Support Portal. If you want to cast a wider net that includes support programs for SMEs and small business owners, also check Bizinfo.',
      },
      {
        type: 'heading',
        text: "If you're a small business owner, start with policy funds",
      },
      {
        type: 'paragraph',
        text: "Small-business policy funds, management consulting, and loss compensation can all be applied for through the Small Enterprise and Market Service (SEMAS) (1357). If your business has grown into more of an SME, look into stage-based low-interest loans from Korea SMEs and Startups Agency (KOSMES) Policy Funds.",
      },
      {
        type: 'heading',
        text: "If you're short on collateral or credit, get a guarantee first",
      },
      {
        type: 'paragraph',
        text: 'If you want a loan but lack sufficient collateral or credit, you can go through the Korea Federation of Credit Guarantee Foundations to get a guarantee certificate from your regional Credit Guarantee Foundation and connect it to a loan.',
      },
      {
        type: 'services',
        intro: 'Services mentioned in this guide',
        slugs: [
          'kstartup-portal',
          'bizinfo-portal',
          'semas-small-business',
          'kosmes-policy-fund',
          'sinbo-guarantee',
        ],
      },
    ],
  },
  'yearend-tax-and-refund-guide': {
    title: "How to handle year-end tax settlement and missed refunds in one go",
    summary:
      "From the so-called \"13th month's pay\" of year-end tax settlement to tax and financial refunds you didn't know about — here's the order to check so you don't miss anything.",
    blocks: [
      {
        type: 'paragraph',
        text: "Year-end tax settlement happens every year, yet it's confusing every time, and there's often a separate refund you're entitled to that you don't even know about. Checking things in order cuts down on what you miss.",
      },
      {
        type: 'heading',
        text: 'Start with your year-end settlement documents',
      },
      {
        type: 'paragraph',
        text: 'The Hometax Simplified Year-End Tax Settlement Service lets you look up and print your income and tax-credit evidence documents all in one place. The right order is to first check that nothing\'s missing before submitting it to your employer.',
      },
      {
        type: 'heading',
        text: 'If you have a tax question',
      },
      {
        type: 'paragraph',
        text: "If a deduction item is confusing or you're unsure how to file, calling the National Tax Counseling Center (126) to ask is faster than searching online.",
      },
      {
        type: 'heading',
        text: 'Check whether you have a missed tax refund',
      },
      {
        type: 'paragraph',
        text: 'You may have a national tax refund that was approved but never claimed. Check the National Tax Unclaimed Refund Lookup to see whether there\'s an unclaimed refund in your name.',
      },
      {
        type: 'heading',
        text: "Also look for financial assets you've forgotten about",
      },
      {
        type: 'paragraph',
        text: 'Beyond taxes, you might also have dormant deposits or unclaimed insurance money scattered across various financial companies. You can check all of it at once through the FINE Integrated Account Management Service (My Accounts at a Glance).',
      },
      {
        type: 'services',
        intro: 'Services mentioned in this guide',
        slugs: [
          'hometax-yearend-tax-simplification',
          'nts-counseling-126',
          'national-tax-unclaimed-refund',
          'fss-fine-account-search',
        ],
      },
    ],
  },
  'car-license-inspection-maintenance-guide': {
    title: "From driver's license renewal to vehicle inspection: miss it and you'll pay a fine",
    summary:
      "License renewal, vehicle inspection, unpaid Hi-pass tolls — a rundown of the things that turn into fines if you miss the deadline, in order.",
    blocks: [
      {
        type: 'paragraph',
        text: 'Most car-related administrative tasks have set deadlines, so putting them off because you\'re busy comes back as a fine. Here are the easy-to-miss ones, in order.',
      },
      {
        type: 'heading',
        text: "Check when your license renewal/aptitude test is due",
      },
      {
        type: 'paragraph',
        text: "Missing your driver's license renewal or aptitude-test window can get your license revoked. The Korea Road Traffic Authority Safe Driving Integrated Civil Affairs service lets you book a renewal or aptitude test, check penalty points, and apply for special traffic-safety education, all in one place.",
      },
      {
        type: 'heading',
        text: 'If your vehicle inspection period is approaching',
      },
      {
        type: 'paragraph',
        text: 'Missing your regular or comprehensive inspection period gets you a fine. Booking a date and time in advance through Korea Transportation Safety Authority Vehicle Inspection Booking (Cyber Inspection Center) lets you get inspected without waiting on-site.',
      },
      {
        type: 'heading',
        text: 'Check whether you have an unpaid Hi-pass toll',
      },
      {
        type: 'paragraph',
        text: 'A Hi-pass device error or insufficient balance can leave a toll unpaid. Korea Expressway Corporation Hi-pass lets you check for unpaid tolls and pay them right away.',
      },
      {
        type: 'heading',
        text: 'If you often use public transit, claim your refund too',
      },
      {
        type: 'paragraph',
        text: 'If you use public transit 15 or more times a month instead of driving, K-pass automatically refunds you part of what you spent.',
      },
      {
        type: 'services',
        intro: 'Services mentioned in this guide',
        slugs: [
          'koroad-safedriving',
          'kotsa-inspection-reservation',
          'ex-hipass',
          'k-pass-transit-card',
        ],
      },
    ],
  },
  'unclaimed-government-benefits-guide': {
    title: "How to check, in one place, government support you're missing simply because you don't know about it",
    summary:
      "New support payments you could qualify for based on your age or situation keep appearing, and it's common to miss them simply because you don't know they exist. Here's where to find missed benefits all at once.",
    blocks: [
      {
        type: 'paragraph',
        text: 'Government and local-government support payments are created fresh every year and their conditions change often, so instead of searching for them yourself each time, it\'s better to first check an integrated service that automatically finds what matches your situation.',
      },
      {
        type: 'heading',
        text: "Start by checking the support payments you've missed",
      },
      {
        type: 'paragraph',
        text: "Subsidy24 (Gov24 Benefit Finder) finds, in one search, the government support payments and benefits that match your situation — age, household type, income, and so on — so you don't miss them simply from not knowing.",
      },
      {
        type: 'heading',
        text: 'For life-stage welfare services, use Bokjiro',
      },
      {
        type: 'paragraph',
        text: 'Bokjiro (Welfare Portal) lets you search life-stage welfare services — from pregnancy and childbirth to old age — and apply online directly. Entering your age or household situation narrows the results down to just the services that fit.',
      },
      {
        type: 'heading',
        text: "If you're young, also check On-tong Youth",
      },
      {
        type: 'paragraph',
        text: 'For youth-targeted support payments, On-tong Youth (Youth Policy Platform) lets you search nationwide central- and local-government youth policies and payments matched to your conditions. If you\'re a college or graduate student, also check the Korea Student Aid Foundation National Scholarship for income-based tuition support and student loans.',
      },
      {
        type: 'heading',
        text: "Don't forget to claim your card points, too",
      },
      {
        type: 'paragraph',
        text: "It's not a support payment, but unused reward points scattered across your various credit and check cards can also be checked all at once through Integrated Card Point Lookup, where you can cash out even a single point immediately.",
      },
      {
        type: 'services',
        intro: 'Services mentioned in this guide',
        slugs: [
          'subsidy24-benefit-portal',
          'bokjiro-portal',
          'youthcenter-portal',
          'kosaf-scholarship',
          'cardpoint-integrated',
        ],
      },
    ],
  },
  'home-emergency-response-guide': {
    title: 'If a power outage, gas smell, or fire suddenly happens at home',
    summary:
      "Where to report an emergency at home depends on the cause. Here's which emergency number to call for each situation.",
    blocks: [
      {
        type: 'paragraph',
        text: "When an emergency suddenly happens at home, panic makes it confusing to even know who to call. Knowing in advance who to contact for each cause makes your response faster.",
      },
      {
        type: 'heading',
        text: 'If you need fire, rescue, or emergency medical response, call 119',
      },
      {
        type: 'paragraph',
        text: 'For any disaster or emergency — fire, rescue, emergency medical care — contact 119 Emergency Report. It\'s the National Fire Agency\'s main emergency hotline, and the number you should dial first whenever there\'s a risk to human life.',
      },
      {
        type: 'heading',
        text: 'If you suspect a power outage or electrical leakage',
      },
      {
        type: 'paragraph',
        text: 'If the power suddenly goes out or you sense a risk of electrical leakage or shock, call Korea Electrical Safety Corporation Emergency Dispatch (1588-7500). You can request emergency response there for free, 24 hours a day.',
      },
      {
        type: 'heading',
        text: 'If you smell gas',
      },
      {
        type: 'paragraph',
        text: 'If you smell gas or suspect a gas-related accident, call Korea Gas Safety Corporation Emergency Report (1544-4500) right away. Wherever you are in the country, you\'ll be automatically connected to the nearest regional office.',
      },
      {
        type: 'heading',
        text: 'If you spot a hazardous facility',
      },
      {
        type: 'paragraph',
        text: "If you spot a facility or situation that looks hazardous but isn't an accident yet, take a photo and report it through Safety Report (안전신문고), and the responsible agency will handle it.",
      },
      {
        type: 'heading',
        text: 'If you need overall disaster information',
      },
      {
        type: 'paragraph',
        text: 'Disaster text alerts, shelter locations, and what to do can all be checked in one place on the Safe Korea Portal · Safety Stepping Stone.',
      },
      {
        type: 'services',
        intro: 'Services mentioned in this guide',
        slugs: [
          '119-safety-report',
          'kesco-electric-emergency',
          'kgs-gas-emergency',
          'safety-report',
          'safekorea-portal',
        ],
      },
    ],
  },
  'crime-victim-support-guide': {
    title: "If you've been the victim of a crime: from reporting it to psychological support",
    summary:
      "Right after being a victim of crime, you need support for your daily life and mental well-being, not just for filing a report. Here's where to turn, by situation.",
    blocks: [
      {
        type: 'paragraph',
        text: 'Being a victim of crime doesn\'t end with just filing a report. Often your daily life is suddenly thrown into disarray, or trauma lingers afterward. Here\'s where you can get help, by situation.',
      },
      {
        type: 'heading',
        text: "If you're in danger right now, call 112",
      },
      {
        type: 'paragraph',
        text: 'If a crime is happening or just happened, contact 112 Police Emergency Report immediately. Nearby patrol officers will be dispatched based on your location.',
      },
      {
        type: 'heading',
        text: "If you're a victim of sexual violence, domestic violence, or prostitution",
      },
      {
        type: 'paragraph',
        text: "If you want counseling along with medical, investigative, and legal support all in one place, it's best to go to a Sunflower Center. If you urgently need crisis counseling or a referral to a shelter, you can also contact the Women's Emergency Hotline 1366 first.",
      },
      {
        type: 'heading',
        text: 'If the crime has suddenly made your daily life difficult',
      },
      {
        type: 'paragraph',
        text: "If the crime has suddenly left you struggling to make a living, you can get counseling on emergency welfare support from the Ministry of Health and Welfare Call Center 129 (129, no area code).",
      },
      {
        type: 'heading',
        text: "If you're left with trauma from a violent crime",
      },
      {
        type: 'paragraph',
        text: 'Victims and families affected by violent crimes such as murder, robbery, or sexual violence can get free psychological treatment through the Smile Center.',
      },
      {
        type: 'services',
        intro: 'Services mentioned in this guide',
        slugs: [
          'police-112',
          'sunflower-center',
          'women-hotline-1366',
          'welfare-counseling-129',
          'smile-center',
        ],
      },
    ],
  },
};
