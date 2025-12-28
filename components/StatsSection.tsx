import { Building2, Users, Award, LifeBuoy } from "lucide-react";

export default function StatsSection() {
  const stats = [
    { icon: Building2, value: "50+", label: "Active Organizations", iconColor: "text-indigo-400" },
    { icon: Users, value: "25K+", label: "People Served", iconColor: "text-emerald-400" },
    { icon: Award, value: "100+", label: "Programs Available", iconColor: "text-amber-400" },
    { icon: LifeBuoy, value: "24/7", label: "Support Available", iconColor: "text-pink-400" },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <Icon className={`w-8 h-8 ${stat.iconColor}`} />
                </div>
                <div className="text-4xl md:text-5xl font-bold mb-2 text-zinc-900">
                  {stat.value}
                </div>
                <div className="text-zinc-600 text-sm font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}

