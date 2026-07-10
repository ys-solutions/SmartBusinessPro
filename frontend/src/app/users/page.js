"use client";

import { useEffect, useState } from "react";

import MainLayout from "@/components/layout/MainLayout";
import UserTable from "@/components/users/UserTable";
import UserSearch from "@/components/users/UserSearch";
import UserDetail from "@/components/users/UserDetail";
import UserForm from "@/components/users/UserForm";

import { userService } from "@/services/user";


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

      const response = await userService.getAll();


      if(response.success){

        setUsers(response.data || []);

      }


    } catch(error){

      console.error(
        "Erreur chargement utilisateurs:",
        error
      );

    } finally {

      setLoading(false);

    }

  };



  useEffect(()=>{

    loadUsers();

  },[]);




  const handleView = (user)=>{

    setSelectedUser(user);

    setOpenDetail(true);

  };




  const handleCreate = async (data) => {

    const payload = { ...data };

    delete payload.confirm_password;

    try {

      if (editingUser) {

        await userService.update(editingUser.id, payload);

      } else {

        await userService.create(payload);

      }

      setOpenForm(false);

      setEditingUser(null);

      await loadUsers();

    } catch (error) {

      throw error;

    }

  };



  const filteredUsers = users.filter((user)=>{


    const text = search.toLowerCase();


    return (

      user.username?.toLowerCase().includes(text)

      ||

      user.first_name?.toLowerCase().includes(text)

      ||

      user.last_name?.toLowerCase().includes(text)

      ||

      user.email?.toLowerCase().includes(text)

    );


  });

  const handleEdit = (user) => {

    setEditingUser(user);

    setOpenForm(true);

  };

  const handleDelete = async (user) => {

    if (!confirm(`Supprimer ${user.username} ?`)) {
      return;
    }

    try {

      await userService.delete(user.id);

      await loadUsers();

    } catch (error) {

      console.error(error);

    }

  };



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

          onClick={()=>{

            setEditingUser(null);

            setOpenForm(true);

          }}

          className="bg-blue-600 text-white px-5 py-2 rounded-lg"

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
            onEdit={handleEdit}
            onDelete={handleDelete}
          />



          <UserDetail

            open={openDetail}

            user={selectedUser}

            onClose={()=>setOpenDetail(false)}

          />




          <UserForm

            open={openForm}

            user={editingUser}

            onClose={() => {

              setOpenForm(false);

              setEditingUser(null);

            }}

            onSubmit={handleCreate}

          />


          </>

        )

      }


    </MainLayout>

  );

}