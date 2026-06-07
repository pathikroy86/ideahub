const ShareIdeasIcon = () => (
  <svg aria-hidden="true" className="h-10 w-10" fill="none" viewBox="0 0 40 40">
    <circle cx="14" cy="14" r="6" fill="#a78bfa" />
    <circle cx="26" cy="12" r="5" fill="#8b5cf6" />
    <circle cx="22" cy="24" r="4.5" fill="#c4b5fd" />
    <path
      d="M14 20v4c0 4 3 6 8 6h2"
      stroke="#7c3aed"
      strokeLinecap="round"
      strokeWidth="2"
    />
  </svg>
);

const CollaborateIcon = () => (
  <svg aria-hidden="true" className="h-10 w-10" fill="none" viewBox="0 0 40 40">
    <circle cx="15" cy="14" r="5" fill="#60a5fa" />
    <circle cx="27" cy="14" r="5" fill="#3b82f6" />
    <path
      d="M10 28c0-4 3.5-7 8-7h4c4.5 0 8 3 8 7"
      stroke="#2563eb"
      strokeLinecap="round"
      strokeWidth="2"
    />
  </svg>
);

const FeedbackIcon = () => (
  <svg aria-hidden="true" className="h-10 w-10" fill="none" viewBox="0 0 40 40">
    <path
      d="M8 12c0-3 2.5-5 6-5h12c3.5 0 6 2 6 5v8c0 3-2.5 5-6 5h-8l-6 5v-5c-2 0-4-2-4-5v-8z"
      fill="#4ade80"
    />
    <circle cx="16" cy="18" r="1.5" fill="#166534" />
    <circle cx="20" cy="18" r="1.5" fill="#166534" />
    <path
      d="M16 22c1.2 1 2.8 1 4 0"
      stroke="#166534"
      strokeLinecap="round"
      strokeWidth="1.5"
    />
  </svg>
);

const GrowTogetherIcon = () => (
  <svg aria-hidden="true" className="h-10 w-10" fill="none" viewBox="0 0 40 40">
    <path
      d="M8 28h24"
      stroke="#fdba74"
      strokeLinecap="round"
      strokeWidth="2"
    />
    <path
      d="M12 24l6-8 5 5 7-10"
      stroke="#f97316"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2.5"
    />
    <circle cx="30" cy="11" r="3" fill="#fb923c" />
  </svg>
);

const features = [
  {
    title: "Share Ideas",
    description: "Post your startup ideas and get feedback.",
    icon: ShareIdeasIcon,
  },
  {
    title: "Collaborate",
    description: "Engage with like-minded people and build together.",
    icon: CollaborateIcon,
  },
  {
    title: "Get Feedback",
    description: "Receive constructive feedback from the community.",
    icon: FeedbackIcon,
  },
  {
    title: "Grow Together",
    description: "Refine your ideas and turn them into reality.",
    icon: GrowTogetherIcon,
  },
];

const WhyIdeaHub = () => {
  return (
    <section className="container mx-auto mt-5 px-8 py-5 md:mt-8">
      <h2 className="mb-5 text-2xl font-bold text-slate-950 md:text-3xl">
        Why IdeaVault?
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {features.map(({ title, description, icon: Icon }) => (
          <article
            key={title}
            className="flex items-start gap-4 rounded-lg bg-white p-5 shadow-md"
          >
            <div className="shrink-0">
              <Icon />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-950">{title}</h3>
              <p className="text-sm leading-relaxed text-slate-500">{description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default WhyIdeaHub;
