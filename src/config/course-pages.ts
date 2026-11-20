// One page per course (21 Nov 2026, Dr. Brancken: "it must explain exactly what is in the course").
// Every line here comes from the course's own table of contents and lessons. Do not promise anything a lesson does not teach.

export type CoursePage = {
  slug: string;              // the address: /shop/how-to-make-a-website/<slug>
  productId: string;         // matches courseProducts in products.ts (price, picture, buy link)
  number: string;            // "Course 1"
  title: string;             // the heading
  tagline: string;           // one line under the heading
  intro: string;             // what this course is, in two or three sentences
  icon: string;
  achieve: { icon: string; t: string; p: string }[];   // what it helps you achieve
  lessons: { t: string; p: string }[];                 // the 10 parts, in plain words
  youHave: string[];         // what you will have at the end
  goodToKnow: { time: string[]; cost: string[]; need: string[] };
};

export const coursePages: CoursePage[] = [
  {
    slug: "church-management-system",
    productId: "htmaw-course-1",
    number: "Course 1",
    title: "Church Management System on Google",
    tagline: "Your church office, automated.",
    intro:
      "Build your own church management system from Google's tools, step by step. Every visitor is recorded and followed up, birthdays are remembered, group emails go out with each person's name, and your records are backed up, all by themselves. On a free Gmail account there are no monthly fees.",
    icon: "users",
    achieve: [
      { icon: "users", t: "Never lose a visitor again", p: "When someone fills in a form, they are added to your People list, a follow-up is assigned to the right person, and they get a thank-you email. Late follow-ups send a reminder." },
      { icon: "gift", t: "Birthdays remembered for you", p: "Every morning, everyone with a birthday gets a warm birthday email from the church, with your picture at the top. Nobody is forgotten." },
      { icon: "mail", t: "Email a group in one go", p: "Write one email to your Members, Youth or Newsletter group. Each person is greeted by their own name, and anyone who unsubscribes is taken off automatically." },
      { icon: "shield", t: "Safe, private and backed up", p: "Church email accounts with 2-step verification, private folders for pastoral care, sharing checks, and an automatic backup every two weeks." },
      { icon: "monitor", t: "One dashboard for your team", p: "A private login page where your team can see people, groups, forms and follow-ups, add or edit a person, and send a group email." },
      { icon: "lock", t: "No monthly fees", p: "Built only from Google's tools. On a free Gmail account it costs nothing to run, and it grows with your church." },
    ],
    lessons: [
      { t: "What we are building", p: "A tour of the finished system, and whether you need Google Workspace (many registered churches can get it free)." },
      { t: "Church accounts and 2-step verification", p: "Church email accounts and role addresses such as office@, kept safe with a second sign-in step." },
      { t: "Tidy Google Drive folders", p: "One clear folder layout for forms, responses, private pastoral care, pictures and backups." },
      { t: "Online forms", p: "Forms for new visitors, baptisms, groups and events, each saving its answers in a sheet." },
      { t: "People list, follow-ups and groups", p: "Your People list, your follow-up list, and Google Contacts labels that become your groups." },
      { t: "Your first script: copy, paste, allow", p: "No coding. You copy our ready-made scripts, paste them in, and click Allow." },
      { t: "The automations", p: "Visitor follow-ups and thank-you emails, birthday emails, group emails and automatic backups switched on." },
      { t: "Your team's dashboard", p: "The private login page for your team, and who may open it." },
      { t: "A short web address (optional)", p: "An easy address for the dashboard, such as admin.yourchurch.org." },
      { t: "Security and the weekly routine", p: "Sharing checks, keeping things safe, and the 10-minute weekly routine that keeps it all running." },
    ],
    youHave: [
      "Church email accounts, safe with 2-step verification",
      "Online forms for visitors, baptisms, groups and events",
      "Every person in one People list, added by themselves",
      "A follow-up list, with reminders when a follow-up is late",
      "Automatic thank-you emails and birthday emails",
      "Group emails, each person greeted by name, with unsubscribes handled",
      "Automatic backups",
      "A private dashboard for your team",
    ],
    goodToKnow: {
      time: ["About 5 to 7 hours of work", "10 short lessons, each with a video and a printable guide"],
      cost: ["Google's tools: no charge on a free Gmail account", "Google Workspace: optional (Lesson 1 helps you decide)", "A short web address for the dashboard: optional"],
      need: ["A computer with the Chrome browser", "A phone that can receive text messages", "Claude (the Start Here lessons set it up)"],
    },
  },
  {
    slug: "website-and-app",
    productId: "htmaw-course-2",
    number: "Course 2",
    title: "Build Your Own Professional Website + App",
    tagline: "Your own address, your own design, your own app.",
    intro:
      "Build a professional church website on your own web address, step by step. It is also an app: people add it to their phone's home screen, with no app store needed. You start from our ready-made church website and make it yours, and you edit it yourself in your browser, with no code.",
    icon: "monitor",
    achieve: [
      { icon: "link", t: "Your own web address", p: "Buy your own domain (for example yourchurch.org) and put your site on it, with the padlock that tells visitors it is safe." },
      { icon: "smartphone", t: "A website that is also an app", p: "People save it to their phone's home screen and it opens like an app. No Apple or Google app store, and no extra cost." },
      { icon: "sparkles", t: "Your design, your words", p: "Your church's name, colours, logo, photos and pages. A calm design that looks good on every phone and computer." },
      { icon: "play", t: "Sermons and events", p: "Sermons and videos appear by themselves from YouTube. Service times, a map, events and giving details." },
      { icon: "mail", t: "Forms that reach your inbox", p: "Contact and prayer forms send messages straight to your church inbox, with a human check that keeps spam out." },
      { icon: "chart", t: "Fast and safe", p: "Built to score highly on Google's speed test on a phone, with email protection and a security check before launch." },
    ],
    lessons: [
      { t: "How a website works", p: "The simple picture of how a website works, and saving your logins safely." },
      { t: "Your own web address", p: "Buy a domain at Cloudflare, in an account the church owns." },
      { t: "GitHub", p: "A safe home for your website's files." },
      { t: "Copy the ready-made church website", p: "Your own copy of our sample church site, ready to change." },
      { t: "Your site goes online", p: "Put it online with Vercel and open it on your phone." },
      { t: "Make it yours", p: "Your church's name, details, colours and logo." },
      { t: "Pages, photos, sermons, events and giving", p: "Your own words and photos, your sermons, events, map and giving details." },
      { t: "Connect your web address", p: "Your site on your own domain, with the padlock." },
      { t: "Contact and prayer forms", p: "Messages arriving in your church inbox, with robots kept out." },
      { t: "Protect and launch", p: "Email protection, a security check and the launch checklist." },
    ],
    youHave: [
      "Your own web address with the padlock",
      "A professional website in your colours, with day and night mode",
      "An app people add to their phone's home screen",
      "Service times, map, and events with \"add to my calendar\"",
      "Sermons and videos that appear by themselves from YouTube",
      "Contact and prayer forms that keep spam out",
      "A site you edit yourself in your browser, with no code",
    ],
    goodToKnow: {
      time: ["About 6 to 8 hours of work", "Your website can be online within the first day or two"],
      cost: ["Your web address: usually about US$10 to US$15 a year", "Hosting: free for a church or personal website at the time we made this course; a business needs the host's paid plan", "Everything else the course uses: no charge"],
      need: ["A computer with Chrome, Edge, Firefox or Safari", "Claude (the Start Here lessons set it up)"],
    },
  },
  {
    slug: "market-yourself-online",
    productId: "htmaw-course-3",
    number: "Course 3",
    title: "Market Yourself Online",
    tagline: "Get found, and get out there.",
    intro:
      "Put up the signs so people can find you: on Google and Bing, on Google Maps, in the AI assistants people ask for advice, on social media, in podcast apps and on their phones. Step by step, so your website and your church are seen.",
    icon: "search",
    achieve: [
      { icon: "search", t: "Found on Google and Bing", p: "Your site listed and checked in Google Search Console and Bing, so people searching for a church near them find you." },
      { icon: "sparkles", t: "Understood by AI search", p: "Help AI assistants such as ChatGPT and Claude understand who you are and recommend you." },
      { icon: "map", t: "On Google Maps", p: "A Google Business Profile and local directory listings, so you show up on maps with your times and address." },
      { icon: "share", t: "Social media, linked up", p: "Facebook, Instagram and YouTube accounts opened properly and linked to your website." },
      { icon: "play", t: "Sermons and a podcast", p: "YouTube sermons on your site, and your own podcast on Spotify and Apple Podcasts." },
      { icon: "bell", t: "Notifications on phones", p: "People who choose to can get notifications on their phones, for example for new sermons and announcements." },
    ],
    lessons: [
      { t: "How people find a church online", p: "Where people look today, and the plan for this course." },
      { t: "Google Search Console and Bing", p: "Get your site listed and checked on Google and Bing." },
      { t: "AI search", p: "Help ChatGPT, Claude and other AI assistants understand and recommend you." },
      { t: "Google Business Profile and directories", p: "Show up on Google Maps and in local directories." },
      { t: "Open your social media accounts", p: "Facebook, Instagram, YouTube and more, set up the right way." },
      { t: "Link social media to your website", p: "Your accounts and your website pointing to each other." },
      { t: "YouTube sermons on your site", p: "Your sermons on YouTube, showing on your website by themselves." },
      { t: "Podcasts", p: "Your own podcast on Spotify and Apple Podcasts." },
      { t: "Copyright and free images", p: "Permissions, and where to find free images, icons, fonts and music." },
      { t: "Notifications and keeping it running", p: "Phone notifications, offers for registered nonprofits, and a simple monthly routine." },
    ],
    youHave: [
      "Your site on Google, Bing and Google Maps",
      "Help for AI assistants to understand your church",
      "Facebook, Instagram and YouTube linked to your website",
      "Sermons on YouTube, showing on your site",
      "A podcast on Spotify and Apple Podcasts",
      "Notifications on people's phones, that they choose",
      "A monthly routine that keeps it all working",
    ],
    goodToKnow: {
      time: ["About 6 to 8 hours of work", "Plus a few days to two weeks of waiting while Google and others check your listings"],
      cost: ["The services this course uses: no charge for what the course uses", "Optional extras are explained before you choose them"],
      need: ["Your website from Course 2 (or another website you can edit)", "Claude (the Start Here lessons set it up)"],
    },
  },
];

export const coursePageFor = (productId: string) => coursePages.find((c) => c.productId === productId);
