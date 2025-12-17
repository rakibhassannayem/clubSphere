const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Discover Clubs",
      desc: "Browse hundreds of local clubs based on your interests, from photography to hiking to book clubs.",
      icon: "🔍",
      color: "bg-gradient-to-br from-primary/50 to-emerald-400",
    },
    {
      id: 2,
      title: "Join & Connect",
      desc: "Sign up for free or paid memberships and instantly connect with like-minded community members.",
      icon: "👤+",
      color: "bg-gradient-to-br from-orange-200 to-orange-400",
    },
    {
      id: 3,
      title: "Attend Events",
      desc: "Register for exciting events, workshops, and meetups organized by your clubs.",
      icon: "📅",
      color: "bg-gradient-to-br from-purple-400 to-indigo-500",
    },
    {
      id: 4,
      title: "Build Community",
      desc: "Create lasting friendships, share experiences, and grow together with your club family.",
      icon: "❤️",
      color: "bg-gradient-to-br from-teal-400 to-orange-400",
    },
  ];
  return (
    <div className="container mx-auto">
      <div className="text-center mt-3 mb-10">
        <p className="font-bold text-lg text-primary">Simple Process</p>
        <h1 className="text-secondary text-4xl font-bold my-2">
          How ClubSphere Works
        </h1>
        <p className="text-accent">
          Get started in minutes. Find your community and start connecting with
          amazing people today.
        </p>
      </div>

      <div className="relative flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-100 -z-10" />

        {steps.map((step) => (
          <div
            key={step.id}
            className="flex flex-col items-center text-center flex-1"
          >
            {/* Step Number & Icon */}
            <div className="relative mb-6">
              {/* Small Number Badge */}
              <div className="absolute -top-4 -left-8 w-8 h-8 border-2 text-primary rounded-full flex items-center justify-center font-bold">
                {step.id}
              </div>

              {/* Icon Box */}
              <div
                className={`w-24 h-24 rounded-2xl flex items-center justify-center text-3xl text-white shadow-xl ${step.color}`}
              >
                <span className="drop-shadow-md">{step.icon}</span>
              </div>
            </div>

            {/* Text Content */}
            <h3 className="text-xl font-bold text-secondary mb-3">
              {step.title}
            </h3>
            <p className="text-accent text-sm leading-relaxed px-2">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
