"use client";

export default function NotificationList() {

  const notifications = [
    "4 clients à valider",
    "2 produits bientôt en rupture",
    "1 employé en attente",
    "5 nouvelles transactions",
  ];

  return (

    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

      <h2 className="text-xl font-semibold mb-5">
        Notifications
      </h2>

      <div className="space-y-4">

        {notifications.map((item, index) => (

          <div
            key={index}
            className="border-b pb-3"
          >

            {item}

          </div>

        ))}

      </div>

    </div>

  );

}