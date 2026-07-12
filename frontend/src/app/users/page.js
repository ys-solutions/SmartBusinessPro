"use client";

import { useEffect, useState } from "react";

import MainLayout from "@/components/layout/MainLayout";

import UserTable from "@/components/users/UserTable";
import UserSearch from "@/components/users/UserSearch";
import UserDetail from "@/components/users/UserDetail";
import UserCreateForm from "@/components/users/UserCreateForm";

import { userService } from "@/services/user";

export default function UsersPage() {

    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [selectedUser, setSelectedUser] = useState(null);

    const [openDetail, setOpenDetail] = useState(false);

    const [openCreate, setOpenCreate] = useState(false);

    // Sera utilisé plus tard
    const [openAccess, setOpenAccess] = useState(false);

    const [openPassword, setOpenPassword] = useState(false);

    const loadUsers = async () => {

        try {

            setLoading(true);

            const response = await userService.getAll();

            if (response.success) {

                setUsers(response.data || []);

            }

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadUsers();

    }, []);

    const handleCreate = async (data) => {

        try {

            await userService.create(data);

            setOpenCreate(false);

            await loadUsers();

        } catch (error) {

            throw error;

        }

    };

    const handleView = (user) => {

        setSelectedUser(user);

        setOpenDetail(true);

    };

    // sera codé après
    const handleAccess = (user) => {

        setSelectedUser(user);

        setOpenAccess(true);

    };

    // sera codé après
    const handlePassword = (user) => {

        setSelectedUser(user);

        setOpenPassword(true);

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

    const filteredUsers = users.filter((user) => {

        const text = search.toLowerCase();

        return (

            user.username?.toLowerCase().includes(text) ||

            user.first_name?.toLowerCase().includes(text) ||

            user.last_name?.toLowerCase().includes(text) ||

            user.email?.toLowerCase().includes(text)

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

                        Liste des utilisateurs du système.

                    </p>

                </div>

                <button

                    onClick={() => setOpenCreate(true)}

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

                                onAccess={handleAccess}

                                onPassword={handlePassword}

                                onDelete={handleDelete}

                            />

                            <UserDetail

                                open={openDetail}

                                user={selectedUser}

                                onClose={() => setOpenDetail(false)}

                            />

                            <UserCreateForm

                                open={openCreate}

                                onClose={() => setOpenCreate(false)}

                                onSubmit={handleCreate}

                            />

                            {/*

                                UserAccessForm

                                sera ajouté ici

                            */}

                            {/*

                                UserPasswordForm

                                sera ajouté ici

                            */}

                        </>

                    )

            }

        </MainLayout>

    );

}