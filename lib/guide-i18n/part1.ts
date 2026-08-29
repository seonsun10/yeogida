import type { GuideTranslation } from '@/lib/guides';

export const guideTranslationsEnPart1: Record<string, GuideTranslation> = {
  'night-child-fever': {
    title:
      "When your child suddenly gets sick at night: iCareTok vs. the Moonlight Children's Hospital Finder — which should you use first?",
    summary:
      "A step-by-step guide to what to check first when your child's fever spikes late at night.",
    blocks: [
      {
        type: 'paragraph',
        text: "It's 11 p.m. and your child's forehead is burning up. The pediatrician's office is already closed, and you know the ER wait will be long, so it's hard to know what to do. Rushing straight to the ER, or on the other hand just toughing it out until morning, are both not ideal. Following the order below can cut down on both unnecessary ER visits and excessive waiting.",
      },
      {
        type: 'heading',
        text: 'Step 1 — Check for emergency warning signs first',
      },
      {
        type: 'list',
        items: [
          'Fever accompanied by seizures',
          'Difficulty breathing or blue-tinged lips',
          'Reduced consciousness or unusually limp/listless behavior',
          'Repeated vomiting with nothing eaten, or signs of dehydration',
        ],
      },
      {
        type: 'paragraph',
        text: "If even one of the above applies, there's no time to wait for an online consultation. Call 119 right away or head straight to the nearest emergency room.",
      },
      {
        type: 'heading',
        text: "Step 2 — If it's unclear how serious it is, start with iCareTok",
      },
      {
        type: 'paragraph',
        text: "The most common situation is one where your child has a fever but is still playing and alert, making it hard to tell whether it's an emergency. In that case, the right first step is a consultation through iCareTok (for children age 12 and under), run by the National Medical Center. Enter your child's symptoms and a pediatric/emergency-medicine specialist will review them via photo upload and chat, then tell you what you can do at home and what would call for a hospital visit. It's free, available 24 hours a day, and if you're told you need to go to a hospital now, move on to the next step.",
      },
      {
        type: 'heading',
        text: "Step 3 — If you do need a hospital, check the Moonlight Children's Hospital Finder first",
      },
      {
        type: 'paragraph',
        text: "If your iCareTok consultation concluded that hospital care is needed, or you feel a hospital is the right call from the start, it's better to check the Moonlight Children's Hospital Finder before heading to the ER. These government-designated pediatric hospitals stay open weeknight evenings and some weekends/holidays, so waits are shorter than the ER and you can see a pediatric specialist directly. Select your region on the E-Gen Emergency Medical Portal to see which ones are open right now.",
      },
      {
        type: 'heading',
        text: 'Step 4 — If you just need medicine urgently, look for a late-night pharmacy',
      },
      {
        type: 'paragraph',
        text: "If you don't need a full exam and just urgently need a fever reducer or basic medicine, you can use E-Gen's late-night pharmacy finder to look up pharmacies that are open right now.",
      },
      {
        type: 'services',
        intro: 'Services mentioned in this guide',
        slugs: ['icaretok', 'moonlight-hospital', 'e-gen-night-pharmacy'],
      },
    ],
  },
  'jeonse-contract-checklist': {
    title:
      'What to check before signing a jeonse lease: property register → actual transaction price → HUG guarantee',
    summary:
      'To avoid jeonse (lump-sum deposit lease) fraud, here is the order of what to check before you put your seal on the contract.',
    blocks: [
      {
        type: 'paragraph',
        text: "Every time a jeonse fraud story hits the news, it feels uncomfortably close to home — but when you're actually about to sign a lease, it's hard to know where to start. Rather than just trusting what the licensed real estate agent tells you, checking things yourself in the order below will catch most red flags.",
      },
      {
        type: 'heading',
        text: "Step 1 — Check the landlord's identity and any senior liens on the property register",
      },
      {
        type: 'paragraph',
        text: 'Before you put your seal on the contract, always look up the property register yourself at the Internet Registry Office (Supreme Court). Confirm that the person you are contracting with is the same person listed as the registered owner, and check whether there is a senior mortgage or seizure on the property. If the maximum secured amount of the senior mortgage is close to the sale price, that is a red flag. It is also safer to check the register again on the day of the contract itself, to make sure nothing changed in the meantime.',
      },
      {
        type: 'heading',
        text: 'Step 2 — Use the actual transaction price to work out the jeonse-to-sale ratio',
      },
      {
        type: 'paragraph',
        text: 'Look up recent sale prices for similar-sized units in the same complex on the Ministry of Land, Infrastructure and Transport\'s Real Transaction Price Disclosure System. If the jeonse deposit exceeds 80–90% of the market sale price, the risk of a so-called "deposit-eating" (kkangtong jeonse) lease is high — even a small drop in the home\'s value could make it hard to get your full deposit back if the home goes to auction.',
      },
      {
        type: 'heading',
        text: "Step 3 — There's no reason to delay your move-in registration and fixed date right after signing",
      },
      {
        type: 'paragraph',
        text: "File your move-in registration and get your fixed date the same day you move in — don't put it off. These establish the reference date for your right of opposition and priority repayment right, so even a one-day delay could push you behind another right that gets registered in the meantime.",
      },
      {
        type: 'heading',
        text: "Step 4 — If you're still uneasy, consider HUG's Jeonse Deposit Return Guarantee",
      },
      {
        type: 'paragraph',
        text: "If you've checked the property register and the market price and you're still uneasy, you can sign up for HUG's Jeonse Deposit Return Guarantee. There is a condition that you must enroll before more than half of the contract term has passed, so it's best to check right after you move in. If the landlord doesn't return your deposit at the end of the lease, HUG pays it to you first.",
      },
      {
        type: 'heading',
        text: 'Step 5 — If you want the contract itself to be even safer',
      },
      {
        type: 'paragraph',
        text: "If your real estate agent uses the Real Estate Transaction Electronic Contract System, you can sign the lease electronically instead of using a paper contract and a personal seal. Completing the e-contract automatically files the transaction report and assigns the fixed date, so you don't need a separate trip to the community service center, and the risk of a forged or altered contract is reduced. If you want to use it, first check whether your agent is registered with the system.",
      },
      {
        type: 'heading',
        text: 'Step 6 — If a dispute has already come up',
      },
      {
        type: 'paragraph',
        text: "If you're already in a situation where you can't get your deposit back, you can apply for free mediation with the Housing Lease Dispute Mediation Committee before going to court.",
      },
      {
        type: 'services',
        intro: 'Services mentioned in this guide',
        slugs: [
          'iros-registry',
          'real-transaction-price',
          'hug-jeonse-guarantee',
          'irts-econtract',
          'housing-dispute-mediation',
        ],
      },
    ],
  },
  'debt-relief-options': {
    title:
      'When debt becomes unmanageable: Credit Counseling and Recovery Service vs. personal rehabilitation vs. the Korea Inclusive Finance Agency',
    summary:
      "When you're struggling to repay debt owed to multiple places, here's where to turn first depending on your situation.",
    blocks: [
      {
        type: 'paragraph',
        text: "When debt becomes unmanageable, the hardest part is often just not knowing who to call. Before you get tempted by private-lender ads, here is the order of public channels that can actually help, organized by situation.",
      },
      {
        type: 'heading',
        text: "If you're not delinquent yet, but need emergency living expenses",
      },
      {
        type: 'paragraph',
        text: "If your credit score is too low for a bank loan but you're not yet delinquent, start by checking policy-backed low-income financial products from the Korea Inclusive Finance Agency, such as Sunshine Loan and Miso Finance. Check whether you qualify before resorting to a private lender.",
      },
      {
        type: 'heading',
        text: 'If you owe debt to multiple places and repayment is already overwhelming',
      },
      {
        type: 'paragraph',
        text: 'If you are struggling to repay debt owed to several financial companies on schedule, get debt-adjustment counseling from the Credit Counseling and Recovery Service. If you are not yet delinquent, or delinquent 30 days or less, you qualify for Fast-Track Debt Adjustment; 31–89 days gets Pre-Workout (pre-workout debt adjustment); 90 days or more gets Individual Workout. The interest reduction and repayment period vary depending on how long you have been delinquent, and Individual Workout onward also allows partial principal forgiveness. It is a public process handled without litigation, and a single phone call (1600-5500) is enough to be guided to the program that fits your delinquency status.',
      },
      {
        type: 'paragraph',
        text: 'Individual Workout offers especially large reductions. Depending on your repayment capacity, you can have up to 70% of principal forgiven (up to 90% for socially vulnerable groups), and repay unsecured debt over as long as 10 years, or secured debt over as long as 35 years. Debt collection stops starting the day after you apply, so if you are currently being hounded by collectors, simply applying for counseling can put out the immediate fire.',
      },
      {
        type: 'heading',
        text: "If you don't even know where to start looking",
      },
      {
        type: 'paragraph',
        text: 'If you cannot tell whether you need policy funding, debt adjustment, or personal rehabilitation, you can just call the Regional Financial Welfare Center (Financial Welfare Call Center 1397) first. Run by the Korea Inclusive Finance Agency, it guides you through everything from policy-fund counseling like Miso Finance and Sunshine Loan, to Credit Counseling and Recovery Service debt adjustment, to referrals for personal rehabilitation and bankruptcy, all in one call.',
      },
      {
        type: 'heading',
        text: 'If you have no income or your debt is too large even for adjustment',
      },
      {
        type: 'paragraph',
        text: 'If your debt is too large to resolve even through Credit Counseling and Recovery Service adjustment, or you have no income at all, you will need to look into personal rehabilitation or bankruptcy through the courts. These procedures are often difficult to handle without a lawyer, but if your income is low, the Korea Legal Aid Corporation can help you prepare documents and file for free.',
      },
      {
        type: 'heading',
        text: 'To sum up the order',
      },
      {
        type: 'list',
        items: [
          'Not delinquent yet, need emergency cash → check policy funding at the Korea Inclusive Finance Agency first',
          'Already delinquent on multiple debts → get debt-adjustment counseling from the Credit Counseling and Recovery Service',
          'Too severe even for adjustment → personal rehabilitation/bankruptcy counseling through the Korea Legal Aid Corporation',
        ],
      },
      {
        type: 'paragraph',
        text: 'If you don\'t know where to begin, it is fine to just start by calling the Credit Counseling and Recovery Service for counseling — they will direct you to whichever agency actually fits your situation during the call. Be careful of private companies that contact you first saying "we\'ll help sort out your debt," or anyone demanding a fee — those are not public agencies.',
      },
      {
        type: 'services',
        intro: 'Services mentioned in this guide',
        slugs: [
          'kinfa-microfinance',
          'ccrs-credit-recovery',
          'credit-counseling-workout',
          'kinfa-counseling-center',
          'legal-aid-corporation-132',
        ],
      },
    ],
  },
  'unemployment-benefit-steps': {
    title:
      'What to do first after quitting: the unemployment benefit application order, and easy-to-miss pitfalls',
    summary:
      "Quitting your job doesn't mean unemployment benefits show up automatically. Here's the order and conditions to check before you apply.",
    blocks: [
      {
        type: 'paragraph',
        text: 'Many people look into unemployment benefits right after leaving a job, but not knowing the correct application order often delays things by weeks — or causes people to miss eligibility entirely. Checking things in the order below can save you wasted trips.',
      },
      {
        type: 'heading',
        text: 'Step 1 — First check your reason for leaving',
      },
      {
        type: 'paragraph',
        text: "Unemployment benefits (job-seeking benefits) are, in principle, for people who left involuntarily — for reasons on the company's side, such as recommended resignation, contract expiration, or business closure. Even if you resigned voluntarily, you may still qualify if a legally recognized justifiable reason applies — illness, childcare, a difficult commute, unpaid wages, and so on — so if your reason for leaving is ambiguous, check first rather than giving up.",
      },
      {
        type: 'heading',
        text: "Step 2 — Check whether your employer has submitted the separation confirmation",
      },
      {
        type: 'paragraph',
        text: 'Your unemployment benefit application can only proceed once your employer files the employment insurance loss report and the separation confirmation. After you leave, you can check the processing status on Work24; if it hasn\'t been processed after a while, you can request it from your employer or contact the Ministry of Employment and Labor Customer Counseling Center (1350) to follow up.',
      },
      {
        type: 'heading',
        text: 'Step 3 — Register as a job seeker and apply for benefit eligibility on Work24',
      },
      {
        type: 'paragraph',
        text: 'Register as a job seeker on Work24 (the integrated service that replaced the old Worknet and Employment Insurance sites), and complete the online training for benefit applicants first. After finishing the training, you need to visit your local employment center (or complete some steps online) to apply for benefit eligibility recognition before the actual payment review begins.',
      },
      {
        type: 'heading',
        text: 'Step 4 — Also check that your four major social insurances are properly settled',
      },
      {
        type: 'paragraph',
        text: "You can check on Work24 whether your employer properly filed the employment insurance loss report, but for your full enrollment history and premium records across all four major social insurances — national pension, health insurance, employment insurance, and industrial accident insurance — the Four Major Social Insurance Information Linkage Center, jointly run by the National Pension Service, National Health Insurance Service, and Korea Workers' Compensation and Welfare Service, lets you check everything at once and issue proof-of-enrollment certificates if needed.",
      },
      {
        type: 'heading',
        text: "Step 5 — If anything is unclear, ask 1350 first",
      },
      {
        type: 'paragraph',
        text: "If you're unsure whether your reason for leaving qualifies, your separation confirmation is delayed, or the application process is confusing, calling the Ministry of Employment and Labor Customer Counseling Center (1350) to explain your situation before visiting your local employment center is the more time-efficient approach.",
      },
      {
        type: 'services',
        intro: 'Services mentioned in this guide',
        slugs: [
          'work24-portal',
          'four-insurance-portal',
          'moel-labor-counsel-1350',
          'kua-employment-support',
        ],
      },
    ],
  },
  'inheritance-procedure-steps': {
    title:
      'When a family member passes away: the order from checking the estate to filing the report',
    summary:
      "Even amid grief, there are inheritance-related deadlines that cost you if missed. Here's what to check first.",
    blocks: [
      {
        type: 'paragraph',
        text: "Right after losing a family member, there's no headspace left for inheritance procedures — but some of these have deadlines that are hard to undo if missed. Without taking time away from grieving, here is, at minimum, what needs to be done by when, laid out in order.",
      },
      {
        type: 'heading',
        text: 'Step 1 — Look up the estate in one go with the Safe Inheritance One-Stop Service',
      },
      {
        type: 'paragraph',
        text: "Instead of hunting down every bank account, property, vehicle, unpaid or refundable tax, and pension enrollment record in the deceased's name one by one, you can request them all at once through the Safe Inheritance One-Stop Service. You can apply together with the death report at the community service center, or apply online through Gov24. Figuring out the size of the estate is the first thing to do, since it determines how you'll handle the next step (simple acceptance, qualified acceptance, or renunciation).",
      },
      {
        type: 'heading',
        text: 'Step 2 — If the debt might exceed the assets, mind the 3-month deadline',
      },
      {
        type: 'paragraph',
        text: "If the lookup shows the deceased's debts exceed the assets, or the size is unclear, you must apply to family court for renunciation of inheritance or qualified acceptance within 3 months of the date you learned of the death (the start of inheritance). Miss this deadline and it's automatically treated as simple acceptance — meaning you inherit the debt along with everything else — so if the estate lookup result is ambiguous, it's safer to move quickly.",
      },
      {
        type: 'heading',
        text: 'Step 3 — Also check what you may be entitled to, such as a survivor pension',
      },
      {
        type: 'paragraph',
        text: "If the deceased was enrolled in the National Pension, you can check whether you qualify for a survivor pension through the National Pension Service Customer Center (1355). It's easy to forget that inheritance isn't only about handling debt — it's also about claiming benefits the bereaved family may be owed.",
      },
      {
        type: 'heading',
        text: 'Step 4 — Mind the inheritance tax filing deadline',
      },
      {
        type: 'paragraph',
        text: 'If the inherited estate exceeds a certain size, you must file the inheritance tax through Hometax (National Tax Service) within 6 months of the last day of the month in which the inheritance began, to avoid a penalty surcharge. If the estate is not large, you may owe no tax at all within the deduction limits — so it is a good idea to check whether you are even required to file, through Hometax counseling or a tax professional.',
      },
      {
        type: 'services',
        intro: 'Services mentioned in this guide',
        slugs: ['safe-inheritance-onestop', 'nps-pension-1355', 'hometax-nts'],
      },
    ],
  },
  'car-accident-response-steps': {
    title:
      'When you are in a car accident: from on-the-scene steps to disputing the fault ratio',
    summary:
      'Easy-to-miss steps right after a crash, and how to dispute your fault ratio for free if you disagree with it.',
    blocks: [
      {
        type: 'paragraph',
        text: 'A car accident is disorienting for anyone, so knowing the order of what to do at the scene ahead of time can spare you a lot of unfair outcomes later.',
      },
      {
        type: 'heading',
        text: 'Step 1 — People first, then documentation',
      },
      {
        type: 'paragraph',
        text: "If anyone is injured, call 112 or 119 immediately before anything else. Once the scene is safe, take photos and video of the accident scene, the vehicle damage, and the state of the traffic lights/lane markings, and get the other party's contact information and insurer. This record becomes decisive evidence later if you need to dispute the fault ratio.",
      },
      {
        type: 'heading',
        text: "Step 2 — If you disagree with your insurer's fault ratio, don't just let it go",
      },
      {
        type: 'paragraph',
        text: "If you find it hard to accept the fault ratio your insurer proposed, you don't have to accept it as final. You can't apply directly as the party involved, but if you raise an objection and request a re-review with your own insurer, they will submit it for free review to the Motor Vehicle Accident Fault Ratio Dispute Review Committee, run under the Korea Non-Life Insurance Association. Expert reviewers re-examine the case using evidence like dashcam footage and photos — many people don't realize this is a way to get the ratio reassessed without going to court.",
      },
      {
        type: 'heading',
        text: 'Step 3 — If you need more information on the other vehicle or accident-confirmation documents',
      },
      {
        type: 'paragraph',
        text: "If you need an accident confirmation document or the other vehicle's traffic violation history for insurance processing or legal action, you can handle the relevant civil petition through the Korean National Police Agency's Traffic Civil Petition 24 (eFine). If a vehicle defect is suspected as the cause of the accident, you can also check the Motor Vehicle Recall Center for any recall history on that model.",
      },
      {
        type: 'heading',
        text: 'Step 4 — If the at-fault driver is uninsured or fled the scene',
      },
      {
        type: 'paragraph',
        text: 'If the at-fault vehicle has no insurance at all, or fled the scene so you don\'t even know who it was, there is no insurer to file a claim against. For situations like this, the government runs a separate Motor Vehicle Damage Compensation Guarantee Program (Government Guarantee Program) that pays victims a minimum level of compensation directly. If you were injured in a hit-and-run or uninsured-vehicle accident, checking this program first can help you recover at least some of your treatment costs and losses.',
      },
      {
        type: 'services',
        intro: 'Services mentioned in this guide',
        slugs: [
          'knia-fault-ratio',
          'efine-traffic-portal',
          'car-recall-center',
          'auto-accident-gov-compensation',
        ],
      },
    ],
  },
  'mental-health-crisis-contacts': {
    title: 'Struggling emotionally? Who to call first: a crisis-counseling order',
    summary:
      "Where to turn depends on whether you're in immediate danger right now or need ongoing support.",
    blocks: [
      {
        type: 'paragraph',
        text: "When you're struggling emotionally, not knowing who to call often means people just endure it alone until things get worse. It helps to sort out where to reach based on how urgent your situation is right now.",
      },
      {
        type: 'heading',
        text: "If you feel you're in immediate danger right now",
      },
      {
        type: 'paragraph',
        text: "If you're having thoughts of self-harm or suicide, or feel you can't go another moment without talking to someone, call the Mental Health Crisis Counseling Line at 109. Since January 2024, the former Suicide Prevention Counseling Line and the Mental Health Counseling Line (1577-0199) have been merged into this single number, 109, so whether it's a suicide/self-harm crisis or a general mental health concern like depression or anxiety, the same number connects you. It runs free, 24 hours a day; you're connected to a counselor the moment you call, and emergency dispatch can be arranged if needed.",
      },
      {
        type: 'heading',
        text: "If you're a teenager",
      },
      {
        type: 'paragraph',
        text: 'If you are a teen struggling with problems at school, with friends, or at home, Youth Counseling 1388 may be a better fit. Beyond phone calls, text and KakaoTalk counseling are also available, making it easier to reach out if a phone call feels intimidating.',
      },
      {
        type: 'heading',
        text: "If it's not a crisis, but you need ongoing support",
      },
      {
        type: 'paragraph',
        text: "If it's not an emergency but you've been dealing with ongoing depression or anxiety, you can find your nearest mental health welfare center or counseling service through the National Mental Health Portal, which also offers self-assessment tools and information organized by condition.",
      },
      {
        type: 'heading',
        text: "If you're a young adult and counseling costs are a concern",
      },
      {
        type: 'paragraph',
        text: 'If you want professional psychological counseling but cost is holding you back, check whether you qualify for the Youth Mental Health Voucher Support Program, which covers part of the counseling fee. Eligibility and conditions change slightly each year, so check the latest announcement before applying.',
      },
      {
        type: 'services',
        intro: 'Services mentioned in this guide',
        slugs: [
          'mental-health-crisis-109',
          'youth-counsel-1388',
          'mentalhealth',
          'youth-mental-health-voucher',
        ],
      },
    ],
  },
  'moving-admin-checklist': {
    title:
      'Easy-to-miss admin after moving: from move-in registration to lease reporting',
    summary:
      "Finishing the move but putting off the paperwork can cost you a fine. Here's what to handle right after you move in.",
    blocks: [
      {
        type: 'paragraph',
        text: "Moving isn't done once the boxes are unpacked. Some administrative procedures carry a fine or a loss of legal protection if you don't handle them within days — and it's common to put them off because you're busy, and then miss the deadline.",
      },
      {
        type: 'heading',
        text: "Step 1 — Don't delay your move-in registration",
      },
      {
        type: 'paragraph',
        text: 'You must file a move-in registration within 14 days of moving into a new residence. You can do this online through Gov24; if you are a tenant, it is safer to get your fixed date the same day as your move-in registration. Missing the deadline can result in a fine, and for a jeonse or monthly-rent lease, it also delays when your right of opposition takes effect.',
      },
      {
        type: 'heading',
        text: 'Step 2 — Check whether you owe a lease report, depending on your deposit size',
      },
      {
        type: 'paragraph',
        text: 'If your deposit or monthly rent exceeds a certain amount, you must file a lease report (housing lease contract report) within 30 days of the contract date. You can report it online through the Real Estate Transaction Management System, and filing it also automatically assigns you a fixed date — so you no longer need to get one separately.',
      },
      {
        type: 'heading',
        text: 'Step 3 — Other things to check since your address has changed',
      },
      {
        type: 'list',
        items: [
          'If you own a car, update the address on your vehicle registration',
          'Update your address with mail-forwarding services and various institutions (banks, telecom carriers, etc.)',
          'Check whether your local government offers move-in-related support (such as relocation incentives), since this varies by municipality',
        ],
      },
      {
        type: 'services',
        intro: 'Services mentioned in this guide',
        slugs: ['gov24-portal', 'rtms-lease-report'],
      },
    ],
  },
  'online-shopping-scam-response': {
    title:
      'Scammed while shopping online or refused a refund? From the 1372 Counseling Center to dispute mediation',
    summary:
      "When you've paid but the item never arrives, or you're refused a refund, here's where to ask for help, and in what order, to actually get your money back.",
    blocks: [
      {
        type: 'paragraph',
        text: 'As online shopping has grown, so has the number of cases where a seller goes silent after payment or refuses a refund. Rather than venting in a review out of anger, following the steps below significantly improves your odds of actually getting your money back.',
      },
      {
        type: 'heading',
        text: 'Step 1 — Secure your evidence first',
      },
      {
        type: 'list',
        items: [
          'Screenshot your payment/transfer records',
          'Screenshot your conversation with the seller (order confirmation, refund refusal, etc.)',
          'Screenshot the product listing page — sites suspected of fraud often take the page down right after being reported',
        ],
      },
      {
        type: 'heading',
        text: 'Step 2 — Get counseling from the 1372 Consumer Counseling Center first',
      },
      {
        type: 'paragraph',
        text: 'Call 1372 (no area code needed) and you will be automatically connected to your regional consumer counseling center; you can also apply for counseling and remedy online through the website. It is a public channel run by the Korea Consumer Agency, and goes beyond simple counseling to support dispute mediation with the business as well.',
      },
      {
        type: 'heading',
        text: 'Step 3 — If the problem is with online payment/e-commerce processing itself, the Electronic Commerce Dispute Mediation Committee',
      },
      {
        type: 'paragraph',
        text: 'If the issue lies in how an online store handles payment or refunds itself, you can request mediation from the Electronic Commerce Dispute Mediation Committee, run by the Korea Internet & Security Agency (KISA). You can get an initial consultation through the automated consultation service on their website, submit a mediation request online, or file through Consumer24.',
      },
      {
        type: 'heading',
        text: 'Step 4 — For disputes over games, webtoons, or streaming payments, the Content Dispute Mediation Committee',
      },
      {
        type: 'paragraph',
        text: 'If your dispute involves in-game item purchases, loot-box-style items, or content purchases like webtoons or music, the Content Dispute Mediation Committee is the better fit. It is organized into four divisions — games, edutainment, broadcasting/video, and publishing/music/performance — each staffed with specialized mediators, and you can also reach them by phone at their call center (1588-2594).',
      },
      {
        type: 'services',
        intro: 'Services mentioned in this guide',
        slugs: ['consumer-counsel-1372', 'ecmc-dispute', 'kcdrc-content-dispute'],
      },
    ],
  },
};
