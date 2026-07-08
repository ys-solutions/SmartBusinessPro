"use client";

import { useEffect, useState } from "react";

import MainLayout from "@/components/layout/MainLayout";
import UserTable from "@/components/users/UserTable";
import UserSearch from "@/components/users/UserSearch";
import { userService } from "@/services/user";

export default function UsersPage() {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadUsers = async () => {

      try {

        const res = await userService.getAll();

        console.log("Réponse API :", res);

        if (res.success) {

          setUsers(res.data);

        }

      } catch (error) {

        console.error("Erreur chargement utilisateurs :", error);

      } finally {

        setLoading(false);

      }

    };

    loadUsers();

  }, []);


  // Filtrage des utilisateurs
  const filteredUsers = users.filter((user) => {

    const searchText = search.toLowerCase();

    return (
      user.username?.toLowerCase().includes(searchText) ||
      user.email?.toLowerCase().includes(searchText) ||
      user.name?.toLowerCase().includes(searchText)
    );

  });


  return (

    <MainLayout>

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">
            Gestion des utilisateurs
          </h1>

          <p className="text-gray-500 mt-2">
            Liste des utilisateurs du système
          </p>

        </div>


        <button 
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          + Nouvel utilisateur
        </button>

      </div>


      <UserSearch
        value={search}
        onChange={setSearch}
      />


      {
        loading ?

        (

          <div className="text-center py-20">
            Chargement...
          </div>

        )

        :

        (

          <UserTable users={filteredUsers} />

        )

      }


    </MainLayout>

  );

}