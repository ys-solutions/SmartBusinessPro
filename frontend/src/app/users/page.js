"use client";

import { useEffect, useState } from "react";

import MainLayout from "@/components/layout/MainLayout";
import UserTable from "@/components/users/UserTable";
import UserSearch from "@/components/users/UserSearch";
import { userService } from "@/services/user";
import UserDetail from "@/components/users/UserDetail";
import UserForm from "@/components/users/UserForm";

export default function UsersPage() {

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDetail, setOpenDetail] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const loadUsers = async () => {

      try {

        setLoading(true);

        const res = await userService.getAll();

        if (res.success) {

          setUsers(res.data);

        }

      } catch (error) {

        console.error("Erreur chargement utilisateurs :", error);

      } finally {

        setLoading(false);

      }

    };

    useEffect(() => {

      loadUsers();

    }, []);

  const handleView = (user) => {

    setSelectedUser(user);

    setOpenDetail(true);

  };

  const handleCreate = async (data) => {

    try {

      const payload = { ...data };

      delete payload.confirm_password;

      await userService.create(payload);

      setOpenForm(false);

      await loadUsers();

    } catch (error) {

      console.error("Erreur création utilisateur :", error);

    }

  };


  // Filtrage des utilisateurs
  const filteredUsers = users.filter((user) => {

    const searchText = search.toLowerCase();

    return (
      user.username?.toLowerCase().includes(searchText) ||
      user.first_name?.toLowerCase().includes(searchText) ||
      user.last_name?.toLowerCase().includes(searchText) ||
      user.email?.toLowerCase().includes(searchText)
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
          onClick={() => {
            setEditingUser(null);
            setOpenForm(true);
          }}
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
          <>

            <UserTable
              users={filteredUsers}
              onView={handleView}
            />

            <UserDetail
              open={openDetail}
              user={selectedUser}
              onClose={() => setOpenDetail(false)}
            />

            <UserForm
                open={openForm}
                user={editingUser}
                onClose={() => setOpenForm(false)}
                onSubmit={handleCreate}
            />

          </>
        )

      }


    </MainLayout>

  );

}