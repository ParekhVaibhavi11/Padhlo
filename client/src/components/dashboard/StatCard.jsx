const StatCard = ({
  title,
  value,
  icon,
  color = "violet",
}) => {

  const colors = {
    violet: {
      gradient: "from-violet-500 to-purple-600",
      light: "bg-violet-50",
      icon: "text-violet-600",
      ring: "ring-violet-100",
    },
    blue: {
      gradient: "from-sky-500 to-blue-600",
      light: "bg-blue-50",
      icon: "text-blue-600",
      ring: "ring-blue-100",
    },
    green: {
      gradient: "from-green-500 to-emerald-600",
      light: "bg-green-50",
      icon: "text-green-600",
      ring: "ring-green-100",
    },
    orange: {
      gradient: "from-orange-500 to-amber-500",
      light: "bg-orange-50",
      icon: "text-orange-600",
      ring: "ring-orange-100",
    },
  };

  const theme = colors[color];

  return (

    <div
      className="
      group
      bg-white
      rounded-3xl
      border
      border-slate-200
      p-6
      shadow-sm
      hover:shadow-xl
      hover:-translate-y-1
      transition-all
      duration-300
      "
    >

      <div className="flex justify-between items-start">

        <div>

          <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            {title}
          </p>

          <h2 className="mt-4 text-5xl font-bold text-slate-900">
            {value}
          </h2>

          <div className="mt-6 flex items-center gap-2">

            <span className="w-2 h-2 rounded-full bg-green-500"></span>

            <span className="text-xs text-slate-500">
              Live Data
            </span>

          </div>

        </div>

        <div
          className={`
          w-16
          h-16
          rounded-2xl
          bg-gradient-to-br
          ${theme.gradient}
          flex
          items-center
          justify-center
          shadow-lg
          group-hover:rotate-6
          transition-all
          duration-300
          `}
        >

          <div className="text-white">

            {icon}

          </div>

        </div>

      </div>

    </div>

  );

};

export default StatCard;