"use client";

import MainLayout from "@/components/layout/MainLayout";

import StatCard from "@/components/dashboard/StatCard";
import DashboardChart from "@/components/dashboard/DashboardChart";
import ActivityList from "@/components/dashboard/ActivityList";
import NotificationList from "@/components/dashboard/NotificationList";
import QuickAction from "@/components/dashboard/QuickAction";

import {
  Users,
  UserCog,
  Package,
  Landmark,
  ArrowLeftRight,
  Briefcase,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <MainLayout>

      {/* En-tête */}
      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Tableau de bord
        </h1>

        <p className="text-gray-500 mt-2">
          Bienvenue sur SmartBusiness Pro
        </p>

      </div>

      {/* Cartes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

        <StatCard
          title="Clients"
          value="1 254"
          subtitle="+15 aujourd'hui"
          icon={Users}
          color="blue"
        />

        <StatCard
          title="Utilisateurs"
          value="48"
          subtitle="Tous actifs"
          icon={UserCog}
          color="green"
        />

        <StatCard
          title="Produits"
          value="325"
          subtitle="12 nouveaux"
          icon={Package}
          color="yellow"
        />

        <StatCard
          title="Comptes"
          value="84"
          subtitle="Tous actifs"
          icon={Landmark}
          color="purple"
        />

        <StatCard
          title="Transactions"
          value="3420"
          subtitle="Aujourd'hui"
          icon={ArrowLeftRight}
          color="indigo"
        />

        <StatCard
          title="Employés"
          value="18"
          subtitle="En activité"
          icon={Briefcase}
          color="red"
        />

      </div>

      {/* Graphique */}
      <div className="mt-8">

        <DashboardChart />

      </div>

      {/* Activités + Notifications */}
      <div className="grid lg:grid-cols-2 gap-6 mt-8">

        <ActivityList />

        <NotificationList />

      </div>

      {/* Accès rapides */}
      <div className="mt-8">

        <QuickAction />

      </div>

    </MainLayout>
  );
}