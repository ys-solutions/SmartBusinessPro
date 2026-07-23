"use client";

import { useMemo, useState } from "react";

import TableHeader from "./TableHeader";
import TableSearch from "./TableSearch";
import TablePagination from "./TablePagination";

export default function DataTable({

    title,
    subtitle,

    columns = [],
    data = [],

    loading = false,

    searchPlaceholder = "Rechercher...",
    pageSize = 10,

    onCreate,

    renderActions,

}) {

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);

    const filteredData = useMemo(() => {

        if (!search) {

            return data;

        }

        const keyword = search.toLowerCase();

        return data.filter((item) =>

            columns.some((column) => {

                const value = item[column.key];

                return String(value ?? "")
                    .toLowerCase()
                    .includes(keyword);

            })

        );

    }, [search, data, columns]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredData.length / pageSize)
    );

    const paginatedData = filteredData.slice(

        (page - 1) * pageSize,

        page * pageSize

    );

    return (

        <div className="bg-white rounded-xl shadow">

            <TableHeader
                title={title}
                subtitle={subtitle}
                onCreate={onCreate}
            />

            <div className="p-6">

                <TableSearch
                    value={search}
                    onChange={(value) => {

                        setSearch(value);

                        setPage(1);

                    }}
                    placeholder={searchPlaceholder}
                />

                <div className="mt-6 overflow-x-auto">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b bg-gray-50">

                                {

                                    columns.map((column) => (

                                        <th
                                            key={column.key}
                                            className="px-4 py-3 text-left text-sm font-semibold text-gray-700"
                                        >

                                            {column.label}

                                        </th>

                                    ))

                                }

                                {

                                    renderActions && (

                                        <th className="w-40 px-4 py-3 text-center">

                                            Actions

                                        </th>

                                    )

                                }

                            </tr>

                        </thead>

                        <tbody>

                            {

                                loading ? (

                                    <tr>

                                        <td
                                            colSpan={
                                                columns.length +
                                                (renderActions ? 1 : 0)
                                            }
                                            className="py-16 text-center text-gray-500"
                                        >

                                            Chargement...

                                        </td>

                                    </tr>

                                ) : filteredData.length === 0 ? (

                                    <tr>

                                        <td
                                            colSpan={
                                                columns.length +
                                                (renderActions ? 1 : 0)
                                            }
                                            className="py-16 text-center text-gray-500"
                                        >

                                            Aucune donnée.

                                        </td>

                                    </tr>

                                ) : (

                                    paginatedData.map((item) => (

                                        <tr
                                            key={item.id}
                                            className="border-b hover:bg-gray-50"
                                        >

                                            {

                                                columns.map((column) => (

                                                    <td
                                                        key={column.key}
                                                        className="px-4 py-4"
                                                    >

                                                        {

                                                            column.render
                                                                ? column.render(item)
                                                                : item[column.key]

                                                        }

                                                    </td>

                                                ))

                                            }

                                            {

                                                renderActions && (

                                                    <td className="px-4 py-4">

                                                        {

                                                            renderActions(item)

                                                        }

                                                    </td>

                                                )

                                            }

                                        </tr>

                                    ))

                                )

                            }

                        </tbody>

                    </table>

                </div>

            </div>

            <TablePagination

                page={page}

                totalPages={totalPages}

                onPrevious={() =>
                    setPage((p) => Math.max(1, p - 1))
                }

                onNext={() =>
                    setPage((p) => Math.min(totalPages, p + 1))
                }

            />

        </div>

    );

}