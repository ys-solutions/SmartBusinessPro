"use client";

export default function ActivityList() {

  const activities = [
    "Nouveau client créé",
    "Nouvel utilisateur ajouté",
    "Produit modifié",
    "Transaction validée",
    "Compte créé",
  ];

  return (

    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

      <h2 className="text-xl font-semibold mb-5">
        Dernières activités
      </h2>

      <div className="space-y-4">

        {activities.map((activity, index) => (

          <div
            key={index}
            className="border-b pb-3"
          >

            {activity}

          </div>

        ))}

      </div>

    </div>

  );

}